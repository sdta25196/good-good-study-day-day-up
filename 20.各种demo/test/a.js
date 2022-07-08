// function fn(...s){
//   console.log(this.x,s)
// }
// Reflect.apply(fn,{x:1},[1,2])
// var a = Reflect.ownKeys(Object.assign({c:2},{x:1,v:2},{f:1,v:3}))
// console.log(a);
// console.log(123,document.readyState);

let tree = [1, 2, 3, 4, 5, null, 6, 7, 8, null, 9];
// f = (arr) => {
//   if (arr.length < 3) { return arr }

// }
let queue = [];
let ans = [];
let index = 0;
queue.push(tree[0])
while (queue[index] || queue.length) {
  ans.push(queue.shift())
  if (tree[2 * index + 1]) {
    queue.push(tree[2 * index + 1])
  }
  if (tree[2 * index + 2]) {
    queue.push(tree[2 * index + 2])
  }
  index++
}
console.log(ans);

let ccc = {a:1,b:{v:2}}
console.log(ccc);
console.log(JSON.stringify(ccc,null,2));