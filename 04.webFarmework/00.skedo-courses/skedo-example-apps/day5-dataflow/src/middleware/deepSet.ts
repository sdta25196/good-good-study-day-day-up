export function deepSet(obj : any, path : Array<any>, value : any, i = 0) {
  const key = path[i]
  if(key === undefined) {
    return value 
  }
  obj[key] = deepSet(obj[key], path, value, i+1)
	return obj
}



