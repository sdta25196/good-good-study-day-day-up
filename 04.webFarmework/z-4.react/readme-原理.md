
# REACT

## Component、JSX、Element、Fiber
  
  JSX只是调用 React.createElement(component, props, ...children) 的语法糖。所以，reactComponent并不是一定要用jsx编写，也可以直接返回element。如果使用了JSX, babel会把JSX转译成 React.createElement() 函数调用。
  ```js
    class Hello extends React.Component {
      render() {
        return React.createElement('div', null, `Hello ${this.props.toWhat}`);
      }
    }
  ```

  reactElement是一个js对象，用来描述DOM node(我们希望在屏幕上看到的内容)。由React.createElement创建。
  
  
  reactComponent 依照输入的props返回一个element, UI = Fn(state)。
  > A component is a function or a Class which optionally accepts input and returns a React element.
  
  ReactDOM.render 依照Component返回的Element对象去渲染真实dom。
  
  ***

  JSX（Element）只是一种**描述当前组件内容的数据结构**，而**组件在更新中的优先级**、**组件的state**、**组件被打上的用于Renderer的标记**这些信息，都存在Fiber中，
  
  
  在组件`mount`时，`Reconciler`根据JSX描述的组件内容生成组件对应的`Fiber节点`。
  
  在`update`时，`Reconciler`将JSX与Fiber节点保存的数据对比（`diff`），生成组件对应的Fiber节点，并根据对比结果为Fiber节点打上标记。




  为什么有了Element 还要弄一个 Fiber
  
  Element是描述了组件和层级的关系，而Fiber是描述了工作的过程（行为），这是一种架构思想，解耦了数据与行为，fiber是一个场景（行为），无论什么场景要用到的数据都是一样的，但是场景是有无数个的，所以要用分离的方式。老版本的架构是渲染element,而fiber版本变成了渲染的是Fiber树。

  fiber是同构了一个Element，也是一棵树，每一个节点都叫做一个fiber，diff在老版本的react上，是发生在Element上的，但是这样就不能中断渲染了，后来有了Fiber的架构，diff就发生在Fiber上，这样才能满足 Scheduler调度。


## react架构

React15架构可以分为两层：
  * Reconciler（协调器）—— 负责找出变化的组件
  * Renderer（渲染器）—— 负责将变化的组件渲染到页面上

React16架构可以分为三层：
  * Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
  * Reconciler（协调器）—— 负责找出变化的组件
  * Renderer（渲染器）—— 负责将变化的组件渲染到页面上


在新的 React 架构中，一个组件的渲染被分为两个阶段：第一个阶段（`Reconciler阶段`）是可以被 React 打断的，一旦被打断，这阶段所做的所有事情都被废弃，当 React 处理完紧急的事情回来，依然会重新渲染这个组件，这时候第一阶段的工作会重做一遍。

第二个阶段（`Renderer阶段`），一旦开始就不能中断，也就是说第二个阶段的工作会直接做到这个组件的渲染结束。

两个阶段的分界点，就是 render 函数。render 函数之前的所有生命周期函数（包括 render)都属于第一阶段，之后的都属于第二阶段。开启 Concurrent Mode 之后， render 之前的所有生命周期都有可能会被打断，或者重复调用：
* componentWillMount
* componentWillReceiveProps
* componentWillUpdate


## Scheduler

  `requestIdleCallback`浏览器每帧执行完有剩余时间时执行这个API，但是由于浏览器兼容性、触发频率稳定性的原因，react团队自己实现了`requestIdleCallback`的`polyfill`，也就是`Scheduler`

  `Scheduler` 除了提供**空闲时间触发回调**功能之外，还提供了**调度优先级**功能


**Scheduler做什么**
  每当有新的未过期任务被注册，就把任务插入到timerQueue，并重新排列timerQueue中的任务顺序

  当timerQueue中有任务过期，就取出来加入到taskQueue中。任何取出taskQueue中过距离期时间最小的任务并执行
  
  此处为了实现在O（1）复杂度下找出最早过期的任务，这里使用了小顶堆
  
  在小顶堆中，所有的任务按照任务的过期时间，从小到大进行排列，这样 Scheduler 就可以只花费O(1)复杂度找到队列中最早过期，或者说最高优先级的那个任务，交给Reconciler

**Scheduler生命周期**

  一个Scheduler生命周期分为几个阶段
  * 调度前
    * 注册任务队列(环状链表，头接尾，尾接头)，按照过期时间从小到大排列，如果当前任务是最饥饿的任务，则排到最前面，并立即开始调度，如果并不是最饥饿的任务，则放到队列中间或者最后面，不做任何操作，等待被调度，此时任务都在`taskQueue`中
  * 调度准备
    * 通过requestAnimationFrame在下一次屏幕刚开始刷新的帧起点时计算当前帧的截止时间(33毫秒内)
    * 如果不超过当前帧的截止时间且当前任务没有过期，进入任务调度
    * 如果已经超过当前帧的截止时间，但没有过期，进入下一帧，并更新计算帧截止时间，重新判断时间(轮询判断)，直到没有任何过期超时或者超时才进入任务调度
    * 如果已经超过当前帧的截止时间，同时已经过期，进入过期调度
  * 正式调度
    * 执行调度
      * 在当前帧的截止时间前批量调用所有任务，不管是否过期
    * 过期调度
      * 批量调用饥饿任务或超时任务的回调，删除任务节点
  * 调度完成
    * 检查任务队列是否还有任务
    * 先执行最饥饿的任务
    * 如果存在任务，则进入下一帧，进入下一个Scheduler生命周期


## Reconciler

  Reconciler - 老版本叫Stack reconciler，16版本之后修改为Fiber reconciler

**何时Reconciler**
  每次 setState 或 ReactDOM.render时

**Reconciler做什么**

stack版本Reconciler - 递归执行

负责找出变化的组件

  * 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
  * 将虚拟DOM和上次更新时的虚拟DOM对比
  * 通过对比找出本次更新中变化的虚拟DOM
  * 通知Renderer将变化的虚拟DOM渲染到页面上

Fiber版本Reconciler:
  
  收到Scheduler交出的任务后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记，标记类似：
  ```js
    export const Placement = /*             */ 0b0000000000010;
    export const Update = /*                */ 0b0000000000100;
    export const PlacementAndUpdate = /*    */ 0b0000000000110;
    export const Deletion = /*              */ 0b0000000001000;
  ```

  整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

## Renderer

  Renderer用于管理一棵 React 树，使其根据底层平台进行不同的调用。
  
  由于React支持跨平台，所以不同平台有不同的Renderer，web浏览器端的Renderer是`ReactDOM`

  * ReactNative (opens new window)渲染器，渲染App原生组件
  * ReactTest (opens new window)渲染器，渲染出纯Js对象用于测试
  * ReactArt (opens new window)渲染器，渲染到Canvas, SVG 或 VML (IE8)

**何时Renderer**
  Reconciler结束后-会通知Renderer进行工作

**Renderer做什么**

  在web浏览器宿主环境下，在每次更新发生时，Renderer（ReactDOM）接到Reconciler通知，将变化的 React 组件渲染成 DOM。

  Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

  ![流程](assets/1640152959.jpg)

其中红框中的步骤随时可能由于以下原因被中断：
  * 有其他更高优任务需要先更新
  * 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM。

## diff
**何时diff**
  当组件update时，（Reconciler阶段）会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的Diff算法），将比较的结果生成新Fiber节点

## Fiber
  Fiber是React Element的数据的镜像、是一份Diff的工作
  
  * 作为架构，fiber 架构 - 协调器不采取原本的递归形式，而是使用fiber结构。
  * 作为静态的数据结构，虚拟dom - 每个fiber节点对应一个组件，保存了该组件的信息
  * 作为动态的工作单元，使用了双缓存技术

> React首屏渲染与更新的区别在于：创建fiber树的时候，是否有diff算法

### 双缓存 - Copy On Wirte
  fiber 使用双缓存机制，拥有两颗fiber树，current Fiber和workInProgress Fiber，当fiber被触发执行时， 会在内存中构建workInProgress Fiber树，进行，新节点与老节点的对比更新(diff)等操作，完成后FiberRootNode将current指针切换到workInProgress Fiber来实现渲染切换，切换后workInProgress Fiber变成current Fiber，workInProgress Fiber重新指向null。

  > 此处workInProgress Fiber的diff操作工作期间是随时可以暂停的。

### Fiber 执行
驱动Fiber执行的主要三种情况：
  * ReactDom.render()
  * setState()
  * props变更


## virtualDOM
  VDom 是一个虚拟概念，对应的是ReactElement和Fiber

## hooks解决了什么问题

  **对HOOK的理解**

  hoos是一种消息通知机制，React在某种特定状态发生变化的时候会通知 HOOK，然后HOOK再完成相应的特定行为，
  
  Hook重新定义了react的写法，更加符合react的函数式编程思想，解决了this的问题，不需要再去关注class Conmponents的各种生命周期。
  
  封装了程序的复杂性（副作用、状态、上下文、缓存等），用户只需要使用hooks就行，不需要知道hooks背后做了什么事，同时让用户以最小的代价实现了关注点分离。

 
## react 和 vue 关于时间切片的讨论

  **react适合大型项目，vue适合小型项目，这个说法是不对的，应该是说react适合渲染频繁的项目，cpu开销更大的项目。而vue适合渲染与cpu开销相对没那么频繁的项目。**

  **Fiber架构也给react带来更大的运行时开销，超过 100 毫秒的纯 CPU 时间在React中占比更大，时间切片对react项目更有用**

  **同样大家都在走UI = fn(state) 的路线，react选择了并发模式，vue选在了响应式模式** 

  **老生常谈：react使用JSX模式把项目的控制权放给了开发人员，同时也就对开发人员有了更高的要求，react项目上线很高，但下线很低。而vue项目选择了模板的方式，通过分析模板进行了大量的AOT的优化，所以vue项目的下线会高，而上线会低**

  **所有的响应式程序，都存在一个项目体量大了之后的数据流混乱问题，而react的hooks则对复杂性进行了更好的封装，防止程序复杂性变大**
  
  **时间切片**
  * 如果CPU的开销在16.6ms内，但是原始DOM更新量很大，无论是否使用时间切片，用户侧都会感到卡顿
  * 如果CPU的开销在16.6ms以外，时间切片在理论上就开始产生收益了，但是HCI研究标识，除非它在做动画，否在对于正常用户。100ms内的更新时间，都不会被感受到差异
  * 所以：这就是vue不选择时间切片的原因，而react为什么要用时间切片呢？因为fiber架构带来了运行时的开销，导致react大于100ms的操作很多。

  以下来自尤：
  > 在 web 应用程序中，“janky”更新通常是由同步的大量 CPU 时间 + 原始 DOM 更新的组合引起的。时间分片是在CPU工作时保持应用程序响应的尝试，但它影响只有CPU的工作-在DOM更新的冲洗仍必须同步，以确保最终DOM状态的一致性。
  > 所以，想象一下两种类型的 janky 更新：
  > CPU 工作在 16 毫秒内，但原始 DOM 更新量很大（例如，装载大量新 DOM 内容）。无论时间切片与否，该应用程序仍然会感到“卡顿”。
  > CPU 工作量很大，需要超过 16ms 的时间。这就是时间切片理论上开始变得有益的地方——然而，HCI 研究表明，除非它在做动画，否则对于正常的用户交互，除非更新时间超过 100 毫秒，否则大多数人不会感觉到差异。
  > 也就是说——时间切片只有在频繁更新需要超过 100 毫秒的纯 CPU 时间时才会变得实际有益。这就是有趣的部分出现的地方：这种情况在 React 中会更频繁地发生，因为 -
  > 由于重纤维架构，React 的 Virtual DOM 协调本质上是较慢的；
  > 与模板相比，使用 JSX 的 React 本身就难以优化其渲染功能，模板更易于静态分析；
  > 况下使用钩子的 React 应用程序将过度重新渲染。更糟糕的是，像这样的优化useMemo不能轻易地自动应用，因为 (1) 它需要正确的 deps 数组和 (2) 盲目地将它添加到任何地方可能会阻止应该发生的更新，类似于PureComponent. 不幸的是，大多数开发人员会 懒惰并且不会在任何地方积极优化他们的应用程序，因此大多数使用钩子的 React 应用程序将做很多不必要的 CPU 工作。
  > 相比之下，Vue 通过以下方式解决了上述问题：
  > 本质上更简单，因此更快 Virtual DOM 协调（无时间片 -> 无光纤 -> 开销更少）
  > 通过分析模板进行大量 AOT 优化，解决 Virtual DOM 协调的基本开销。基准测试表明，对于动态与静态内容比率约为 1:4 的典型 DOM 内容，Vue 3 原始协调甚至比 Svelte 更快，并且在 CPU 上花费的时间不到 React 的 1/10。
  > 通过响应性跟踪、将插槽编译到函数（避免子级导致重新渲染）和自动缓存内联处理程序（避免内联函数道具导致重新渲染）进行智能组件树级优化。除非必须，否则子组件永远不会重新渲染，而无需开发人员进行任何手动优化。这意味着对于相同的更新，在 React 应用程序中它可能会导致多个组件重新渲染，但在 Vue 中它很可能只导致 1 个组件重新渲染。
  > 因此，默认情况下，与 React 应用程序相比，Vue 3 应用程序在 CPU 上花费的时间要少得多，并且在 CPU 土地上花费 100 多毫秒的机会大大减少，并且只会在极端情况下遇到，其中 DOM无论如何，它可能会成为更重要的瓶颈。
  > 现在，时间切片或并发模式带来了另一个问题：因为框架现在安排和协调所有更新，它在优先级、失效、重新进入等方面产生了大量额外的复杂性。所有处理这些的逻辑永远不会是树-shaken，这会导致运行时基线大小膨胀。即使包含 Suspense 和所有可摇树的特性，**Vue 3 的运行时仍然只有当前 React + React DOM 大小的 1/4。**

  > 请注意，这并不是说并发模式作为一个整体是一个坏主意。它确实提供了有趣的新方法来处理特定类别的问题（特别是与协调异步状态转换有关），但时间片（作为并发的子功能）专门解决了一个在 React 中比在 React 中更为突出的问题其他框架，同时产生自己的成本。对 Vue 3 而言，这些权衡似乎根本不值得。

## react重运行时、vue在运行时与编译期取了个中，angl\svelte重预编译
  react 在一个数据变化之后、会生成一个虚拟dom, 这个vdom可以解决跨平台、兼容性等问题，同时通过diff计算出最小的操作行为。这些都是运行时做的

  vue 则是取了一个中，通过使用模板语言来对进行编译时优化，比如标记静态组件这种，然后在运行时vdom计算diff就会更快。

  angl\svelte则是注重编译期的产物

**QA**

* 为什么要用链表结构？
  * 1.节省空间，只用指针指向其他节点即可。2. 对于插入删除这类前端DOM常见操作的性能非常好

* Fiber是个链表，它是怎么做到并发模式的呢？
  * Fiber在计算Work in progress的时候是严格按照递归顺序逐级进行的，但是current Fiber与WorkInProress Fiber之间的diff算法是并发计算的，而这一块计算才是真正耗时的地方。由于可以并发计算，所以就快了。

* Fiber是什么？
  * Fiber有几层含义，首先它是React新的架构方式，用来配合Scheduler来实现任务的异步渲染。
  * 然后它是一个数据结构，同构了Element，保存了对应的Element信息。
  * 最后它是一个动态的工作单元，使用了双缓存技术（copy on wirte），在触发Fiber执行的时候，会生成一个WorkInProress Fiber树，然后与原来的Fiber树进行diff对比，再把渲染树的指针直接指向WorkInProress Fiber树。

* react 16 到底更新了啥
  * react作为一个ui库，将前端编程由传统的命令式编程转变为声明式编程，即所谓的数据驱动视图，但如果简单粗暴的操作，比如讲生成的html直接采用innerHtml替换，会带来重绘重排之类的性能问题。为了尽量提高性能，React团队引入了虚拟dom，即采用js对象来描述dom树，通过对比前后两次的虚拟对象，来找到最小的dom操作（vdom diff），以此提高性能。
  
  * 上面提到的vDom diff，在react 16之前，这个过程我们称之为stack reconciler，它是一个递归的过程，在树很深的时候，单次diff时间过长会造成JS线程持续被占用，用户交互响应迟滞，页面渲染会出现明显的卡顿，这在现代前端是一个致命的问题。所以为了解决这种问题，react 团队对整个架构进行了调整，引入了fiber架构，将以前的stack reconciler替换为fiber reconciler。采用增量式渲染。引入了任务优先级(expiration)和requestIdleCallback的循环调度算法，简单来说就是将以前的一根筋diff更新，首先拆分成两个阶段：reconciliation与commit;第一个reconciliation阶段是可打断的，被拆分成一个个的小任务（fiber），在每一侦的渲染空闲期做小任务diff。然后是commit阶段，这个阶段是不拆分且不能打断的，将diff节点的effectTag一口气更新到页面上。
  
  * 由于reconciliation是可以被打断的，且存在任务优先级的问题，所以会导致commit前的一些生命周期函数多次被执行， 如componentWillMount、componentWillReceiveProps 和 componetWillUpdate，但react官方已申明这些问题，并将其标记为unsafe，在React17中将会移除
  
  * 由于每次唤起更新是从根节点(RootFiber)开始，为了更好的节点复用与性能优化。在react中始终存workInprogressTree(future vdom) 与 oldTree（current vdom）两个链表，两个链表相互引用。这无形中又解决了另一个问题，**当workInprogressTree生成报错时，这时也不会导致页面渲染崩溃，而只是更新失败,页面仍然还在**。

* react使用legacy模式进行渲染的时候，并没有并发，为什么还要用fiber架构
  * React团队回归`UI = fn(state)`的初心，要解决class Components的几个痛点：
    * this问题；
    * 生命周期的复杂性，很多时候我们需要在多个生命周期同时编写同一个逻辑
    * 写法臃肿，constructor，super，render等等。。。
  * Fiber 架构让每一个节点都拥有对应的实例，也就拥有了保存状态的能力，利用了闭包和链表。
  * 通过闭包，将 state 保存在 `memoizedState[cursor]`。
  * 在每个状态 Hook（如 useState）节点中，会通过 queue 属性上的循环链表记住所有的更新操作，并在 updade 阶段依次执行循环链表中的所有更新操作，最终拿到最新的 state 返回。
  * 在每个副作用 Hook（如 useEffect）节点中，创建 effect 挂载到 Hook 的 memoizedState 中，并添加到环形链表的末尾，该链表会保存到 Fiber 节点的 updateQueue 中，在 commit 阶段执行。

*  react如何解决低优先级一直被高优先级任务抢占的问题（饥饿问题）
   *  低优先级如果一直不被执行，就会被判定过期，一旦过期他就是最高优先级任务






