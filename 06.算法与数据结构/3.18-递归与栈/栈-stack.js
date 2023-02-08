// 栈：
// 线性数据结构，FILO，一片连续的储存空间，基本操作出栈、入栈、栈顶元素
// 用来解决完全包含关系的数据结构
// linux线程栈 默认为8M； 800万字节，一个整型4个字节，两百万整型同时入栈就会造成爆栈

// 实现方式一: 使用数组
class Stack {
  constructor() {
    this.arr = [];
  }
  // 入栈
  push(val) {
    this.arr.push(val)
  }
  // 出栈
  pop() {
    if (this.isEmpty()) return false;
    this.arr.pop();
  }
  // 栈是否为空
  isEmpty() {
    return this.arr.length == 0
  }
  // 获取栈大小
  size() {
    return this.arr.length
  }
  // 输出栈中元素
  output() {
    for (let index = this.arr.length - 1; index >= 0; index--) {
      console.log(this.arr[index]);
    }
  }
}
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.pop();
stack.output();
stack.pop();
stack.output();
console.log("------------------");
// 实现方式二，逻辑出栈
class Stack1 {
  constructor() {
    this.data = [];
    this.top = -1;
  }
  // 入栈
  push(val) {
    this.top += 1;
    this.data[this.top] = val;
  }
  // 出栈
  pop() {
    if (this.isEmpty()) return false;
    this.top -= 1;
  }
  // 栈是否为空
  isEmpty() {
    return this.top == -1
  }
  // 获取栈大小
  size() {
    return this.top + 1
  }
  // 输出栈中元素
  output() {
    for (let index = this.top; index >= 0; index--) {
      console.log(this.data[index]);
    }
  }
}
let stack1 = new Stack1();
stack1.push(1);
stack1.push(2);
stack1.push(3);
stack1.push(4);
stack1.pop();
stack1.pop();
stack1.push(4);
stack1.output();