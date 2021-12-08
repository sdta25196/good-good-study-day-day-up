puppeteer

## 爬虫工具

## 示例

### 复制操作
```js
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyV');
  await page.keyboard.up('Control');
```
### 屏幕截图
```js
  await page.screenshot({
    type: 'jpeg',
    path: 'exampl1e.jpg',
    quality: 100,
    clip: {
      x: 0,
      y: 0,
      width: 200,
      height: 600
    }
  })
```
### 元素操作

ele.evaluate
```js
  let box = await page.$(`.element`)
  let content = await box.evaluate(node => node.innerText)
  console.log(content)
```

page.$eval

```js
  let content = await page.$eval(`.sass_content__3O4ZQ div[role="textbox"]`,node => node.innerText)
  console.log(content)
```


## 更多

[puppeteer 文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v12.0.1&show=outline)

[puppeteer github](https://github.com/puppeteer/puppeteer)