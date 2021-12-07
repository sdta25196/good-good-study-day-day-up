const Emiter = require('./test')
a = new Emiter()
a.on("z", (info) => {
  console.log(info, 't');
})
a.emit("z", "6666")

class A extends Emiter {
  static c = new A()
}

A.c.on("z", (info) => {
  console.log(info, 'z');
})
A.c.emit("z", "6666")
