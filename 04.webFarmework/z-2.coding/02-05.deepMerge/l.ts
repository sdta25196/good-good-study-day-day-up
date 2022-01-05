// function deepMergeArray(a: Array<any>, b: Array<any>) {
//   return [...a, ...b]
// }

// type objA = {
//   [key: string]: any
// }
// function deepMergeObject(a: objA, b: objA) {
//   const obj: any = {}
//   for (let key in a) {
//     if (key in b) {
//       obj[key] = deepMerge(a[key], b[key])
//     } else {
//       obj[key] = b // 直接引用，是需要copy 还是clone 根据需求选择即可
//     }
//   }
//   return obj
// }

// type l = string | number | string | boolean | bigint
// function deepMerge(a: l, b: l): l;
// function deepMerge(a: any, b: any) {
//   if (!a || !b) {
//     return a || b
//   }

//   // 先判断a,b是否是同一类型, 依照需求返回a或者b,此处返回b
//   if (typeof a !== typeof b) {
//     return b
//   }


//   if (Array.isArray(a) && Array.isArray(b)) {
//     return deepMergeArray(a, b)
//   }

//   if (typeof a === 'function') {
//     return b
//   }

//   // 处理对象
//   if (typeof a === 'object') {
//     return deepMergeObject(a, b)
//   }

//   return b
// }