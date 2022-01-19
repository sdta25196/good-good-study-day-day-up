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

  

## is有啥用
  帮助ts在编译期间进行类型推导，最终编译后的js代码， is 和 boolean 是一样的

## 联合类型可以用来控制某个参数必须存在
  ```js
    interface Shape {
      kind: "circle" | "square";
      radius?: number;
      sideLength?: number;
    }
  ```
  改成
  ```js
    interface Circle {
      kind: "circle";
      radius: number;
      sideLength: number;
    }
     interface Square {
      kind: "square";
    }

    type Shape = Circle | Square
  ```

## 返回值使用`unknown`
  如果返回值使用`unkonwn`,就需要使用者知道这是一个什么类型，然后使用`as` 给一个类型
  
  ```ts
  function a():unknown{
    return ""
  }

  let c = a() as string
  ```

## 函数定义可以使用属性
  
  类型DescribableFunction可以直接当做函数调用，但是同时他还有属性可以使用
  > 需要注意这里使用的函数定义是`:`，而不是`=>`
```js
  type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };
  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }
```

## 函数重载的列表必须是函数实现的子集，或者超集。


## void

void不是undefined。void代表无返回值

如下：f3 会报错，显示声明返回值为void的函数，不可以有返回值，f2不报错，因为有返回值的函数，可以赋值给`()=>void`
```js
  const f3 = function (): void {
    return true;
  }; 

  type voidFunc = () => void;

  const f2: voidFunc = function () {
    return true;
  };
```

