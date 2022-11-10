use base64ct::Base64;
use sha2::{Digest, Sha256};

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

fn main() {
    // create a Sha256 object
    let mut hasher = Sha256::new();
    let str = "hello world";
    // write input message
    hasher.update(str);

    // read hash digest and consume hasher
    let result = hasher.finalize();

    let d = encrypt("1234567");
    println!("Result: {}", d);
}
