// 节流, 每个单位时间内触发上锁，单位时间只会执行一次
export function throttle(fn: Function, interval: number = 300) {
  let lock = false;
  let start: number;
  return (...args: Array<any>) => {
    if (start === undefined) {
      start = new Date().getTime()
    }
    if (lock) {
      return
    }
    lock = true
    fn(...args)
    const ellapsed = (new Date().getTime() - start)
    setTimeout(() => {
      lock = false
    }, interval - ellapsed % interval)
  }
}