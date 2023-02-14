## husky

husky🐶，哈士奇。现代原生git钩子，支持linux、mac、windows

进行git提交或推送时，可以使用它来整理**提交消息、运行测试、lint 代码**等

## 使用

### 1.安装

npm：`npm install husky --save-dev`

yarn：`yarn add husky -D`

### 2.初始化git钩子

`npx husky install`

会在根目录下生产一个`.husky`文件夹。

### 3.新增prepare脚本

编辑`package.json`

```js
  // package.json
  {
    "scripts": {
      "prepare": "husky install"
    }
  }
```
如果想要自定义husky路径，例如`.config`，可以配置为 `"prepare": "husky install .config/husky"`

### 4.创建钩子命令

`npx husky add .husky/pre-commit "yarn lint"`

此时在执行`git commit`前将会先执行`yarn lint`，如果`yarn lint`执行失败，将不会执行`git commit`

### 5.测试钩子

`git add .husky/pre-commit`

`git commit -m "测试钩子提交"`

如果`yarn lint`命令失败，本次提交将自动中止。

> 对于 Windows 用户，如果在运行时看到帮助消息`npx husky add ...，请尝试node node_modules/.bin/husky add ...改用。`这不是 husky 代码的问题，并且在 npm 8 的最新版本中已修复。

> yarn2 的安装方式与上述不一样。可参考官方文档[husky的yarn2安装方式](https://typicode.github.io/husky/#/?id=yarn-2)

## 绕开钩子

可以使用Git选项`-n/--no-verify`绕过`pre-commit`

`git commit -m "这次不会触发钩子" --no-verify`

如果Git命令没有`--no-verify`选项，可以使用HUSKY环境变量`HUSKY=0`：

`HUSKY=0 git push`

## windows上的问题

在 Windows 上将 Yarn 与 Git Bash结合使用时，Git 挂钩可能会失败`stdin is not a tty`。

使用以下解决方法:

1. 创建`.husky/common.sh`：
  
```shell
  command_exists () {
    command -v "$1" >/dev/null 2>&1
  }

  # Workaround for Windows 10, Git Bash and Yarn
  if command_exists winpty && test -t 1; then
    exec < /dev/tty
  fi
```

2. 在 Yarn 用于运行命令的地方使用它：

此处示例为`/.husky/pre-commit`文件中新增`. "$(dirname -- "$0")/common.sh"`

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
. "$(dirname -- "$0")/common.sh"

yarn ...
```

## 更多

* [官方文档](https://typicode.github.io/husky/)