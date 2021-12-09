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
  await page.goto('http://check.44.dev.eol.com.cn/');
  await page.evaluate(() => {
    localStorage.setItem('userToken', 'ceadd27b2e7803983e7d78c12d9a9263453144c641664e3550fe365d9da05d0345cef59efb6ef7db8f06072007b0e7178bcf2e8bc8e0160931e16e77a64c98d2049239acd5175ed7516173e5a6ca9aaaff62c5546e060d266f4ad1afa48fccf4');
    localStorage.setItem('userInfo', '{"school_id":"118","user_name":"田源","is_add_account":"2","school_name":"苏州大学"}')
  });
  await page.goto('http://check.44.dev.eol.com.cn/');
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
  let a = await page.$('.panelList_panelList__2KHtW')
  await a.screenshot({
    path: "ele11.png",
  })
})();









