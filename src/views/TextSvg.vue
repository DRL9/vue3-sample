<template>
  <div>
    <div>
      {{ scale.toFixed(2) }}
      <button @click="scale += 0.1">+</button>
      <button @click="scale -= 0.1">-</button>
    </div>
    <div class="show-list">
      <div
        v-for="(item, idx) in list"
        :key="idx"
        :style="{
          transform: `scale(${scale})`,
        }"
      >
        <h6>{{ item.title }}</h6>
        <VSVGText
          v-for="(config, i) in item.configs"
          v-bind="config"
          :key="i"
        />
      </div>
    </div>
    <button @click="onExport">导出</button>
    <div class="show-list" ref="refList"></div>
  </div>
</template>

<script>
import VSVGText from "@/components/VSVGText.vue";
import { runTextToImg } from "@/utils/svg_to_png";
export default {
  components: { VSVGText },
  data() {
    let content = "今天的天气不错,\n第二行!\n这是第三行\nThe forth.";
    const defaultItem = {
      content,
      fontSize: 24,
      color: "#000000",
      strokeColor: "#ff0000",
      strokeWidth: 1,
      lineHeight: 1.5,
      letterSpacing: 0.5,
      fontFamily: "font-27",
      fontStyle: "normal",
      fontWeight: 400,
      textDecoration: "none",
      textAlign: "start",
      writtingMode: "horizontal-tb",
    };
    let listHorizontal = [];
    listHorizontal.push({
      title: "字体大小",
      configs: Array(3)
        .fill(1)
        .map((_, idx) => ({
          ...defaultItem,
          fontSize: defaultItem.fontSize + idx * 6,
        })),
    });

    listHorizontal.push({
      title: "颜色,描边",
      configs: [
        {
          ...defaultItem,
          color: "#00ff00",
          strokeColor: "",
          strokeWidth: 0,
        },
        {
          ...defaultItem,
          color: "#ff0000",
          strokeColor: "#00ff00",
          strokeWidth: 5,
        },
        {
          ...defaultItem,
          color: "#0000ff",
          strokeColor: "#ff0000",
          strokeWidth: 6,
        },
      ],
    });

    listHorizontal.push({
      title: "行高",
      configs: [
        { ...defaultItem, lineHeight: 1 },
        { ...defaultItem, lineHeight: 2 },
        { ...defaultItem, lineHeight: 2.5 },
      ],
    });
    listHorizontal.push({
      title: "字间距",
      configs: [
        { ...defaultItem, letterSpacing: 0 },
        { ...defaultItem, letterSpacing: 1 },
        { ...defaultItem, letterSpacing: 1.5 },
      ],
    });
    listHorizontal.push({
      title: "italic",
      configs: [{ ...defaultItem, fontStyle: "italic" }],
    });
    listHorizontal.push({
      title: "bold",
      configs: [{ ...defaultItem, fontWeight: 600 }],
    });

    listHorizontal.push({
      title: "textDecoration",
      configs: [
        { ...defaultItem, textDecoration: "underline" },
        { ...defaultItem, textDecoration: "line-through" },
      ],
    });

    listHorizontal.push({
      title: "textAlign",
      configs: [
        { ...defaultItem, textAlign: "start" },
        { ...defaultItem, textAlign: "center" },
        { ...defaultItem, textAlign: "end" },
      ],
    });

    listHorizontal.push({
      title: "字体",
      configs: [
        { ...defaultItem, fontFamily: "yahei" },
        { ...defaultItem, fontFamily: "font-28" },
        { ...defaultItem, fontFamily: "font-30" },
      ],
    });

    const listVertical = listHorizontal.map((a) => ({
      ...a,
      configs: a.configs.map((b) => ({ ...b, writtingMode: "vertical-rl" })),
    }));

    const list = [...listHorizontal, ...listVertical].slice(0, 111);
    return {
      list,
      scale: 0.5,
    };
  },
  methods: {
    async onExport() {
      for (let { configs } of this.list) {
        configs.forEach(async (c) => {
          let blob = await runTextToImg(c);
          let img = document.createElement("img");
          img.src = URL.createObjectURL(blob);
          this.$refs.refList.appendChild(img);
        });
      }
    },
  },
};
</script>

<style lang="less">
.show-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  svg {
    vertical-align: top;
  }
  img {
    margin: 10px;
    border: 1px solid #ccc;
  }
}
h6 {
  margin: 0;
  font-size: 20px;
}
</style>
