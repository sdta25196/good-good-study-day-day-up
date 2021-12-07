function deepMergeArray(a : Array<any>, b : Array<any>) {
	return [...a, ...b]
}

type ObjectType = {
	[key :string] : any
}

function deepMergeObject(a : ObjectType, b : ObjectType) {

	const obj : any = {}
	for(let key in b) {
		if(key in a) {
			obj[key] = deepMerge(a[key], b[key])
		}else {
			obj[key] = b
		}
	}
	return obj
}

type Literal = number |string | boolean | bigint 

// 严格类型
// 渐进类型
// 函数重载
function deepMerge(a : Literal, b : Literal);
function deepMerge(a : Array<any>, b : Array<any>);
function deepMerge(a : ObjectType, b : ObjectType);
function deepMerge(a : any, b : any) {

	if(!a || !b) {
		return a || b
	}

	if(typeof a !== typeof b) {
		return b
	}
	
	if(Array.isArray(a) && Array.isArray(b)) {
		return deepMergeArray(a, b)
	}

	if(typeof a === 'function') {
		return b
	}

	if(typeof a === 'object') {
		return deepMergeObject(a, b)
	}

	return b

}


console.log(deepMerge(1, true))
console.log(deepMerge(['a'], ['b', 'c', {}]))
console.log(deepMerge({name : "a"}, {name : 'b', json : { success : 1}}))