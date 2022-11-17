## wasm介绍以及项目落地

此篇为wasm的介绍以及如何落地一个wasm项目，不涉及详细的rust编写

Rust学习请移步[Rust 程序设计语言](https://doc.rust-lang.org/book/title-page.html)、[Rust 官方文档](https://www.rust-lang.org/zh-CN/)


## wasm简介

WebAssembly 是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码而是为诸如 C、C++和 Rust 等低级源语言提供一个高效的编译目标。

对于网络平台而言，这具有巨大的意义——这为客户端 app 提供了一种在网络平台以接近原生速度的方式运行多种语言编写的代码的方式；在这之前，客户端 app 是不可能做到的。

而且，你在不知道如何编写 WebAssembly 代码的情况下就可以使用它。WebAssembly 的模块可以被导入的到一个网络 app（或 Node.js）中，并且暴露出供 JavaScript 使用的 WebAssembly 函数。JavaScript 框架不但可以使用 WebAssembly 获得巨大性能优势和新特性，而且还能使得各种功能保持对网络开发者的易用性。

> tips: 我们可以用C、C++、Rust来编写WebAssembly，然后将其打包成为npm包提供给前端使用。

目前RUST、WebAssembly在前端的主要应用场景有两个：

* 计算密集型任务。js处理异常耗时的任务，可以使用wasm编写处理逻辑。
* 前端工具。例如前端的打包工具，rust编写的turbopack号称比js编写的webpack快700倍。

## wasm项目落地

此示例为rust编写wasm。需要先安装[rust环境](https://www.rust-lang.org/zh-CN/tools/install)、[node环境](https://nodejs.org/zh-cn/download/)。

### 安装wasm-pack

编写wasm之前，需要先安装wasm-pack。

wasm-pack 是 Rust-Wasm 官方工作组开发，用于构建wasm应用程序的工具。

wasm-pack可以把我们的rust代码，编译成npm包，发布到npm上。

[wasm-pack安装地址](https://rustwasm.github.io/wasm-pack/installer/)

### 编写rust

1. 使用`cargo new --lib hello-wasm`初始化一个lib库
2. `hello-wasm`需要依赖`wasm_bindgen`库, `src/lib.rs`示例如下：

```rust
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {   // 定义个alert函数，使用的是js中的
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub unsafe fn greet(name: &str) {  // 对外抛出一个greet函数，js可以调用greet(666)
    alert(&format!("Hello, {}!", name));
}

```

`Cargo.toml`添加如下代码：

```rust
[dependencies]
wasm-bindgen = "0.2.83"
```

> [wasm_bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)是一个 Rust 库和 CLI 工具，可以促进 wasm 模块和 JavaScript 之间的高级交互

### 打包wasm 

打包前需要在Cargo.toml中添加lib标签，表示这个库是提供给其他项目使用的。

```rust
[lib]
crate-type = ["cdylib", "rlib"]
```

此时完整的Cargo.toml文件如下：

```rust
[package]
name = "hello-wasm"
version = "0.1.0"
authors = ["xxxx@yeah.net"]
description = "A sample project with wasm-pack"
license = "MIT/Apache-2.0"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2.83"
```

执行`wasm-pack build`，即可进行打包

打包完成后，根目录下回多出一个`pkg`目录，里面放的就是编译后的wasm

### 测试wasm

rust编写完成之后，我们需要测试一下代码。只需要打包之后link到另外一个node服务中即可

1. `wasm-pack build`打包

2. 在`/pkg` 下执行 `yarn link`

3. 新建`/www`，在下面创建一个node服务, 因为我们此处示例是`alert`,所以可以创建一个wabpack服务。

4. 在webpack服务js文件中，导入编译的wasm包，**包名是Cargo.toml中的name**，此处是`hello-wasm`

```js
import { greet } from "hello-wasm";

greet("测试弹窗")

```

5. 在`/www` 下执行`yarn link hello-wasm`

6. 在`/www` 下执行`yarn start`即可看到wasm中的效果

7. 此时如果想要更新wasm-pack，只需要在根目录再次执行`wasm-pack build`即可

### 发布到npm

测试完成，就可以把wasm发布到npm包了。

1. `wasm-pack login` 登录npm账号

2. `wasm-pack build` 编译wasm
  * `wasm-pack build --scope npm_username` 可以打包到自己的账号空间下

3. `wasm-pack publish` 发布即可

发布成功之后，即可在前端项目中直接安装`hello-wasm`进行使用了。