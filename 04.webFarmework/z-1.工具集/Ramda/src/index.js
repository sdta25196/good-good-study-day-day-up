const R = require('ramda');

// // 过滤数组
// let r = R.filter(e => e > 2)([1, 2, 3, 4])

// // 过滤数组使用R.__占位
// let d = R.filter(R.__, [1, 2, 3, 4])
// console.log(d(e => e > 3))

// // 使用pipe 链式调用
// const c1 = (d) => {
//   return d.filter(e => e > 2)
// }
// let c = R.pipe(
//   R.map,
//   c1
// )
// console.log(c(e => e + 2, [1, 2, 3]))

// // 交换函数前两个参数的位置
// var mergeThree = (a, b, c) => [].concat(a, b, c);
// console.log(R.flip(mergeThree)(1, 2, 3));



// function a1(a){
//   return a + 1
// }
// function a2(a){
//   return a + 2
// }
// function a3(a){
//   return a + 3
// }

// let resCalc = R.pipe(a1,a2,a3)
// let num = 1
// console.log( resCalc(num))


// let count = 0;
// const factorial = R.memoizeWith(R.identity, n => {
//   count += 1;
//   return R.product(R.range(1, n + 1));
// });
// factorial(5); //=> 120
// factorial(5); //=> 120
// factorial(5); //=> 120
// count; //=> 1

let c = {
  d: 1,
  c: 2
}
const obj1 = {
  originalProperty: true,
  d: c
};
const obj2 = {
  originalProperty: true,
  d: {
    d: 2,
    c: 2
  }
};

console.log(R.equals(obj1, obj2))
console.log(R.equals([1, 2, 3, 4], [7, 6, 5, 4, 3]))