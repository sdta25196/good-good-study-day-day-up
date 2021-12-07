class UnionSet {
  constructor(n) {
    this.arr = [];
    for (let i = 0; i < n; i++) {
      this.arr[i] = i;
    }
  }
  find(x) {
    // 使用路径压缩优化
    return this.arr[x] = (this.arr[x] == x ? x : this.find(this.arr[x]))
  }
  merge(a, b) {
    this.arr[this.find(a)] = this.find(b);
  }
  getArr() {
    console.log(this.arr);
  }
}
let c1 = new UnionSet(3);
c1.merge(1, 0);
// c1.merge(2, 3);
// c1.merge(5, 6);
// c1.merge(6, 7);
// c1.merge(7, 8);
// c1.merge(8, 9);
// c1.merge(8, 3);
c1.getArr()
