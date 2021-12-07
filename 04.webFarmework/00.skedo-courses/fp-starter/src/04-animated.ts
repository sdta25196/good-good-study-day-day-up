import {throttle} from './02-throttle'

// [0, 1] -> [0, 300] -> Animiation...

// rangeA : [0,1]
// rangeB : [0, 100]
// a : 0.25
// return : 25

declare type InterpolateRange = [number, number]
function interpolation(rangeA : InterpolateRange, rangeB : InterpolateRange) {
	const LA = rangeA[1] - rangeA[0]
	const LB = rangeB[1] - rangeB[0]
	return (a : number) => {
		if(a > rangeA[1]) {return rangeB[1]}
		if(a < rangeA[0]) {return rangeB[0]}
		const ratio = (a - rangeA[0]) / LA
		return Math.round(ratio * LB + rangeB[0])
	}
}

declare type CombineFN<A, B> = (input : A) => B
function pipe<T, Q, R>(fn1 : CombineFN<T, Q>, fn2 : CombineFN<Q, R>) {
	return (a : T) => {
		return fn2(fn1(a))
	}
}

// [0, 1]
class Animated<T> {
	mapF : (value : number) => T
	value : number = 0
	timerFN : TimerFN = timer
	getValue() : T {
		return this.mapF(this.value)
	}

	updateValue(a : number) {
		this.value = a
		return this
	}

	private constructor(mapF : (value : number) => T){
		this.mapF = mapF
	}

	map<R>(fn : (value : T) => R) {
		const newMapF = pipe(this.mapF, fn)
		return new Animated<R>(newMapF)
	}
	
	start = (tick :number, last : number, callback : (val : T) => void) => {
		this.timerFN(v => {
			this.updateValue(v)
			callback(this.getValue())
		}, tick, last)
	}

	static of(from : number, to : number) : Animated<number> {
		const mapFunc = interpolation([0,1], [from, to])
		return new Animated(mapFunc)
	}
}


declare type TimerFN = (callback : (a :number) => void, tick : number, last : number) => void
const raf = setTimeout
const timer : TimerFN = (callback  , tick = 16, last = 300) => {
	const start = new Date().getTime()

	const cb = throttle(callback, tick)
	function rafLoop() {
		raf(() => {
			const ratio = (new Date().getTime() - start) / last
			if(ratio > 1) {
				cb(1)
				return
			}
			cb(ratio)
			rafLoop()
		})
	}
	rafLoop()
}
const str = "Hi, greetings...."
const a = Animated.of(0, str.length)
	.map(i => {
		return str.slice(0, i)
	})

// const b = Animated.of(0, 100)
// 	.map(x => {
// 		return {
// 			tansition : `translate(0, ${x}px)`
// 		}
// 	})

a.start(300, 5000, () => {
	console.clear()
	console.log(a.getValue())
})
