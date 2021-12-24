rollup 打的包更小, rollup更适合打包库，webpack更适合打包框架

## ESM打包

rollup 天然支持ESM打包

webpack5之后才提供了一个实验性的ESM打包功能

## 从动态导入中消除死代码

rollup 不支持 - [issues](https://github.com/rollup/rollup/issues/3447)

Webpack 可以利用魔术注释来实现
```js
  const { logCaps } = await import(/* webpackExports: "logCaps" */ './utils.js');
```


