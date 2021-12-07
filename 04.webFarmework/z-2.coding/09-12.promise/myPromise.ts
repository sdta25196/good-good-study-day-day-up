// promise是个异步的解决方案，是个可能发生在未来的值。 其本质是个状态机
// 还缺个catch得实现，挺麻烦得
enum States {
  PENDING,
  FULLFILLED,
  REJECTED
}

type Reslover<T> = (val: T) => void
type Rejector = (ex: any) => any
type Executor<T> = (resolve: Reslover<T>, reject: Rejector) => void
type Fullfiller<T, R> = (val: T) => R

class MyPromise<T> {
  value: T
  state: States = States.PENDING
  pendingWorks: Array<Reslover<any>> = []
  pendingWorkRejects: Array<Rejector> = []

  //! 2 - 当promise被解决的时候，调用队列中所有的任务
  private resolve = (val: T) => {
    if (this.state !== States.PENDING) return
    this.value = val
    this.state = States.FULLFILLED
    this.pendingWorks.forEach(work => {
      work(val)
    })
  }
  //! 2 - 当promise被拒绝的时候，调用队列中所有的任务
  private reject = (ex: any) => {
    if (this.state !== States.PENDING) return
    this.value = ex
    this.state = States.REJECTED
    this.pendingWorkRejects.forEach(work => {
      work(ex)
    })
  }

  constructor(executor: Executor<T>) {
    executor(this.resolve, this.reject)
  }

  public then<R>(fullfiller: Fullfiller<T, R>, rejectfiller?: Fullfiller<T, R>): MyPromise<R> {
    //! 链式调用
    return new MyPromise<R>((resolve, reject) => {
      switch (this.state) {
        case States.PENDING: //! 1-此时，如果promise还未解决,就把任务放到队列中
          //!fullfiller(val) 这一步导致了then中可以return一个值被下一个then收到
          const pendingWork = (val: T) => resolve(fullfiller(val))
          this.pendingWorks.push(pendingWork)
          // 拒绝promise的队列
          const pendingWorkReject = (val: T) => reject(rejectfiller(val))
          this.pendingWorkRejects.push(pendingWorkReject)
          break;
        case States.FULLFILLED://! 1-此时，如果promise被解决了，就直接处理
          resolve(fullfiller(this.value))
          break;
        case States.REJECTED://! 1-此时，如果promise被拒绝了，就直接处理
          reject(rejectfiller(this.value))
          break;
      }
    })
  }

  //TODO 这里需要处理一下异常情况
  public catch(fun: (x: string) => void) {
    fun("抓到异常了")
  }
}

new MyPromise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(666)
    // reject(666)
  }, 1000)
}).then((data) => {
  console.log(data);
  return 888;
}, (rej) => {
  console.log(rej, "出错了");
  return 888
}).then(e => {
  console.log(e);
}).catch((ex) => {
  console.log(ex);
})