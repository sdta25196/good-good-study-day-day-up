
//Quick-Union 添加按质优化与路径压缩
class WeightedQuickUnion {
  constructor(n) {
    // 初始化 每个boss都是自己的根节点
    this.boss = [];
    // 记录每棵树的节点数量
    this.size = [];
    for (let i = 0; i < n; i++) {
      this.boss[i] = i;
      this.size[i] = 1;
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
    // 按质优化：优化逻辑为两棵树相连接时，节点数量更少的树作为被链接方；
    if (this.size[fa] < this.size[fb]) {
      // 如果a所在的树节点更少，就把a挂在b下面
      this.boss[fa] = fb;
      // b树所在的节点size更新加上a树的节点
      this.size[fb] += this.size[fa];
    } else {
      this.boss[fb] = fa;
      this.size[fa] += this.size[fb];
    }
    return;
  }
  getColor() {
    console.log(this.boss);
  }
}
console.time()
let c1 = new WeightedQuickUnion(10);
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
