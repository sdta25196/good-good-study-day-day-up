export function debounce(fn : Function, delay : number = 300) {
	let I : any = null

	return (...args : Array<any>) => {
		clearTimeout(I)
		I = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}