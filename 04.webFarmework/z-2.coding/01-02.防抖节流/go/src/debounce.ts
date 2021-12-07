// 防抖，单位时间内，只要触发就重新计算执行时间, 一直到不触发执行了，才会真正执行一次
export function debounce(fn: Function, delay: number = 300) {
  let I = null;
  return (...args: Array<any>) => {
    clearTimeout(I)
    I = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}