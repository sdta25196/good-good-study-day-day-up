use std::collections::HashMap;

fn c(a: HashMap<i32, &str>) {
    print!("{:?}", a.get(&3))
}
fn main() {
    let mut hmap: HashMap<i32, &str> = HashMap::new();

    hmap.insert(3, "c");
    hmap.insert(1, "a");
    hmap.insert(4, "b");
    hmap.insert(5, "e");
    hmap.insert(4, "d");

    c(hmap)
    // print!("{:?}", hmap.get(&3));
    // print!("{:?}", hmap);
}
