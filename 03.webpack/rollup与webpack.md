## Rollup
Rollup 已被许多主流的 JavaScript 库使用，也可用于构建绝大多数应用程序。

但是 Rollup 还不支持一些特定的高级功能，尤其是用在构建一些应用程序的时候，特别是代码拆分和运行时态的动态导入 dynamic imports at runtime. 如果你的项目中更需要这些功能，那使用 Webpack可能更符合你的需求。

rollup相比webpack配置更加简洁，因为webpack只针对打包不预设场景，不局限于针对web打包，几乎所有可配置的环节都做成了可配置的。脑力成本也就上来了。

## vite - rollup - webpack 

限定在web场景下 vite更好,但是只支持现代浏览器

不限定场景的情况下

rollup更适合打包库 因为他打包**体积更小** - 但是缺乏一些优化打包应用程序时需要的功能

webpack更适合打包框架 因为他支持优化打包应用程序时需要的功能，但是打包体积偏大，不适合作为库

比如：**从动态导入中消除死代码**

  * rollup 不支持 - [issues](https://github.com/rollup/rollup/issues/3447)

  * Webpack 可以利用魔术注释来实现
  ```js
    const { logCaps } = await import(/* webpackExports: "logCaps" */ './utils.js');
  ```