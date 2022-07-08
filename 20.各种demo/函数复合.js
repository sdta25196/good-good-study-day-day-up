// 函数复合
function compose(...funs) {
  return funs.reduce((a, b) => {
    return (...args) => a(b(...args)) //先走f2
    // return (...args) => b(a(...args)) //先走f1
  })
}
function compose1(...funs) {
  return function (...args) {
    let result = args;
    //先走f1
    for (let i = 0; i < funs.length; i++) {
      result = [funs[i](...result)]
    }
    return result
  }
}

function f1(n) {
  return ++n
}
function f2(n) {
  return ++n
}
let n = compose(f1, f2)(2)
console.log("函数复合", n);
let n1 = compose1(f1, f2)(2)
console.log("函数复合1", n1);


//函数柯里化
function currying(n_a) {
  return function (n_b) {
    return n_a + n_b
  }
}
let cur = currying(2)
console.log("柯里化", cur(4));
