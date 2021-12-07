# 函数的补充



主要内容

- 构造函数如何表达？
- 泛型和函数
- 可选参数
- 重载
- 操作符重载

## 构造函数的表达



```tsx

type SomeConstructor = {
    new (s: int): String 
}
function fn(ctor: SomeConstructor) {
    return new ctor("hello")
}

const str = fn(String )
console.log(str) // hello

```

## 泛型函数

```ts
function firstElement<Type>(arr: Type[]): Type {
  return arr[0]
}
```

Why not ?

```ts
function firstElement(arr: any): any {
  return arr[0]
}

```

###  关于推导

```tsx
// map : a -> b
function map<Input, Output>(
  arr: Input[], 
  func: (arg: Input) => Output): Output[] {      
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n))
// [1,2,3]
```

###  泛型约束



一个巨坑：

```tsx
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
    // return obj.constructor()
  //Type '{ length: number; }' is not assignable to type 'Type'.
  //'{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
  }
}


```

Why?

- 泛型约束：Type 有 length 属性
- 但有{ length } ， 不代表是Type



### 手动指定类型

```tsx
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.


```

这种时候可以手动指定类型：

```tsx
const arr = combine<string | number>([1, 2, 3], ["hello"])
```



### 运用泛型的一些规范



对比这一组，哪个更好？

```tsx
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
```

划重点：利用好推导(infer)能力，避免用any。



对比下一组，哪个更好？

```tsx
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

划重点：减少泛型参数的使用（除非有必要）

再举个例子，下面这个程序好吗？

```tsx
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
```



## 可选参数



用`?` 描述函数的可选参数。

```tsx
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

思考上面程序设计的目的是什么？

对比：

- onClick 
- onMouseMove

等的实现。



注意使用过程中：

```tsx
myForEach([1,2,3], (item, i) => {
    console.log(i?.toFixed())
})
```



## 函数的重载(overloading)



思考下面这段程序：

```tsx
function add<T> (a : T, b : T ){
    return a  + b
}

// Operator '+' cannot be applied to types 'T' and 'T'.

// a,b不一定可以相加
```



修改办法：

```ts

	function isSet<T>(x : any) : x is Set<T> {
		return x instanceof Set
	}	

  // 函数的重载：可以声明多个函数，然后只实现一个，必须写在一起
  function add(a : number, b : number) : number;
	function add(a : string, b : string) : string;
	function add<T>(a : Set<T>, b : Set<T>) : Set<T>;
	function add<T>(a : T, b : T) : T{
			if(isSet<T>(a) && isSet<T>(b)){
				return new Set([...a, ...b]) as any
			}
			return (a as any) + (b as any)
	}
  


	const a = new Set<string>(["apple", "redhat"])
	const b = new Set<string>(["google", "ms"])
	console.log(add(a, b))
	console.log(add(1, 2))
	console.log(add("a", "k")
```

**划重点：利用重载约束跨类型方法的使用**

思考：如果……

```tsx
function add(a : any, b : any) : any {
    //
}
```

## 操作符重载

[参考资料 babel-plugin-overload-operator](https://www.npmjs.com/package/babel-plugin-overload-operator)



## THIS

```ts
interface DB {
    exec(sql : string) => any
}

function runSql(this : DB, sql : string){
    this.exec(sql)
}

runSql.bind(new DB()).("select * from user")
```



## void vs unknown

函数不返回参数用`void` ，返回的值类型不确定用`unkown` 



下面的3个定义会报错吗？

```tsx
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
}
```

思考`Array.prototype.push`的返回值?



```tsx
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
    
 // Object is of type 'unknown'.
}
```

unknown可以让代码更安全。

思考为什么会这样写下面的程序？

```tsx
function safeParse(s: string): unknown {
  return JSON.parse(s);
}


```

思考为什么会这样写程序？ 

```tsx
function fail(msg: string): never {
  throw new Error(msg)
}
```

## rest params

```tsx
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```



## 总结



填空题： 泛型帮助我们__________让类型检查更加严格,更加智能___________？ 