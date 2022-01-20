# 第1-3章 chapter 1-3

## 安装

  linux 或者 macos 执行如下代码：

  `curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh`

  windos安装：[https://www.rust-lang.org/install.html](https://www.rust-lang.org/install.html)

## rustc 和 cargo

**rust hello word**
* 新建文件`main.rs`;
  ```rust
    fn main() { println!("hello word");}
  ```
* `rustc` 编译rust文件main.rs - `rustc main.rs`

* 执行编译后产物 `.\main.exe` 

**使用cargo**

* `cargo new my_rust` 新建一个项目； `cargo build` 打包 ； `cargo run` 运行

## 变量可变性

* let 定义变量。默认是immutable的，不可修改值，但是可以重新定义。如果加mut 那就是mutable的，可以修改值。但是不能修改类型

## 数据类型

* 数据类型：data type;。Rust 有四种基本的标量类型：**整型**、**浮点型**、**布尔类型**和**字符类型**。

* 每一个有符号的变体可以储存包含从 -(2n - 1) 到 2n - 1 - 1 在内的数字，这里 n 是变体使用的位数。所以 i8 可以储存从 -(27) 到 27 - 1 在内的数字，也就是从 -128 到 127。无符号的变体可以储存从 0 到 2n - 1 的数字，所以 u8 可以储存从 0 到 28 - 1 的数字，也就是从 0 到 255。


* 字符串：我们用单引号声明 char 字面量，而与之相反的是，使用双引号声明字符串字面量, 然而使用String::from()声明的才是String类型
  > Rust 的 char 类型的大小为四个字节(four bytes)，并代表了一个 Unicode 标量值（Unicode Scalar Value），这意味着它可以比 ASCII 表示更多内容。在 Rust 中，拼音字母（Accented letters），中文、日文、韩文等字符，emoji（绘文字）以及零长度的空白字符都是有效的 char 值。Unicode 标量值包含从 U+0000 到 U+D7FF 和 U+E000 到 U+10FFFF 在内的值。不过，“字符” 并不是一个 Unicode 中的概念，所以人直觉上的 “字符” 可能与 Rust 中的 char 并不符合

## 函数

  函数可以向调用它的代码返回值。我们并不对返回值命名，但要在箭头（->）后声明它的类型。在 Rust 中，函数的返回值等同于函数体最后一个表达式的值
  ```rust
    fn five() -> i32 {
      5
    }
  ```

## 表达式
  表达式可以用大括号创建一个新的块作用域来表达
  ```rust
    let a ={
      let x =3
      x+1
    }
  ```
  此时`a的值是4 `，表达式`x+1`不能加分号，**表达式加分号就是语句，而语句不会返回值**

## 控制流 control flow

  `if else `表达式过多时，可以使用`match`重构代码

  Rust 有三种循环：`loop`、`while` 和 `for` ，rust中循环可以有返回值
  ```rust
    fn main() {
      let mut counter = 0;

      let result = loop {
          counter += 1;
          if counter == 10 {
              break counter * 2;
          }
      };
      println!("The result is {}", result); //20
    }
  ```

  **循环标签** 可用来在双重循环中跳出指定循环，如下代码中：`'counting_up: loop{}`
  **loop**
  ```rust
    fn main() {
     let mut count = 0;
      'counting_up: loop {
        println!("count = {}", count);
        let mut remaining = 10;
        loop {
            println!("remaining = {}", remaining);
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }
        count += 1;
    }
    println!("End count = {}", count);
  }
  ```
  **while**
  ```rust
    fn main() {
      let mut number = 3;

      while number != 0 {
          println!("{}!", number);
          number = number - 1;
      }
    println!("LIFTOFF!!!");
  }
  ```
 **for**
 ```rust
  fn main() {
    let a = [10, 20, 30, 40, 50];
    for element in a.iter() {
        println!("the value is: {}", element);
    }
  }
 ```

# 第4章 chapter 4

## 所有权 （ownership）
* Rust 中的每一个值都有一个被称为 **所有者（owner）**的变量。
* 值在任一时刻有且只有一个所有者。
* 当所有者（变量）离开作用域，这个值将被丢弃。

Rust 有一个叫做 Copy trait 的特殊注解，可以用在类似整型这样的存储在栈上的类型上（第十章详细讲解 trait）。如果一个类型实现了 Copy trait，那么一个旧的变量在将其赋值给其他变量后仍然可用。

拥有copy的数据结构如下：

* 所有整数类型，比如 u32。
* 布尔类型，bool，它的值是 true 和 false。
* 所有浮点数类型，比如 f64。
* 字符类型，char。
* 元组，当且仅当其包含的类型也都实现 Copy 的时候。比如，(i32, i32) 实现了 Copy，但 (i32, String) 就没有。

```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里 ...
                                    // ... 所以到这里不再有效

    let x = 5;                      // x 进入作用域

    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，所以在后面可继续使用 x

} // 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。不会有特殊操作
```

## 引用和借用
  
  `&` 符号就是 **引用（references）**，它允许我们使用值但不获取其所有权。我们将创建一个引用的行为称为 **借用（borrowing）**
  
  `*` 符号是 **解引用（dereferencing）**
  
  ```rust
  fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
  }

  fn calculate_length(s: &String) -> usize {
      s.len()
  }
  ```
  
  默认不可以修改引用的值，必须设置为`mut` 和 `&mut`的才可以
  
  ```rust
  fn main() {
    let mut s = String::from("hello");

    change(&mut s);
  }

  fn change(some_string: &mut String) {
      some_string.push_str(", world");
  }
  ```
  * 不能同时拥有两个可变引用
  * 不能在拥有不可变引用的同时拥有可变引用。
  * 上述两条合并：在任意给定时间，要么 只能有一个可变引用，要么只能有多个不可变引用。

## Slice类型
  slice是没有所有权的数据类型,字符串字面值就是 slice: `let s = "Hello, world!";`

