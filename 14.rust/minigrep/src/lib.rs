use std::env;
use std::error::Error;
use std::fs;

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    //! ?运算符在程序出错的情况下，把错误扔给函数的调用者去处理
    let contents = fs::read_to_string(config.file_name)?;
    let result = if config.case_insensitive {
        println!("不区分大小写");
        search(&config.query, &contents)
    } else {
        println!("区分大小写");
        search(&config.query, &contents)
    };

    for line in result {
        println!("{}", line);
    }
    return Ok(());
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut xx = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            xx.push(line);
        }
    }
    xx
}

pub struct Config {
    query: String,
    file_name: String,
    case_insensitive: bool, // true:不区分大小写
}

impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("你得传点参数啊");
        }
        let query = args[1].clone();
        let file_name = args[2].clone();
        let case_insensitive = env::var("TEST_CASE_INSENSITIVE").is_err();
        Ok(Config {
            query,
            file_name,
            case_insensitive,
        })
    }
}
