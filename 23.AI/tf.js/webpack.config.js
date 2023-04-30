const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  devServer: {
    hot: true,
  },
  plugins: [new NodePolyfillPlugin()],
}