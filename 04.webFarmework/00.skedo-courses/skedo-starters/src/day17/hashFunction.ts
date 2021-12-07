

type Entry = {
  key : string,
  value : any
}
type Bucket = Entry[]


class HashTable{
  private table : Bucket[] = []
  private size = 99

  hashNumber (n : number) {
    return n%this.size
  }
  hash(str : string) {
    let sum =  0
    for(let c of str) {
      sum *= (c.charCodeAt(0) + 1)
    }
    return sum % this.size 
  }

  public add(key : string, value : any) {

    const hashCode = this.hash(key)

    if(!this.table[hashCode]) {
      this.table[hashCode] = []
    }
    const bucket = this.table[hashCode]
    bucket.push({key, value})
  }

  public get(key : string) {
    const hashCode = this.hash(key)
    const bucket = this.table[hashCode]
    return bucket.find(x => x.key === key).value
  }
}


const hash = new HashTable()

hash.add("apple", 100)
hash.add("google", 102)

console.log(hash.get("apple"), hash.get('google'))