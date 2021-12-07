// 一种不稳定的排序，平均为O(logn) 最坏情况下为O(n²)
// 快排第一版 双递归
function quickSort(arr, l, r) {
  if (l >= r) return;
  let x = l, y = r, base = arr[l];
  while (x < y) {
    while (x < y && arr[y] >= base) y--;
    if (x < y) { arr[x] = arr[y]; x++ };
    while (x < y && arr[x] < base) x++;
    if (x < y) { arr[y] = arr[x]; y-- };
  }
  arr[x] = base;
  quickSort(arr, l, x - 1);
  quickSort(arr, x + 1, r);
}
let arr = [10, 9, 8, 4, 5, 7, 6, 3, 2, 1]
quickSort(arr, 0, arr.length - 1)
console.log(arr);


// 快排第二版 单边递归|只递归右半部分
function quickSort(arr, l, r) {
  while (l < r) {
    let x = l, y = r, base = arr[l];
    while (x < y) {
      while (x < y && arr[y] >= base) y--;
      if (x < y) { arr[x] = arr[y]; x++ };
      while (x < y && arr[x] < base) x++;
      if (x < y) { arr[y] = arr[x]; y-- };
    }
    arr[x] = base;
    quickSort(arr, x + 1, r);
    r = x - 1;
  }
}
let arr2 = [10, 9, 8, 4, 5, 7, 6, 3, 2, 1]
quickSort(arr2, 0, arr2.length - 1)
console.log(arr2);

// 快排第三版 快排+插入排序优化 把数据分成16个一块，每块使用插入排序进行处理
let threshold = 0
// 三点取中间
function getBase(a, b, c) {
  if (a > b) { [a, b] = [b, a] }
  if (a > c) { [a, c] = [c, a] }
  if (b > c) { [b, c] = [c, b] }
  return b
}
function _quickSort3(arr, l, r) {
  while (r - l > threshold) {
    let x = l, y = r, base = getBase(arr[l], arr[(l + r) >> 1], arr[r]);
    do {
      while (arr[x] < base) x++;
      while (arr[y] > base) y--;
      if (x <= y) {
        [arr[x], arr[y]] = [arr[y], arr[x]];
        x++;
        y--;
      }
    } while (x <= y)
    _quickSort3(arr, x, r);
    r = y;
  }
}

function insertSort(arr, l, r) {
  let ind = l;
  for (let i = l + 1; i < r; i++) {
    if (arr[i] < arr[ind]) ind = i;
  }
  while (ind > l) {
    [arr[ind], arr[ind - 1]] = [arr[ind - 1], arr[ind]];
    ind--;
  }
  for (let i = l + 2; i < r; i++) {
    let j = i;
    while (arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
}
// 优化后最终排序
function quickSort3(arr, l, r) {
  _quickSort3(arr, l, r);
  insertSort(arr, l, r);
}

let arr3 = [10, 9, 8, 4, 5, 7, 6, 3, 20, 1, 10, 15, 8, 4, 5, 7, 6, 3, 2, 1, 10, 9, 8, 4, 5, 7, 6, 3, 2, 1, 10, 9, 8, 4, 5, 7, 6, 3, 2, 1]
quickSort3(arr3, 0, arr3.length - 1)
console.log(arr3);
