## fundebug

运行时监控系统，Fundebug 可以通过邮件或者第三方工具立即给开发者发送报警，这样能够帮助开发者及时发现并且修复应用 BUG，从而提升用户体验。

## 支持程度

* javascript
* 微信小程序
* 支付宝小程序
* React Native
* Node
* java

## 安装

### react

  安装: `npm install fundebug-javascript`

  安装录屏插件： `npm install fundebug-revideo`
> 录屏插件接入后需要测试，可能会因为某些原因造成页面跳转卡顿，如果出现就不要用录屏了

  使用：
> react16+版本还需要配合错误抓取组件使用

  ```js
    // src/index.js
    var fundebug=require("fundebug-javascript"); //使用fundebug插件
    require("fundebug-revideo"); // 使用录屏插件
    fundebug.init({
        apikey: "API-KEY"
    })

    // ErrorBoundary组件再react16+版本中使用
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // 将component中的报错发送到Fundebug
        fundebug.notifyError(error, {
          metaData: {
            info: info
          }
        });
      }

      render() {
        if (this.state.hasError) {
          return null
          // 也可以在出错的component处展示出错信息
          // return <h1>出错了!</h1>;
        }
        return this.props.children;
      }
    }

    ReactDOM.render( <ErrorBoundary> <App/> </ErrorBoundary>, document.getElementById('root'));
  ```

### 小程序
  
  [微信小程序接入文档](https://docs.fundebug.com/notifier/wxjs/integration/)

  [支付宝小程序接入文档](https://docs.fundebug.com/notifier/aliapp/integration/)

## 常用属性

* apikey - 项目创建后的id
```js
  fundebug.init({
    apikey: "API-KEY",
  });
```

* appversion - 用来设置项目版本号
```js
fundebug.init({
  appversion: "3.2.5"
})
```

* filters - 用来过滤一些用户不需要的错误信息。
```js
fundebug.filters = [
  {
      message: /WeixinJSBridge is not defined/  // 过滤错误信息WeixinJSBridge is not defined
  },
  {
    req: {
      method: /^GET$/    // 过滤get请求
    },
    res: {
      status: /^401$/    //过滤401错误码
    }
  }
];
```
* sampleRate - 设置抽样上报比例
```js
fundebug.init({
  sampleRate : 0.3 // 只抽样上报30%的错误，也意味着可能会出现漏报
})
```
* maxEventNumber - 对单个用户每次的限制发送量-默认10
```js
fundebug.init({
    maxEventNumber: 20
})
```
* maxRevideoSizeInByte - 设置录屏大小,建议最大设置500
```js
fundebug.init({
    maxRevideoSizeInByte: "300"
})
```

* silent  - 用来开启静默模式，fundebug将不会上报任务错误-默认false
```js
fundebug.init({
  silent : true
})
```
如下同理，默认为`false`,设置为`true`后都会不再上报对应数据:

1. silentDev - 不再上报开发环境的错误
2. silentHttp - 不再上报HTTP错误
3. silentConsole - 不再上报console.log 信息,**fundebug会重新console对象，所以在开发期间会出现打印信息为fundebu打印的问题。可用`silentConsole: process.env.NODE_ENV !== 'production'`解决**
4. silentPromise - 不再上报Promise错误
5. silentResource - 不再上报资源加载错误
6. silentBehavior - 不再上报用户行为数据

等等... 其他请翻阅文档


## Script Error

 当`a.com` 引用了 `b.com`（通常是CDN的域名，也有可能是公司内的资源服务器） 的js资源，如果这个js资源内部报出一个异常，那么前端的错误捕获脚本就会检测到一个`Script Error`错误。

 这是由于浏览器基于安全考虑故意隐藏了其它域JS文件抛出的具体错误信息。这样可以有效避免敏感信息无意中被第三方(不受控制的)脚本捕获到，因此，浏览器只允许同域下的脚本捕获具体的错误信息。
 > 如果浏览器允许这里报里报出具体错误信息的话，就会出现用户的敏感信息泄露问题。

 **解决方案**

  可以给脚本添加`crossorigin`,不过会有兼容性问题，不好使
  ```js
  <scrpit src="http://b.com/demo.js" crossorigin></script>
  ```

  当fundebug检测到`Script Error`的时候，其实我们是没有什么好的办法去处理的。目前采取过滤`Script Error`信息的方式。

## status 0

关于http请求会有status为0的情况。常见可能性为：
  
* 非法跨域请求（参见CORS）
* 防火墙阻止或过滤
* 请求本身在代码中被取消
* 已安装的浏览器扩展程序搞砸了 - 例如Firefox 插件 NoScript 可以取消对不受信任主机的 XHR 请求
* 其他乱七八糟的事情，忽略不计了

在报出`status 0`这样的错误时，浏览器控制台通常会伴随有详细的错误信息。只是出于安全考虑，浏览器依然没有让外部js拿到对应的错误数据。

在fundebug中，我们看到`status 0`时，通常伴随其请求时间一起分析：
* status为0，而请求时间很短，且大量出现的情况下，通常为用户端出现了跨域的问题
* status为0，请求时间明显超时，例如大于 5000秒。那就是请求超时
* status 0，请求时间很短，出现次数较少，可以考虑是用户端行为，不予处理

## 一套基础配置
```js
let fundebug = require("fundebug-javascript")
require("fundebug-revideo")
fundebug.init({
  apikey: "your object apikey", // 项目id
  appversion: `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`, // 设置版本号
  silentDev: true,  // 不抓取开发期间错误
  setHttpBody: true, // 抓取http请求的参数数据
  silentConsole: process.env.NODE_ENV !== 'production', // 开发环境关闭fundebug对console对象的改写
  sampleRate: 0.4, // 设置上传采样比例为0.4
  maxRevideoSizeInByte: "500", // 最大记录500kb录屏
  breadcrumbSize: 30, // 用户行为记录30
  filters: [
    {
      message: /Script error/  // 过滤script error
    },
    {
      type: /httpError/,   // 过滤px.effirst.com
      req: {
        url: /px.effirst.com/
      },
    },
    {
      type: /httpError/,    // 过滤tags.growingio.com
      req: {
        url: /tags.growingio.com/
      },
    },
    {
      type: /httpError/,    // 过滤baidu.com
      req: {
        url: /baidu.com/
      },
    },
    {
      type: /httpError/,    // 过滤cnzz.com
      req: {
        url: /cnzz.com/
      },
    },
  ]
})
```
## 更多

[fundebug官方文档](https://docs.fundebug.com/)