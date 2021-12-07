function* generator(obj: Record<string, number>) {
  let k = Object.keys(obj)
  for (let i = 0; i < k.length; i++) {
    yield obj[k[i]]
  }
}

let obj: Record<string, number> = {
  a: 1, b: 2, c: 3
}

let d = generator(obj)
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());

// 循环找一个对象中的数据
// 有一个好处，如果这一个巨大的对象，想在对象中找到某一个值之后就停止，用这个就比较好