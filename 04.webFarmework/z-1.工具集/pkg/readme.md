pkg 

# 安装

`npm i -g pkg`

# 使用

`package.json` 中添加 `"bin": "src/index.js"`, bin代表入口文件，当时用 `pkg .` 打包时，pkg会把此路径作为入口文件打包.

`pkg . -t win -o dist/test`, `-t` 打包指定版本（win），`-o` 打包文件输出路径（`dist/test.exe`）

