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
```
  * rust保证永远不会出现悬空引用，如果引用无效，rust在编译期间就会给出一个生命周期的错误

## 切片(slice)
  * 不持有所有权的数据类型
  * 字符串的字面值本身就是个切片
  * 字符串切片的类型是`&str`


## 切换源
`where cargo`

进入`.cargo`文件夹中，创建`config`文件。粘贴内容：
```json
  [source.crates-io]
  registry = "https://github.com/rust-lang/crates.io-index"
  replace-with = 'ustc'
  [source.ustc]
  registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```