// 冒泡排序第一版：双重循环 时间复杂度O(n²)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] < arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
}
let arr = [4, 8, 5, 4, 6, 2, 1, 3, 5, 7, 6, 1, 9, 5]
// performance.now();
bubbleSort(arr)
// performance.now();
console.log(arr);
// 冒泡排序第二版：双重循环 添加是否已经有序标记优化 时间复杂度不到O(n²) 优于第一版
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isSorted = true;
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isSorted = false
      }
    }
    if (isSorted) break;
  }
}
let arr2 = [4, 8, 5, 4, 6, 2, 1, 3, 5, 7, 6, 1, 9, 5]
// performance.now();
bubbleSort(arr2)
// performance.now();
console.log(arr2);

// 冒泡排序第三版：双重循环 添加是否已经有序标记优化、添加当前有序数列下标 时间复杂度不到O(n²) 优于第一版
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isSorted = true;
    let sortBorder = arr.length - 1;
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isSorted = false;
        sortBorder = j;
      }
    }
    if (isSorted) break;
  }
}
let arr3 = [4, 8, 5, 4, 6, 2, 1, 3, 5, 7, 6, 1, 9, 5]
// performance.now();
bubbleSort(arr3)
// performance.now();
console.log(arr3);

// 鸡尾酒排序 - 一种针对大部分元素已经有序的情况下的 优化版冒泡排序
