<template>
  <div class="wrap">
    <div class="box-wrap" ref="boxWrap">
      <div
        class="box box1"
        ref="refBox1"
        :style="{
          transform: `translate(0, ${box1Y}px)`,
        }"
      ></div>
      <div class="box box2" ref="refBox2"></div>
    </div>
    <div class="info">
      <div>
        <div>box1</div>
        <div>intersectionRatio {{ intersectionRatio1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      box1Y: 0,
      intersectionRatio1: 0,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this.$refs.refBox1) {
            this.intersectionRatio1 = entry.intersectionRatio;
          }
        });
      },
      {
        root: this.$refs.boxWrap,
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 1],
      }
    );
    observer.observe(this.$refs.refBox1);
  },
};
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
}
.box-wrap {
  width: 200px;
  height: 200px;
  overflow: scroll;
  padding: 30px;
  border: 1px solid #ccc;
}

.box {
  position: relative;
  width: 200px;
  height: 400px;
  &.box1 {
    background-color: red;
  }
  &.box2 {
    background-color: green;
  }
}
.info {
  margin-left: 10px;
  text-align: left;
}
</style>
