var reverse = function (arr, k) {
  if (k < 1) {
    return;
  }
  let i = 0; j = k;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
}