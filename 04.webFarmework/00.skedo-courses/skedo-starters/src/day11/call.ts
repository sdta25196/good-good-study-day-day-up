(() => {

  class A {
    methods : any =  {}

    fooSymbol = Symbol('foo')

    constructor(){
      this.methods[this.fooSymbol] = () => {

      }
    }
  }

  function *gen(){
    yield 1
  }

  const it : any = gen()

  // is : type assertion
  function isIterator(obj : any) : obj is Iterator<any> {
    if(obj[Symbol.iterator]) {
      return true
    }
    return false
  }

  if ( isIterator(it) ) {
    it.next
  }



  function foo(){
    console.log('this is', this)
  }

  // @ts-ignore
  Function.prototype._call = function(thisArg : any, args : Array<any>){

    // 符号 
    const symbol = Symbol("xxx")
    thisArg[symbol] = this 
    const result = thisArg[symbol](...args)
    delete thisArg[symbol]
    return result
  } 

  console.log(Symbol('xxx') === Symbol('xxx'))
  const obj = {x : 1}
  // @ts-ignore
  foo._call(obj)
  console.log('final', obj[Symbol('xxx')])
})()