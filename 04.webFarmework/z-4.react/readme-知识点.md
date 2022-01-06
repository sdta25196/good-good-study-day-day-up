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

## 官方推荐使用hook的原因
  1. 解决组件间状态复用问题，使用自定义hook
  2. 解决class组件各种生命周期中的逻辑不一致问题，使用useEffect可以拆分颗粒度更细，代码更符合就近原则、
  3. 函数式组件没有this. 
  4. react未来的优化方式。calss组件会导致部分优化方式无效 
  5. Hook 使你在非 class 的情况下可以使用更多的 React 特性。

## hooks是什么
  * git webhook \ 操作系统进程hook \ webpack-dev-serve 都是使用的hook机制
  * hook(钩子)，**本质上是一个通知机制**

## hooks带来的改变
  * 拥抱函数式编程，使react组件变成了纯函数，重新定义了react的编程风格，不需要再关注生命周期，更符合react函数式的思想
  * 解决用户痛点，针对状态，上下文，副作用等，为用户量身定做hook,而不需要像之前那样自己在类中实现
  * 让用户以最小的代价实现**关注点**分离
    ```javascript
      Fun=()=>{
        return(
          <A/> //关注点
          <B/> //关注点
          <C/> //关注点
        )
      }
    ```

### 关于useState优化

* 组相关状态。如果您总是同时更新两个或多个状态变量，请考虑将它们合并为一个状态变量。
* 避免状态矛盾。当状态的结构使得多个状态可能相互矛盾和“不同意”时，就会为错误留出空间。尽量避免这种情况。
* 避免冗余状态。如果您可以在渲染期间从组件的 props 或其现有状态变量中计算出一些信息，则不应将该信息放入该组件的状态中。
* 避免状态重复。当相同的数据在多个状态变量之间或嵌套对象中重复时，很难保持它们同步。尽可能减少重复。
* 避免深度嵌套状态。很深层次的状态更新起来不是很方便。如果可能，更喜欢以扁平的方式构建状态。 可使用`use-immer`、`immutable`

### 比较useState和useReducer
* 代码大小：通常，useState您必须预先编写更少的代码。使用useReducer，您必须同时编写 reducer 函数和调度操作。但是，useReducer如果许多事件处理程序以类似的方式修改状态，则可以帮助减少代码。**复用程度越高且具有一定复杂度就越倾向与使用useReducer**

* 可读性： useState当状态更新很简单时很容易阅读。当它们变得更复杂时，它们会使您的组件代码膨胀并使其难以扫描。在这种情况下，useReducer您可以干净地分离如何从更新逻辑发生了什么事件处理程序。**可读性useReducer更高**

* 调试：**useReducer更利于调试**
  * 当你有一个bug useState，它可以是很难分辨其中的状态设置不正确，以及为什么。
  * 使用useReducer，您可以将控制台日志添加到您的减速器中以查看每个状态更新，以及它发生的原因（由于哪个action）。如果每个action都正确，您就会知道错误在于减速器逻辑本身。

* 测试： reducer 是一个纯函数，不依赖于你的组件。这意味着您可以单独导出和测试它。虽然通常最好在更现实的环境中测试组件，但对于复杂的状态更新逻辑，断言您的 reducer 为特定的初始状态和操作返回特定状态会很有用。**useReducer更利于测试**
### useContexxt
在使用上下文之前，您应该考虑以下几种替代方案：

* 从传递 props开始。如果您的组件不是微不足道的，那么通过十几个组件向下传递十几个 props 并不少见。可能感觉像一个slog，但它很清楚哪些组件使用哪些数据！维护你的代码的人会很高兴你用 props 明确了数据流。

* 提取组件并将JSX 传递children给它们。如果您通过许多不使用该数据的中间组件层传递某些数据（并且仅将其进一步向下传递），这通常意味着您在此过程中忘记了提取某些组件。例如，也许您将数据道具传递posts给不直接使用它们的可视化组件，例如`<Layout posts={posts} />`. 相反， make Layouttakechildren作为道具，然后 render `<Layout><Posts posts={posts} /></Layout>`。这减少了指定数据的组件和需要它的组件之间的层数。

### useEffect
  * 将渲染之外的事情（副作用）进行收敛，集中管理
  * 页面render之后执行
  * callback 页面卸载之后执行

### useRef
  ```javascript
    const oRef = useRef(0)
  ```
> useEffect 使用时间切片进行处理数据
> useLayoutEffect 使用同步处理方式，会占用浏览器主线程
> useref 跟usememo 都可以实现缓存某个值的效果，但是语义不同，可以根据不同的上下文使用
> 除了useEffect 其他hook都有per instance per local
> react 使用路由 HashRouter, 打包路径  "homepage": ".", 即可在本地访问

## 网络延迟是前端开发者无法解决的。如何在网络延迟客观存在的情况下，减少用户对网络延迟的感知?

https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production

## Google的RAIL模型：

* 以用户为中心；最终目标不是让您的网站在任何特定设备上都能运行很快，而是使用户满意。
* 立即响应用户；在 100ms以内确认用户输入,用于离散型交互操作，需要100ms内得以响应
* 设置动画或滚动时，在 16ms以内生成帧.
* 最大程度增加主线程的空闲时间，保证JS单任务执行时间不超过50ms。
* 持续吸引用户；在 1000ms以内呈现交互内容，首屏秒开。

## react 相同位置的相同组件会保持状态

**以下示例中`<Counter>`内部的状态随着`isFancy`的改变而重置**，因为`isFancy`为false时，`<Counter>`并没渲染
```js
  export default function App() {
    const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        { isFancy && <Counter isFancy={isFancy} /> }
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
```

**以下示例中`<Counter>`内部的状态不会随着`isFancy`的改变而重置**，因为渲染的是相同位置相同组件
```js
  export default function App() {
    const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        {isFancy ? (
          <Counter isFancy={true} /> 
        ) : (
          <Counter isFancy={false} /> 
        )}
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
```

> 需要注意这里说的`相同位置的相同组件`是指在UI树中的位置，而不是JSX标记中的

以下示例中，**`<Counter>`内部的状态仍然不会随着`isFancy`的改变而重置**，因为渲染的还是相同位置相同组件

```js
  export default function App() {
    const [isFancy, setIsFancy] = useState(false);
    if(isFancy){
      return (
        <div>
          <Counter isFancy={isFancy} /> 
          <label>
            <input
              type="checkbox"
              checked={isFancy}
              onChange={e => {
                setIsFancy(e.target.checked)
              }}
            />
            Use fancy styling
          </label>
        </div>
      )
    }
    return (
      <div>
        <Counter isFancy={isFancy} /> 
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
```

> 如果想要使相同位置相同组件的状态不保存，直接给组件添加不一样的`key`就行了

**以下示例中`<Counter>`内部的状态随着`isFancy`的改变而重置**，因为组件`key`不一样
```js
  export default function App() {
    const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        {isFancy ? (
          <Counter isFancy={true} key='a'/> 
        ) : (
          <Counter isFancy={false} key='b'/> 
        )}
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
```

* setState的批处理优化（batchUpdate）,是batchUpdate函数，内部可以获得事件的回调函数和上下文，最终有一个finally，只会执行一次触发更新。 
  * 老版本由于batchUpdate函数是同步执行的，所以我们使用异步调用setState,就会出现多次更新
  * 新版本fiber架构，使用的lane模型，解决了这个问题，因为同样的优先级会被return