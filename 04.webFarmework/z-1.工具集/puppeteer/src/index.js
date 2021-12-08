const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 800
    }
  });
  const page = await browser.newPage();
  await page.goto('http://check.44.dev.eol.com.cn/');
  await page.evaluate(() => {
    localStorage.setItem('userToken', '69fc52ce022f9b5c3e98ecd54ec7f8da8853c06ce74d6ea32d5f32a85a1dcc32851499d9f44889ed0a7eb37d8ad368a3d9a7ca95ec9ecaf76418260bb83bb75d8fed28bb91179ea448565ac5225efc1189893cf1fa9d7420933b55b20130d9e6');
    localStorage.setItem('userInfo', '{"school_id":"118","user_name":"田源","is_add_account":"2","school_name":"苏州大学"}')
  });
  await page.goto('http://check.44.dev.eol.com.cn/');
  await page.type('.sass_content__3O4ZQ div[role="textbox"]', '18560602034')
  // let box = await page.$(`.sass_content__3O4ZQ div[role="textbox"]`)
  // let content = await box.evaluate(node => node.innerText)
  let content = await page.$eval(`.sass_content__3O4ZQ div[role="textbox"]`,node => node.innerText)
  console.log(content)

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
})();









