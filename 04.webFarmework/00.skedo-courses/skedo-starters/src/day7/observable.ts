(() => {

  type SubscribeCallback = (val : any) => void
  type UnSubscribe = () => void
  type Subscribe = (observer : Subscription) => UnSubscribe 


  class Observable{

    subscribers : Subscription[]  = []
    onSubscribe : Subscribe | null

    constructor(onSubscribe :Subscribe | null = null) {
      this.onSubscribe = onSubscribe
    }

    subscribe(callback : SubscribeCallback){
      const subscription = new Subscription(callback)

      if(this.onSubscribe) {
        const unsubscribeHandler = this.onSubscribe(subscription)
        subscription.setUnsubscriptionHandler(unsubscribeHandler)
      }
      this.subscribers.push(subscription)
      return subscription
    }

    publish(val : any) {
      this.subscribers.forEach(subscriber => {
        subscriber.next(val)
      })
    }
  }

  class Subscription extends Observable {

    subscribeCallback : SubscribeCallback
    unsubscribeHandler : UnSubscribe 
    constructor(fn : SubscribeCallback){
      super()
      this.subscribeCallback = fn
    }
    unsubscribe(){
    }

    setUnsubscriptionHandler(handler : () => void){
      this.unsubscribe = handler
    }

    next(val : any) {
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