
function deepSet(obj: any, path: Array<any>, value: any, i = 0) {
  const key = path[i]
  if (typeof key === 'undefined') {
    return value
  }
  // 创建对应的数据容器
  if (typeof obj === 'undefined') {
    if (key.match(/^\d+$/)) {
      obj = new Array()
    } else {
      obj = new Object()
    }
  }
  obj[key] = deepSet(obj[key], path, value, i + 1)
  return obj
}

// 验证合法的url参数中的key
const ptnIdentifer = /[a-zA-Z_$][a-zA-Z0-9_$]*/
function getPath(str: string): Array<string> {
  // str 可能是 字符、数组带下标、对象带key
  const m = ptnIdentifer.exec(str)
  if (!m) {
    return [str]
  }
  // 处理数组带下标，对象带key的参数
  const ptnPart = /(\.([a-zA-Z_$][a-zA-Z0-9_$]*)|\[([a-zA-Z0-9_$]+)\])/g
  str = str.replace(m[0], '')
  const path = [m[0]]
  let p: RegExpExecArray | null
  let lastIndex = 0
  while (p = ptnPart.exec(str)) {
    if (p.index !== lastIndex) { //用户输入了非法字符串
      return [str]
    }
    lastIndex += p[0].length
    path.push(p[2] || p[3])
  }
  return path
}

function queryString(url: string) {
  // 匹配url中每个key与value
  const ptnSplit = /([^&=]+)(=([^&=]*))?/g
  let p: RegExpExecArray | null
  let obj: any = {}
  // 循环拿到每一组数据
  while (p = ptnSplit.exec(url)) {
    let [, key, , value] = p
    obj = deepSet(obj, getPath(key), decodeURIComponent(value))
  }
  console.log(obj);
  return obj
}


/* 测试用例 */
// queryString("arr[0]=1&arr[1]=2")
queryString("dd442#####[0]xxxx=6&a=1&b=2&arr[0]=1&arr[1]=2&person.name=ty")
// getPath("a")
// getPath("a[0]")
// getPath("a.b.v")
// getPath("a[2].c")