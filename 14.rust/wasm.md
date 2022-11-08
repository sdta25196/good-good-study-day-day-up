
## 安装wasm-pack

[wasm-pack安装地址](https://rustwasm.github.io/wasm-pack/installer/)

## 编写wasm

* `cargo new --lib hello-wasm`初始化一个lib库
* 需要依赖`wasm_bindgen`, `src/lib.rs`示例如下：

```rust
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub unsafe fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

```

## 测试wasm

1. `wasm-pack build`

2. 在`/pkg` 下执行 `yarn link`

3. 新建`/www`，随便创建一个webpack服务，引入编译的wasm包，包名是Cargo.toml中的name

4. 在`/www` 下执行`yarn link [Cargo.toml中的name]`

5. 在`/www` 下执行`yarn start`即可看到wasm中的效果

6. 想要更新wasm-pack，只需要在根目录再次执行`wasm-pack build`即可

## 发布npm

* `wasm-pack login` 登录npm账号
* `wasm-pack build` 编译wasm
  * `wasm-pack build --scope npm_username` 可以打包到自己的账号空间下
* `wasm-pack publish` 发布
