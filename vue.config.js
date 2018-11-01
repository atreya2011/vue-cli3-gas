const productionConfig = {
  chainWebpack: config => {
    // inline image
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });

    // inline svg
    const svgFileLoaderConfig = config.module
      .rule("svg")
      .use("file-loader")
      .toConfig();
    config.module.rule("svg").uses.delete("file-loader");
    config.module
      .rule("svg")
      .use("url-loader")
      .loader("url-loader")
      .options({
        fallback: svgFileLoaderConfig
      });

    // inline media
    config.module
      .rule("media")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });

    // inline font
    config.module
      .rule("fonts")
      .use("url-loader")
      .tap(options => {
        delete options.limit;
        return options;
      });

    // disable prefetch and preload
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");

    // configure adjust to GAS
    config.plugin("html").tap(args => {
      args[0].inject = false;
      args[0].minify.removeAttributeQuotes = false;
      args[0].minify.removeScriptTypeAttributes = false;
      return args;
    });
  },
  configureWebpack: {
    devtool: "inline-source-map",
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      Vuetify: "Vuetify",
      "vuetify/dist/vuetify.min.css": "undefined"
    }
  },
  css: {
    extract: false,
    sourceMap: true
  }
};

module.exports = process.env.NODE_ENV === "production" ? productionConfig : {};
