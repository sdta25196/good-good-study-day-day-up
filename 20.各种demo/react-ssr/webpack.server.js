const path = require('path')
const nodeExternals = require('webpack-node-externals')
// 服务端webpack

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
}