const puppeteer = require('puppeteer');
var fetch = require('node-fetch');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,  // ! windows版本如果需要可以关闭无头模式，puppeteer版本为 19.1.1 或 20.10.0
    // args: ['--no-sandbox', '--disable-setuid-sandbox', '--referrer-policy=no-referrer-when-downgrade', '--allow-file-access-from-files', '--disable-web-security'],
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // ! windows版本 需要chrome浏览器的绝对路径
  })

  const page = await browser.newPage()
  await page.goto('http://zhaolu.dev.zjzw.cn/viewgoodnews?id=99a1b2de1684142b1f9bcc601e59baf9')
  // await page.close()

})()