extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub unsafe fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
