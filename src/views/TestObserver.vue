<template>
  <div>
    <div>
      <select v-model="compName">
        <option value="VIntersectionObserver">VIntersectionObserver</option>
        <option value="VMutationObserver">VMutationObserver</option>
        <option value="VResizeObserver">VResizeObserver</option>
        <option value="VPerformanceObserver">VPerformanceObserver</option>
      </select>
    </div>
    <component :is="compName"></component>
  </div>
</template>

<script>
import VIntersectionObserver from "@/components/VIntersectionObserver.vue";
import VMutationObserver from "@/components/VMutationObserver.vue";
import VResizeObserver from "@/components/VResizeObserver.vue";
import VPerformanceObserver from "@/components/VPerformanceObserver.vue";
export default {
  components: {
    VIntersectionObserver,
    VMutationObserver,
    VResizeObserver,
    VPerformanceObserver,
  },
  data() {
    return {
      compName: "VIntersectionObserver",
    };
  },
};
</script>
