LazyMan('Hank')
  .sleep(5)
  .eat('dinner')
  .eat('supper')
  .sleepFirst(2)



// promise 队列

// 利用事件循环处理

// 链式调用return自己

// 利用事件循环来保证run函数在链式调用之后执行, paomise那种形式是利用回调函数来实现队列中函数的调用
function LazyMan(name) {

  const waitHandle = [async () => console.log(name)]

  const _sleep = (time) => {
    return new Promise(res => {
      setTimeout(() => {
        console.log('sleep')
        res()
      }, time * 1000)
    })
  }
  const ctx = {
    eat: () => {
      waitHandle.push(async () => { console.log('eat') })
      return ctx
    },
    sleep: (time) => {
      waitHandle.push(async () => _sleep(time))
      return ctx
    },
    sleepFirst: (time) => {
      waitHandle.unshift(async () => _sleep(time))
      return ctx
    }
  }

  const run = async () => {
    for (let fn of waitHandle) {
      await fn()
    }
  }
  setTimeout(run)
  return ctx
}