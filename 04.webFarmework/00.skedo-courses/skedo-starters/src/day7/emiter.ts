(() => {

  enum Topic{
    Changed = 0,
  }

  
  type EventHandler<E> = (e : E) => void


  class Emiter<T extends number, E> {
    handlers: Array<Array<EventHandler<E>>> = new Array(10)

    on(topic: T, handler: EventHandler<E>) {
      if (!this.handlers[topic]) {
        this.handlers[topic] = []
      }
      this.handlers[topic].push(handler)
      return () => {
        this.handlers[topic] = this.handlers[topic].filter(
          (x) => x !== handler
        )
      }
    }

    emit(topic: T, e: E) {
      this.handlers[topic] &&
        this.handlers[topic].forEach((h) => {
          h(e)
        })
    }
  }

  class A extends Emiter<Topic, string> {

  }

  const foo = new A()

  foo.on(Topic.Changed, (strVal) => {
    console.log(strVal)
  })

  foo.emit(Topic.Changed, "gogogo---")
})()