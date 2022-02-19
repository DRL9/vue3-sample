<template>
  <div class="wrap">
    <div
      class="observed"
      ref="refObserved"
      @click="clickHandler"
      :data-text="text"
    >
      click {{ text }}
      <div>sub1 {{ text }}</div>
      <div>sub2 {{ text }}</div>
    </div>
    <div>
      history
      <ul>
        <li v-for="(changed, idx) in changedList" :key="idx">{{ changed }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref } from "vue";
export default {
  setup() {
    const refObserved = ref();
    const changedList = ref([]);
    const text = ref("");
    const observer = new MutationObserver((entries) => {
      entries.forEach((entry, idx) => {
        changedList.value.push(
          `${idx}, type: ${entry.type}, attribute: ${entry.attributeName}, add node ${entry.addedNodes.length}, remove node ${entry.removedNodes.length}`
        );
      });
    }, {});
    onMounted(function () {
      observer.observe(refObserved.value, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });

    onUnmounted(() => {
      observer.disconnect();
    });
    const clickHandler = () => {
      text.value = Math.random() + "";
    };
    return {
      refObserved,
      changedList,
      text,
      clickHandler,
    };
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
}
.observed {
  display: inline-block;
  width: 200px;
  cursor: pointer;
  background-color: #ccc;
}
</style>
