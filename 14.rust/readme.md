
# 基础问题

## 如何安装

  linux 或者 macos 执行如下代码：

  `curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh`

  windos安装：[https://www.rust-lang.org/install.html](https://www.rust-lang.org/install.html)

## 如何创建、编译、运行项目

**rust hello word**

  * 新建文件`main.rs`;
    ```rust
      fn main() { println!("hello word");}
    ```
  * `rustc` 编译rust文件main.rs - `rustc main.rs`

  * 执行编译后产物 `.\main.exe` 

**使用cargo**

  * `cargo new my_rust` 新建一个项目
  * `cargo build`  \ `cargo build --release`打包
  * `cargo run` \ `cargo run --release`运行

## cargo \ rustup \ rustc

rustc 编译器，类似于前端的node

rustup 编译器管理工具，类似于前端的nvm

cargo 包管理+工程管理工具，类似于前端的npm

## 版本检查、控制

版本检查 `rustc --version`

更新 `rustup update`

## 切换源

先找到cargo所在位置 `where cargo`

进入`.cargo`文件夹中，创建`config`文件。粘贴内容：

```js
  [source.crates-io]
  registry = "https://github.com/rust-lang/crates.io-index"
  replace-with = 'ustc'
  [source.ustc]
  registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

# 进阶

Rust好像是把有可能出问题的地方直接禁止使用，然后创建一套新的规则来规避原本容易出错的问题。例如GC、数据竞争


## 所有权 
  * rust解决GC问题的方案

## String和字符串
  * 字符串是编译期间就计算好大小，放在Stack中了，那么动态的数据类型就需要使用String
  * String存放在堆空间。可以用来解决动态的问题。

## 移动和复制 
  * 有copy trait的才可以复制
  * `let a =1;let b= a;` 此时a复制给b。a还可以用
  * `let a = String::from('x');let b =a;` 此时a移动到b,a不可以用了

## 引用和借用

  * 引用 &，解引用 *
  * 把引用作为函数参数，这个函数就是在借用参数的原本的数据。同时，函数也不拥有这个参数的所有权
  * 引用加 mut 也可以实现可变; `&mut str`。 
  * 可变引用最多只允许同时存在1个。用来防止数据竞争的问题
  * 不允许同时存在可变和不可变引用。
```rust
fn main() {
  let mut s1 = String::from('xx')
  aa(&mut s1) 
}

fn aa(s: &mut String){
  println!("{}",s)
}
// --------------------------
fn a(s:&mut u32){
    *s=44;
    println!("{s}")
}
fn main() {
    let mut s1 = 10u32;
    a(&mut s1);
    println!("{}",s1);
}
```
  * rust保证永远不会出现悬空引用，如果引用无效，rust在编译期间就会给出一个生命周期的错误

## 切片(slice)
  * 不持有所有权的数据类型
  * 字符串的字面值本身就是个切片
  * 字符串切片的类型是`&str`

