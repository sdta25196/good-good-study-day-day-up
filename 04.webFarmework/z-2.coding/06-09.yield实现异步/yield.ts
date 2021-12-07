
// Generator<number, void, number> yield返回类型\ 函数返回值\ next传参类型(第三个参数可以不写，不写默认unknown)
function* genertaor(): Generator<number, void, number> {
  console.log(123);
  const x = yield 1
  console.log(x);
  yield 12
  yield 13
  yield 14
}

const it = genertaor()
it.next()
it.next(5) // x的值



function* gf(){
  yield 1
  yield 12
  yield 13
}
function *g(){
  yield *gf() //
}
const a = g()
let c = a.next() //第一次执行到yield1
console.log(c);