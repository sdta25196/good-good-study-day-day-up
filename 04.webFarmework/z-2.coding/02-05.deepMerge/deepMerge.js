//! merge是一个非标准行为，自定义比较多
//* mergeLeft \ mergeRight 区分
//* mergeObject 是合并还是替换的区分
//* merge函数设计风格，imutable 或者 mutable，根据需求来，imutable就返回新对象。mutable就在源对象上修改

// 处理函数merge
function deepMergeArray(a, b) {
  return [...a, ...b]
}

// 处理对象merge
function deepMergeObject(a, b) {
  const obj = {}
  for (let key in a) {
    if (key in b) {
      obj[key] = deepMerge(a[key], b[key])
    } else {
      obj[key] = b // 直接引用，是需要copy 还是clone 根据需求选择即可
    }
  }
  return obj
  // return Object.assign({}, a, b) //简单直接合并
}

function deepMerge(a, b) {
  // a 或者 b 有任意一个没值，return 有值的
  if (!a || !b) {
    return a || b
  }

  // 先判断a,b是否是同一类型, 依照需求返回a或者b,此处返回b
  if (typeof a !== typeof b) {
    return b
  }

  // 处理数组,数组必须两个都判断，前面的typeof会判断他们都是object
  // 要先判断array再判断下面的object
  if (Array.isArray(a) && Array.isArray(b)) {
    return deepMergeArray(a, b)
  }

  // 处理function, 依照需求返回a或者b
  if (typeof a === "function") {
    return b
  }

  // 处理对象
  if (typeof a === 'object') {
    return deepMergeObject(a, b)
  }

  // number | string | boolean | bigint 这些都返回b
  return b
}

// 测试用例
console.log(deepMergeObject({ "d": 1 }, { "c": 2 }))
// console.log(deepMerge(1, 2))




// 一种可以让用户自定义merge形式的写法
// function deepMerge2(merge: Function, a: Array<any>, b: Array<any>) {
//   return merge(a, b)
// }
// console.log(
//   deepMerge2((a: Array<any>, b: Array<any>) => {
//     return a.concat(b)
//   }, [1], [2])
// )



// const deepObj = (a, b) => {
//   const result = {}
//   for (let key in a) {
//     if (key in b) {
//       result[key] = deep(a[key], b[key])
//     } else {
//       result[key] = a[key]
//     }
//   }
//   return result
// }
// const deep = (a, b) => {

//   if (!a || !b) return a || b

//   if (typeof a !== typeof b) return b

//   if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b]

//   if (typeof a === "function") return b

//   if (typeof a === 'object') return deepObj(a, b)

//   return b

// }