const puppeteer = require('puppeteer');
var fetch = require('node-fetch');

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


  // https://www.jjwxc.net/onebook.php?novelid=5198421   劝你不要得罪我   75-
  // https://www.jjwxc.net/onebook.php?novelid=8416998   婚后第二年   35-
  // https://www.jjwxc.net/onebook.php?novelid=9039705   灵卡学院   27-
  // https://www.jjwxc.net/onebook.php?novelid=4333032  剑阁闻铃    200-


  // ! 小说名+（分卷名）+章节数

  const page = await browser.newPage()
  let cookie = {
    "testcookie": "yes",
    "Hm_lvt_bc3b748c21fe5cf393d26c12b2c38d99": "1725588847",
    "HMACCOUNT": "E47257B9F6C70D09",
    "jjwxcImageCodeTimestamp": "2024-09-06 10:18:03",
    "timeOffset_o": "76970",
    "smidV2": "2024090610202285c994dc1726527e40074a4c982280ee002e2b35bbc1ceaa0",
    "JJSESS": "{\"clicktype\":\"\",\"returnUrl\":\"https://www.jjwxc.net/onebook.php?novelid=5198421\",\"sidkey\":\"viUK2CyENWeBJj3zLo98urMHgSIRfd0pFT4AwVqG7l1ns\",\"register_info\":\"7e3f46eb16fc0fe5a5306de579cd6cca\",\"userinfoprocesstoken\":\"\"}",
    "token": "NzQ0NTI3NzZ8ZDAyYzU1YzYyZjc5MDUzNTQ3OGExNjllMTk3YjVlMTl8fHx8MjU5MjAwMHwxfHx85pmL5rGf55So5oi3fDB8bW9iaWxlfDF8MHx8",
    "bbsnicknameAndsign": "2%257E%2529%2524%25E8%2588%259E%25E8%25B9%2588%25E9%259E%258B%25E6%25B2%25A1%25E6%259C%2589%25E5%25A4%25B4",
    "bbstoken": "NzQ0NTI3NzZfMF82ZjZhOWZjYWViNmU5NjYzMWZlZGQ2YzcwNmI2ZmFlZF8xX19fMQ%3D%3D",
    "Hm_lpvt_bc3b748c21fe5cf393d26c12b2c38d99": "1725594052",
    "JJEVER": "{\"shumeideviceId\":\"WC39ZUyXRgdGMnMAJJfjT5fkP8B+WeB38QDcur/Vu6ntVsmGiDXK0CxgBuXoKd6EiWsIASoFK1vtHBQu0J9W/MnZZwgWawU2rtL/WmrP2Tav+DYF2YqyHq+85JFxjU09B3fVLMpg6KnJJGy/bj4SLMZ4mCbdPQ1BRajW7hxiYtqOGduzx9VSOoZsjQRs7TYIJ0JSgM/vzIa0G7wWr0zokq+X2+9DHMXw2IDNhg48XH/UkuJdlRyvvO6cmJ+vYB79M1487577677129\",\"nicknameAndsign\":\"2%7E%29%24%E8%88%9E%E8%B9%88%E9%9E%8B%E6%B2%A1%E6%9C%89%E5%A4%B4\",\"foreverreader\":\"74452776\",\"desid\":\"fmJuRGx6ADjdvwmxkq+S1zOqf7+LF/+W\",\"sms_total\":\"4\",\"lastCheckLoginTimePc\":\"1725593127\"}"
}
  // await page.setCookie(cookie);
  page.setDefaultNavigationTimeout(40000) // 设置40S的加载超时
  // const router = 'https://www.baidu.com'
  const router = 'https://my.jjwxc.net/onebook_vip.php?novelid=5198421&chapterid=75'
  await page.goto(router)
  // await page.close()
})()