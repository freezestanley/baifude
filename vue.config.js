const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { env } = process;
const { DEV_SERVER } = require("./config");
const fs = require("fs");
const gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim(); // ref: refs/heads/develop
let ref, gitVersion, cDate, branch;
if(gitHEAD.match(/^[0-9a-z]+$/)){
  gitVersion = gitHEAD;
}else{
  ref = gitHEAD.split(': ')[1]; // refs/heads/develop
  gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim(); // git版本号，例如：6ceb0ab5059d01fd444cf4e78467cc2dd1184a66
}
console.log('gitHEAD:', gitHEAD)
// console.log('ref:', ref);

fs.writeFileSync('./public/version.html', `<h3>Version: ${gitVersion}</h3>`);
var exec = require('child_process').exec;
var cmd2 = `git name-rev --name-only HEAD`;
// 获取分支/tag号
exec(cmd2,function(error, stdout, stderr){
  const outputStr = `<h3>Tag/Brand Name: ${stdout}</h3>`;
  fs.appendFileSync('./public/version.html', outputStr);
  // var cmd1 = `cat ./.git/logs/refs/${stdout} | grep -E ${gitVersion} -m 1 | awk '{print $5}'`;
  var cmd1 = `git log --pretty=format:"%cd" ${gitVersion} -1`;

  exec(cmd1, function(error, stdout, stderr){
    const tmpDate = new Date(stdout);
    const y = tmpDate.getFullYear(), M = tmpDate.getMonth() + 1, d = tmpDate.getDate(), H = tmpDate.getHours(),
      m = tmpDate.getMinutes(), s = tmpDate.getSeconds();
    cDate = `${y}-${M}-${d} ${H}:${m}:${s}`;
    const outputStr = `<h3>CommitTime: ${cDate}</h3>`;
    fs.appendFileSync('./public/version.html', outputStr);
  });
});



module.exports = {
  publicPath: 'dfapps://dongfangfuli.com/',
  outputDir: 'dist/home-h5',
  assetsDir: "assets",
  productionSourceMap: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/styles/base/fn.less")]
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugin('define').tap(args => {
      args[0].PUBLIC_LOGIN_URL = JSON.stringify(env.loginUrl);
      return args;
    })
  },
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        // console.log('==========================')
        // console.log(JSON.stringify(val))
        // console.log('==========================')
        // val.publicPath = 
        val.options.meta = Object.assign(val.options.meta, {
          'app-version': gitVersion
        });
      }
    });
    const plugins = []
    // const plugins = [
    //   new webpack.DllReferencePlugin({
    //     context: process.cwd(),
    //     manifest: require("./public/vendor/vendor-manifest.json")
    //   }),
    //   // 将 dll 注入到 生成的 html 模板中
    //   new AddAssetHtmlPlugin({
    //     // dll文件位置
    //     filepath: path.resolve(__dirname, "./public/vendor/*.js"),
    //     // dll 引用路径
    //     publicPath: (env.NODE_ENV === "development" ? "/" : `${env.publicPath}/home-h5/`) + "vendor",
    //     // dll最终输出的目录
    //     outputPath: "./vendor",
    //   })
    // ];
    // const exts = {
    //   swiper: "Swiper"
    // };
    if (env.NODE_ENV !== "development") {
      config.plugins = [...config.plugins, ...plugins];
      // config.externals = { ...config.externals, ...exts };
    }
  },
  devServer: DEV_SERVER
};
