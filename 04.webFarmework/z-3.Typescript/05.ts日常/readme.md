# TS日常类型

- 基础类型
- 数组
- any/unknown/noImplicitAny
- 类型标注
- 函数
- 对象类型
- 联合
- 别名
- 接口
- 断言
- 字面类型(Literal Type)
- null and undefined
- 枚举类型

## 基础类型

string, number, boolean, null,undefined

## 数组类型

Array\<T\>，T代表数组中的元素类型。

思考：要求数组中元素类型统一优势是什么？
> 使用数组时，通常都是一个类型，数组中有多个数据类型，可能存在思虑不周的问题


## any/unkown/noImplictAny

```ts
let obj: any = { x: 0 };
// 后续都不会被检查.
// `any`屏蔽了所有类型检查，相当于你相信你对程序的理解是高于TS的
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

*Implict* : 隐式

*explict* : 显式

配置项：noImplicitAny，当你不为变量声明类型时，如果noImplicitAny=false，那么它是any。如果noImplicitAny=true呢？ ——报错

```ts
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK

let value3: boolean = value; // Error

```

思考：为什么要提供`unknown` 
> unknown 是any 的替代品，更安全，影响范围更小，因为unknown是无法扩散的，而any可以扩散到任意地方

## 类型标注

`:` 用于类型标注。

```ts
let myName: string = "Alice";

let myName = "Alice" // ts会隐式判断myName的类型是string
```



## 函数

```tsx

// greet : string -> number (Haskell)
function greet(name: string) : number {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

greet(42) // Error
let x : string = greet("omg") // Error
```



匿名函数的类型

```tsx
const names = ["Alice", "Bob", "Eve"];
// Array<string>

names.forEach(function (s) {
  console.log(s.toUpperCase()); // ts推断这个s是数组
});

names.forEach((s) => {
  console.log(s.toUpperCase()); // 
});
```

知识点：contexture typing（根据上下文猜测匿名函数参数的类型）。例子中会报错，应该是toUpperCase(C大写)。



函数可选参数：

```ts
function print(arg1 : string, arg2 ? : string) {
    console.log(arg1, arg2)
}

print("Hello", "World")
print("Hello")
```



## 对象类型



对象如果描述了类型也需要严格执行。

```ts
const pt : {
    x  : number,
    y : number
} = {x : 100, y : 100}

pt.z = 10000 // Error
```
使用type
```ts
type Point = {
  x  : number,
  y : number
} 
const pt:Point = {x : 100, y : 100}

pt.z = 10000 // Error
```

可选项：

```tsx
function printName(obj : {first : string, last ? string}) {
    
}

printName({first :'Bob'})
printName({first :'Alice', last : "Alisson"})
```

**`?` 表达式**

?代表可能是undefined，但是安全很多。

```ts
const o : {
    a : string,
    b ? : {
        c : string
    }
} = {a : "1"}

console.log(o.b?.c) // undefined
// o.b?.c 是一个右值，不能作为左值使用
o.b?.c = "Hello" // Error
```



## 联合

```tsx

function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
```



联合类型只能使用两个类型的公共操作。

``` ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
}
```


![image-20210712083612040](.\assets\image-20210712083612040.png)

Typescript会针对联合类型做排除法：

```tsx
function printID(id : number | string) {
    if(typeof id === 'number') {
        console.log(id)
        return
    }
    console.log(id.toUpperCase())
}
```



##  类型别名



```ts
type Point = {
  x: number;
  y: number;
};


function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

类型别名也可以使用联合：

```tsx
type ID = number | string
```

注意，别名只是别名，例如：

```tsx
let x : ID = 100
// typeof x === 'number'
```

当然别名可以和它代表的类型一起工作（因为别名不是创建了新的类型）：

```jsx
let id : ID = "abc"
id = 456 // OK

```

## 接口

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

![image-20210712084347246](.\assets\image-20210712084347246.png)

* interface重复定义是合并效果，type重复定义会报错
接口的声明合并(Declaration Merging)

```tsx
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

特别说明：你也可以把这种能力看做是向接口中添加成员的能力。



## 类型断言 (assertion)

有时候Ts对类型的理解没有你多，这个时候你就需要用类型断言：

```tsx
const myCanvas = 
    // HTMLElement
    document.getElementById("main_canvas") as HTMLCanvasElement;
```

通常TS会接收“说的通”的类型断言。

比如: 父类 as 子类， 联合 as 单个。

但是有的类型断言TS会拒绝，比如：

```tsx
const x = 'hello' as number
```

TS会报一个这样的错误：Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

当然有时候你可以用any as T来“欺骗”TS，或者说蒙混过关：

```ts
const a = (expr as unknown) as T;
```



## 字面类型

对于常量，在TS中实际上是Literal Type。

比如:

```tsx
const someStr = "abc"
// someStr的类型是 "abc"，它的值只能是abc

const foo = 1
// foo 的类型是1（而不是整数）。

// 当然这只是ts的理解，如果用typeof 操作符
// typeof someStr // 'string'
// typeof foo // 1

// 对于let
let foo = 1 // foo : number
```

可以用字面类型来约束一些特殊的函数，比如：

```tsx
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

当然下面是一个更加贴近真实场景的例子：

```tsx
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic"); // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

字面类型的一个坑：

```tsx
function handleRequest(url : string, method : "GET" | "POST") {
    // do...
}

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Error : Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

// 1
const req = { url: "https://example.com", method: "GET" as "GET" };

// 2 
handleRequest(req.url, req.method as "GET");

// 3 
const req = { url: "https://example.com", method: "GET" } as const

```

## null / undefined

null和undefined是Javascript的两种基础类型(Primitive type)，它们描述的是不同的行为：

- undefined是一个没有被分配值的变量
- null是一个被人为分配的空值

Typescript有一个配置项，叫做`strictNullChecks` ，这个配置项设置为`on` 的时候，在使用有可能是null的值前，你需要显式的检查。

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

另外， 可以用`!` 操作符(非空断言)，来断言某个值不是空值：

```ts
function doSomething(x: string | null) {
  console.log("Hello, " + x!.toUpperCase());
}
```



## 枚举类型



```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

上面的含义， Down = 2, Left = 3, Right = 4

枚举类型最后会被翻译成整数，因此枚举的很多性质和整数相似。比如Down.toString()会返回2，而不是`Down` 。正因为如此，枚举类型的效率很高。

当然如果你想用字符串类的枚举（个人觉得没有必要），就需要显示的为每一项赋值：

```tsx
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

当然也可以混合，不过非但没有意义，而且会减少代码的可读性：

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

在运行时，Enum会被解释成对象，Enum的每项会被解释成常数。

下面这个例子可以很好的证明。

```tsx
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

f(E)
```

可以用下面这个语法提取Enum中的字符串，这个也叫Reverse Mapping。

```ts
E[E.X] // X
```

