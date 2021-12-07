const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "../build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        },
        exclude: /node_modules/,
      }
    ]
  },
}