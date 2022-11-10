extern crate base64ct;
extern crate sha2;
extern crate wasm_bindgen;

use base64ct::Base64;
use sha2::{Digest, Sha256};
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
pub fn encrypt(str: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(str);
    // Note that calling `finalize()` consumes hasher
    let hash = hasher.finalize();

    // write input message
    hasher.update(str);

    // read hash digest and consume hasher
    let result = hasher.finalize();
    // #[cfg(feature = "alloc")]
    let base64_hash = Base64::encode_string(&result);

    return base64_hash;
}
