# CSR 

使用useEffect

# SSR

使用getServerSideProps   


## SSG

使用getStaticPaths、getStaticProps

getStaticPaths 配合 fallback 控制生成静态页

* fallback: 'blocking' 等于 SSR，**推荐使用此方式**
* fallback: true 没预生成的path动态生成html,只生成一次后续使用生成的文件, 使用此方式，第一次请求获取的doc文件中没有接口里的数据
* fallback: false 没预生成的path返回404

### notfound

**这个必须得加，否则会出现恶意刷路由导致服务器页面激增的问题**

notFound为true时，将会渲染404页面

```js
  export async function getStaticProps(context) {
    const res = await fetch(`https://.../data`)
    const data = await res.json()

    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
      props: { data }, // will be passed to the page component as props
    }
  }
```

## ISR

> getStaticProps 配合 revalidate(秒) 控制更新静态页面

Q：是所有人都会看到一次缓存页面么？

设置了更新时间之后，到达更新时间将会显示一次缓存页面，此时后台将会触发页面重新生成，这个缓存页面是否是针对所有人的。

A：不会，当触发了一次请求之后，服务端会生成一个html,其他人看到的就是最新的

Q: 更新时间是怎么算的？

某页面更新时间60s,这个60s是怎么算的？服务器收到的请求时间为准？从收到第一次开始，每60秒更新一次？

A：如果您将revalidate时间设置为60，所有访问者将在一分钟内看到您网站的相同生成版本。使缓存无效的唯一方法是在一分钟后访问该页面的人。所以如果设置一天的缓存，则一天都不会更新，所以就是得使用ISR

### ISR使用按需更新

`https://<your-site.com>/api/revalidate?secret=<token>`



# 备注

getStaticProps不能使用`__dirname`，只能使用`process.cwd()`

