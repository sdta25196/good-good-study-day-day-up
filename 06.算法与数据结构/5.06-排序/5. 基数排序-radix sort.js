// 基数排序  ??场景下时间复杂度可以做到 O(n)
// 基数排序的数据特性：排序过程中可以保持数据的稳定性
function radixSort(arr, maxDigit) {
  var counter = [];
  var mod = 10;
  var dev = 1;
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for (var j = 0; j < counter.length; j++) {
      var value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}
// 测试用例
let ls_testData = [21, 22, 11, 13, 32, 33, 12, 24];
console.log(radixSort(ls_testData, 8));
