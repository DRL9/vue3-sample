<template>
  <div>
    <VIntersectionObserver />
    <VMutationObserver />
    <VResizeObserver />
  </div>
</template>

<script>
import VIntersectionObserver from "@/components/VIntersectionObserver.vue";
import VMutationObserver from "@/components/VMutationObserver.vue";
import VResizeObserver from "@/components/VResizeObserver.vue";
export default {
  components: { VIntersectionObserver, VMutationObserver, VResizeObserver },
};
</script>
