## slate简介
  **当前版本号0.66.5**

  >  slate is a completely customizable framework for building rich text editors.
  
  slate 是一个用于构建富文本编辑器的完全可定制的框架。

  个人理解，slate可用来作为一个富文本编辑器内核，在此基础上，可以完全自主的开发自己的富文本编辑器

  如果对富文本编辑器的自定义需求较多，slate是不二之选

  **tips: 需要使用者有一定的富文本相关的技能基础,例如： Range、Selection、anchor、focus等，可在MDN搜索查阅**

## 安装
  `yarn add slate slate-react`

## 常用核心概念
  * `Node` Node是一个联合类型，可以是 Editor | Element |Text
  * `NodeEntry` 迭代slate文档树时返回的对象，由Node 和 Path组成
  * `Element` 文档树中的元素,元素可以自定义属性，可以设置块级元素和行内元素
  * `Text` 文档中的内容，是Element的子节点，也是文档树中的叶子节点
  * `Editor` 编辑器对象 - 他有一堆用来操作编辑器的方法
  * `Location` 一个联合类型 可以是  Path | Point | Range
  * `Path` 代表某个Node的路径
  * `point` 代表文档中某个点
  * `Range` 范围，由起始两个point组成
  * `Transforms` 辅助编辑器对文档树操作的工具

  > 简单说就是，Editor作为编辑器对象，利用Location操作由各种Node组成的文档树，来实现对编辑器的完全控制，操作过程可使用Transforms辅助进行

## 一些常用操作

### 指定编辑器获取焦点
  ```JS
  ReactEditor.focus(editor)
  ```

### 编辑器全部选中
  ```JS
    Transforms.select(editor, [])
  ```
### 设置编辑器选区

  ```JS
    Transforms.select(editor, {
      anchor: { path:[0,1], offset: 0 },
      focus: { path:[0,1], offset: 2 },
    })
  ```
### 给编辑器选区添加指定的标记

  编辑器需要先选中

  ```JS
    editor.addMark(key, value)
  ```

### 给编辑器选区删除指定的标记

  编辑器需要先选中
  ```JS
    editor.removeMark(key)
  ```

### 获取指定属性的Node
  ```js
  let arr = Editor.nodes(editor, {
    match: n => n.ERR_HASH === 123, // 这里指定获取了属性 ERR_HASH = 123的节点
  })
  // arr 是一个generate，可使用for of循环遍历
  for(let [node,path] of arr){
    // todo
  }
  ```

### 把选区合并
  ```js
    Transforms.collapse(editor, { edge: 'focus' })  // 合并到focus位置
  ```

### 替换文案
  ```js
    // 可提前设置选区，也可以使用第三个参数设置范围 
    Transforms.insertText(editor, '替换文案')
  ```
## 更多

  [slate示例](https://www.slatejs.org/examples/richtext)
  [slate文档](https://docs.slatejs.org/)
  [slate源码](https://github.dev/ianstormtaylor/slate)