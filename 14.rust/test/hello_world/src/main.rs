struct Test {
    width: u32,
}

impl Test {
    fn c(&self, x: u32) {
        println!("{}", self.width + x)
    }
}

impl Test {
    fn c1(&self, x: u32) {
        println!("{}", self.width + x + 2)
    }
}

fn main() {
    let a = Test { width: 66 };
    a.c(1);
    a.c1(1);
    // println!("666666")
    // println!("666666")
    // println!("666666777")
    // for e in 1..3 {
    //     println!("{}", e)
    // }
}
