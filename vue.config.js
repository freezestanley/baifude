const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { env } = process;
const publicPath = env.VUE_APP_PUBLIC_PATH;

module.exports = {
  publicPath: env.NODE_ENV === "development" ? "/" : publicPath",
  outputDir: env.outputDir,
  assetsDir: "assets",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/styles/base/fn.less")]
    }
  },
  configureWebpack: config => {
    const plugins = [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require("./public/vendor/vendor-manifest.json")
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, "./public/vendor/*.js"),
        // dll 引用路径
        publicPath: "./vendor",
        // dll最终输出的目录
        outputPath: "./vendor"
      })
    ];
    const exts = {
      swiper: "Swiper"
    };
    if (env.NODE_ENV !== "development") {
      config.plugins = [...config.plugins, ...plugins];
      config.externals = { ...config.externals, ...exts };
    }
  }
};
