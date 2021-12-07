export function isIterator(obj : any) : obj is Iterator<any> {
  if (obj == null) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function';
}

async function resolvePromsie(promise : Promise<any>, callback : (value : any, ex : any) => void) {

	try{
		while(promise instanceof Promise) {
			promise = await promise
		}
	}catch(ex) {
		callback(null, ex)
	}
	callback(promise, null)
}

function runIt(it : Iterator<any, any, any>, val : any = null, valueWalker ? : (v : any) => void, onFinish ? : () => void) {
	const data = it.next(val)
	if(!data.done) {
		resolvePromsie(data.value, (value, ex) => {
			if(ex) {
				setTimeout(() => {
					throw ex
				})
				return
			}

			valueWalker&&valueWalker(data.value)
			runIt(it, value, valueWalker, onFinish)
		})
	} else {
		onFinish && onFinish()
	}
}


type UnWrap<T> = T extends Promise<infer U> ? U : T

type Wrapped<T> = Promise<T> | T
export default function asyncRunner<T>(fn : () => Generator<any, any, any>) {
	const it =  fn()
	if(isIterator(it)) {
		runIt(it)
	}
	else {
		return it
	}
}

function add<T>(a : T, b : Wrapped<T>) {

}

add("string", Promise.resolve("string"))


export function *unwrap<T>(val : T) : Generator<T, UnWrap<T>, UnWrap<T>> {
	const yieldValue = yield val 
	return yieldValue as UnWrap<T>
}

function *getUserId() {
	// const id = yield * unwrap(Promise.resolve(100))
	const id : number = yield Promise.resolve(100)
	return id
}

function * genNumbers(){
	yield 1
	yield 2
	yield 3
	yield 4
}

function takeAll(gen : () => Generator<any, any, any>) {
	const it = gen()
	const data : Array<any> = []


	return new Promise((resolve) => {
		runIt(it, null, v => {
			console.log('here---', v)
			data.push(v)
		}, () => {
			resolve(data)
		})
	})
}


asyncRunner(function *gen(){
	const x = yield * unwrap(123)
	const y = yield * unwrap(Promise.resolve("123"))
	// const id = yield * getUserId()
	// const a : number = yield "123"
	const m = yield takeAll(genNumbers)
	console.log('final', x, y, m)
})

