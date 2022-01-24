# jest

## 安装
`yarn add jest` 

## 示例

// src/a.js
```js
  function add(num){return num+2}
  module.exports.add = add
```
// test/a.test.js
```js
  const { add } = require('../src/a')
  test("测试", () => {
    expect(add(2)).toBe(4)
  })
```

## 执行

`jest` 执行jest会自动测试**test**文件夹下所有测试文件`*.test.js`

`jest a.test.js`  执行jest a.test.js ，会自动测试**test**文件夹下的测试文件`a.test.js`

## 配合ts

ts需要配合babel使用

package.json
```js
  "devDependencies": {
    "@babel/preset-env": "^7.15.0",
    "@babel/preset-typescript": "^7.15.0",
    "@types/jest": "^27.0.1",
    "ts-jest": "^27.0.5",
    "jest": "^27.4.7",
    "typescript": "^4.5.4"
  }
```

babel.config.js
```js
  module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
  };
```
安装好依赖、写好配置文件之后，就可以相应的编写`test/x.test.ts`来进行测试了

## 配置文件
  
  `jest --init` 可自动生成配置文件
  
  `jest my-test --notify --config=config.json` 也可以使用自定义的配置文件
  
  
## 匹配器

  `expect(2 + 2).toBe(4);` 匹配器

  `expect(2 + 2).not.toBe(4);` 匹配器的反义

  * toBe 用于Object.is测试完全相等
  * toBeCloseTo 用于对比浮点数，由于计算误差，不可用toBe
  * toEqual 检查对象的值完全相等
  * toBeNull 仅匹配 null
  * toBeUndefined 仅匹配 undefined
  * toBeDefined 是相反的 toBeUndefined
  * toBeTruthy 匹配if语句视为真实的任何内容
  * toBeFalsy 匹配任何被if语句视为假的东西
  * toMatch 可用正则表达式匹配字符串
  * toContain 检查数组或可迭代对象是否包含特定项toContain
  * toThrow  测试特定函数在调用时是否抛出错误

  [匹配器文档](https://www.jestjs.cn/docs/expect)

## 关于异步代码的测试

1. 带回调函数的函数，我们可利用test回调函数中的`done`参数，来实现手动控制代码直接结束。

> 如果不使用done,代码就直接结束并测试通过了。。然后jest会提示一个警告

```js
function fetchData(callback) {
  return setTimeout(() => {
    callback('peanut butter')
  }, 2000)
}
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback)
});
```

2. 可使用promise

```js
  function fetchData() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve(1)
      }, 2000)
    })
  }
  test('the data is peanut butter', () => {
    return fetchData().then(data => {
      expect(data).toBe('peanut butter');
    });
  });
```

3. async\await

```js
  function fetchData() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve(1)
      }, 2000)
    })
  }
  test('the data is peanut butter', async () => {
    let data = await fetchData()
    expect(data).toBe('peanut butter');
  });
```

## 测试钩子

`beforeEach` 所有测试执行前，都会执行

`afterEach` 所有测试执行后，都会执行

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

// test.....
```

`beforeAll` \ `afterAll` 只会调用一次，可使用`describe`来限制`beforeAll` \ `afterAll`的生效范围

## test.only

使用`test.only`可以只测试一个测试代码。使用`jest`时，只测试`test.only`的测试代码


## 更多

  * [jest中文文档](https://www.jestjs.cn/docs/getting-started)