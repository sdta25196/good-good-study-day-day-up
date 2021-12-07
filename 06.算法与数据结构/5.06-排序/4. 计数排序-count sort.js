// 计数排序 - 用来解决 简单的单值排序，排序问题中数据的值域有限的数据排序
function countSort(arr, minVal) {
  let ls_count = [];
  // 下标减arr内最小的值，就可以使ls_count从0开始计数
  arr.forEach(item => {
    if (ls_count[item - minVal]) {
      ls_count[item - minVal]++
    } else {
      ls_count[item - minVal] = 1
    }
  });
  let result = [];
  // 依次放入到结果数组中，加上最小值minVal，
  for (let i = 0; i < ls_count.length; i++) {
    while (ls_count[i]--) {
      result.push(i + minVal)
    }
  }
  console.log(result);
}

// 测试用例
let ls_testData = [1, 2, 1, 3, 3, 5, 4, 3, 2, 2];
countSort(ls_testData, 1)