pub fn work() {
    for c in b'A'..=b'z' {
        println!("{}", String::from_utf8_lossy(&[c]));
    }
}
