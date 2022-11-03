import { Universe, Cell } from "wasm-game-of-life";

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