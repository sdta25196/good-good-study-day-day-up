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

api下写一个接口revalidate。然后去触发这个接口即可

使用revalidate.js来验证token,触发加载

```js
// api/revalidate.js

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(req.query.path)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
```

调用脚本revalidate.sh即可实现批量按需更新

```sh
// revalidate.sh

curl "http://localhost:3000/api/revalidate?secret=eol&path=/school/1"
curl "http://localhost:3000/api/revalidate?secret=eol&path=/school/2"
curl "http://localhost:3000/api/revalidate?secret=eol&path=/school/3"
curl "http://localhost:3000/api/revalidate?secret=eol&path=/school/4"
curl "http://localhost:3000/api/revalidate?secret=eol&path=/school/5"

```

或者写node脚本也行

```js
// revalidate.js, 需要安装node-fetch, 再加上参数处理即可

for (let i = 1; i < 10; i++) {
  require('node-fetch')("http://localhost:3000/api/revalidate?secret=eol&path=/school/" + i)
}

```

# next添加sitemap和robots

[next添加sitemap和robots](https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs)

# 备注

getStaticProps不能使用`__dirname`，只能使用`process.cwd()`

# TodoList

Q: 服务器使用打包后的产物

需要源码 + 打包后文件都放到服务器里

Q: SSG生产的文件怎么上CDN？

据说是直接扔到CDN上就行

Q: 如何部署？

* yarn build 之后 yarn start 程序将运行在3000端口，PM2 直接进行守护即可。
`pm2 start yarn --interpreter bash -- start` 

或者

新建`server.js` , 使用 `pm2 start server.js`

```js
// server.js
const cmd=require('node-cmd'); 
cmd.run('yarn start');
```


Q: 部署后如何不停机更新版本？

* pm2守护进程，在build脚本完成之后，直接进行重启`pm2 reload [id]`



