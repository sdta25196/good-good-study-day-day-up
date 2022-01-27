## Rollup

  Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。 
  > tips：建议用rollup打包库，打包应用程序的话，webpack更专业一些

  Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。
  > 意思就是说：Rollup支持打包ESM，webpack的话，是不支持打包ESM的

## 安装

  `npm install rollup -g` 全局安装，之后即可使用`rollup`命令

  **本地安装**

  `npm install rollup --save-dev`或`yarn -D add rollup`，之后即可使用`npx rollup --config`

  或者使用脚本
  ```js
    {
      "scripts": {
        "build": "rollup --config"
      }
    }
  ```
## 示例

  把 main.js 打包成 bundle.js 采用commonjs规范：`rollup main.js --file bundle.js --format cjs`

## Tree-Shaking 摇树

  除了启用 ES 模块之外，Rollup 还静态分析您正在导入的代码，并将排除任何实际未使用的代码。

  使用 CommonJS，必须导入整个工具或库。
  ```js
  // import the entire utils object with CommonJS
  const utils = require('./utils');
  const query = 'Rollup';
  // use the ajax method of the utils object
  utils.ajax(`https://api.example.com?search=${query}`).then(handleResponse);
  ```

  使用 ES 模块，我们可以只导入我们需要的一个函数，而不是导入整个utils对象：ajax
  ```js
  // import the ajax function with an ES6 import statement
  import { ajax } from './utils';
  const query = 'Rollup';
  // call the ajax function
  ajax(`https://api.example.com?search=${query}`).then(handleResponse);
  ```

  由于 Rollup 包含最少的内容，因此它可以生成更轻、更快、更简单的库和应用程序。


## 配置文件示例

```js
  // rollup.config.js
  export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    }
  };
```

打包使用 `rollup -c` 命令，默认会使用`rollup.config.js`


## 兼容CommonJS
  
  `@rollup/plugin-commonjs` 可以兼容CommonJS
  
  `@rollup/plugin-node-resolve` 可以解决esm模块导入问题

  rollup.config.js
  ```js
    {
      plugins: [
        commonjs(),
        nodeResolve(),
        uglify({
          output: {
            comments: "all"//保留注释，后面文档做好之后可以删除
          }
        }),
      ]
    }

  ```

## 其他插件
  
  `rollup-plugin-terser` 可以压缩打包文件

  `@rollup/plugin-json` 可以允许rollup导入json


## 常见问题

  Q: 为什么 ES 模块比 CommonJS 模块好？

  A：ES 模块是官方标准，也是 JavaScript 代码结构的清晰路径，而 CommonJS 模块是一种特殊的遗留格式，在 ES 模块被提出之前作为权宜之计。ES 模块允许静态分析，有助于优化树状结构和范围提升，并提供循环引用和实时绑定等高级功能。

  Q: 什么是“摇树”？

  A: Tree-shaking，也称为“实时代码包含”，是 Rollup 消除给定项目中实际未使用的代码的过程。这是一种消除死代码的形式，但在输出大小方面比其他方法更有效。该名称源自模块的抽象语法树（而不是模块图）。该算法首先标记所有相关语句，然后“摇动语法树”以删除所有死代码。它在思想上类似于标记和清除垃圾收集算法。尽管此算法不限于 ES 模块，但它们使其效率更高，因为它们允许 Rollup 将所有模块一起视为具有共享绑定的大型抽象语法树。

  Q: 如何在 Node.js 中将 Rollup 与 CommonJS 模块一起使用？

  A: Rollup 努力实现 ES 模块的规范，不一定是 Node.js、NPMrequire()和 CommonJS 的行为。因此，CommonJS 模块的加载和 Node 的模块位置解析逻辑的使用都是作为可选插件实现的，默认情况下不包含在 Rollup 核心中。

## 更多

  [rollup官方文档](https://rollupjs.org/guide/en/#introduction)





















