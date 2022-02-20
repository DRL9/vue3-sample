<template>
  <div>
    <button @click="clickHandler">click</button>
    <button @click="clickHandler('load')">loading img</button>
    <button @click="clickHandler('addElement')">addElement</button>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "@vue/runtime-core";
export default {
  setup() {
    const clickHandler = (type) => {
      if (type === "load") {
        let img = new Image();
        img.src = "http://dummyimage.com/200x100/02adea&text=Hello";
        return;
      }
      if (type === "addElement") {
        document.body.append(document.createElement("img"));
        return;
      }
      performance.mark("start");
    };
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(entry);
      });
    });
    onMounted(() => {
      observer.observe({
        entryTypes: ["mark", "resource", "paint", "element", "navigation"],
      });
    });
    onUnmounted(() => {
      observer.disconnect();
    });
    return { clickHandler };
  },
};
</script>
