class Queue {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }

  push(x) {
    this.arr.push(x);
    this.tail++;
  }

  top() {
    return this.arr[this.head];
  }
  pop() {
    this.head++
  }

  getAll() {
    return this.arr.slice(this.head, this.tail)
  }

  size() {
    return this.head == this.tail
  }
}

async function fn() {
  let q = new Queue()
  for (let i = 0; i < 5; i++) {
    q.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(i);
          resolve();
        }, 2000)
      })
    })
  }
  while (!q.size()) {
    await q.top()();
    q.pop();
  }
}
fn()
  // ifee
  // 不是用r() 会卡在第一次输出之后就不动了
  // 不使用await 会在一秒后一次输出全部
  + async function () {
    for (let i = 0; i < 5; i++) {
      await new Promise((r, j) => {
        setTimeout(() => {
          console.log(i + 20);
          r();
        }, 1000)
      })
    }
  }()

console.log("开始啦");