//! 二叉搜索树
// 一个树
class Node {
  key
  left
  right
  constructor(key, left, right) {
    this.key = key
    this.left = left
    this.right = right
  }
}

const getNewNode = (key) => {
  return new Node(key)
}

// 插入函数返回新节点地址
const insert = (root, key) => {
  if (!root) return getNewNode(key)
  if (root.key == key) return root;
  if (key < root.key) root.left = insert(root.left, key)
  else root.right = insert(root.right, key)
  return root
}

// 找到前驱节点
const predeccessor = (root) => {
  let temp = root.left
  while (temp && temp.right) {
    temp = temp.right
  }
  return temp
}

//删除
const erase = (root, key) => {
  if (!root) return root
  if (key < root.key) {
    root.left = erase(root.left, key)
  } else if (key > root.key) {
    root.right = erase(root.right, key)
  } else {
    //! 判断度为0的节点
    //! 此处注释掉判断度为0的节点即可，度为0时，进入到度为1的判断，就会得到一个空节点，所以无需单独处理度为0
    // if (!root.left && !root.right) {  
    //   return null
    // } else 
    if (!root.left || !root.right) {
      //! 判断度为1的节点 - 
      let temp = root.left ? root.left : root.right
      return temp
    } else {
      //! 判断度为2的节点
      let temp = predeccessor(root)
      root.key = temp.key //删除度为2的节点，把前驱节点替换到当前节点，然后删除前驱节点
      root.left = erase(root.left, temp.key)
    }
  }
  return root
}

// 中序遍历输出
const op = (root) => {
  if (!root) return
  op(root.left)
  console.log(root.key);
  op(root.right)
}

// 测试用例
let root = getNewNode(4)
insert(root, 2)
insert(root, 3)
insert(root, 5)
console.log(root);
erase(root, 5)
console.log(root);