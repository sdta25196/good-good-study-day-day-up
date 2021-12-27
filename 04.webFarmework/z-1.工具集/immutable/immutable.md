## 简介

Immutable collections for JavaScript

> JavaScript 的不可变集合

javaScript中，引用对象一般是可变的，通常我们使用用`deepCopy`解决原数据跟随新数据改变的问题。

而使用Immutable，数据一旦创建，就是一个不可变集合，所有会改变集合的方法都会返回一个新的不可变集合，也就不需要deepCopy。

```js
  function touchAndLog(touchFn) {
    let data = { key: 'value' };
    touchFn(data);
    console.log(data.key); // 猜猜会打印什么？
  }
```
上面代码中，data是Mutable的话，由于不知道`touchFn`对data做了什么，所以无法得知最终会打印什么，但是如果data是Immutable的,就可以很明确的知道打印的是`value`

Immutable 带来的优点是降低了Mutable带来的复杂度，Mutable的数据耦合了Time和Value的概念，数据很难回溯。而Immutable的不可变性，解决了这个问题

Immutable 最大的缺点是`侵入性极强`。

## 安装

  `yarn add immutable`

## 代码示例

  > 小技巧：为了不与原生API混淆，这里使用`as`设置别名

### Map() 包裹对象

```js
  import { Map as ImmutableMap } from 'immutable'
  const map1 =ImmutableMap({ a: 1, b: 2, c: 3 }); 
  const map2 = map1.set('b', 50); 
  console.log(map2.get('b')); // 2
  console.log(map1.get('b')); // 50
```

### List() 包裹数组

```js
  import { List as ImmutableList } from 'immutable'
  const list1 =ImmutableList ([ 1, 2 ]);
  const list2 = list1.push(3, 4, 5);  // [1,2,3,4,5]
  const list3 = list2.unshift(0);    // [0,1,2,3,4,5]
  const list4 = list1.concat(list2, list3); // [1,2,3,4,5,0,1,2,3,4,5]
```
> push, set, unshift or splice 都可以直接用，返回一个新的immutable对象

### merge() 连接对象 | concat() 连接数组
```js
  import { Map as ImmutableMap, List as ImmutableList } from 'immutable'
  const map1 =ImmutableMap({ a: 1, b: 2, c: 3, d: 4 });
  const map2 =ImmutableMap({ c: 10, a: 20, t: 30 });
  const obj = { d: 100, o: 200, g: 300 };
  const map3 = map1.merge(map2, obj); // Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
  const list1 = ImmutableList([ 1, 2, 3 ]);
  const list2 = ImmutableList([ 4, 5, 6 ]);
  const list3 = list1.concat(list2, array); // List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### toJS() 把immutable对象转换为js对象
```js
  import { Map as ImmutableMap, List as ImmutableList } from 'immutable'
  const deep =ImmutableMap({ a: 1, b: 2, c:ImmutableList ([ 3, 4, 5 ]) });
  console.log(deep.toObject());   // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
  console.log(deep.toArray());    // [ 1, 2, List [ 3, 4, 5 ] ]
  console.log(deep.toJS());       // { a: 1, b: 2, c: [ 3, 4, 5 ] }
  JSON.stringify(deep);           // '{"a":1,"b":2,"c":[3,4,5]}'
```

### fromJS() 包裹 js对象转换为immutable对象
```js
const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
console.log(nested2.getIn([ 'a', 'b', 'd' ])); // 6
//如果取一级属性 直接通过get方法，如果取多级属性 getIn(["a","b","c"]])

// setIn 设置新的值
const nested3 = nested2.setIn([ 'a', 'b', 'd' ], "kerwin");
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: "kerwin" } } }

// updateIn 回调函数更新
const nested3 = nested2.updateIn([ 'a', 'b', 'd' ], value => value + 1);
console.log(nested3);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }
const nested4 = nested3.updateIn([ 'a', 'b', 'c' ], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```

### 判断相等性

immutable应当被视为**值**，而不是对象.

所以对于引用对象需要用`Immutable.is() `或者` .equals() `来判断相等性，而不是用`===`

```js
  import { Map as ImmutableMap } from 'immutable'
  const map1 = ImmutableMap({ a: 1, b: 2, c: 3 });
  const map2 = ImmutableMap({ a: 1, b: 2, c: 3 });
  console.log(map1.equals(map2)); // true
  console.log(map1 === map2); // false
```

注意：Immutable.js 避免为值没有发生变化的更新创建新对象，以允许有效的引用相等性检查来快速确定是否没有发生变化。
如下操作，是可以用`===`运算符的

```js
  import { Map as ImmutableMap } from 'immutable'
  const map1 = ImmutableMap({ a: 1, b: 2, c: 3 });
  const map2 = map1.set('b', 2); // Set to same value
  console.log(map1.equals(map2)); // true
  console.log(map1 === map2); // true
```

注意2：两次操作是互相独立的，如下`map2`和`map3`用`===`会返回`false`

```js
  import { Map as ImmutableMap, is } from 'immutable'
  const map1 = ImmutableMap({ a: 1, b: 2, c: 3 });
  const map2 = map1.set('b', 3); // Set to same value
  const map3 = map1.set('b', 3); // Set to same value
  console.log(map3 === map2);  // false
  console.log(is(map2, map3)); // true
  console.log(map2.equals(map3)) // true
```

### 深度嵌套

  > 常用的有`mergeDeep`，`getIn`，`setIn`，和`updateIn`

```js
  const { fromJS } = require('immutable');
  const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });

  const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
  // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

  console.log(nested2.getIn(['a', 'b', 'd'])); // 6

  const nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
  console.log(nested3);
  // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

  const nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
  // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```

### Lazy Seq

Seq描述了一个惰性操作，允许通过不创建中间集合来有效地链接所有高阶集合方法（例如map和filter）的使用。

* Seq 是不可变的
* Seq 是惰性的

一旦Seq被使用，它就只执行必要的工作。在这个例子中，没有创建中间数组，filter 被调用了 3 次，map 只被调用了一次：

```js
  const { Seq } = require('immutable');
  const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
    .filter(x => x % 2 !== 0)
    .map(x => x * x);
  oddSquares.get(1) // 9
```

## 更多

  [immutable 官网](https://immutable-js.com/)