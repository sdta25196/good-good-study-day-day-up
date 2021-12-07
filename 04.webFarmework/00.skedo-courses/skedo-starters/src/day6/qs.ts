(() => {
	function deepSet(obj : any, path : Array<any>, value : any, i : number = 0) {
		const key = path[i]
		if(typeof key === 'undefined') {
			return value
		}

		if(typeof obj === 'undefined') {
			if(key.match(/^\d+$/)) {
				obj = new Array()
			} else {
				obj = new Object()
			}
		}
		
		obj[key] = deepSet(obj[key], path, value, i+1)
		return obj
	}


	// aaa.x.x.x.y
	// [1][2][3]
	// [1].x[3].name
	const ptnIndentifer = /[a-zA-Z_$][a-zA-Z0-9_$]*/

	function getPath(str : string) {

		const m = ptnIndentifer.exec(str)
		if(!m) {
			return [str]
		}

		const ptnPart = /(\.([a-zA-Z_$][a-zA-Z0-9_$]*)|\[([a-zA-Z0-9_$]+)\])/g

		str = str.replace(m[0], '')
		const path = [m[0]]

		let p : RegExpExecArray

		let lastIdx = 0

		while(p = ptnPart.exec(str)) {
			if(p.index !== lastIdx) {
				return [str]
			}
			lastIdx += p[0].length
			path.push(p[2] || p[3])
		}

		// TODO: 思考怎么做？
		// if(path.length === 1) {
		// 	return [str]
		// }
		return path
	}

	function parse(str : string) {
		const ptnSplit = /([^&=]+)(=([^&=]*))?/g

		let p : RegExpExecArray

		let obj : any = {}
		while(p = ptnSplit.exec(str)) {
			let [, key, , value] = p
			const path = getPath(key)
			console.log(key, value, path)
			obj = deepSet(obj, path, decodeURIComponent(value))
		}
		console.log(obj)
		return obj

	}

	parse("x&a=1&b=2&arr[0][2][4]=1&arr[1]=2&arr[2]=3&person.name=xss")
	// getPath("a")
	// console.log(getPath("a@#$@#$"))
	// getPath("a.b.c")
	// getPath("a.b[1][2][3].c")
	// {
	// 	a : 1,
	// 	b : 2,
	// 	arr : [1,2,3],
	// 	person : {
	// 		name : 'xss'
	// 	}
	// }
})()