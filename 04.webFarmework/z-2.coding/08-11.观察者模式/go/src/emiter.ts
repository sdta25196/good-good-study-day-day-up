(() => {
  enum Topic {
    changed
  }

  type EventHandler<E> = (e: E) => void

  class Emiter<T extends number, E>{

    handler: Array<Array<EventHandler<E>>> = new Array(10)

    on(topic: T, handler: EventHandler<E>) {
      if (!this.handler[topic]) {
        this.handler[topic] = []
      }
      this.handler[topic].push(handler)
      return () => {
        this.handler[topic] = this.handler[topic].filter(e => e !== handler)
      }
    }

    emit(topic: T, e: E) {
      this.handler[topic] && this.handler[topic].forEach(f => {
        f(e)
      })
    }
  }

  // A类就是我们自己定义的类，任意类继承Emiter即可实现消息收发，node中event也是这种形式
  class A extends Emiter<Topic, string>{

  }

  const ob = new A()
  ob.on(Topic.changed, (strVal) => {
    console.log(strVal);
  })

  ob.emit(Topic.changed, "走你")
})()