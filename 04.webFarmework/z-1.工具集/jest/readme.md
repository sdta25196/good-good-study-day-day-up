# jest

## 安装
`yarn add jest` 

## 示例
```js
  const { add } = require('../src/a')
  test("测试", () => {
    expect(add(2)).toBe(4)
  })
```

## 执行

`jest` 执行jest会自动测试**test**文件夹下所有测试文件`*.test.js`

`jest file_name`  执行jest file_name ，会自动测试**test**文件夹下的测试文件`file_name`

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