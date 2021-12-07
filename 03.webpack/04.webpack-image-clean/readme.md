# clean-webpack-plugin
 > npm i clean-webpack-plugin -D
 * 每次打包清楚上一次的dist
 ```
   plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["*", "!test"], //指定dist下test文件夹内容不被清除, *必填
    })
  ]
 ```
# 处理文件、处理三方字体
  > url-loader 、file-loader ； url是file的升级版，一般使用url就可以
  ```js
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
  ```