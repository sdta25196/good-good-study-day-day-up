const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://check.44.dev.eol.com.cn/');
  await page.type('#phone', '18560602034')
  await page.type('#code', '953201')
  let a = await page.$('[type="submit"]')
  await a.click();
  // await browser.close();
})();


