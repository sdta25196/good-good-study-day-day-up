## microdiff 简介

Microdiff 是一个小型（目前<1kb）、快速、零依赖对象和数组比较库。它比大多数其他深度比较库要快得多，并且具有完整的 TypeScript 支持。

## 使用
```js
  import diff from "microdiff";

  const obj1 = {
    originalProperty: true,
  };
  const obj2 = {
    originalProperty: true,
    newProperty: "new",
  };

  // 输出一个数组，里面是两个对象不一样的键值对
  console.log(diff(obj1, obj2)); // [{type: "CREATE", path: ["newProperty"], value: "new"}]  
```

## type

  * CREATE - 第一个没有第二个有的key
  * CHANGE - 第一个和第二个都有，但是值不一样
  * REMOVE - 第一个对象有，第二个对象没有

## 对数组的支持

可以传两个数组进行对比，如果传数组的话，path就是数组的下标

```js
  console.log(diff([10, 2, 3, 4, 5], [1, 2, 3, 4]));
  // 会得到如下数据 
  // [
  //   { path: [ 0 ], type: 'CHANGE', value: 1 },
  //   { type: 'REMOVE', path: [ 4 ] }
  // ]
```

## 为啥要用这个呢

  Ramda等很多库也是可以做判断的：
  ```js
    let c = {
      d: 1,
      c: 2
    }
    const obj1 = {
      originalProperty: true,
      d: c
    };
    const obj2 = {
      originalProperty: true,
      d: {
        d: 2,
        c: 2
      }
    };
    console.log(R.equals(obj1, obj2)) // false
    console.log(R.equals([1, 2, 3, 4], [7, 6, 5, 4, 3])) // false
  ```

  使用microdiff的理由是更轻量级，更专注。

## 更多

[microdiff 仓库](https://github.com/sdta25196/microdiff)
