function foo(a, b, c, d) {
  console.log(a, b, c, d);
}

Function.prototype._call = function (thisArg, ...args) {
  const sm = Symbol('call')
  thisArg[sm] = this
  const result = thisArg[sm](...args)
  delete thisArg[sm]
  return result
}

Function.prototype._apply = function (thisArg, args) {
  const sm = Symbol('apply')
  thisArg[sm] = this
  const result = thisArg[sm](...args)
  delete thisArg[sm]
  return result
}
const obj = { x: 1 }

foo._call(obj, 1, 2, 3, 4, 4)
foo._apply(obj, [1, 2, 3, 4, 4])
