interface Function {
  _bind(this: Function, thisArg: any, ...argArray: any[]): any
}

function foo(this: any, d: any, v: any) {
  console.log(d, v);
  console.log(this);
}
/**挂到 Object 上就可以让this上没有这个sm参数*/
Function.prototype._bind = function (thisArg: any, ...argArray: any[]): any {
  const fn = this
  const sm = Symbol('bind')
  return () => {
    //@ts-ignore
    Object.prototype[sm] = fn
    const res = thisArg[sm](...argArray)
    //@ts-ignore
    delete Object.prototype[sm]
    return res
  }
}
// Function.prototype._bind = function (thisArg: any, ...argArray: any[]): any {
//   const fn = this
//   const sm = Symbol('bind')
//   return () => {
//     thisArg[sm] = fn
//     const res = thisArg[sm](...argArray)
//     delete thisArg[sm]
//     return res
//   }
// }

const obj = { a: 1 }
let c = foo._bind(obj, 123, 6616)
c()