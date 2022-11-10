fn kaka(str: &str) -> String {
    let digest = md5::compute(str);
    return format!("{:x}", digest);
}

fn main() {
    // let digest = md5::compute(b"abcdefghijklmnopqrstuvwxyz");
    // assert_eq!(format!("{:x}", digest), "c3fcd3d76192e4007dfb496cca67e13b");
    // print!("{:x}", digest);
    let c = kaka("abcdefghijklmnopqrstuvwxyz");
    print!("{}", c);
}
