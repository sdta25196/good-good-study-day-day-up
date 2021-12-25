const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 2000,
      height: 1000
    }
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x32) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4664.110 Safari/537.36");
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3],
    });
  });
  await page.goto('https://speedpdf.com/zh-cn/convert/jpg-to-webp');
  // await page.type('.sass_content__3O4ZQ div[role="textbox"]', '18560602034')
  // let box = await page.$(`.sass_content__3O4ZQ div[role="textbox"]`)
  // let content = await box.evaluate(node => node.innerText)
  // let content = await page.$eval(`.sass_content__3O4ZQ div[role="textbox"]`, node => node.innerText)
  // console.log(content)

  // await page.keyboard.down('Control');
  // await page.keyboard.press('KeyV');
  // await page.keyboard.up('Control');
  // await page.screenshot({
  //   type: 'jpeg',
  //   path: 'exampl1e.jpg',
  //   quality: 100,
  //   clip: {
  //     x: 0,
  //     y: 0,
  //     width: 200,
  //     height: 600
  //   }
  // })

  // await browser.close();
  // await page.keyboard.down('Shift');
  // await page.keyboard.down('c');
  // await page.keyboard.up('Control');
  // await page.keyboard.up('c');
  // await page.type('#code', '953201')
  // let a = await page.$('[type="submit"]')
  // await a.click();
  // await browser.close();
  // let a = await page.$('.panelList_panelList__2KHtW')
  // await a.screenshot({
  //   path: "ele11.png",
  // })
})();









