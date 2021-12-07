// 判断两个序列的趋势是否一致
// 把两个序列分别生成单调队列,如果单调队列长度不一致了,就证明两个序列趋势不一样了
function deque(arr, arr2, l) {
  let q = [];
  let q2 = [];
  let i;
  for (i = 0; i < l; i++) {
    while (q.length && arr[i] < q[q.length - 1]) q.pop();
    while (q2.length && arr2[i] < q2[q2.length - 1]) q2.pop();
    q.push(arr[i])
    q2.push(arr2[i])
    if (q.length !== q2.length) break;
  }
  console.log(i);
}

let arr = [3, 1, 5, 2, 4]
let arr2 = [5, 2, 4, 3, 1]
deque(arr, arr2, 5)  // 4 在下标4的位置两个序列的趋势变的不一致了




