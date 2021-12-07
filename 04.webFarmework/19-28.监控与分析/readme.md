如果一个产品经理整天盯着数据看，那说明他不够优秀 —— 张小龙
> 数据 + 对用户的理解，才能够得出相对准确的信息分析

# 用户行为日志分析
  
  业内标杆:GA**google Analytics**,体验+实时性做的更好

  国内有:友盟 growingIO 百度等，各种统计工具间因为实现细节不一样，所以会有差异性，具体谁更准确，这个就说不准了

## PC端做用户唯一性统计-UV
  1. random + ip
   > 使用 `Math.random()`  + 后台获取IP地址，
    `Math.random()` 的重复几率大概在亿分之一，random + ip 几乎不会出现重复

  2. 设备指纹-浏览器指纹
  
  > [fingerprintjs](https://fingerprintjs.com/)

## pv 
  nginx日志 统计到的pv会比统计工具更准

## 用简单的指标去分析复杂的事情

  简单的数据，通过技术的复杂分析，得出简单的结论
  > 复杂技术分析是专业化的，又专业的人员做，其他需要看到相关数据的人，只看简单的数据与结果即可

  例如：给**每个页面**添加 FCP统计，长期观察分析。
  
  常用分析：跳出率、FCP、白屏
  
  可以使用`web-vitals` 加 `growingIO` 配合进行统计

## ip地址与地理位置
  ip地址与地理位置可以进行反查，[淘宝ip查询](https://ip.taobao.com/)提供了restAPI,可以进行ip查询

  > ipv4 有43亿IP，中国大陆有3亿...

## 流量来源

  流量来源的统计是使用`document.referrer`
  
  document.referrer如果是触发重定向的，那么就是空例如：
  `window.open('http://gkcx.eol.cn')`,网址的http会重定向到https,此时`https://gkcx.eol.cn`中`document.referrer`就是空

# 用户行为工具的实现

日志收集 -> 服务端处理日志 -> 存到数据库 -> 可视化引擎呈现
  1. 日志收集端 ： 埋点 -> 上传server端
  2. 日志原收集工具 ： server端把埋点收集的日志写到文件，交给Filebeat\logstash处理
  3. ElasticSearch ： 日志经过处理后存在es中，es是一个文档数据库，方便搜索、聚合运算，特点就是快
  4. 可视化引擎：kibana\Grafana
   
> 需要使用到docker compose文件，[compose详解](https://www.jianshu.com/p/2217cfed29d7)



# 异常收集

## sentry

  sentry可以自己部署一套，有待研究

  docker里面有sentry镜像

## 投放效果统计

  1. 添加参数代表来源
  
  > `https://gkcx.eol.cn?channel=wx`  

  2. SPM模型，更细腻的统计
   
  > `https://gkcx.eol.cn?spm=a.b.c.d`
  * a：来源站点
  * b：页面
  * c: 页面区块
  * d: 区块内点位

  实现：自定义一个library, 在页面元素上添加自定义属性，lib去监听此类属性的相关事件，自动计算添加spm参数
  ```html
    <div data-spm-section='c' >
      <button> 点击触发lib计算</button>
    </div>
  ```
## 可视化工具
  [Echarts](https://echarts.apache.org/zh/index.html)

  [D3](d3js.org)


## 错误收集方式
* `window.addEventListener('error')`
  * error 可以监听所有同步、异步的运行时错误，但无法监听语法、接口、资源加载错误。
* `window.addEventListener('unhandledrejection')`
  * unhandledrejection 可以监听到 Promise 中抛出的，未被 .catch 捕获的错误。