// postcss的配置文件
module.exports = {
  plugins: [
    require("autoprefixer"), //自动补齐需要package.json中配置browserslist[]
    require("cssnano")
  ]
}