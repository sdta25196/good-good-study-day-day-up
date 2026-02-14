# AI员工项目【playwright MCP】

playwright MCP，可以实现自然语言控制浏览器操作。

这个项目是否可以继续延伸为：软件操作RPA的自动化。


- 这个项目可以解决爬取内容源的问题、可以解决自动化浏览器的问题。所以，可以做到的：自动的爬取高质量内容 + 自动发布。那么目前还欠缺的是：内容生成。

## 文件夹

- `node-server` node服务器，启动后可以使用浏览器访问：http://localhost:9997
- `output` playwright程序输出目录
- `playwright` 测试playwright的程序
- `playwright-mcp-client` playwright MCP客户端
- `playwright-mcp-server` playwright MCP服务端

## 使用AI员工的优势

AI员工（playwright MCP）与playwright程序、RPA操作浏览器，三者之间的差距

1. **更灵活，更适应操作变化**，例如写好的程序页面有变动就不能用了，但是Agent员工是可以自适应找到对应的按钮的。
2. **利用AI能力实现Agent**，自主进行爬取、处理。例如可以理解不同的自然语言需求。不同种类的任务可以自行进行分配，或者任务细节不一样也可以自行适配

编写逻辑是完全不一样的。原来编写逻辑是：`打开页面=>固定的搜索框元素输入内容=>点击固定的元素按钮`，

现在的编写逻辑改成了：`打开页面=>自动找到搜索框并输入内容=>自动找到搜索按钮并点击`

# 启动方式

## 一：直接运行

1. 启动mcp-server，[启动命令](./playwright-mcp-server/启动方式.md#启动命令)
2. 手动执行`playwright-mcp-client/src/index.js` 即可进行调试。

## 二：使用服务

1. 启动mcp-server，[启动命令](./playwright-mcp-server/启动方式.md#启动命令)
2. 启动node-server，[启动命令](./node-server/README.md#启动服务器)

# todo

## 调通playwright

安装依赖，按照官方基础代码调用就可以启动。

> 此时可以实现启动无头浏览器。

需要注意的是：想调用本地用户数据，需要额外使用`launchPersistentContext`, **一定要重新创建一个新的个人资料目录**。具体参考[使用本地浏览器的方案](./playwright-mcp-client/readme.md#使用本地浏览器的方案)


> 此时可以开始使用本地的缓存了，账号一类的内容不需要重新启动了，解决了自动化打开本地浏览器的问题。

## 调通MCP

### MCP中的本地浏览器配置

新增一个`playwright-mcp-config.json`配置文件，然后启动服务的时候调用配置文件即可。具体参考[启动方式](./playwright-mcp-server/启动方式.md#启动命令)

### 实现MCP调用本地浏览器

需要拉取playwright-mcp的代码，添加本地浏览器用户数据配置文件后，再启动服务。

> 此时启动了MCP的服务端

启动MCP的客户端，链接服务端即可。

> 此时客户端就可以使用服务端的工具了，并且可以打开本地浏览器。


## 对外提供一个接口服务 

完成，使用`express`编写`node-server`，启动服务器。

> 此时我们可以实现通过浏览器来输入内容，让playwright启动另外一个浏览器来执行任务了。

## 连续任务如何执行 ????

**研究一下这个怎么办**

## 工具叠加 ????

**还得再叠加上一些自己的工具。**

