## mockjs简介

  Mock.js is a simulation data generator to help the front-end to develop and prototype separate from the back-end progress and reduce some monotony particularly while writing automated tests.

  > Mock.js 是一个模拟数据生成器，帮助前端开发和原型与后端进程分离，减少一些单调，特别是在编写自动化测试时。

## 安装

  yarn : `yarn add mockjs `
  
  npm: `npm i mockjs`

## 示例
  ```js
    var Mock = require('mockjs')
    // 随即模拟list长度1-10，id为递增
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    })
    // 输出结果 -> {list:[]} list长度为1-10随即，id为从1开始的递增
    console.log(JSON.stringify(data, null, 4))
  ```
## 语法规范

  Mock.js 的语法规范包括两部分：

  * 数据模板定义（Data Temaplte Definition，DTD）
  * 数据占位符定义（Data Placeholder Definition，DPD）

### 数据模板

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```js
  // 属性名   name
  // 生成规则 rule
  // 属性值   value
  'name|rule': value
```

**注意：**
  * 属性名 和 生成规则 之间用 | 分隔。
  * 生成规则 是可选的。
  * 生成规则 有 7 种格式：
    1. `'name|min-max': value`
    2. `'name|count': value`
    3. `'name|min-max.dmin-dmax': value`
    4. `'name|min-max.dcount': value`
    5. `'name|count.dmin-dmax': value`
    6. `'name|count.dcount': value`
    7. `'name|+step': value`
  * 生成规则 的 含义 需要依赖 属性值 才能确定。
  * 属性值 中可以含有 @占位符。
  * 属性值 还指定了最终值的初始值和类型。

**生成规则和示例：**

  * 属性值（value）是字符串 String
    * 'name|min-max': 'value' 通过重复 'value' 生成一个字符串，重复次数大于等于 min，小于等于 max。
    * 'name|count': 'value' 通过重复 'value' 生成一个字符串，重复次数等于 count。
    ```js
      Mock.mock({ 'name|2': 'value' }) // {name:valuevalue}
    ```

  * 属性值（value）是数字 Number
    * 'name|+1': 100 属性值自动加 1，初始值为 100
    * 'name|1-100': 100 生成一个大于等于 1、小于等于 100 的整数，属性值 100 只用来确定类型。
    * 'name|1-100.1-10': 100 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位。
    ```js
      {
          'number1|1-100.1-10': 1,
          'number2|123.1-10': 1,
          'number3|123.3': 1,
          'number4|123.10': 1.123
      }
      // =>
      {
          "number1": 12.92,
          "number2": 123.51,
          "number3": 123.777,
          "number4": 123.1231091814
      }
    ```

  * 属性值（value）是布尔型 Boolean 
    * 'name|1': value 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率是 1/2。
    * 'name|min-max': value 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
    ```js
      Mock.mock({ 'name|1': true }) // {name:true} //true或者false的概率一半一半
    ```

  * 属性值（value）是对象 Object
    * 'name|min-max': {} 从属性值 {} 中随机选取 min 到 max 个属性。
    * 'name|count': {} 从属性值 {} 中随机选取 count 个属性。
    ```js
      Mock.mock({ 'name|1': { a: 1, f: 1, b: 2, v: 3 } }) // {name:{ a:1 }} 随机一个a\f\b\v属性
    ```

  * 属性值（value）是数组 Array
    * 'name|1': [{}, {} ...] 从属性值 [{}, {} ...] 中随机选取 1 个元素，作为最终值。
    * 'name|min-max': [{}, {} ...] 通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数大于等于 min，小于等于 max。
    * 'name|count': [{}, {} ...] 通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数为 count。

  * 属性值（value）是数组 Function
    * 'name': function(){} 执行函数 function(){}，取其返回值作为最终的属性值，上下文为 'name' 所在的对象。
    ```js
      function test() {
        return 2
      }
      data = Mock.mock({ 'name': test() }) // {name:2}
    ```

### 数据占位符

  占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。占位符 的格式为：
  ```js
    @占位符
    @占位符(参数 [, 参数])
  ```
  **注意：**
  * 用 @ 来标识其后的字符串是 占位符。
  * 占位符 引用的是 Mock.Random 中的方法。
  * 通过 Mock.Random.extend() 来扩展自定义占位符。
  * 占位符 也可以引用 数据模板 中的属性。
  * 占位符 会优先引用 数据模板 中的属性。
  
  **大写占位符是建议的编码风格，以便在阅读时从视觉上提高占位符的识别度，快速识别占位符和普通字符。**
  ```js

    {
        name: {
            first: '@FIRST',
            middle: '@FIRST',
            last: '@LAST',
            full: '@first @middle @last'
        }
    }
    // =>
    {
        "name": {
            "first": "Charles",
            "middle": "Brenda",
            "last": "Lopez",
            "full": "Charles Brenda Lopez"
        }
    }
  ```

## 实用API

  列举一些前端常用的API，更多的请查看文档

### Mock.mock( rurl?, rtype?, template|function(options) )

  `Mock.mock( template )`

  根据数据模板生成模拟数据。

  `Mock.mock( rurl, template )`

  记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。

  **参数的含义和默认值如下所示：**

  参数 rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'。
  参数 rtype：可选。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
  参数 template：可选。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
  参数 function(options)：可选。表示用于生成响应数据的函数。
  参数 options：指向本次请求的 Ajax 选项集。

### Mock.Random

  Mock.Random 是一个工具类，用于生成各种随机数据。Mock.Random 的方法在数据模板中称为“占位符”，引用格式为 `@占位符(参数 [, 参数])` 。例如：
  ```js
    var Random = Mock.Random;
    Random.email() // => "n.clark@miller.io"
    Mock.mock('@EMAIL') // => "y.lee@lewis.org"
    Mock.mock( { email: '@EMAIL' } ) // => { email: "v.lewis@hall.gov" }
  ```
  Mock.Random 提供的完整方法（占位符）如下：

  | Type          | Method                                                                                |
  | ------------- | ------------------------------------------------------------------------------------- |
  | Basics        | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
  | Image         | image, dataImage                                                                      |
  | Color         | color                                                                                 |
  | Text          | paragraph, sentence, word, title                                                      |
  | Name          | first, last, name                                                                     |
  | Web           | url, domain, email, ip, tld                                                           |
  | Address       | area, region                                                                          |
  | Helpers       | capitalize, upper, lower, pick, shuffle                                               |
  | Miscellaneous | guid, id                                                                              |
  

  Mock.Random 中的方法与数据模板的 @占位符 一一对应，在需要时可以为 Mock.Random 扩展方法，然后在数据模板中通过 @扩展方法 引用。例如：
  ```js
    Random.extend({
      constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      constellation: function(date){
          return this.pick(this.constellations)
      }
    })
    Random.constellation()
    // => "水瓶座"
    Mock.mock('@CONSTELLATION')
    // => "天蝎座"
    Mock.mock({ constellation: '@CONSTELLATION'})
    // => { constellation: "射手座" }
  ```

## 更多

  [mockjs官方文档](http://mockjs.com) 
  [mockjs的ajax拦截示例](http://jsfiddle.net/jru0zfo7/3/)
