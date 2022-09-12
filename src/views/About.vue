<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { ref, warn } from "vue";

export default {
  setup() {
    const count = ref(0);
    console.log(count);
    warn("hello world");
  },
};
</script>
