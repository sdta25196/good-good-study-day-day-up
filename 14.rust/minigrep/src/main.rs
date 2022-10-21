use minigrep::Config;
use std::env;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    println!("{:?}", args);

    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("{}", err); // ! eprintln 标注错误输出。不会把错误信息输出到文件
        process::exit(1);
    });
    if let Err(e) = minigrep::run(config) {
        eprintln!("出错了：{}", e);
        process::exit(1);
    }
}
