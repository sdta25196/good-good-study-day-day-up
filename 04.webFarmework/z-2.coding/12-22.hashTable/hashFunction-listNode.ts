
type Entry = {
  key: string,
  value: any
}
type ListNode = {
  value: Entry,
  next?: ListNode
}

class HashTable {
  private table: Array<ListNode | undefined> = []
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

  //! 计算hash可能会出现同样的值，采取链表的形式储存
  public set(key: string, value: any) {
    let hashCode = this.hash(key)
    let bucket = this.table[hashCode]
    if (!bucket) {
      this.table[hashCode] = {
        value: { key, value },
      }
    } else {
      while (bucket.next) {
        bucket = bucket.next
      }
      bucket.next = {
        value: { key, value }
      }
    }
  }

  //! 因为可能出现hashCode一致，循环链表进行数据获取
  public get(key: string) {
    let hashCode = this.hash(key)
    let bucket = this.table[hashCode]
    let res: any;
    while (bucket) {
      if (bucket.value.key === key) {
        res = bucket.value.value
        break
      }
      bucket = bucket.next
    }
    return res
  }

  public has(key: string): boolean {
    let hashCode = this.hash(key)
    let bucket = this.table[hashCode]
    while (bucket) {
      if (bucket.value.key === key) {
        return true
      }
      bucket = bucket.next
    }
    return false
  }

  public delete(key: string) {
    let hashCode = this.hash(key)
    let bucket = this.table[hashCode]
    if (!bucket) return
    let preListNode: any = { value: { key: "", value: "" }, next: bucket } //搞一个虚拟头指针
    let p: any = preListNode
    while (preListNode) {
      if (preListNode.next.value.key === key) {
        preListNode.next = preListNode.next.next
        break
      }
      preListNode = preListNode.next
    }
    this.table[hashCode] = p.next
  }
}

// 测试用例
let s = new HashTable()

s.set("a", 13)
s.set("i", 19)
s.set("q", 129)
console.log(s.get('a'))
console.log(s.get('i'))
console.log(s.get('q'))
console.log(s.has('q'))
s.delete('q')
console.log(s.has('q'))
console.log(s.has('a'))
console.log(s.has('i'))
console.log(s.has('qa'))
