(() => {

  type SubscribeCallback = (val: any) => void
  type UnSubscribe = () => void
  type Subscribe = (observer: Subscription) => UnSubscribe


  class Observable {

    subscribers: Subscription[] = [] //订阅者集合
    onSubscribe: Subscribe | null //订阅事件

    constructor(onSubscribe: Subscribe | null = null) {
      this.onSubscribe = onSubscribe //初始化一个订阅事件
    }

    // 订阅，返回一个订阅对象，包含取消订阅功能。用来做chain操作
    subscribe(callback: SubscribeCallback) {
      const subscription = new Subscription(callback)

      if (this.onSubscribe) {
        const unsubscribeHandler = this.onSubscribe(subscription) //订阅者传给订阅事件，返回一个取消订阅
        subscription.setUnsubscriptionHandler(unsubscribeHandler)
      }
      this.subscribers.push(subscription)
      return subscription
    }

    publish(val: any) {
      this.subscribers.forEach(subscriber => {
        subscriber.next(val)
      })
    }
  }

  class Subscription extends Observable {

    subscribeCallback: SubscribeCallback
    unsubscribeHandler: UnSubscribe
    constructor(fn: SubscribeCallback) {
      super()
      this.subscribeCallback = fn
    }
    unsubscribe() {
    }

    setUnsubscriptionHandler(handler: () => void) {
      this.unsubscribe = handler
    }

    next(val: any) {
      console.log('next---')
      const result = this.subscribeCallback(val)
      this.publish(result)
    }
  }



  const ob = new Observable((observer) => {

    let i = 0
    let I = setInterval(() => [
      observer.next(i++)
    ], 1000)

    return () => {
      clearInterval(I)
    }
  })

  const subscription = ob.subscribe((val) => {
    console.log(val)
  })

  setTimeout(() => {
    subscription.unsubscribe()
  }, 5000)


})()