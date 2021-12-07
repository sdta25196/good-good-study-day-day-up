import { useState } from "react"

export default () => {
	const [counter, setCounter] = useState<number>(0)

	// Race Condition
	return <div>
		{counter}
		<button onClick={() => setCounter(x => x + 1)}>+</button>
	</div>

}

// setTimeout( () => { setCounter(counter+1) } , 100)
// setTimeout( () => { setCounter(counter+1) } , 50) 