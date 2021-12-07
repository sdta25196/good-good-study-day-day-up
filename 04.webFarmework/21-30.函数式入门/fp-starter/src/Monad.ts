import { pipe } from './pipe'
import { curry } from './curry'
class Container<T> {
  private val: T

  constructor(val: T) {
    this.val = val
  }

  static of<X>(val: X) {
    return new Container(val)
  }

  public map<U>(fn: (u: T) => U) {
    return Container.of(fn(this.val))
  }

  public applicative(c: Container<any>) {
    return c.map(this.val as any)
  }
}


const add = curry((x: number, y: number) => {
  return x + y
})

console.log(
  Container.of(5)
    .map(add)
    .applicative(Container.of(6))
)



class Maybe<T> {
  private val: T

  constructor(val: T) {
    this.val = val
  }
  static of<X>(val: X) {
    return new Maybe(val)
  }

  private nothing() {
    return this.val === undefined || this.val === null
  }

  public map<U>(fn: (u: T) => U) {
    if (this.nothing()) {
      return Maybe.of(null)
    }

    return Maybe.of(fn(this.val))

  }

}



class IO {
  private val: Function
  constructor(val: Function) {
    this.val = val
  }
  static of<X>(val: Function) {
    return new IO(val)
  }

  public map(f: Function) {
    return new IO(pipe(this.val, f))
  }

  public eval() {
    return this.val()
  }

}

// @ts-ignore
// global.window = {
//   height : 100
// }

// const window_io = IO.of(() => window)
// const height_io = window_io.map((window) => {
//   return window.height
// })

// const height = height_io.eval()
// console.log(height)