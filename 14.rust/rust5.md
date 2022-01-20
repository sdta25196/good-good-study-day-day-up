# 第5章 chapter 5

## struct 结构体
  定义结构体，需要使用 `struct` 关键字并为整个结构体提供一个名字。结构体的名字需要描述它所组合的数据的意义。在大括号中，定义每一部分数据的名字和类型，我们称为 **字段（field）**。

```rust
  struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
  }

  let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
  };
```

> 整个实例必须是可变的；Rust 并不允许只将某个字段标记为可变。

函数可以隐式的返回一个struct, 可以通过key与value用一个名字来简写字段 
```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```
## 结构体更新语法（struct update syntax）

`..` 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值。需要写在最后且没有尾随逗号
```rust
// 旧写法
let user2 = User {
    active: user1.active,
    username: user1.username,
    email: String::from("another@example.com"),
    sign_in_count: user1.sign_in_count,
};
// 结构体更新语法
let user2 = User {
    email: String::from("another@example.com"),
    ..user1
};
```

> 注意！我们在创建 user2 后不能再使用 user1，因为 user1 的 username 字段中的 String 被移到 user2 中。如果我们给 user2 的 email 和 username 都赋予新的 String 值，从而只使用 user1 的 active 和 sign_in_count 值，那么 user1 在创建 user2 后仍然有效。active 和 sign_in_count 的类型是实现 Copy trait 的类型

## 元组结构体（tuple structs）

当你想给整个元组取一个名字，并使元组成为与其他元组不同的类型时，元组结构体是很有用的

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```
> black 和 origin 值的类型不同，因为它们是不同的元组结构体的实例。你定义的每一个结构体有其自己的类型，即使结构体中的字段有着相同的类型。

## 类单元结构体（unit-like structs）
```rust
  struct AlwaysEqual;

  let subject = AlwaysEqual;
```