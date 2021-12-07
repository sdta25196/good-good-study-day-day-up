import { fstat, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer"
import {Card} from './Card'


type CardData = {
  title : string,
  info : {
    alg : string, 
    rate : number,
  }[]
}

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  let pageLinks : string[] = []

  async function fetchPages() {
    for (let i = 1; i <= 29; i++) {
      await fetchPage(i);
    }
  }

  async function fetchPage(i: number) {
    console.log('fetch page:' + i)
    const url = `https://www.betterhash.net/mining/gpu/?page=${i}`;
    await page.goto(url)
    const links = await page.$$(".table-responsive a")

    for(let handle of links) {
      const href = await handle.evaluate(anchor => {
        return anchor.getAttribute("href")
      })
      pageLinks.push(href)
    }
  }

  function saveLinks(){

    writeFileSync(
      resolve(__dirname, "pagelinks"),
      JSON.stringify(pageLinks, null , 2),
      "utf-8"
    );
  }

  async function fetchDetail(url : string) {
    await page.goto(url)

    const h1 = await page.$(".container h1")
    const matchH1 = (
      await h1.evaluate((ele: HTMLHeadElement) => ele ? ele.innerText : null)
    )
    if(!matchH1) {
      return null
    }
    const title = matchH1.match(/How profitable is mining with (.*)\?/)[1]

    const cardData : CardData = {
      title,
      info : []
    }

    const rows = await page.$$(".table-responsive table tr")
    
    for(let i = 1; i < rows.length; i++) {

      const row = rows[i]
      const tds = await row.$$('td')
      if(tds.length === 1) {
        break
      }

      const data : string[] = []
      for(let td of tds) {
        const text = await td.evaluate((ele:HTMLTableCellElement) => ele.innerText)
        data.push(text)
      }

      const alg = data[0]
      let rate = 0

      const NumRegex = /[0-9.]+/
      if(data[1].match(/MH\/s/)) {
        rate = parseFloat(data[1].match(NumRegex)[0]) * 1000000
      }
      else if(data[1].match(/KH\/s/)) {
        rate = parseFloat(data[1].match(NumRegex)[0]) * 1000
      }
      else if(data[1].match(/H\/s/)) {
        rate = parseFloat(data[1].match(NumRegex)[0]) 
      }
      else {
        throw new Error("not supported unit, value="+ data[1])
      }
      cardData.info.push({alg, rate})
    }
      

    return cardData

  }

  function saveData(){

  }

  function loadLinks(){
    const text = readFileSync(resolve(__dirname, "pagelinks"), "utf-8")
    pageLinks = JSON.parse(text)
  }


  // await fetchPages()
  // saveLinks()
  loadLinks()


  for(let link of pageLinks) {
    console.log('handle:' + link)
    const card = await fetchDetail(link)
    if(!card) {
      continue
    }
    await Card.create({
      info : card.info,
      title : card.title
    })
  }

  

  // await cardModel.save()

  await browser.close()
}


try{
  run()
}catch(ex) {
  
}