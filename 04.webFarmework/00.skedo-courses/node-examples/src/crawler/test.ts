import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.bilibili.com")
  // await page.screenshot({ path: 'example.png' })
  const infoBoxes = await page.$$(".info-box")

  for(const box of infoBoxes) {
    const p = await box.$('.info p')
    const title = await p.evaluate((el:HTMLParamElement) => el.innerText)
    console.log({title})
  }

  // const content = await page.content()
  // console.log(content)
  await browser.close()
})()

