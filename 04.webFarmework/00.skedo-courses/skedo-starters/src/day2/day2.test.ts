import { debounce } from "./debounce"
import {timer} from 'rxjs'
import { throttle } from "./throttle"

describe("test", () => {
	it("debounce", (done) => {

		let count = 0
		const __addCount = () => {
			count ++
		}

		const addCount = debounce(__addCount, 100)

		const source = timer(0, 10) // Observable

		const subscription = source.subscribe((i) => {
			if(i === 100) {
				subscription.unsubscribe()
				setTimeout(() => {
					expect(count).toBe(1)
					done()
				}, 200)
			} else {
				addCount()
			}

		})



	})

	it("throttle", (done) => {

		let count = 0
		const __addCount = () => {
			count ++
		}

		const addCount = throttle(__addCount, 100)

		const source = timer(0, 10) // Observable

		// > 1000ms
		const subscription = source.subscribe((i) => {
			if(i === 100) {
				subscription.unsubscribe()
				expect(count).toBe(11)	
				done()
			} else {
				addCount()
			}

		})

	})
})