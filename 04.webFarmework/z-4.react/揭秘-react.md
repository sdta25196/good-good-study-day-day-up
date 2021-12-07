## React16架构可以分为三层：

* Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
* Reconciler（协调器）—— 负责找出变化的组件
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上

相较于React15，React16中新增了Scheduler（调度器）。

## Scheduler（调度器）

部分现代浏览器实现了这个API：`requestIdleCallback`, 他会在浏览器每一帧执行有空闲时间时，去调用注册的回调函数，但是**兼容性问题与触发频率问题**导致react，不能直接使用这个api

所以React实现了功能更完备的requestIdleCallback的polyfill，这就是`Scheduler`。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。

## fiber
  fiber的三种用处
  
  * 作为架构，fiber 架构 - 协调器不采取原本的递归形式，而是使用fiber结构。
  * 作为静态的数据结构，虚拟dom - 每个fiber节点对应一个组件，保存了该组件的信息
  * 作为动态的工作单元，使用了双缓存技术

> React首屏渲染与更新的区别在于：创建fiber树的时候，是否有diff算法

### 双缓存
  fiber 使用双缓存机制，即在内存中构建dom树，FiberRootNode使用current指针切换RootFiber来实现渲染切换
  更新渲染时，新节点与老节点的对比更新，就是diff


## component 和 element的关系
  class \ function 都可以是由用户编写的组件，这些组件叫做component, 组件最终会被React.createElement调用，作为第一个参数传入，createElement会返回一个element对象。
  
  * component - 组件
  * element - jsx被编译后的对象
  
  **所以，component与element的关系是，component最终会被编译成element**

## 页面中获取react对象

  reactTools提供了`__REACT_DEVTOOLS_GLOBAL_HOOK__` 对象，用来暴漏react对象，F12直接使用即可



