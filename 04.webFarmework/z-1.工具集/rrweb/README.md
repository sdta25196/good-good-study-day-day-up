## rrweb介绍

rrweb是由smartx开源的web录制、回放基础库。它可以将⻚⾯中的 DOM 以及⽤户操作保存为可序列化的数据，以实现远程回放。

## rrweb应用场景

* 记录⽤户使⽤产品的⽅式并加以分析，进⼀步优化产品
* 复现用户使用中遇到bug时的操作路径
* 录制体积更小、更清晰的产品演示
## 实现思路

1. 开始录制时保存一次完整的dom结构快照;

2. 随后对用户每次引发视图变化的操作进行记录，称为Oplog;

  > 此处抽象了引发试图变更的操作，分为如下几种：

    * DOM 变动
    * 节点创建、销毁
    * 节点属性变化
    * ⽂本变化
    * ⿏标交互
    * ⻚⾯或元素滚动
    * 视窗⼤⼩改变
    * 输⼊
    * ⿏标移动（特指⿏标的视觉位置）

3. 通过MutationObserverAPI，进行DOM变化的监听

通过上述操作可得到快照和一推操作记录，然后再进行回放的实现：

1. 在⼀个沙盒环境中将快照重建为对应的 DOM 树。

2. 将 Oplog 中的操作按照时间戳排列，放⼊⼀个操作队列中。

3. 启动⼀个计时器，不断检查操作队列，将到时间的操作取出重现。

## 应用

安装`yarn add rrweb@1.1.3`

项目中使用: `import { record } from 'rrweb'`

### 录制

录制调用：`record`，实时保存event即可

```js
  record({
      emit(event) {
        setEvents(e => {
          e.push(event)
          return e
        })
      }
  });
```
### 回放

npm安装回放器`npm install --save rrweb-player`,切记需要引入css。

引入回放
```js
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

new rrwebPlayer({
  target: document.body, // 可以自定义 DOM 元素
  // 配置项
  props: {
    events,
  },
});
```

### 示例：
```js
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { record } from 'rrweb'
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function App() {
  const [start, setStart] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (start) {
      record({
        emit(event) {
          setEvents(e => {
            e.push(event)
            return e
          })
        }
      });
    }
  }, [start])

  const replay = () => {
    console.log(events)
    const replayer = new rrwebPlayer({
      target: document.querySelector('#replayBox'), // 可以自定义 DOM 元素
      // 配置项
      props: {
        events,
      },
    });
    replayer.play();
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input />
      <div className="card">
        <button onClick={() => setStart(state => !state)}>
          点击{!start ? '开始' : '停止'}录制
        </button>
        <button onClick={replay}>
          点击开始回放
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
```


## 更多

* [rrweb官网](https://www.rrweb.io/)
* [rrweb中文文档](https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md)
* [rrweb作者SmartX在知乎的文章](https://zhuanlan.zhihu.com/p/60639266)