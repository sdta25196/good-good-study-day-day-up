1. wasm-pack build

2. 在/pkg 下执行 yarn link

3. 在/www 下执行yarn link wasm-game-of-life

4. 在/www 执行yarn start之后，想要更新wasm-pack，只需要在根目录执行wasm-pack build即可