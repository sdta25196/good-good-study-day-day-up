## 开始
* rustc 编译rust文件main.rs - `rustc main.rs`

* 执行编译后产物 `.\main.exe` 

* `cargo build` 打包 、 `cargo run` 运行

## 变量可变性

* let 定义变量。默认是immutable的，不可修改值，但是可以重新定义。如果加mut 那就是mutable的，可以修改值。但是不能修改类型

## 数据类型

* 数据类型：data type;。Rust 有四种基本的标量类型：**整型**、**浮点型**、**布尔类型**和**字符类型**。

* 每一个有符号的变体可以储存包含从 -(2n - 1) 到 2n - 1 - 1 在内的数字，这里 n 是变体使用的位数。所以 i8 可以储存从 -(27) 到 27 - 1 在内的数字，也就是从 -128 到 127。无符号的变体可以储存从 0 到 2n - 1 的数字，所以 u8 可以储存从 0 到 28 - 1 的数字，也就是从 0 到 255。


* 字符串：我们用单引号声明 char 字面量，而与之相反的是，使用双引号声明字符串字面量
  > Rust 的 char 类型的大小为四个字节(four bytes)，并代表了一个 Unicode 标量值（Unicode Scalar Value），这意味着它可以比 ASCII 表示更多内容。在 Rust 中，拼音字母（Accented letters），中文、日文、韩文等字符，emoji（绘文字）以及零长度的空白字符都是有效的 char 值。Unicode 标量值包含从 U+0000 到 U+D7FF 和 U+E000 到 U+10FFFF 在内的值。不过，“字符” 并不是一个 Unicode 中的概念，所以人直觉上的 “字符” 可能与 Rust 中的 char 并不符合