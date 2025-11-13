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


## Playwright MCP Server

研究一下这个MCP是个什么效果。


