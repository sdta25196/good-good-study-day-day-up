class Emiter {
  list = {}
  constructor() { }

  on(emit, callback) {
    if (!this.list[emit]) {
      this.list[emit] = []
    }
    let index = this.list[emit].push(callback)
    return () => {
      this.list[emit].splice(index, 1)
    }
  }
  emit(emit, info) {
    this.list[emit] && this.list[emit].forEach(handle => {
      handle(info)
    });
  }
}

const a = new Emiter()
module.exports = Emiter
