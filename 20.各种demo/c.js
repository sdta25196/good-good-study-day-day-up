"use strict"
// class A {
//   constructor(num) {
//     this._num = num
//   }

//   get num() {
//     console.log('get');
//     return this._num
//   }

//   set num(val) {
//     console.log('set');
//     this._num = val
//   }
// }

// const a = new A(3)

// a.num++ // get\set操作
// a.num = 2 // set操作


function a() {
  console.log(this.c);
}

Function.prototype.mycall = function (obj) {
  obj.a = this
  obj.a()
  delete m.a
}

a.call({ c: 2 })
a.mycall()