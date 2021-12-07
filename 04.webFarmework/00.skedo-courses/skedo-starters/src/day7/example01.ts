import { Observable } from "rxjs"
;(() => {
  const observable = new Observable((observer) => {
    let i = 0
    setInterval(() => {
      observer.next(i++)
    }, 1000)
  })

  const subscription = observable.subscribe((i) => {
    console.log("tick", i)
  })
})()
