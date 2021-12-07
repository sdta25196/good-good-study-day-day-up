## Ramda 

  > 一款实用的 JavaScript 函数式编程库 - 也是目前最理想的js函数式编程工具库。

  > 与其他函数式的库相比，Ramda 的目标更为专注：专门为函数式编程风格而设计，更容易创建函数式 pipeline、且从不改变用户已有数据。

  > Ramda的数据一律放在最后一个参数，理念是"function first，data last"。

  > Ramda所有方法都支持柯里化

## 安装
  
  npm: `npm install ramda`
  
  yarn: `yarn add ramda`

## 示例
  一些简单的使用示例

  ```javascript
    const R = require('ramda')

    // 过滤数组
    let r = R.filter(e => e > 2)([1, 2, 3, 4])

    // 过滤数组使用R.__占位
    let d = R.filter(R.__, [1, 2, 3, 4])
    console.log(d(e => e > 3))

    // 使用pipe 链式调用
    const c1 = (d) => {
      return d.filter(e => e > 2)
    }
    let c = R.pipe(
      R.map,
      c1
    )
    console.log(c(e => e + 2, [1, 2, 3]))

    // 交换函数前两个参数的位置
    var mergeThree = (a, b, c) => [].concat(a, b, c);
    console.log(R.flip(mergeThree)(1, 2, 3));
  ```
## 部分API

  `identity`:将输入值原样返回。适合用作默认或占位函数。
  ```js
    R.identity(1); //=> 1
    const obj = {};
    R.identity(obj) === obj; //=> true
  ```

  `range`:返回从 from 到 to 之间的所有数的升序列表。左闭右开（包含 from，不包含 to）。
  ```js
    R.range(1, 5);    //=> [1, 2, 3, 4]
    R.range(50, 53);  //=> [50, 51, 52]
  ```

  `product`:列表中的所有元素相乘。
  ```js
    R.product([2,4,6,8,100,1]); //=> 38400
  ```
  
  `gt`：判断第一个参数是否大于第二个参数。
  ```js
    R.gt(2)(1) // true
    R.gt('a')('z') // false
  ```
  > 还有gte（大于等于）、lt（小于）、lte（小于等于）、equals（是否相等）

  `add`:返回两个值的和。
  ```js
    R.add(7)(10) // 17
  ```
  > 还有subtract（求差）、multiply（求积）、divide（求商）

  `either`：接受两个函数作为参数，只要有一个返回true，就返回true，否则返回false。相当于||运算。
  ```js
    var gt10 = x => x > 10;
    var even = x => x % 2 === 0;

    var f = R.either(gt10, even);
    f(101) // true
    f(8) // true
  ```
  > 还有both（&&）、allPass（全部返回true才是true）

  `compose`: 将多个函数合并成一个函数，从右到左执行。
  ```js
    R.compose(Math.abs, R.add(1), R.multiply(2))(-4) // 7
  ```

  `pipe`：将多个函数合并成一个函数，从左到右执行。
  ```js
    var negative = x => -1 * x;
    var increaseOne = x => x + 1;

    var f = R.pipe(Math.pow, negative, increaseOne);
    f(3, 4) // -80 => -(3^4) + 1
  ```

  `converge`: 接受两个参数，第一个参数是函数，第二个参数是函数数组。传入的值先使用第二个参数包含的函数分别处理以后，再用第一个参数处理前一步生成的结果。
  ```js
    var sumOfArr = arr => {
      var sum = 0;
      arr.forEach(i => sum += i);
      return sum;
    };
    var lengthOfArr = arr => arr.length;

    var average = R.converge(R.divide, [sumOfArr, lengthOfArr])
    average([1, 2, 3, 4, 5, 6, 7])
    // 4
    // 相当于 28 除以 7

    var toUpperCase = s => s.toUpperCase();
    var toLowerCase = s => s.toLowerCase();
    var strangeConcat = R.converge(R.concat, [toUpperCase, toLowerCase])
    strangeConcat("Yodel")
    // "YODELyodel"
    // 相当于 R.concat('YODEL', 'yodel')
  ```

  `partial`: 允许多参数的函数接受一个数组，指定最左边的部分参数。
  ```js
    var multiply2 = (a, b) => a * b;
    var double = R.partial(multiply2, [2]);
    double(2) // 4

    var greet = (salutation, title, firstName, lastName) =>
      salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

    var sayHello = R.partial(greet, ['Hello']);
    var sayHelloToMs = R.partial(sayHello, ['Ms.']);
    sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
  ```
  > partialRight相反，指定最右边的参数

  `memoizeWith`: 创建一个新函数，当调用时，会执行原函数，输出结果；并且缓存本次的输入参数及其对应的结果。 后续，若用相同的参数对缓存函数进行调用，不会再执行原函数，而是直接返回该参数对应的缓存值。
  ```js
    let count = 0;
    const factorial = R.memoizeWith(R.identity, n => {
      count += 1;
      return R.product(R.range(1, n + 1));
    });
    factorial(5); //=> 120
    factorial(5); //=> 120
    factorial(5); //=> 120
    count; //=> 1 证明没有再次执行
  ```
## 应用场景

  函数式的应用场景主要为：封装与复用
  
  **此处需要了解`pointfree`的概念**

  假设有如下一组函数，用来分别使某个数据+1，+2，+3
  ```js
    function a1(a){
      return a + 1
    }
    function a2(a){
      return a + 2
    }
    function a3(a){
      return a + 3
    }
    let num = 1
    let res = a3(a2(a1(num))) // ->7
  ```
  使用`pointfree`风格编写程序就是：
  ```js
    function a1(a){
      return a + 1
    }
    function a2(a){
      return a + 2
    }
    function a3(a){
      return a + 3
    }

    let resCalc = R.pipe(a1,a2,a3)
    let num = 1
    resCalc(num) // ->7
  ```
  **`pointfree`风格是lazy Evaluation的，只有当我们最终调用的resCalc(num)的时候，才会真的去触发前面编写的逻辑**

  **`pointfree`风格是完全的数据与行为分离，此处声明的resCalc，是一个特定的行为，可以在任何时候用任意数据调用**


## 一些函数式编程中重要的概念

  * 柯里化

    可以把多元函数，转化为一元函数，利用闭包来存储参数。

  * 声明式编程

    > 先提一嘴四大编程范式：函数式编程-面向对象编程-面向过程编程-泛型编程
    
    函数式编程采取的是声明的方式：

    * 函数式的思维方式：用表达式来描述程序（而非组织计算）
    * 可实现最小粒度的封装、组合、复用，就像是搭积木一样去使用函数

    声明式编程与命令式编程相对立，其差异简单示例如下：
    
    **重点：声明式编程的抽象程度更高，数据与行为是松耦合的，声明了一种行为，而数据是外部传入的**
    
    ```js
      // 命令式编程
        let _div = document.querySelector('div')
        _div.style.background = 'red'
        _div.style.width = '200px'

      // 声明式编程
        let _div = document.querySelector('div')
        function setBG(dom,color){
          dom.style.background = color
        }
        setBG(_div,'red')
    ```
    ```js
      // 命令式编程
      var numbers = [1,2,3,4,5]
      var total = 0 
      for(var i = 0; i < numbers.length; i++) {
        total += numbers[i]
      }
      console.log (total) //=> 15

      // 声明式编程
      var numbers = [1,2,3,4,5]
      var total = numbers.reduce (function (sum, n) {
        return sum + n
      });
      console.log (total) //=> 15
    ```

  * monad和函子(functor)
    
    > 这两个概念非常复杂，这里推荐一本书吧 《javascript函数式编程指南》
    函子：一个函子Functor是任意类型，这些类型定义了如何应用 map  。 也就是说，如果我们要将普通函数应用到一个有盒子上下文包裹的值，那么我们首先需要定义一个叫Functor的数据类型，在这个数据类型中需要定义如何使用map来应用这个普通函数。

    典型的monad拥有以下特点：
    * 最基础的就是`Functor`（函子）。Functor是一个有着 map能力的盒子。
    * 拥有静态的`of`函数 -> `of`返回一个monad实例
    * 拥有`map`函数 -> `map`返回一个monad实例
    * 可以进行流式操作

    ```tsx
      class Container<T> {
        private val : T
        constructor(x : T) {
          this.val = x
        }
        static of<T> (val : T){
          return new Container(val)
        }
        
        public map<U>(fn : (x : T) => U) {
          return Container.of( fn(this.val) )
        }
      }
    ```

  * 部分应用（偏函数）
    
    指固定多元函数的部分参数，并返回一个可以接受剩余部分参数的函数的转换过程。
    
    示例如下：
    ```js
      let arr = R.filter(R.__, [1, 2, 3, 4])
      arr(e => e > 3)
    ```

  * 函数的纯度

    函数的纯度，代表着函数中是否有副作用，副作用是指**是否造成超出气作用域的变化，并且内部的变化仅取决于外部传入的参数**

  * 高阶函数

    一个函数，参数是一个函数，返回值也是一个函数。通常用来把多元函数处理成一元函数，也就是柯里化

  * lazy Evaluation

    当我们说起这个词的时候，代表着：只要没传值，就不会执行真正的调用逻辑，例如上面说到的`pointfree`,当然函数式编程都应当是这种风格

  * compose \ pipe

    compose 和 pipe都是组合函数调用，只不过pipe是从左向右组合，compose是从右向左组合,二者都拥有Lazy Eval（惰性求值）的特性
    
    简单实现如下：
    ```tsx
    function pipe(...fns : Function[]){
      return (...ipts : any[]) => {
        return fns.reduce((acc : any[], fn) => {
          const result = fn(...acc)
          return [result]
        }, ipts)[0]
      }
    }

    function compose(...fns : Function[]){
      return (...ipts : any[]) => {
        return fns.reverse().reduce((acc : any[], fn) => {
          const result = fn(...acc)
          return [result]
        }, ipts)[0]
      }
    }
    ```

## 其他函数式工具库
  
  [underscorejs](http://underscorejs.org/)

  [lodash](https://lodash.com/)

  **Ramda与上述两种库的最主要区别在于Ramda的全部方法柯里化与Ramda的参数后置（data last）**

## 更多

  [中文官网](https://ramda.cn/)