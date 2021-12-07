import { Observable, Subscriber } from "rxjs"

;(() => {
  const observable = new Observable((observer) => {
		console.log(observer)
    let i = 0
    const I = setInterval(() => {
      observer.next(i++)
    }, 1000)

		return () => {
			clearInterval(I)
		}
  })

	class MySubscriber extends Subscriber<any> {

		next(val : any) {
			super.next(val)
			console.log(val)
		}
	}
  const subscription = observable.subscribe(new MySubscriber())
	console.log(subscription)
	
})()
