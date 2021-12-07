import jsdom from 'jsdom'
const dom = new jsdom.JSDOM(`
  <!DOCTYPE html>
  <body>
    <div>
      <div>
        <span></span>
        <span></span>
      </div>
      <input/>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  </body>
`)

const body = dom.window.document.body


/**dfs generator实现方式 */
function* dfs(node: Element): Generator<Element> {
  yield node
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      yield* dfs(child)
    }
  }
}

/**dfs普通方式实现 */
function dfsPlain(node: Element): void {
  console.log(node.tagName);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      dfsPlain(node.children[i])
    }
  }
}

// 测试用例
// console.log("dfs---");
// dfsPlain(body)
// for (let el of dfs(body)) {
//   console.log(el.tagName);
// }


function* bfs(node: Element): Generator<Element> {
  const queue = new Array<Element>(1000)
  let i = 0, j = 0
  queue[j++] = node

  while (i !== j) {
    const node = queue[i++]
    yield node
    if (node.children) {
      for (let k = 0; k < node.children.length; k++) {
        queue[j++] = node.children[k]
      }
    }
  }
}
function bfsPlain(node: Element): void {
  const queue = new Array<Element>(1000)
  let i = 0, j = 0
  queue[j++] = node
  while (i !== j) {
    const node = queue[i++]
    console.log(node.tagName)
    if (node.children) {
      for (let k = 0; k < node.children.length; k++) {
        queue[j++] = node.children[k]
      }
    }
  }
}

console.log("bfs---")
bfsPlain(body)
for (let el of bfs(body)) {
  console.log(el.tagName);
}
