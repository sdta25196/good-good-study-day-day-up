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


## 打印结构体

1. 给结构体加上宏`#[derive(Debug)]`
2. `println!`宏 需要使用`{:?}`来声明此处要使用`Debug`输出格式，`Debug`是一个trait

```rust
  #[derive(Debug)]
  struct Rectangle {
      width: u32,
      height: u32,
  }

  fn main() {
      let rect1 = Rectangle { width: 30, height: 50 };

      println!("rect1 is {:?}", rect1);
  }
```
> 还可以使用`{:#?}`来使输出格式更适合阅读，也可以使用dbg!宏`dbg!(&rect1)`来输出


## 方法语义

方法与函数类似：它们使用 fn 关键字和名称声明，可以拥有参数和返回值，同时包含在某处调用该方法时会执行的代码。不过方法与函数是不同的，因为它们在结构体的上下文中被定义，并且它们第一个参数总是 self，它代表调用该方法的结构体实例。

示例代码如下:
```rust 
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    //此处&self是self:&self的缩写
    fn area(&self) -> u32 { 
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

### 方法可与字段重名

方法可与字段重名，在main 中，当我们在 rect1.width 后面加上括号时。Rust 知道我们指的是方法 width。当我们不使用圆括号时，Rust 知道我们指的是字段 width。

我们需要使用`impl`代码块来声明方法，`impl`可以定义多个，但是不可以重复定义方法名

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

## 关联函数（associated functions）

`impl` 块中定义的函数被称为 关联函数,因为它们与 impl 后面命名的类型相关

我们可以定义不以 self 为第一参数的关联函数（因此不是方法），使用结构体名和 :: 语法来调用这个关联函数：比如 `let sq = Rectangle::square(3);`。这个方法位于结构体的命名空间中：:: 语法用于关联函数和模块创建的命名空间。 示例：

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
fn main(){
  let sq = Rectangle::square(3);
}
```

