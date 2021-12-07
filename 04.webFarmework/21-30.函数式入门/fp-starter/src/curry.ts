export function curry( f : Function) {

  const g = (...args : any[]) => {
    if(args.length >= f.length) {
      return f(...args)
    }

    return (...left : any[]) => {
      return g(...args, ...left)
    }

  }

  return g
}