/** 
 * @name 解决redux异步获取函数，真异步消息驱动架构，不同与thunk\saga，不用区分async函数
 * 
 */

/**判断是不是迭代器 */
export function isIterator(obj: any): obj is Iterator<any> {
  if (obj === null) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

/** 递归执行迭代器 */
function runIterator(it: Iterator<any, any, any>, val: any = null) {
  const { done, value } = it.next(val);
  if (!done) {
    resolvePromise(value)
      .then(resolved => {
        runIterator(it, resolved)
      })
  }
}

// 处理promise
async function resolvePromise(promise: Promise<any>) {
  try {
    while (promise instanceof Promise) {
      promise = await promise
    }
    return promise
  } catch (ex) {
    throw ex
  }
}

export function asyncRunner(fn: () => Generator<any, any, any>) {
  const it = fn()
  if (isIterator(it)) {
    runIterator(it)
  }
}

function error() {
  throw new Error("this is an error")
}

/** 测试用例  可以解决 yield 异步与同步情况*/
const testAsyncFun = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
}
// asyncRunner(function* () {
//   try {
//     let x = yield 1
//     const y = x + (yield 2)
//     const z = y + (yield testAsyncFun())
//     console.log(z);
//     yield error()
//   } catch (ex) {
//     console.log(ex);
//   }
// })
// console.log(6666);
// 补充 如果想处理其他generator函数，需要再次编写新的处理函数
// takeAll,获取generator函数所有value
// takeFirst,获取第一个value,此处未实现
function takeAll(fn: () => Generator<any, any, any>) {
  // 此处处理 Generator函数 fn,
  const arr = Array<any>()
  for (const it of fn()) {
    arr.push(it)
  }
  return () => Promise.resolve(arr)
}
/** 测试用例 */
function* t() {
  yield 1
  yield 12
  yield 13
}
// asyncRunner(function* () {
//   let x = yield takeAll(t)()
//   console.log(x); // [1,12,13]
// })