import * as wasm from "wasm-game-of-life";

wasm.greet('我怎么那么NB呢，小老弟');

console.time('rust')
let a = wasm.use_while()
console.timeEnd('rust')
console.log(a)


console.time('js')
let i = 0
while (i < 1000000000) {
  i++
}
console.timeEnd('js')
console.log(i)