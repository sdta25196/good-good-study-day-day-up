const path = require("path")
const { override, addWebpackAlias, fixBabelImports } = require("customize-cra")
const VERSION = process.env.VERSION || ""

const customConfig = () => (config, env) => {
  config.output.filename = `static/js/[hash].[name].js`
  config.output.chunkFilename = `static/js/[chunkhash].[name].chunk.js`
  config.plugins[5].options.filename = `static/css/[chunkhash].[name].css`
  config.plugins[5].options.chunkFilename = `static/css/[chunkhash].[name].chunk.css`
  return config
}

module.exports = override(
  customConfig(),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src")
  }),
  // antd按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  })
)