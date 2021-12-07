/** 
 * @name 给对象深度赋值  
 * @example deepSet({},['a'],5) // -> {a：5}
 */
function deepSet(obj, path, value, i = 0) {
  const key = path[i]
  if (key === undefined) { return value }
  if (obj === undefined) {
    if (key.match(/^\d+$/)) {
      obj = new Array()
    } else {
      obj = new Object()
    }
  }
  obj[key] = deepSet(obj[key], path, value, ++i)
  return obj
}

/** 拆解对象和数组 */
/** person.name -> [ 'person', 'name' ] */
/** arr[0] -> ['arr', '0'] */
const keyReg = /[a-zA-Z_$][a-zA-Z0-9_$]*/
function getPath(str) {
  let m = keyReg.exec(str)
  if (!m) return [str]
  let path = [m[0]]
  let p
  let childReg = /(\.([a-zA-Z_$][a-zA-Z0-9_$]*)|\[([a-zA-Z0-9_$]+)\])/g
  while (p = childReg.exec(str)) {
    path.push(p[2] || p[3])
  }
  return path
}

function queryString(url) {
  const queryReg = /([^?&=]+)(=([^&=]*))?/g
  let q;
  let obj = {};
  while (q = queryReg.exec(url)) {
    let [, key, , value] = q
    // 拆解key和value, 使用deepSet处理深度匹配(数组和对象)
    obj = deepSet(obj, getPath(key), decodeURIComponent(value))
  }
  return obj
}

const qs = queryString("dd442[0]=6&a=1&b=2&arr[0]=1&arr[1]=2&person.name=ty")
console.log(qs)