(function() {

	function get(url :string) {
		return Promise.resolve("hello") 
	}

	function* genf(){
		yield 1
		yield 2
		yield 3
		yield 4
	}

	function * gen(){
		yield * genf()
	}

	// generator
	// iterator

	const it = gen()
	for(let x of it) {

	}
	it.next()

	// function *gen() : Generator<string, void>{
	// 	const response = yield "https://....api"
	// 	console.log(response)
	// }
	// const it = gen()
	// const {value} = it.next()
	// console.log(value)
	// const promsie = get(value as string)
	// 	.then(response => {
	// 		it.next(response)
	// 	})
	
})()
