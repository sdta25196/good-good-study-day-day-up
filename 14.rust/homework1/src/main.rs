mod garden;
mod work1 {
    pub fn work() {
        let v = vec!['a'..='z', 'A'..='Z'];
        for c in v {
            for c1 in c {
                println!("{}", c1);
            }
        }
    }
}

fn main() {
    work1::work();
    garden::work2::work();
}
