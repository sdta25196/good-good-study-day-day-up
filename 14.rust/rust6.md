# 第6章 chapter 6

## 枚举 enumerations

枚举（enumerations），也被称作 enums。枚举允许你通过列举可能的 成员（variants） 来定义一个类型。

## 定义枚举

使用关键词`enum`来定义一个枚举。

> 枚举的成员位于其标识符的命名空间中，并使用两个冒号分开, 这种设计可以带来一个好处是`IpAddrKind::V4`和`IpAddrKind::V6`都是`IpAddrKind`类型，方便后续使用

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

### 枚举可以被定义值

  如下：IpAddr 枚举的新定义表明了 V4 和 V6 成员都关联了 String 值

  ```rust
    enum IpAddr {
        V4(String),
        V6(String),
    }

    let home = IpAddr::V4(String::from("127.0.0.1"));

    let loopback = IpAddr::V6(String::from("::1"));
  ```

### 枚举可以使用impl

  ```rust
   enum IpAddr {
        V4(String),
        V6(String),
    }
    impl IpAddr {
      fn to_string(&self) {
          // 定义方法体
      }
    }
  ```

## Option
Option 是标准库定义的一个枚举,Option 类型应用广泛因为它编码了一个非常普遍的场景，即**一个值要么有值要么没值**。从类型系统的角度来表达这个概念就意味着编译器需要检查是否处理了所有应该处理的情况，这样就可以避免在其他编程语言中非常常见的 bug。**rust中没有null**,而Option是一个拥有一个可以编码存在或不存在概念的枚举。后续文章中讲解

```rust
  enum Option<T> {
    Some(T),
    None,
  }
```

## match控制流运算符

Rust 有一个叫做 match 的极为强大的控制流运算符，它允许我们将一个值与一系列的模式相比较，并根据相匹配的模式执行相应代码。

```rust
enum Coin {
  Penny,
  Nickel,
  Dime,
  Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {}
```

**甚至可以传参数**

```rust
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}

fn main() {
    value_in_cents(Coin::Quarter(UsState::Alaska));
}
```

### 匹配option<T>

Rust 中的匹配是 穷尽的（exhaustive）：必须穷举到最后的可能性来使代码有效。

```rust
fn main() {
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    println!("x,{:?}", six);
    let none = plus_one(None);
    println!("a,{:?}", none);
}

```

### 通配模式和 _ 占位符

使用`other` 代表所有其他可能性

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
```

使用`_` 可以匹配任意值，而不绑定到该值, 代表告诉 Rust 我们不会使用这个值，所以 Rust 也不会警告我们存在未使用的变量。

```rust
  let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(), // 使用一个函数，匹配值不是3或者7的时候，就会执行这个函数
        // _ => (),  使用元祖，代表此处无事发生
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
```

## if let 简洁控制流

`if let` 语法让我们以一种不那么冗长的方式结合 if 和 let，来处理只匹配一个模式的值而忽略其他模式的情况。

```rust
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }
```

`if let` 语法获取通过等号分隔的一个模式和一个表达式。

可以认为 if let 是 match 的一个语法糖，它当值匹配某一模式时执行代码而忽略所有其他值。



* [rust枚举文档](https://kaisery.github.io/trpl-zh-cn/ch06-00-enums.html)
