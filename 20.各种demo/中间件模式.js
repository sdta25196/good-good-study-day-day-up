// 极限组合代码
const compoes = (...funlist) => funlist.reduceRight((x, y) => (...args) => x(y(...args)))

// const compoes = (...funlist) => {
//   return function (args) {
//     let result = args;
//     for (let i = 0; i < funlist.length; i++) {
//       result = funlist[i](result)
//     }
//     return result
//   }
// }

const a = (x, b) => x + b + 1
const b = (x) => x + 1
const c = (x) => x + 1

let d = compoes(a, b, c)
console.log(d(1, 2))

// 中间件模式

class MiddlePattern {
  constructor() {
    this.ctx = { name: 'ty', age: '30' }
  }

  use(...customMiddle) {
    // 使用组合，并且防止用户修改原始参数
    return compoes(...customMiddle)(
      Object.defineProperties(this.ctx, {
        'name': {
          writable: false
        },
        'age': {
          writable: false
        }
      })
    )
  }

  getCtx() {
    return this.ctx
  }
}

const m = new MiddlePattern()

const f1 = (ctx) => {
  ctx['name'] = true
  ctx['f1'] = true
  return ctx
}
const f2 = (ctx) => {
  ctx['f2'] = true
  return ctx
}

//  使用真实的getctx之前，可以使用m.use自定义扩展ctx
m.use(f1)
m.use(f2)

console.log(m.getCtx()) 