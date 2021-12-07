import { useEffect, useState } from "react"
import {timer} from 'rxjs'

export default () => {
	const [counter, setCounter] = useState<number>(0)

	console.log('call use effect.')
	useEffect(() => {
		setTimeout(() => {
			setCounter(x => x + 1)
		}, 1000)
		// const subscription = timer(0, 1000)
		// 	.subscribe(() => {
		// 		setCounter(x => x + 1)	
		// 	})
		// return () => {
		// 	subscription.unsubscribe()
		// }
	}, [counter])

	return (
    <div>
      {counter}
    </div>
  )
}