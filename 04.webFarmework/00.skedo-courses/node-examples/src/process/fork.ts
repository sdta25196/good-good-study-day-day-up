import { resolve } from 'path'
import {fork} from 'child_process'

function sleep(ms : number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
const child1 = fork(resolve(__dirname, "b.ts"))
const child2 = fork(resolve(__dirname, "b.ts"))
const child3 = fork(resolve(__dirname, "b.ts"))

const children = [child1, child2, child3]


children.forEach(x => {
  x.on("message", (data) => {
    console.log(data)
  })
})
children.forEach(x => x.send("hello"))



// process.send("Hello")

// async function run(){
//   while(true) {
//     await sleep(1000)
//     console.log('tick...')
//   }
// }

// run()

