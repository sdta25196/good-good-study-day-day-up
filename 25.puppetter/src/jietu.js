const puppeteer = require('puppeteer');
var fetch = require('node-fetch');

// ! 测试元素截图

// 使用自己的chrome浏览器
// 1.为了保证顺利链接我们需要设置Chrome浏览器的启动端口
// 右键快捷方式设置目标中的内容:在最后空格后添加 --remote-debugging-port=9222

(async () => {
  // let wsKey = await fetch('http://localhost:9222/json/version').then(res => res.json());

  // let browser = await puppeteer.connect({
  //   browserWSEndpoint: wsKey.webSocketDebuggerUrl,
  //   headless: false,
  //   defaultViewport: null
  // });

  const browser = await puppeteer.launch({
    headless: false,  // ! windows版本如果需要可以关闭无头模式，puppeteer版本为 19.1.1 或 20.10.0
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // ! windows版本 需要chrome浏览器的绝对路径
  })



  // ! 小说名+（分卷名）+章节数

  const page = await browser.newPage()
  // await page.setCookie(cookie);
  page.setDefaultNavigationTimeout(40000) // 设置40S的加载超时
  // const router = 'https://www.baidu.com'
  await page.goto('https://www.zjzw.cn/')
  await page.evaluate(() => {
    // 获取body元素
    const body = document.body;
    // 设置style属性
    body.style.height = 'auto';
  });
  const bodyHandle = await page.$('body');
  const { width, height } = await bodyHandle.boundingBox();

  // 使用boundingBox方法获取body元素的位置和大小
  const screenshot = await bodyHandle.screenshot({
    clip: {
      x: 0,
      y: 0,
      width,
      height
    }
  });

  // 保存截图
  await page.screenshot({ path: 'body.png' });

  // 关闭浏览器
  // await browser.close();
  // await page.close()
})()