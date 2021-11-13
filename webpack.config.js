const path = require("path");
// html 生成插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 入口文件
  entry: "./src/app.ts",
  // 指定打包文件所在目录
  output: {
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件名
    filename: "bundle.js",
    // 告诉 webpack 不使用箭头函数，否则高版本 webpack 编译会使用箭头函数，导致 ie 报错
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  // 指定 webpack 打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定规则生效的文件
        test: /\.ts$/,
        // ts-loader 先执行
        use: [
          // 配置 babel
          {
            loader: "babel-loader",
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器版本
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定 corejs 版本
                    corejs: "3",
                    // 使用 corejs 的方式 "usage"，表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 指定要排除的文件
        exclude: /node_modules/,
      },
      // 设置 less 处理
      {
        test: /\.less$/,
        // 执行顺序从后边开始，less-loader 到 style-loader
        use: [
          "style-loader", // 把 css 引入到项目
          "css-loader", // 处理 css 代码
          // postcss 处理浏览器兼容
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browser: "last 2 versions", // 兼容最新两个版本的浏览器，如 ie10、ie11
                    },
                  ],
                ],
              },
            },
          },
          "less-loader", // less 加载器
        ],
      },
    ],
  },
  // 配置 webpack 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "贪吃蛇", // 设置 webpack 生成的 html 的标题
      template: "./public/index.html", // 引用网页模板，不定义会生成一个空白 html
    }),
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"], // 表示以 ts、js 结尾的文件可以作为模块引用
  },
};
