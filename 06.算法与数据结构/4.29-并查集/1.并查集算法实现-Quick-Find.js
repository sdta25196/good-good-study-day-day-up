//Quick-Find 算法
// 此算法 find操作时间复杂度为O(1) merge操作时间复杂度为O(n)
class QuickFind {
  constructor(n) {
    // 初始化n个集合
    this.color = [];
    for (let i = 0; i < n; i++) {
      this.color[i] = i;
    }
  }
  find(x) {
    return this.color[x];
  }
  // 遍历所有节点，联通a，b两个集合，将color值修改为一致，可以都是a或者都是b
  merge(a, b) {
    if (this.color[a] == this.color[b]) return;
    let cb = this.color[b];
    for (let i = 0; i < this.color.length; i++) {
      if (this.color[i] == cb) this.color[i] = this.color[a];
    }
  }
  getColor() {
    console.log(this.color);
  }
}
console.time()
let c1 = new QuickFind(10);
c1.merge(1, 2);
c1.merge(2, 3);
c1.merge(5, 6);
c1.merge(6, 7);
c1.merge(7, 8);
c1.merge(8, 9);
c1.merge(8, 3);
c1.find(8)
c1.find(8)
c1.find(8)
c1.find(8)
c1.find(8)
c1.getColor()
console.timeEnd()
