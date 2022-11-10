extern crate md5;
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

#[wasm_bindgen]
pub fn kaka(str: &str) -> String {
    let digest = md5::compute(str);
    return format!("{:x}", digest);
}

// rust-crypto = "0.2.36"
// sha2 = "0.10.6"
// base64ct = "1.5.3"
// base16ct = "0.1.1"
// md5 = "0.7.0"
