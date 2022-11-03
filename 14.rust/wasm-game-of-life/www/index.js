// import * as wasm from "wasm-game-of-life";

// wasm.greet('我怎么那么NB呢，小老弟');

// console.time('rust')
// let a = wasm.use_while()
// console.timeEnd('rust')
// console.log(a)


// console.time('js')
// let i = 0
// while (i < 1000000000) {
//   i++
// }
// console.timeEnd('js')
// console.log(i)

import { Universe } from "wasm-game-of-life";

const pre = document.getElementById("game-of-life-canvas");
const universe = Universe.new([26, 26]);

const renderLoop = () => {
  pre.textContent = universe.render();
  setTimeout(() => {
    universe.tick();
    requestAnimationFrame(renderLoop);
  }, 300)
};

requestAnimationFrame(renderLoop);