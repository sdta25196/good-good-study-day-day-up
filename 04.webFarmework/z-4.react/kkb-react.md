## react
在很多情况下（当然不是所有情况），渲染方式也决定了最终的体验。

所有React的努力，其实就是两方面事情：

- 改进体验
- 提升开发效率

### virtual dom、diff 
  * 虚拟dom是用来描述真实dom的js对象
  * 对新旧两个虚拟dom进行比较。比较出最小的差值去更新dom，带来的好处就是可以批量化，最小化的执行dom操作，从而提高性能
  * 虚拟dom并不会提高性能，只是单纯的dom操作很慢，会不停的触发重排，重绘，开销很大。
  * 虚拟dom最大的好处是，跨平台
  * 16版本是 jsx通过babel转义成 React.createElement(), 17.0之后React的package中新加入了函数处理

### setState
  * 类组件中setState是合并操作，执行callback来使用新的state值
  * 函数组件中useState是替换操作，使用useEffect来使用新的state值

### 原理解析 02 diff 
  * react中的diff 限制必须**同级、同类型、同样的key**才可以进行复用。所以把时间复杂度优化到了O(n)
  * diff 只有三种操作，删除、替换、更新
  #### fiber
    react 16引入的fiber，颗粒度更细，用来处理优先级的任务
    ``` weindow.requestIdleCallback(callback) ``` 利用浏览器空闲时间段执行,callback接收一个参数```IdleDeadline```
    16之前的vdom 是数组结构, fiber 也是虚拟dom,只是把原本的虚拟dom改成了链表结构
  #### 协调
    协调是diff虚拟dom,生成真实dom的过程