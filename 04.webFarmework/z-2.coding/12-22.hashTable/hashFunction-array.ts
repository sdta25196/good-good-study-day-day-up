/**
 * 二维数组版本
 */

type Entry = {
  key: string,
  value: any
}

type Bucket = Entry[]

class HashTable {
  private table: Bucket[] = []
  private size = 8

  //! 哈希函数 - 计算哈希值必须是一个稳定的函数，同一个值计算出同一个结果
  //! 哈希函数 - 可以写多个，用来处理不同的key类型
  //! 例如：设置Entry的key为any,此时我们需要添加hashNumber\hashArray等等 - 因为js不能拿到obj的内存地址，所以hashObj就麻烦很多啊
  //! 哈希函数 - 需要保证分布均匀，通常会有一个很大素数用来混淆，以使得计算出的hashcode是在范围(size)内均匀分布的
  hash(str: string) {
    let sum = 0
    for (let s of str) {
      sum += s.charCodeAt(0)
    }
    return sum % this.size
  }

  //! 计算hash可能会出现同样的值，采取二维数组进行链式存储
  //! 存储后的table示例-> [[{k,v},{k,v}],empty,[{k,v},{k,v}]]
  public add(key: string, value: any) {
    let hashCode = this.hash(key)
    if (!this.table[hashCode]) {
      this.table[hashCode] = []
    }
    const bucket = this.table[hashCode]
    bucket.push({ key, value })
  }

  //! 因为可能出现hashCode一致，同一个hashcode会出现多个值，所以要使用find
  public get(key: string) {
    let hashCode = this.hash(key)
    const bucket = this.table[hashCode]
    return bucket.find((x) => x.key === key)?.value
  }
}

let s = new HashTable()

s.add("a", 13)
s.add("i", 19)
s.add("ad", 129)
console.log(s.get('a'))
console.log(s.get('i'))
console.log(s.get('ad'))
