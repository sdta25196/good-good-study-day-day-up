export function pipe(...fns : Function[]) {

  return (...ipts : any []) => {
    return fns.reduce((acc, fn) => {
      const r = fn(...acc)
      return [r]
    }, ipts)[0]
  }

}

// const f = pipe(Math.sqrt, Math.pow)

// f(4) // x => Math.pow(2, x)
// console.log(f(2,3))