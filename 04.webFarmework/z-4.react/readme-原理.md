## Concurrent Mode

在运行时的主要瓶颈就是 CPU、IO ，如果能够破这两个瓶颈，就可以实现应用的保持响应。

* 在 CPU 上，我们的主要问题是，在 JS 执行超过 16.6 ms 时，页面就会产生卡顿，那么 React  的解决思路，就是在浏览器每一帧的时间中预留一些时间给 JS 线程，React 利用这部分时间更新组件。当预留的时间不够用时，React 将线程控制权交还给浏览器让他有时间渲染UI，React 则等待下一帧再继续被中断的工作。

> 其实，上面我们提到的，这种将长任务分拆到每一帧中，每一帧执行一小段任务的操作，就是我们常说的时间切片。

* 那么在 IO 上面，需要解决的是发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应的问题。React 希望通过控制组件渲染的优先级去解决这个问题。

实际上，Concurrent Mode 就是为了解决以上两个问题而设计的一套新的架构，重点就是，**让组件的渲染 “可中断” 并且具有 “优先级”** ，其中包括几个不同的模块，他们各自负责不同的工作。首先，我们先来看看，如何让组件的渲染 “可中断” 呢？


## Scheduler
  Scheduler 将所有已经准备就绪，可以执行的任务，都存在了一个叫 taskQueue 的队列中，而这个队列使用了小顶堆这种数据结构
  
  在小顶堆中，所有的任务按照任务的过期时间，从小到大进行排列，这样 Scheduler 就可以只花费O(1)复杂度找到队列中最早过期，或者说最高优先级的那个任务。

## fiber

  在新的 React 架构中，一个组件的渲染被分为两个阶段：第一个阶段（也叫做 **render** 阶段）是可以被 React 打断的，一旦被打断，这阶段所做的所有事情都被废弃，当 React 处理完紧急的事情回来，依然会重新渲染这个组件，这时候第一阶段的工作会重做一遍。

  第二个阶段叫做 **commit** 阶段，一旦开始就不能中断，也就是说第二个阶段的工作会直接做到这个组件的渲染结束。

  两个阶段的分界点，就是 render 函数。render 函数之前的所有生命周期函数（包括 render)都属于第一阶段，之后的都属于第二阶段。开启 Concurrent Mode 之后， render 之前的所有生命周期都有可能会被打断，或者重复调用：

  * componentWillMount
  * componentWillReceiveProps
  * componentWillUpdate

## 18.0新增hook、api
  ReactDOM.createRoot // 根组件渲染使用 createRoot，可以开启并发渲染

  useDeferredValue //设置优先级，滞后渲染
  
  startTransition  //标记为非紧急处理事件

  useTransition  //ispending标志

## Suspense
React 16.6 新增了 <Suspense> 组件，它主要是解决运行时的 IO 问题。


## Suspense + react-cache 可以同步的方式实现异步编程

```js
  // x.js
  import {unstable_createResource as createResource} from 'react-cache';
  
  const fetchUser = (id) => {
    return fetch(`xxx/user/${id}`).then(
      res => res.json()
    )
  };
  const userResource = createResource(fetchUser);

  function User({ userID }) {
    const data = userResource.read(userID);
    
    return (
      <div>
        <p>name: {data.name}</p>
        <p>age: {data.age}</p>
      </div>
    )
  }
  
  // 外部配合Suspense使用
  <Suspense>
    <User/>
  </Suspense>
```

## LRU
  react-cache是需要清理缓存的，否则会内存溢出，使用的缓存清理算法就是LRU算法。

  LRU（Least recently used，最近最少使用）

  LRU 内部是双向环装链表，有一个指针指向当前最后一次访问的缓存，达到上限后，从指针的pre节点，开始进行缓存清理。
  
  * 权重问题：指针指向的节点是权重最高的节点，指针的上一个节点是权重最弱的节点