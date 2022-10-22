fn main() {
    println!("Hello, world!");

    for i in 0..10 {
        println!("{}", i)
    }

    // enum Message {
    //     Write(String),
    // }
    // impl Message {
    //     fn t(&self){
    //         println!("{}",self::Write(self))
    //     }
    // }
    // let m = Message::Write(String::from("hello"));
    // m.t();

    #[derive(Debug)]
    enum Book {
        Papery(u32),
        Electronic(String),
    }

    let book = Book::Papery(1001);
    let ebook = Book::Electronic(String::from("url://..."));
    match book {
        Book::Papery(u32) => {
            println!("Papery book");
        }
        Book::Electronic(String) => {
            println!("E-book");
        }
    }
    // println!("{}",);
}
