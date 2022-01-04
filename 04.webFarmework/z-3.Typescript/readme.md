# 《Typescript必会技能》

## 类型是什么

### 狗可以叫的实现
* 【面向对象】对象狗拥有bark方法
* 【函数式】Dog is Barkable<T>

> 类型的思维方式在函数式和面向对象中是高度统一的

### 领域驱动开发
  核心理念：通过**类型的演进**不断让系统进化

### 检查
  **类型设计的足够好**的系统，甚至可以做到编译时检查通过即可上线

### 类型是什么总结
  * 类型是人的思考方式，类型帮助人思考（好的程序设计帮助人更好的思考）
  * 类型帮助检查错误（减少90%以上的运行时bug）
  * 类型帮助系统演进

## TS介绍 
  * TS是JS的超集
  * TS支持 Client Side 和 Server Side
  * TS是一个多范式语言
  * TS同时支持Duck typing（鸭子类型）、Gradual Typing（渐进式类型）、Strick Typing（严格类型）
    * Duck typing：支持动态属性，js就是Duck typing
    * Gradual Typing：TS支持渐进式，可以一部分用，一部分不用
    * Strick Typing：严格模式

## 配置文件
  根目录下的 tsconfig.json

## 工具
  * tsc 根据 tsconfig.json 编译ts为js ```npm i -g ts-node```
  * ts-node 执行ts文件，或者启动REPL界面 （read evel print loop） ```npm i -g ts-node```

## ts-webpack
  * 安装依赖 ```yarn add webpack ts-loader typescript webpack-cli```
  * 配置```webpack.config.js```

## ts-react、ts-vue
  // 详见课程文档
  * ts-loader 与 babel-loader, babel-loader性能、优化、速度等都会优于ts-loader


## type和interface的区别

  type 本质上是一个类型别名，只是对某类型起个新名字

  interface 是声明一个对象类型


  type 不能重新定义，只能定义一次

  interface 可以多次定义，最终使用并集

  

