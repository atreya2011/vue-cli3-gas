module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    config.plugins.delete("prefetch");
    config.plugins.delete("preload");

    config.plugin("html").tap(args => {
      args[0].inject = false;
      args[0].minify.removeAttributeQuotes = false;
      args[0].minify.removeScriptTypeAttributes = false;
      return args;
    });

    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });
    config.module
      .rule("media")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });
    config.module
      .rule("fonts")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });
  },
  configureWebpack: {
    devtool: "inline-source-map"
  }
};
