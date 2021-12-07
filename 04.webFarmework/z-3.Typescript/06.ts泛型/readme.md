# 泛型



泛型这一讲提前了！主要是，学完这节就可以做事了。



## 泛型的概念



泛型， 或者说提取了一类事物的共性特征的一种抽象。比如说，松树、柳树都是树，在程序里有3种表达：

- 接口(Interface)
- 继承(Inheritance)
- 泛型(Generics)

**继承是一种强表达。**

松树继承于树，松树同时也是木材。这样关系的表达，要么让松树多重集成（树、木材），要么松树<-树<-木材。

无论哪种，增加程序设计复杂度，也加强了**继承关系的维护成本**（或者说耦合）。这么看，关系太强，反而不好！

**接口是一种方面(Aspect)描述**。比如松树可以生长，那么松树是：Growable；动植物都可以进化，那么它们是Evolvable。

一个类型可以拥有多个方面的特性。

**泛型(Generics)**是对共性的提取（不仅仅是描述）。

```ts
class BedMaker<T> {
    //....
    make(){
        
    }
}


const A = new BedMaker<红木>()
const B = new BedMaker<桃木>()


```

- 木头可以制造床，但是不是所有的木头可以制造床
- 制造床()这个方法，放到木头类中会很奇怪，因为木头不仅仅可以制造床
- 同理，让木头继承于“可以制造床”这个接口也很奇怪

奇怪的代码展示：

```tsx
class 红木 implements IMakeBed{
    makeBed(){...}
}
```

设计`IMakeBed` 的目标是为了拆分描述事物不同的方面(Aspect)，其实还有一个更专业的词汇——关注点（Interest Point)。拆分关注点的技巧，叫做关注点分离。如果仅仅用接口，不用泛型，那么关注点没有做到完全解耦。

**划重点：**泛型是一种**抽象共性**（本质）的编程手段，它允许将**类型作为其他类型的参数**（表现形式），从而**分离不同关注点的实现**（作用）。

Array\<T\> 分离的是数据可以被线性访问、存储的共性。Stream\<T\>分离的是数据可以随着时间产生的共性。Promise\<T\>分离的是数据可以被异步计算的特性。

## Hello泛型

```tsx
// 一个identity函数是自己返回自己的函数
// 当然可以声明它是：number -> number
function identity(arg: number): number {
  return arg;
}

// 为了让identity支持更多类型可以声明它是any
function identity(arg: any): any {
  return arg;
}


// any会丢失后续的所有检查，因此可以考虑用泛型
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("MyString")
// 不用显示的指定<>中的类型
// let output = identity("MyString")

output = 100 // Error
```



- <>叫做钻石操作符，代表传入的类型参数



## 泛型类



泛型类的例子。

```tsx
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
// (number, number) -> number
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
```

当然推荐将声明（Declaration）和定义(Definition)写到一起：

```tsx
class GenericNumber<T> {
    zeroValue : T
    
    constructor(v : T){
        this.zeroValue = v
    }
    
    add(x : T, y : T) {
        return x + y
    }
}
```



## 泛型约束(Generic Constraints)

下面的程序会报错：

```tsx
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

考虑为arg增加约束：
> 凡是调用loggingIdentity的时候 参数一定有length

```tsx
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); 
  return arg;
}
```

小技巧**keyof 操作符**

可以用keyof关键字作为泛型的约束。

```tsx
type Point = { x: number; y: number };
type P = keyof Point;
// P = "x" | "y"
```

如下面这个例子：

```tsx
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}


let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

为什么可以这么做？

对TS而言所有对象的key是静态的。

```ts
const a = {x : 1, y : 2}
a.z = 3 // Error
```

因为是静态的，所以可以用`keyof` 操作符求所有的key。如果一个对象的类型是`any` ，那么keyof就没有意义了。 



## 实例化泛型类型(将类作为参数)

```ts

function create<Type>(c: { new (): Type }): Type {
  return new c();
}

create(Foo) // Foo的实例
```

一个不错的例子：

```tsx
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```



## 总结



思考：什么时候用接口？什么时候用泛型？
> 约束一个类型的行为使用接口，泛型提取许多类型的共性，做成一个模板

> 我们想要约束一个类的行为的时候，使用接口

> 我们想要抽取共性抽象成一个泛型的时候，使用泛型

思考：将类型作为参数传递，并实例化有哪些应用场景？
> React.createClass("")
