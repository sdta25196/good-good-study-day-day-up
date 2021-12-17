const path = require('path')

module.exports = {
  entry: "./src/index.jsx",
  mode: "production",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyComponent',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-env",
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}