/**
 * @typedef {import('@vue/cli-service').ProjectOptions} Options
 */

/**
 * @type {Options}
 */
module.exports = {
  devServer: {
    open: true,
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          isCustomElement: (tag) => tag === "svg:style",
        };
        return options;
      });
  },
};
