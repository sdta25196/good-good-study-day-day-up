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

### useState
  ```javascript
    const [count,setCount] = useAtate(0)
    const [count,setCount] = useAtate(() => 0)
    setCount(count + 1)
    setCount(n => n + 1) //推荐
  ```

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
