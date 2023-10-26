# 项目构建

1. 代码风格采用就近风格
2. 数据获取使用fetch, 搭配按需重新验证 - 或者按照时间。
   1. 按照时间的坏处是一下全更新了，按需验证坏处是请求的次数多
3. 区分路由和普通文件夹，将普通文件夹使用下划线开头。
4. 添加`server-only` `client-only` 保证开发期间环境正确。



# nextJs - V13

## 路由
* 路由目录加括号会被跳过
* layout.jsx 默认会嵌套
* 只有根layout.jsx 能包含html和body
* template.jsx 不保留状态， layout.jsx 保留状态
* page页面导出metadata或者使用generateMetadata函数, 来[修改SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
* [id] 动态路由， `prop.params.id` 获取。[...id] 获取多层动态路由。 [[id]]可选的动态路由。支持没有这一层id的路由。
* generateStaticParams 生成静态路由用到的函数.配合 `export const dynamicParams = false` 控制为渲染path为404
* ISR 配置generateStaticParams 函数中 fetch的按需验证即可
* loading.js 配合 Suspense 实现加载中逻辑。
* 并行路由可以显示多个组件。使用@定义文件夹 - 可以添加default.js 来解决多个插槽路径不一致的问题
* useSelectedLayoutSegment 可以用来确定当前插槽组件下活动的的路由 例如：访问 `@aa/xx useSelectedLayoutSegment(aa)` 获得 `xx`
* API路由可以用来供我们调用后修改项目配置
* 中间件就当插件用：在请求完成前执行. - 这个得放到`src`文件夹下
* 下划线开头的文件夹不参与路由`_folder`
* 页面使用 Link 组件导航路由 `import Link from 'next/link'`

## 数据获取

**需要讨论fetch的使用**

* next的fetch缓存非常久，但是流量消耗少, 服务都关了，也不耽误fetch有数据 
  * 当服务器组件需要共享数据时，可以简单的使用fetch来进行请求数据 
  * 需要搭配缓存重置使用

* 用自己的请求可以控制缓存

主要需要考虑，是否有很多的静态页面需要缓存呢？

## 渲染

* props.searchParams 用来获取url上的动态参数

* 使用`server-only`、`client-only`包，来保证组件正确使用，如果使用错误会出现编译期错误
  * `server-only` 和 `use server` 的区别是，`server-only` 解决一些特定用法在编译期同时支持客户端和服务端，但实际上在客户端报错的问题。
  * 使用了`server-only`之后，组件就不能被导入到 `use client` 中的组件了
  * [示例](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)

* 服务端组件不能导入到客户端组件，但是可以作为props传递给客户端组件。

## hook - 用在客户端

[文档](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

出自 next/navigation

usePathname 读当前 pathname

useRouter 路由跳转

## 内置优化组件

### 图片

`import Image from 'next/image'` next.config.js中可以限制使用

* 自动，使用静态导入
* 明确地，通过包含 awidth和height属性
* 隐式地，通过使用fill属性导致图像扩展以填充其父元素。
  * 使用时fill，父元素必须有position: relative 或 display: block

```html
<div style={{ position: 'relative', height: '400px' }}>
  <Image
    alt="Mountains"
    src={mountains}
    fill
    sizes="(min-width: 808px) 50vw, 100vw"
    style={{
      objectFit: 'cover', // cover, contain, none
    }}
  />
</div>
```

### 字体

搞特殊字体的时候可以用

`import localFont from 'next/font/local'`

```js
import localFont from 'next/font/local'
const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})
```

### 脚本

加载js脚本，可以保证只加载一次

```js
import Script from 'next/script'
 <Script src="https://example.com/script.js" />
```

### 延迟加载

`import dynamic from 'next/dynamic'`

`const ComponentA = dynamic(() => import('../components/A'))`

加载组件时loading

```js
const WithCustomLoading = dynamic(
  () => import('../components/WithCustomLoading'),
  {
    loading: () => <p>Loading...</p>,
  }
)
```

命名导出

```js
// hello.js 

export function Hello() {
  return <p>Hello!</p>
}

// b.js

import dynamic from 'next/dynamic'
 
const ClientComponent = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
)
```

## 配置

### eslint

yarn build 时将会自动执行。想要关闭如下：

```js
eslint: {
  ignoreDuringBuilds: true,
},
```

### 环境变量 

客户端使用需要加`NEXT_PUBLIC`开头： `NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk`

没有使用`NEXT_PUBLIC`开头的，只在服务端识别


## 配合docker

1. 构建镜像 `docker build -t nextjs-docker .`.

2. 运行容器 `docker run -p 3000:3000 nextjs-docker`.