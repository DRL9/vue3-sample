<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="svgWidth" :height="svgHeight">
    <text
      :class="className"
      ref="refText"
      :text-anchor="textAnchor"
      dominant-baseline="hanging"
      :stroke-width="strokeWidth + 'px'"
      :stroke="strokeColor"
    >
      <tspan
        v-for="item in tspanList"
        :x="item.x"
        :y="item.y"
        :dx="item.dx"
        :dy="item.dy"
        :key="item.idx"
      >
        {{ item.txt }}
      </tspan>
    </text>
    <text
      :class="className"
      :text-anchor="textAnchor"
      dominant-baseline="hanging"
    >
      <tspan
        v-for="item in tspanList"
        :x="item.x"
        :y="item.y"
        :dx="item.dx"
        :dy="item.dy"
        :key="item.idx"
      >
        {{ item.txt }}
      </tspan>
    </text>
    <svg:style>
      .{{className}} {
          {{styleContent}}
      }
    </svg:style>
  </svg>
</template>

<script>
let id = 0;

export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    fontSize: {
      type: Number,
      default: 24,
    },
    lineHeight: {
      type: Number,
      default: 1,
    },
    letterSpacing: {
      type: Number,
      //   px
      default: 0,
    },
    color: {
      type: String,
      default: "#ff0000",
    },
    strokeWidth: {
      type: Number,
      default: 0,
    },
    strokeColor: {
      type: String,
      default: "",
    },
    fontFamily: {
      type: String,
      default: "yahei",
    },
    fontStyle: {
      type: String,
      default: "normal",
      validator(value) {
        return ["normal", "italic"].includes(value);
      },
    },
    fontWeight: {
      type: Number,
      default: 400,
    },
    textDecoration: {
      type: String,
      default: "none",
      validator(value) {
        return ["none", "line-through", "underline"].includes(value);
      },
    },
    textAlign: {
      type: String,
      default: "start",
      validator(value) {
        return ["start", "center", "end"].includes(value);
      },
    },
    writtingMode: {
      type: String,
      default: "horizontal-tb",
      validator(value) {
        return ["horizontal-tb", "vertical-rl", "vertical-lr"].includes(value);
      },
    },
  },
  data() {
    return {
      svgWidth: 0,
      svgHeight: 0,
      crossAxis: 0,
      mainAxis: 0,
      className: "c-" + id++,
    };
  },
  computed: {
    isHorizontal() {
      return this.writtingMode.startsWith("hori");
    },
    x() {
      if (this.isHorizontal) {
        if (this.textAlign === "start") {
          return 0;
        } else if (this.textAlign === "center") {
          return "50%";
        } else if (this.textAlign === "end") {
          return "100%";
        }
      }
      return 0;
    },
    y() {
      if (!this.isHorizontal) {
        if (this.textAlign === "start") {
          return 0;
        } else if (this.textAlign === "center") {
          return "50%";
        } else if (this.textAlign === "end") {
          return "100%";
        }
      }
      return 0;
    },
    textAnchor() {
      if (this.textAlign === "start") {
        return "start";
      } else if (this.textAlign === "center") {
        return "middle";
      }
      return "end";
    },
    tspanList() {
      // 因为 vertical-rl 没生效, 所以人为逆转
      let list = this.content.split("\n");
      if (this.writtingMode === "vertical-rl") {
        list.reverse();
      }
      return list.map((txt, idx) => ({
        txt,
        idx,
        dx: this.isHorizontal ? 0 : `1em`,
        x: this.isHorizontal ? this.x : `${idx * this.lineHeight}em`,
        dy: this.isHorizontal ? "0.2em" : 0,
        y: this.isHorizontal ? `${idx * this.lineHeight}em` : this.y,
      }));
    },
    styleContent() {
      return `
          font-family: ${this.fontFamily};
          font-size: ${this.fontSize}px;
          fill: ${this.color};
          writing-mode: ${this.isHorizontal ? "horizontal-tb" : "vertical-rl"};
          letter-spacing: ${this.letterSpacing}em;
          font-style: ${this.fontStyle};
          font-weight: ${this.fontWeight};
          text-decoration: ${this.textDecoration};
      `;
    },
  },
  mounted() {
    const resizeObserver = new ResizeObserver(() => {
      const rect = this.$refs.refText.getBoundingClientRect();
      this.svgWidth = rect.width;
      this.svgHeight = rect.height;
      //   this.crossAxis = Math.floor(rect.height / 2);

      this._resolve && this._resolve();
    });
    resizeObserver.observe(this.$refs.refText);
    this.resizeObserver = resizeObserver;
  },
  unmounted() {
    this.resizeObserver.disconnect();
  },
  methods: {
    /**
     * 给转图片时调用
     */
    completed() {
      return new Promise((resolve) => {
        this._resolve = resolve;
      });
    },
  },
};
</script>

<style>
svg {
  outline: 1px solid #f00;
  margin: 2px;
  user-select: none;
}
</style>
