# 测试Playwright

Playwright 是一个比puppeteer更新的浏览器自动化工具。

**微软推出了 Playwright MCP Server 。有可能可以实现大模型自动化浏览器使用了。**

## 使用本地浏览器的方案

1. 创建一个新的chrome快捷方式，右键属性，在目标中加上最后的配置 `--user-data-dir="G:\Playwright Data"`，文件夹地址是自己提前创建的
`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="G:\Playwright Data"`

> 这样就打开了一个新的个人资料文件夹，如果使用默认的个人资料就会出现链接打不开的情况。

2. 使用launchPersistentContext，配上个人资料目录即可:
```js
(async () => {
  const browser = await chromium.launchPersistentContext(
    "G:/Playwright Data/", // 使用浏览器的个人资料，需要删掉最后的Default
    {
      headless: false,
      executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      // channel: 'chrome'
    });
  const page = await browser.newPage();
  await page.goto('https://www.gaokao.cn/');
  // await browser.close();
})();

```


## Playwright MCP Server

【AI员工】

1. 启动`playwright-mcp-main`项目，打开`playwright mcp的服务端`。
2. 运行`src/index.js`，会连接服务端。
3. 调用大模型开始干活。

### 使用MCP的AI员工和普通程序编写的playwright的差别

1. **更灵活，更适应操作变化**，例如写好的程序页面有变动就不能用了，但是Agent员工是可以自适应找到对应的按钮的。
2. **利用AI能力实现Agent**，自主进行爬取、处理。例如可以理解不同的自然语言需求。不同种类的任务可以自行进行分配，或者任务细节不一样也可以自行适配

编写逻辑是完全不一样的。原来编写逻辑是：`打开页面=>搜索框输出内容=>点击按钮`，现在的编写逻辑改成了：`打开页面=>找到搜索框并输入内容=>找到搜索按钮并点击`