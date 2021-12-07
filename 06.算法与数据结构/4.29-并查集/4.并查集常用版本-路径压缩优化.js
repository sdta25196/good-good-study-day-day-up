
// Quick-Union 常用版本仅适用路径压缩即可；
// 因为按质优化+路径压缩 对比仅路径压缩带来的优化并不是太大，但编码难度、复杂度都更高；
class QuickUnion {
  constructor(n) {
    // 初始化 每个boss都是自己的根节点
    this.boss = [];
    for (let i = 0; i < n; i++) {
      this.boss[i] = i;
    }
  }
  // 遍历所有节点查找到x的根节点
  find(x) {
    if (this.boss[x] == x) { return x };
    // 路径压缩优化，将一条路径上的所有节点都挂到根节点
    let root = this.find(this.boss[x]);
    this.boss[x] = root;
    return root;
  }

  merge(a, b) {
    let fa = this.find(a);// 找到a所在树的根节点
    let fb = this.find(b);// 找到a所在树的根节点
    if (fa == fb) return;// 如果a\b所在树的根节点一样，说明他们在一棵树
    this.boss[fa] = fb;
    return;
  }
  getColor() {
    console.log(this.boss);
  }
}
let c1 = new QuickUnion(10);
c1.merge(1, 2);
c1.merge(2, 3);
// c1.merge(3, 8);
// console.log('object');
// c1.find(2)
c1.merge(5, 6);
c1.merge(6, 7);
c1.merge(7, 8);
c1.merge(8, 9);
c1.merge(8, 3);
c1.getColor()
