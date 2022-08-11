* [截止至2022年第一季度。已经有3.5亿+的域名被注册](https://www.businesswire.com/news/home/20220629006013/en/Verisign-Reports-Internet-Has-350.5-Million-Domain-Name-Registrations-at-the-End-of-the-First-Quarter-of-2022)

* [中国爬虫占比报告](https://gs.statcounter.com/search-engine-market-share/all/china/#monthly-202107-202207)

* [谷歌SEO指南](https://developers.google.com/search/docs/beginner/seo-starter-guide)

## 爬虫流程一般概述如下：

![google爬虫流程](google爬虫流程.jpg)

1. 查找 URL：Google 从许多地方获取 URL，包括Google Search Console、网站之间的链接或XML 站点地图。

2. 添加到抓取队列：这些 URL 被添加到抓取队列中，供 Googlebot 处理。Crawl Queue 中的 URL 通常会在那里持续几秒钟，但根据具体情况可能长达几天，特别是如果页面需要呈现、索引，或者 - 如果 URL 已经编入索引 - 刷新。然后页面将进入渲染队列。

3. HTTP 请求：爬虫发出 HTTP 请求以获取标头并根据返回的状态码进行操作：
   * 200- 它抓取并解析 HTML。
  * 30X- 它遵循重定向。
  * 40X- 它会记录错误并且不加载 HTML
  * 50X- 它可能稍后会回来检查状态代码是否已更改。

4. 渲染队列：搜索系统的不同服务和组件处理 HTML 并解析内容。如果页面有一些基于 JavaScript 客户端的内容，则这些 URL 可能会被添加到呈现队列中。渲染队列对 Google 来说成本更高，因为它需要使用更多资源来渲染 JavaScript，因此渲染的 URL 占 Internet 上总页面的百分比较小。其他一些搜索引擎的渲染能力可能与 Google 不同，这就是 Next.js 可以帮助您制定渲染策略的地方。

5. 准备被索引：如果满足所有条件，页面可能有资格被索引并显示在搜索结果中。

## 关于爬虫的识别

1. 使用UA进行判断
2. 使用双向DNS解析认证

> 不要使用ip,因为爬虫的IP地址范围动态变化不固定

## 状态码对SEO的影响

### 3x

`301` \ `308`为永久重定向

`302` \ `307`为临时重定向

`308\307`比`301\302`更强大的地方在于：指定 308\307 重定向代码时，客户端必须在目标位置重复完全相同的请求（POST 或 GET）

> 对于SEO来说：谷歌的John Mueller表示如果您不确定网站收到哪种请求（GET、POST 等），308 在技术上更干净。在实践中，大多数网站的请求将主要是 GET，所以两者都是一样的


### 4x

`404`状态码表示服务器找不到请求的资源，不利于SEO，通常解决方案为使用404页面，不对爬虫返回404状态。


`410`状态码表明在源服务器上不再可以访问目标资源，并且这种情况很可能是永久性的，爬虫将会删除此条url，永远不会返回爬取内容

### 5x

`500`状态码表明服务器遇到了阻止它完成请求的意外情况，不利于SEO，通常解决方案为使用500页面，不对爬虫返回500状态。

`503`表明服务器尚未准备好处理请求，当你的网站宕机并且你预测网站将宕机一段时间后，建议返回此状态码。这可以防止长期排名下降（因为 503 状态通常是临时条件）。



## robots.txt

`robots.txt` 文件告诉搜索引擎爬虫：
  * 可以访问某个文件、文件夹
  * 不要访问某个文件、文件夹
  * 禁止某些爬虫的访问
  * 限制爬虫访问网站的频率
  * 加入网站地图的路径-因为robots协议文件是蜘蛛访问网站第一个访问的文件。这样做也会加快搜索引擎对网站的抓取周期

> 它并不是一种阻止爬虫抓取某个网页的机制，我们若想阻止爬虫访问某个网页，通常应该使用`meta`标签设置`noindex`.

## sitemap

站点地图是一个文件，您可以在其中提供有关您站点上的页面、视频和其他文件以及它们之间的关系的信息，通常为根目录下的`sitemap.xml`、`sitemap.html`, 该文件应当为动态生成的，否则网站新增内容后，爬虫根据站点地图并不能得知新的内容。

关于何时需要站点地图，谷歌这么说：

1. 您的网站真的很大，此时爬虫工具可能会忽略抓取您的一些新网页或最近更新的网页
2. 您的站点有大量内容页面存档，这些内容页面相互隔离或链接不佳。 如果您的网站页面不能自然地相互引用，您就需要在站点地图中列出它们
3. 您的站点是新站点，并且指向它的外部链接很少，网络爬虫通过跟踪从一个页面到另一个页面的链接来导航网络。因此，如果没有其他网站链接到您的网页
4. 您的网站包含大量富媒体内容（视频、图片），如果提供这些，爬虫可以在适当的情况下将站点地图中的其他信息考虑在内进行搜索

## meta tags

meta标签的robots可以用来限制爬虫进行索引：`<meta name="robots" content="noindex,nofollow" />`

  * noindex 不在搜索结果中显示此页面
  * nofollow 不关注此页面上的链接

不设置meta的时候，不限制爬虫，默认是`index`和`follow`：`<meta name="robots" content="index,follow" />`

设置为all，和不设置是一样的效果，即不限制爬虫：`<meta name="robots" content="all" />`


使用场景

> 若某些页面你不希望在搜寻引擎被用户搜寻到，但这些页面事实上有很多对SEO排名有加分的因素，所以你会希望爬虫检索这些页面的资料，但别建立进搜寻引擎索引，这时候你需要meta robots 来阻止爬虫索引你的页面。

## Canonical Tags

规范标签(Canonical Tags)

```html
<link rel="canonical" href="https://example.com/products/phone" />
```

如果您的某个网页可通过多个网址访问，或者您的不同网页包含类似内容（例如，某个网页链接既有H5版，又有PC版），那么 爬虫 会将这些网页视为同一个网页的重复版本。如果您未明确告知 爬虫 哪个网址是规范网址，爬虫 会选择一个网址作为规范版本并抓取该网址，而将所有其他网址视为重复网址并降低对这些网址的抓取频率。

> 规范网页可以与当前域名不一致。

爬虫 会根据许多因素（即“信号”）选择规范网页，例如：网页是通过 HTTP 还是通过 HTTPS 提供、网页质量、站点地图中是否出现了相应网址，以及任何 rel=canonical 标签。

* 网页不完全相同也会被认为重复；列表页面在排序或过滤方面的细微变化并不会使该页面具有唯一性（例如，按价格排序或按项目颜色过滤）。

> 举例 `https://example.com/a-b-c-d-f` ，a、b、c、d、f如果仅仅是用来处理页面上的筛选项，那么这些链接将不利于seo, 此时就需要使用 Canonical Tags

* 同一个网站支持了多种设备（此处是指用了一套UI做了相关适配）：

```js 
  https://example.com/news/koala-rampage
  https://m.example.com/news/koala-rampage
  https://amp.example.com/news/koala-rampage
```

* 启用搜索参数的动态网址

```js
https://www.example.com/products?category=dresses&color=green
https://example.com/dresses/cocktail?gclid=ABCD
```

* 在相同域名下转载的内容

```js
https://news.example.com/green-dresses-for-every-day-155672.html（转载博文）
https://blog.example.com/dresses/green-dresses-are-awesome/3245/（原始博文）
```

**使用规范标签的好处**

* 指定您希望用户在搜索结果中看到的网址。
> 您可能希望用户通过 `https://www.example.com/dresses/green/greendress.html`（而非 `https://example.com/dresses/cocktail?gclid=ABCD`）访问您的商品页。

* 整合类似网页或重复网页的链接信号
> 例如从其他网站指向 http://example.com/dresses/cocktail?gclid=ABCD 的链接会与指向 https://www.example.com/dresses/green/greendress.html 的链接整合成后者

* 简化单个主题的搜索指标。如果特定内容可以通过多个网址访问，获取此内容的综合指标的难度会更大。

* 管理相同域名下的转载内容

* 避免花费时间抓取重复网页。您肯定希望爬虫在您的网站上发现尽量多的内容，因此最好让爬虫将时间用于抓取您网站上的新网页（或更新后的网页）

**关于规范标签**

常见的有link标签，http头，站点地图三种方式，各有优缺点

| 方式                  | 说明                                                               | 优点                                             | 缺点                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rel=canonical <link>  | 在所有重复网页的代码中分别添加一个 <link> 标记，使其指向规范网页。 | 可以映射无限多个重复网页。                       | 可能会增加网页大小。在大型网站或网址经常改变的网站上维护映射可能会比较复杂。仅适用于 HTML 网页，不适用于 PDF 之类的文件。在这种情况下，您可以使用 rel=canonical HTTP 头。 |
| rel=canonical HTTP 头 | 在网页响应中发送 rel=canonical 头。                                | 不会导致网页大小增加。可以映射无限多个重复网页。 | 在大型网站或网址经常改变的网站上维护映射可能会比较复杂。                                                                                                                  |
| 站点地图              | 在站点地图中指定您的规范网页。                                     | 易于执行和维护，尤其是在大型网站上。             | 爬虫仍必须为您在站点地图中声明的所有规范网页确定关联的重复网页。此方法向爬虫发送的信号不如 rel=canonical 映射方法发送的信号强。                                           |

**常规标准**

* 与mate标签的`noindex`互斥，将会以meta为准
* 优先选择https
* 规范网页移动版，要为其添加 `rel="alternate"`的`link`
  > <link rel="alternate" media="only screen and (max-width: 640px)"  href="http://m.example.com/dresses/green-dresses">
* 规范网页应该使用绝对地址`https://www.example.com/c.html`

**301重定向** 

网站迁移的时候，可以利用规范网页把所有的弃用的网址指向某个规范网页，然后对此规范网页做301即可。

好处是在停用旧网址之前就可以顺利完成迁移。规范网页不会影响到用户的正常访问。

除了服务器端设置301以外，前端也可以使用`meta`标签进行设置。当然优先使用的应该是服务器301
```html
  <meta http-equiv="refresh" content="0; url=https://example.com/newlocation" />
```


## 渲染与排名 rendering and ranking


> 更好的遵循渲染条件，就可以得到更多的排名

**使用title标签**

`<title>一个名字</title>`

**使用描述标签**

`<meta name="description" content="一些内容,不要太长">`

**使用关键词标签**

`<meta name="keywords" content="一些关键词,不要太多">`

> 谷歌会忽略这个标签

**遵循语义化标签**

`<h1>h1标签被认为是最重要的标签，建议每个页面中都要使用</h1>`

`main`、`nav`、`aside`等等，详情查看![html5语义化标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)


**反链**

互联网是通过链接连接的。如果没有从一个网站到另一个网站的链接，互联网可能就不会存在。获得更多链接的网站往往代表着更受用户信任的网站。

> 需要更多的推广自己的网站，通过邮件、论坛等，都会带来反链
> 百度在垃圾链接反链监测策略稍微落后，目前垃圾链接策略在百度搜索提升排名依然有效

**网站性能**

爬虫会尝试提高性能更好的网页的排名，网站性能对SEO的影响主要来自几个指标：最大元素加载时间`LCP`(页面加载性能)、首次输入延迟`FID`(页面交互性能)、累积布局偏移`CLS`(页面视觉 稳定性)


**https**

使用https + http2 的网站有利于排名


**url**

建议：
  * 使用简单、说明性字词，保持清晰的语义，尽量帮助爬虫理解页面
    > 示例：`/learn/basics/create-nextjs-app`优于  `learn/course-1/lesson-1`
  * 仅使用单词和数字和本地化词语
  * 使用短横杠分隔单词
  * 在前面的规则基础上尽量缩短url
    > 长度并不直接影响爬虫，其主要是影响用户观感，从而反向影响爬虫
  * url保持一致，不要同时拥有`/page`、`/page/`、`/page/index.html`、`http`、`https`
  * 避免使用then、and、or 
  * 使用favicon
  * 层级尽可能保持在3位以内
  * 不基于参数：使用参数来构建 URL 通常不是一个好主意，尽量使用静态网址，但是在保存语义的时候请选择使用动态网址
    > [google关于动态网址和静态网址](https://developers.google.com/search/blog/2008/09/dynamic-urls-vs-static-urls)


不建议
  * 不使用不易读的、冗长的 ID 编号 `https://www.example.com/greendress-2-3` \ `https://www.example.com/greendress?a=2995_dds84$$5`
  * 不要使用下划线 (_)，爬虫不识别下划线作为单词的分隔符 `https://www.example.com/green_dress`
  * 不要把单词链接在一起 `https://www.example.com/greendress`



[百度的建议1：](https://ziyuan.baidu.com/college/courseinfo?id=1394&page=2)
[百度的建议2：](https://ziyuan.baidu.com/college/articleinfo?id=1263)
url结构很重要
* url结构规律化：同一个网页有不同url，会造成多个url同时被用户推荐导致权值分散；同时百度最终选择展现的那个url不一定符合你的预期。站点应该尽量不把sessionid和统计代码等不必要的内容放在url，如果一定要这样做可以通过robots禁止百度抓取这些非规范url
* 最好能让用户从url即可判断出网页内容，便于蜘蛛解析的同时便于用户间传播
* url尽量短、尽量简单、越平常越好，URL长度要求从www开始到结束，总长度不超过1024个字节
  * 蜘蛛喜欢：http://tieba.baidu.com.com/f?kw=百度
  * 蜘蛛不喜欢：http://tieba.baidu.com/f?ct=&tn=&rn=&ln=&cn=0&kw=百度&rs2=&un=&rs1=&rs5=&sn=&rs6=&nvselectvalue=0&oword=百度&tb=cn
* 不要添加蜘蛛难以解析的字符，如
  * http://mp3.XXX.com/albumlist/234254;;;;;;;%B9&CE%EDWF%.html
  * http://news.xxx.com/1233,242,111,0.shtml
* 动态参数不要太多太复杂，目前百度对动态url已经有了很好的处理，但是参数过多过复杂的url有可能被蜘蛛认为不重要而抛弃
* 不建议URL中含有中文字符，中文字符容易出现识别问题
* 避免层级过多

* 关于使用动态参数
  * 使用动态参数来渲染不同的视图，因为参数不参与爬虫的语义识别，搜索引擎可能会混淆他们并降低排名
    > 不同的视图应当使用不同的路由来渲染
  * 使用动态参数会造成url过长
    > 其实可以缩的足够短，曾经百度建议是255字节以内。中文算两个字节。
    > url过长本身并不影响SEO，只是因为短了更可能被点击和共享，(点击这事存疑，但是共享的概率可能会变大),反向优化SEO而已
  * `home?a=2&b=3`、`home/2-3`渲染相似的视图时，都影响到了爬虫对语义的识别，且会造成大量重复页面（例如数据差不多的页面和无数据时）
    > SEO不喜欢上述二者中的任意一种，应当配合规范标签使用前者，但是前者实际上我们可以使参数变的足够语义化。
    > `/school/102`和`/school?id=102`实际上后者招爬虫喜爱，此时无需配合规范标签使用
    > SEO最喜欢的是：在保证语义的情况下尽量简短
    > URL权重：语义>参数>长度。 
    > 落地页页面示例： https://www.zhihu.com/people/tie-mu-jun-58
    > 落地页页面示例： https://www.zhihu.com/question/472798741
    > 落地页页面示例： https://www.36kr.com/p/1858460067485314
    > 落地页页面示例： https://www.36kr.com/newsflashes/1860674508134021 
    > 百度搜索示例： https://ziyuan.baidu.com/college/courseinfo?id=1394
    > 百度统计示例： https://tongji.baidu.com/main/overview/10000058728/overview/index?siteId=15325680
    > 落地页页面示例： https://detail.tmall.com/item.htm?id=671853630330&ali_refid=a3_430582_1006:1251480150:N:rpE3ZjAG6mphNqXLgvRjiA==:e0487487399a47ff6e317b4fe81cb353&ali_trackid=1_e0487487399a47ff6e317b4fe81cb353&spm=a230r.1.14.6
    > 落地页页面示例： https://item.jd.com/10031221800227.html
    > 落地页页面示例： http://product.dangdang.com/29425922.html
    > 分tab示例： http://fankui.help.sogou.com/index.php/web/web/index?type=5
    > 筛选条件示例： http://search.dangdang.com/?key3=%BD%AD%CB%D5%B7%EF%BB%CB%CE%C4%D2%D5%B3%F6%B0%E6%C9%E7&medium=01&category_path=01.01.14.00.00.00#J_tab
    > 筛选条件示例： https://search.jd.com/search?keyword=%E7%AC%94%E8%AE%B0%E6%9C%AC&wq=%E7%AC%94%E8%AE%B0%E6%9C%AC&cid3=1105
    > 使用伪静态路由，主要是考虑用户体验方面。还有就是使用的ssr框架，不得不这么做


**网站常规指南**

1. 避免使用干扰性插页式广告和对话框

2. 浏览器兼容性

在不兼容的浏览器中需要添加指导性的页面

4. 避免常见重复内容

重复内容通常是指网域内或网域间与使用同一种语言的其他内容完全匹配或大致类似的有一定体量的内容

* 既可生成常规网页，又可针对移动设备生成精简版网页的论坛。不算重复
* 网店中通过多个不同网址显示或链接到的商品。不算重复

**联合供稿的解决方案**：如果您以联合供稿方式在其他网站上显示您的内容，那么，在每次相关搜索中，爬虫都会始终显示他认为最适合用户的版本，这有可能是您的首选版本，也有可能不是。不过，建议您确保以联合供稿形式展示内容的每个网站都包含一个指回原始文章的链接。您也可要求其他网站的所有者对包含您的联合供稿内容的网页使用 noindex 标记，从而阻止搜索引擎将他们的内容版本编入索引。

5. 在`<head>`中只使用有效的标签

`<head><div>在head中使用div就是不对的</div></head>`

6. a标签

* 向爬虫说明您的网站与链接页之间的关系

使用`rel`	规定当前文档与被链接文档之间的关系。

`<p>My favorite horse is the <a href="https://horses.example.com/Palomino" rel='palomino'></a>.</p>`

* a标签要能够被抓取

有效的：

`<a href="https://example.com">`

`<a href="/relative/path/file">`

无效的：

`<a onclick="goto('https://example.com')">`

`<a href="javascript:window.location.href='/products">`

`<a href="#">`

* a标签的位置很重要

a标签应当使用在内容中，而不是页眉，页脚等地方

* a标签需要具有相关性，不相关的链接也被称为非自然链接，存在违规的情况

假设内容中使用了一个a标签内容为清华大学，`<a href="https://example.com">清华大学</a>`， 那么内容就必须与清华大学有关

* a标签要保证其可访问性

如果是死链的话，应当给予提示

7. application/ld+json

谷歌支持我们在网页上添加结构化数据，向爬虫提供有关该网页含义的明确线索，从而帮助爬虫理解该网页

百度只能使用站长工具提交结构化数据


**网站内容质量指南**

1. 欺骗性重定向 

将访问者引导到其他网址（而非其原本请求的网址）的行为

* 向搜索引擎显示一种内容，却将用户重定向到明显不同的其他内容。

* 桌面设备用户可转到正常网页，而移动设备用户却被重定向到完全不同的垃圾网域。

2. 隐藏文字和链接

* 在白色背景上显示白色文字
* 将文字放在图片后面
* 使用 CSS 将文字放在画面外
* 将字体大小设置为 0
* 通过只链接一个小字符（例如，段落中间的连字符）隐藏链接

3. 伪装真实内容

伪装真实内容指的是分别向用户和搜索引擎呈现不同内容或网址的做法。

4. 自动生成的内容

自动生成的内容意图操纵搜索排名而不是为用户提供帮助, 例如生成一些对读者没有意义但可能包含搜索关键字的文字。

自动生成的内容贫乏

抄袭其他站点内容









## 关键词挖掘

* 去网站受众常去的论坛、资讯等地方，收集常出现的术语、话题，这些很可能会成为他们进行搜索的关键词



# tips

* 如果您运行两个不同的网站并在每个网站中发布相同的内容，搜索引擎可以决定选择其中一个进行排名，或者直接将两者降级。
  * 使用 Canonical Tags解决这个问题
* **固定**的更新频率和更新周期，以及更新、升级和重新发布旧博客文章，再加上推广将会得到更多的流量与爬虫好感度。
* 反链的数量越多，被收录 + 排名越好
* **点击率**提升排名的速度远大于**定期更新**大于**页面性能**
* 截止2022年，谷歌目前最新的算法总结一句话：您让谷歌的用户越开心，您的排名就越高。
  > 用户体验至上，性能、视觉、交互
  > 自然点击率决定了排名的大部分，研究表明用户更更能点击包含数字的结果，例如`2022年大学生就业数据`，`19条SEO的黄金法则`，`3年后房价预测`。好的标题，好的简介带来更好的点击率
  > 3秒内离开网站，也代表了用户不喜欢你的内容，从而导致降权。
* 需要更多的推广自己的网站，通过邮件、论坛等，都会带来反链
* 在文章中放入至少三个相关的资源链接。这会向爬虫表明页面是用户有用信息的中心
* 使用语义化标签，让爬虫更了解页面
* 第一链接优先规则：假设您有两个链接指向您网站上的一个页面……并且这两个链接都在同一个页面上。根据First Link Priority Rule，只有第一个链接会被爬虫索引
* 避免孤立的页面
* 优化排名靠后的页面、优化点击率
* 设置的关键词需要在内容中多次出现
* 某些时候：使用h1标签，会被当做标题抓取，h2标签会被当做副标题
* 开发小程序关联H5站点、且[保持H5和小程序web化的链接样式一致](https://ziyuan.baidu.com/college/articleinfo?id=2881)
* url不要加#号，百度爬虫只取#前的部分收录
* 关于pc分页：
  > 为每个网页提供唯一网址，例如，添加 ?page=n 查询参数，因为谷歌会将分页序列中的网址视为不同的网页
  > 不要将分页序列的第一个网页用作规范网页
* 关于h5分页：
  > 爬虫支持分页模式、点击加载更多按钮、无线滚动三种形式，可根据产品自行选择
  > 无线滚动更适合移动端，但是并非使用于所有产品: 对于目标导向的查找任务，例如需要人们定位特定内容或比较选项的任务，不建议使用无休止的滚动
  > [无限滚动并不适用于每个网站](https://www.nngroup.com/articles/infinite-scrolling/)
* 域名年龄在百度排名中也很重要
* 百度SEO整合了百度的其他产品，所以多在百度其他产品上进行推广反链有利于排名。（Barnacle SEO, 打不过就加入）
* 申请百度开放小工具，可以在百度的SERP中显示更丰富的网页
* 长尾关键词挖掘
* 谷歌的第二页流量非常少，百度的第二页第三页仍然有相对较高的流量，因为许多百度用户已经训练自己跳过典型的百度属性和广告，以获得真正的自然结果
* 百度更喜欢cn？
* 百度是否喜欢多个子域？
* [PC到H5的跳转在服务端中实现](https://ziyuan.baidu.com/college/articleinfo?id=2759)



# seo核心点

* 重定向方案
* meta标签
* a标签
  * 链接
  * 反链
* 国际化
* 页面内容
  * 质量
  * 更新周期
* robots.txt \ sitemap
* 运营，推广
* 排名优化
* 关键词挖掘
* 用户体验
  * 性能 - lcp、fcp等
  * 视觉 - 图片、字号、字体、布局、偏移等
  * 交互 - fid、tbt、交互舒适性等
* 




# 资料

* [百度搜索算法详解](https://ziyuan.baidu.com/college/courseinfo?id=2988&page=1)
* [百度小程序关联H5](https://ziyuan.baidu.com/college/articleinfo?id=3140)
* [百度爬虫UA](https://ziyuan.baidu.com/college/articleinfo?id=1002)
* [百度平台工具使用手册](https://ziyuan.baidu.com/college/courseinfo?id=1988&page=22)
* [百度移动搜索建站优化白皮书](https://ziyuan.baidu.com/college/articleinfo?id=1707&page=1 )
* [百度小程序替换H5](https://ziyuan.baidu.com/college/articleinfo?id=2812)
* [百度搜索引擎原理](https://ziyuan.baidu.com/college/courseinfo?id=1388)
* [搜狗站长指南](http://help.sogou.com/guide.html#3)
* [1100万结果中分析停留时间长的排名更高](https://backlinko.com/search-engine-ranking)
* [字体如何影响用户体验](https://www.webfx.com/blog/web-design/fonts-ux/)
* [世界领先的用户体验](https://www.nngroup.com/)
* [2022-5-6停用的sitemap标记](https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions?hl=zh_cn)