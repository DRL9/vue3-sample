<template>
  <div>
    <VIntersectionObserver />
    <VMutationObserver />
  </div>
</template>

<script>
import VIntersectionObserver from "@/components/VIntersectionObserver.vue";
import VMutationObserver from "@/components/VMutationObserver.vue";
export default {
  components: { VIntersectionObserver, VMutationObserver },
};
</script>
