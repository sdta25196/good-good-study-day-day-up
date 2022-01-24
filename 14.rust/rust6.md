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


* [rust枚举文档](https://doc.rust-lang.org/std/option/enum.Option.html)
