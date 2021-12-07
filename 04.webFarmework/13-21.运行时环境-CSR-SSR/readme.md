# CSR 与 SSR
  
  ## CSR

  * 客户端渲染，由Server返回部分HTML
  * 请求JS、执行JS生成HTML以及绑定事件
  
  ## SSR

  * 服务端渲染，由Server返回完整HTML
  * 客户端渲染完整的HTML字符串，通过水合(hydrate)来绑定事件
    > 由于服务端无法完成事件绑定，事件绑定是客户端发生的，所以，最终需要在客户端绑定事件，这个过程就是水合

  > 水合举例：数据从localStorage导到redux这就叫做水合，localStorage与redux是两个环境，把两个环境的信息合到一起就是水合

# 代码实现
  react搭建-安装以下依赖
  * @babel-loader 处理ts, @babel/preset-env @babel/preset-typescript是这个loader的options

```js
yarn add react react-dom webpack webpack-cli @babel/core @babel/preset-env @babel/preset-typescript @babel-loader @types/react @types/react-dom
```
  * csr react渲染使用`React.render`
  * ssr react渲染使用`React.hydrate`， `react-dom/server` 中有个`ReactDOMServer`,是用来在服务端渲染组件用的
    * 打包的时候调用`React.hydrate`, node端使用`ReactDOMServer`来渲染对应组件
  * ssr 尽量不用window、document，如果一定要用，有history、jsdom库可以用