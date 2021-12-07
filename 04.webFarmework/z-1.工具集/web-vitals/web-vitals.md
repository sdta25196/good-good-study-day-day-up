## web-vitals简介

web-vitals 是google chrome团队开发，用来协助开发者优化网站性能得工具，它会按照chrome的评判标准，直观的返回一些性能指标

> react的脚手架cra中，默认安装了这个库

## 安装
npm: `npm i web-vitals`
yarn: `yarn add web-vitals`
  
### 使用cdn引入
  * 使用外部模块加载
  ```javascript
    import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  ```

  * 使用外部脚本加载
  ```javascript
    (function() {
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals/dist/web-vitals.iife.js';
      script.onload = function() {
        webVitals.getCLS(console.log);
        webVitals.getFID(console.log);
        webVitals.getLCP(console.log);
      }
      document.head.appendChild(script);
    }())
  ```



## 基本用法

### 示例 
  ```javascript
    import {getLCP, getFID, getCLS} from 'web-vitals';

    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  ```
### 性能指标对象
  web-vitals会返回一个对象参数：`{name: 'FCP', value: 606.9000000059605, delta: 606.9000000059605, entries: Array(1), id: 'v2-1634885149588-6955293147726'}`
  * name - 指标名称
  * value - 指标数据
  * delta - 指标触发事件 （如果设置报告的第二个参数为true,就会发现这条参数改变了）
  * id - 指标记录的id
  * entries: polyfill用到的参数，平时用不到

## polyfill使用方法
  1. 导入`web-vitals/base`
  ```javascript
    import {getLCP, getFID, getCLS} from 'web-vitals/base'
    
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  ```
  2. html的`head`标签中加入polyfill，必须是第一个脚本
  ```html
    <!DOCTYPE html>
    <html>
      <head>
        <script>
          // 此处使用polyfill代码，地址：https://unpkg.com/web-vitals/dist/polyfill.js
        </script>
      </head>
      <body>
        ...
      </body>
    </html>
  ```

## 注意事项
  * 如果用户从不与页面交互，则不会报告 FID。
  * 如果页面是在后台加载的，则不会报告 FCP、FID 和 LCP。
  * 当用户点击浏览器的前进/后退按钮恢复了访问的时候，会重新报告 CLS、FCP、FID 和 LCP。
  * 不可以重复调用任意Web Vitals 函数（例如getCLS()、getFID()、getLCP()）, 会造成内存泄露。

## 一次发送多个报告
  不需要单独报告每个单独的 Web Vitals 指标，可以通过在单个网络请求中批量处理多个指标报告来最大限度地减少网络使用。

  但是，由于并非所有 Web Vitals 指标都同时可用，而且并非所有指标都报告在每个页面上，因此不能简单地推迟报告，直到所有指标都可用。

  所以我们应该保留所有报告的指标的队列，并在页面后台运行或卸载时发送报告

  **示例如下**
  ```javascript
    import {getCLS, getFID, getLCP} from 'web-vitals';

    const queue = new Set();
    function addToQueue(metric) {
      queue.add(metric);
    }

    function flushQueue() {
      if (queue.size > 0) {
        // 序列化数据
        const body = JSON.stringify([...queue]);

        // 发送报告
        fetch('/analytics', {body, method: 'POST', keepalive: true});

        queue.clear();
      }
    }

    getCLS(addToQueue);
    getFID(addToQueue);
    getLCP(addToQueue);

    // 当页面被后台处理或卸载时，报告所有可用的指标。  
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushQueue();
      }
    });

    // Safari不能可靠地触发' visibilitychange '事件  
    // 如果需要Safari支持，还应该在'pagehide'事件中提交报告。  
    addEventListener('pagehide', flushQueue);
  ```

## 配套设施
  
  **web-vitals-report**是一个免费的开源工具，您可以使用它来创建已发送到 Google Analytics 的 Web Vitals 数据的可视化
  
  [web-vitals-report官方网址](https://github.com/GoogleChromeLabs/web-vitals-report)

  **GA** google的分析工具，目前业内做的最好的分析工具

  [Google Analytics官方网址](https://analytics.withgoogle.com/)

## 兼容性
  
  可兼容所有主流浏览器以及ie9

## 限制

  缺乏对 `iframe`标签的支持，不能分析页面中iframe的性能

## 更多

  [web-vitals官方网址](https://www.npmjs.com/package/web-vitals)

  [polyfill地址](https://unpkg.com/web-vitals/dist/polyfill.js)