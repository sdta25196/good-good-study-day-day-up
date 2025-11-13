import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launchPersistentContext(
    // "C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/", // 使用浏览器的个人资料，需要删掉最后的Default
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

