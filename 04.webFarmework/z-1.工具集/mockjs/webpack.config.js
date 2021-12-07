const path = require('path')

module.exports = {
  mode: 'development',
  entry: "./src/mock-url.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}