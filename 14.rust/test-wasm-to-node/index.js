const js = import("./node_modules/@ty_valor/eee-wasm/eee_wasm.js");
js.then(js => {
  js.greet("WebAssembly");
})