class Emiter {
  observe
  constructor() {
    this.observe = {}
  }

  on(event, callback) {
    if (!this.observe[event]) {
      this.observe[event] = []
    }
    this.observe[event].push(callback)
  }

  emite(event, ...val) {
    this.observe[event].forEach(fun => {
      fun(...val)
    });
  }
}

const e = new Emiter()
e.on('c', (val, o) => {
  console.log(val, o)
})
e.on('c1', (val, o, ddd) => {
  console.log(val, o, ddd)
})

e.emite('c', 999, 555)
e.emite('c1', 999, 555, "nbc1")