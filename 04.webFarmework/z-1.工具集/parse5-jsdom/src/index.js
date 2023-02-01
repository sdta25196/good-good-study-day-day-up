import { parse } from "parse5";
import { JSDOM } from "jsdom";


// console.time()
// const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>Hi there!</body></html>`);
// console.log(dom); //> 'html'
// console.timeEnd()
// console.time()
// const document = parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
// console.log(document); //> 'html'
// console.timeEnd()

JSDOM.fromURL("https://gaokao.cn/").then(dom => {
  console.log(dom.serialize())
})