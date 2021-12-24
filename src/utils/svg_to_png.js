import VSVGText from "@/components/VSVGText.vue";
import { createApp } from "vue";
import { FontMap } from "./font_map";
import { TaskQueue } from "./task_queue";

const queue = new TaskQueue(3);

export async function runTextToImg(prop) {
  return queue.runTask(() => subtitle2Img(prop));
}

// async function blobToImgUrl(blob) {}

let $root;
async function subtitle2Img(props) {
  let start = Date.now();
  if (!$root) {
    $root = document.createElement("div");
    $root.id = "subtitleRenderRoot";
    $root.style = "position:absolute; left:0px;top:0px; visibility:hidden;";
    document.body.appendChild($root);
  }
  const $singleWrap = document.createElement("div");
  $root.appendChild($singleWrap);
  let vm = createApp(VSVGText, props).mount($singleWrap);
  await vm.completed();
  let rect = vm.$el.getBoundingClientRect();
  let blob = await serializeSvgDom(vm.$el, props.fontFamily)
    .then(makeImg)
    .then((img) => toPng(img, rect.width, rect.height));
  $root.removeChild($singleWrap);
  console.log("costTime", Date.now() - start);

  return blob;
}

async function serializeSvgDom(svgDom, fontFamily) {
  let html = svgDom.outerHTML.replace(/svg:style/g, "style");
  let url = FontMap[fontFamily];
  if (url) {
    let cssText = await resolveFont(fontFamily);
    html = html.replace("<style> ", `<style> ${cssText} \n`);
  }
  return html;
}

function resolveFont(fontFamily) {
  return readFont(FontMap[fontFamily]).then(
    (dataUrl) => `
            @font-face {
                font-family: '${fontFamily}';
                src: url('${dataUrl}');
            }
    `
  );
}

const fontCacheBuffers = {};

function readFont(url) {
  return new Promise((resolve, reject) => {
    let cache = fontCacheBuffers[url];
    if (cache) {
      if (cache.data) {
        return resolve(cache.data);
      }
    } else {
      fontCacheBuffers[url] = cache = { cbs: [] };
      console.log("fetch", url);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            cache.data = reader.result;
            while (cache.cbs.length > 0) {
              let { resolve } = cache.cbs.shift();
              resolve(cache.data);
            }
            setTimeout(() => {
              delete fontCacheBuffers[url];
              //    只存1min
            }, 60 * 1000);
          };
        })
        .catch((err) => {
          while (cache.cbs.length > 0) {
            let { reject } = cache.cbs.shift();
            reject(err);
          }
        });
    }
    cache.cbs.push({ resolve, reject });
  });
}

function makeImg(html) {
  let blob = new Blob([html], {
    type: "image/svg+xml;charset=utf-8",
  });
  let img = new Image();
  img.src = URL.createObjectURL(blob);
  img.crossOrigin = "Anonymous";
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function toPng(img, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/png",
      1
    );
  });
}
