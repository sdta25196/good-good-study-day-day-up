
// 实现一个递增单调栈, 维护最近小于关系
function deStack(n, arr) {
  let stack = [];
  let pre = [], next = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      next[stack[stack.length - 1]] = i; //维护下一个小于arr[i]的元素
      stack.pop();
    }
    if (stack.length == 0) {
      pre[i] = -1;
    } else {
      pre[i] = stack[stack.length - 1]
    }
    stack.push(i)
  }
  while (stack.length) next[stack[stack.length - 1]] = n, stack.pop();
  let ind = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  console.log("ind ", ind.join("   "));
  console.log("arr ", arr.join("   "));
  console.log("pre ", pre.join("   "));
  console.log("next", next.join("   "));
}

// 测试用例
let arr = [6, 7, 9, 0, 8, 3, 4, 5, 1, 2]
deStack(10, arr)