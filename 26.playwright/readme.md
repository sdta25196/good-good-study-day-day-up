# 测试Playwright

Playwright 是一个比puppeteer更新的浏览器自动化工具。

**微软推出了 Playwright MCP Server 。有可能可以实现大模型自动化浏览器使用了。**

## 使用本地浏览器的方案

1. 创建一个新的chrome快捷方式，右键属性，在目标中加上最后的配置 `--user-data-dir="G:\Playwright Data"`，文件夹地址是自己提前创建的
`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="G:\Playwright Data"`

> 如果使用默认的个人资料就会出现链接打不开的情况。

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


## Playwright MCP Server【AI员工】

下载playwright-mcp-main项目，然后再其根目录执行`npx @playwright/mcp@latest --port 8931` 可在8931端口打开mcp服务。

1. 启动`playwright-mcp-main`项目，打开`playwright mcp的服务端`。
2. 运行`src/mcp`，会连接服务端。
3. 调用大模型开始干活。


