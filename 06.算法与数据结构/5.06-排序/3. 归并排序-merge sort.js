/*
*
 归并排序 - merge sort
 分治思想\递归
 将数据归类、然后将归类后得数据合并
 两个有序数组合并为一个有序数组，两个数组分别使用两个指针，依次对比大小，从小到大将数据放到新的数组空间中

 --------------------------------------------------
 归并算法思想 - 分治，分别处理数据左部分与右部分，最后再处理横跨左右两边的信息；
 对两路或者多路数据进行合并；多路时可以使用推进行维护最小值
 比如 2G内存大小的电脑，如何处理40G数据，就是使用多路数据合并20个2G数据，同时使用推进行维护指针指向的20条数据
*
*/
// 二路归并排序 O(nlogn)
function mergeSort(arr, l, r) {
  if (l >= r) return;
  let mid = (l + r) >> 1;
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  let temp = [];
  let k = 0, p1 = l, p2 = mid + 1;
  while (p1 <= mid || p2 <= r) {
    if ((p2 > r) || (p1 <= mid && arr[p1] <= arr[p2])) {
      temp[k] = arr[p1];
      k += 1;
      p1 += 1;
    } else {
      temp[k] = arr[p2]
      k += 1;
      p2 += 1;
    }
  }
  for (let i = l; i <= r; i++) {
    arr[i] = temp[i - l];
  }
}

let arr = [10, 6, 8, 9, 7, 5, 2, 3, 4, 1, 55, 44, 33, 22, 66, 77, 88, 99, 11]
mergeSort(arr, 0, arr.length - 1);
console.log(arr);

// 顺便默写个快排
// 快排的优化，三点取中间。快排成区间然后给插入、推进行优化排序
// function quickSort(arr, l, r) {
//   if (l >= r) return;
//   let s = l, e = r, base = arr[l];
//   while (s < e) {
//     while (s < e && arr[e] > base) { e-- }
//     if (s < e) arr[s++] = arr[e];
//     while (s < e && arr[s] <= base) { s++ }
//     if (s < e) arr[e--] = arr[s];
//     arr[s] = base;
//   }
//   quickSort(arr, l, s - 1)
//   quickSort(arr, s + 1, r)
// }
// quickSort(arr, 0, arr.length - 1);
// console.log(arr);