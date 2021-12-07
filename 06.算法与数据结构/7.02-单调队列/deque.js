/*
*
* @author: 田源
* @date: 2021-07-02 22:02
* {@arr Array} 数据数组
* {@k int}窗口长度
*/

// 需要维护下标，que中存储下标。否则出队操作无法进行。
// 输出以K为长度的窗口中最小值与最大值
function deque(arr, k) {
  let que = []; // 单调队列
  // 维护最小值
  for (let i = 0; i < arr.length; i++) {
    // 维护单调性，最小值，如果单调队列中的值比当前最小值大，就需要删除
    while (que.length && arr[que[que.length - 1]] > arr[i]) que.pop();
    // 维护入队
    que.push(i)
    // 维护出队，单调队列中元素达到窗口长度，队首出队
    if (i - que[0] == k) que.shift();
    if (i + 1 < k) continue;
    console.log(arr[que[0]])
  }
  console.log(" ");
  // 维护最大值
  que = [];
  for (let i = 0; i < arr.length; i++) {
    // 维护单调性，违反最大值单调性就需要删除
    while (que.length && arr[que[que.length - 1]] < arr[i]) que.pop();
    // 维护入队
    que.push(i)
    // 维护出队，维护元素的生命周期，不在窗口中的元素。就需要出队
    if (i - que[0] == k) que.shift();
    if (i + 1 < k) continue;
    console.log(arr[que[0]])
  }
}

let test = [1, 3, -1, -3, 5, 3, 6, 7]
let k = 3
deque(test, k)