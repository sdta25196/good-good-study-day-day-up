interface Function {
  _bind(this: Function, thisArg: any, ...argArray: any[]): any;
}

(() => {


  function foo(){
    console.log(this)
  }

  Function.prototype._bind = function (
    thisArg: any,
    ...argArray: any[]
  ): any {
    const fn = this
    const symbol = Symbol("bind")

    return (...args : any[]) => {
      thisArg[symbol] = fn
      const r = thisArg[symbol](...argArray, ...args)
      delete thisArg[symbol]
      return r
    }
  }

  const f1 = foo._bind({x : 1})
  f1()


})()