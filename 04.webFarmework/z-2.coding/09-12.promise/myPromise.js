// 第一步 定义my promise类
// 第二步 定义三个状态。pending reject fulfill
// 定义执行队列
// 定义resolve和reject函数，函数中分别修改状态，循环执行队列中的任务

// 第三步 默认状态为pendi 构造函数中直行回调函数。
// 任函数的实现
// 返回一个my promise对象，这个对象中判断当前的状态，如果当前状态是pending，就把所有回调函数注册到队列中， Resolve和reject转盘，可以直接执行


const type = {
  PENDING: "PENDING",
  FULFILL: "FULFILL",
  REJECT: "REJECT",
}

class MyPromise {

  value;
  state = type.PENDING;
  pendingWork = [];


  resolve = (val) => {
    if (this.state !== type.PENDING) return
    this.state = type.FULFILL
    this.value = val
    this.pendingWork.forEach(work => {
      work(val)
    })
  }

  reject = () => {
    if (this.state !== type.PENDING) return
    this.state = type.REJECT
  }

  constructor(fun) {
    fun(this.resolve, this.reject)
  }

  then(res, rej) {
    return new MyPromise((resolve, reject) => {
      switch (this.state) {
        case type.PENDING:
          this.pendingWork.push((val) => resolve(res(val)))
          break
        case type.FULFILL:
          resolve(res(this.value))
          break
        case type.REJECT:
          break
      }
    })
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
}).then(e => {
  console.log(e);
})