// function compose(...funs) {
//   function reduce(a, b) {
//     return (...args) => {
//       return a(b(...args))
//     };
//   }
//   return funs.reduce(reduce);
// }
// f1 = (a) => {
//   console.log(a);
//   return ++a
// }
// f2 = (a) => {
//   console.log(a);
//   return ++a
// }
// f3 = (a) => {
//   console.log(a);
//   return ++a
// }
// // compose(f1, f2, f3)(1)
// f1(f2(f3(1)));

// [f1, f2, f3].reduce((a, b) => (arg) => { a(b(arg)) })(1);
function a(x1) {
  return x => y => {
    console.log(x1, x, y);
  }
}

a(1)(2)(3)
c = x => y => x + y;
console.log(c(1)(20));;
