// 深搜
(() => {
  let result: any[] = []
  let pending: boolean[] = []

  function dfs(arr: any[], current: any[] = []): void {
    if (current.length === arr.length) {
      result.push([...current])
      return
    }
    for (let i = 0; i < arr.length; i++) {
      if (pending[i]) continue
      current.push(arr[i])
      pending[i] = true
      dfs(arr, current)
      current.pop()
      pending[i] = false
    }
  }

  // dfs——测试用例
  let arr = [1, 2, 3, 4]
  dfs(arr)
  console.log(result);
})();

// 广搜需要用字典辅助，否则计算量太大，有空再写
