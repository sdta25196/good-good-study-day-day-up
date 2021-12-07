// webpack的配置文件
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin") //每次打包清除dist
module.exports = {
  entry: {
    main: "./src/index.js",
  }, // 入口
  output: { //出口
    filename: "js/[name].js", //出口文件名 
    path: path.resolve(__dirname, "./dist"), //出口文件夹路径
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader", //可以处理图片、三方字体啥的
          options: {
            name: "[name].[ext]",
            outputPath: "images", // 图片打包到images路径下
            publicPath: "../images/",//图片的引用位置，决定css中引用图片的路径,css 路径打包之后由于路径修改会使路径错误
            limit: 1024,  // url-loader配置，如果小于1024就会使用base64
          }
        }
      }
      // {
      //   test: /\.(jpg|png)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "images", // 图片打包到images路径下
      //       publicPath: "../images/",//图片的引用位置，决定css中引用图片的路径,css 路径打包之后由于路径修改会使路径错误
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["*", "!test"], //指定dist下test文件夹内容不被清除, *必填
    })
  ]
}