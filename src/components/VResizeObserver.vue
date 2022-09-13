<template>
  <div>
    <div class="box" ref="refBox" :style="style">box</div>
    <div>
      <button @click="clickHandler('width')">width +1</button>
      <button @click="clickHandler('left')">left +1</button>
      <button @click="clickHandler('borderWidth')">borderWidth +1</button>
      <button @click="clickHandler('padding')">padding +1</button>
      <button @click="clickHandler('scale')">scale +0.1</button>
      <button @click="clickHandler('prove')">prove</button>
    </div>
    <div>
      history
      <ul>
        <li v-for="(h, idx) in histories" :key="idx">{{ h }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
export default {
  setup() {
    const refBox = ref();
    const style = ref({
      width: "100px",
      borderWidth: "1px",
      left: "0px",
      padding: "0px",
      transform: "scale(1)",
    });
    const histories = ref([]);
    const observer = new ResizeObserver((entries) => {
      console.log("from observer");
      entries.forEach((entry) => {
        histories.value.push(
          `width: ${entry.contentRect.width},
           left: ${entry.contentRect.left},
           blockSize: ${entry.borderBoxSize[0].blockSize}
          `
        );
      });
    });
    onMounted(() => {
      observer.observe(refBox.value, {
        box: "border-box",
      });
    });
    onUnmounted(() => {
      observer.disconnect();
    });

    let scale = 1;
    const clickHandler = (type) => {
      if (type === "scale") {
        scale += 0.1;
        style.value.transform = `scale(${scale})`;
        return;
      } else if (type === "prove") {
        setTimeout(() => {
          console.log("from set time out");
        }, 0);
        refBox.value.style.width = "20px";
        console.log(refBox.value.getBoundingClientRect());
        return;
      }
      style.value[type] = parseInt(style.value[type]) + 1 + "px";
    };
    return {
      refBox,
      style,
      histories,
      clickHandler,
    };
  },
};
</script>

<style scoped>
.box {
  position: relative;
  background-color: #ccc;
  border: 1px solid red;
  box-sizing: border-box;
}
</style>
