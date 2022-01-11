use rand::Rng;
use std::cmp::Ordering;
use std::io;
fn main() {
    println!("Guess game starting");
    let secret_number = rand::thread_rng().gen_range(1..101);
    loop {
        println!("please input your number");
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("failed to read line");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("you guess: {}", guess);
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
