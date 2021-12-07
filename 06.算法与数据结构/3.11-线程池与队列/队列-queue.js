// 队列：
// 线性数据结构，FIFO，一片连续的存储区，基本操作出队、入队、判空、判满、队首元素、队列中元素、队列长度
// 普通队列，队首出队尾入、fifo;
// 循环队列，解决普通队列的假溢出现象；
// 优先队列，允许插入数据；
// 双向队列，队首与队尾都可以入队出队；
// 左闭右开原则，通常队列尾指针指向了队列最后一个元素的下一个空元素 [1,2,3,4,5] 头指针指向1，尾指针指向6(5的下一位空指针)

/*
*
* @author: 田源
* @date: 2021-03-12 19:26
* @description: 普通队列实现
*
*/
(() => {
  class Queue {
    constructor(n) {
      this.arr = Array(n);
      this.head = 0; // 队列头指针
      this.tail = 0; // 队列尾指针
    }
    // 入队操作
    push(x) {
      if (this.isFull()) {
        console.log("队列已满");
        return;
      }
      this.arr[this.tail] = x;
      this.tail += 1;
    }

    // 出队操作
    pop() {
      if (this.isEmpty()) {
        console.log("队列为空，出队失败");
        return;
      }
      this.head += 1;
    }

    // 队列是否为空
    isEmpty() {
      return this.head == this.tail;
    }
    // 队列是否满了
    isFull() {
      return this.tail == this.arr.length
    }
    // 获取队首元素
    getFront() {
      return this.arr[this.head];
    }
    // 队列数据长度
    getSize() {
      return this.tail - this.head;
    }
    // 队列拥有元素
    getItem() {
      for (let i = this.head; i < this.tail; i++) {
        console.log("item:", this.arr[i]);
      }
    }
  }

  let queue = new Queue(5);
  console.log(queue.isEmpty());
  queue.push(1);
  queue.push(2);
  queue.getItem();
  queue.pop();
  console.log(queue.getSize());
  queue.getItem();
})();
/*
*
* @author: 田源
* @date: 2021-03-12 19:26
* @description: 循环队列实现
*
*/
(() => {
  class Queue {
    constructor(n) {
      this.arr = Array(n);
      this.head = 0; // 队列头指针
      this.tail = 0; // 队列尾指针
      this.count = 0; // 当前队列元素数量, 更加方便的用来判断空和满
    }
    // 入队操作
    push(x) {
      if (this.isFull()) {
        console.log("队列已满");
        return;
      }
      this.arr[this.tail] = x;
      this.tail += 1;
      this.count += 1;
      if (this.tail == this.arr.length) this.tail = 0;
    }

    // 出队操作
    pop() {
      if (this.isEmpty()) {
        console.log("队列为空，出队失败");
        return;
      }
      this.head += 1;
      this.count -= 1;
      if (this.head == this.arr.length) this.head = 0;
    }

    // 队列是否为空
    isEmpty() {
      return this.count == 0;
    }
    // 队列是否满了
    isFull() {
      return this.count == this.arr.length;
    }
    // 获取队首元素
    getFront() {
      return this.arr[this.head];
    }
    // 队列数据长度
    getSize() {
      return this.count;
    }
    // 队列拥有元素
    getItem() {
      for (let i = 0, j = this.head; i < this.count; i++) {
        console.log("item:", this.arr[j]);
        j += 1;
        if (j == this.arr.length) j = 0;
      }
    }
  }

  let queue = new Queue(6);
  console.log(queue.isEmpty());
  queue.push(1);
  queue.push(2);
  queue.push(3);
  queue.push(4);
  queue.push(5);
  queue.getItem();
  console.log(queue.isFull());
  queue.pop();
  console.log(queue.getSize());
  queue.getItem();
  console.log(queue.head);
})();