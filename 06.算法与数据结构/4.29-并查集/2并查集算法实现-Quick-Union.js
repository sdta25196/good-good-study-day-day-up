//Quick-Union 算法
// 此算法利用树形结构来记录同一棵树下的节点就属于同一集合
// find操作时间复杂度为O(n) 
// merge操作时间复杂度与树的高度有关（有效的减少树高，可以提高此算法的效率，但并不是最优的优化方式）
// 最优的优化方式 如下：
/*
*
  ------------ 以平均查找次数作为标准，优化merge操作 ----------------
  假设:
  a树，节点为sa; 所有节点深度相加为la;
  b树，节点为sb; 所有节点深度相加为lb;
  树的总深度/总节点数，可以求得平均查找次数
  当 a作为根节点树链接b时 (la+lb+sb)/(sa+sb)
  当 b作为根节点树链接a时 (la+lb+sa)/(sa+sb)
  上述公式可得，两棵树相连接时，节点数量更少的树作为被链接方，可使得平均查找次数更少
*
*/
// 示例一：原版，效率低
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
    return this.find(this.boss[x]);
  }

  merge(a, b) {
    let fa = this.find(a);// 找到a所在树的根节点
    let fb = this.find(b);// 找到a所在树的根节点
    if (fa == fb) return;// 如果a\b所在树的根节点一样，说明他们在一棵树
    this.boss[fb] = fa;  //将a树连接到b树
    return;
  }
  getColor() {
    console.log(this.boss);
  }
}
let c = new QuickUnion(10);
c.merge(1, 2);
c.merge(2, 3);
c.merge(3, 8);
// console.log('object');
// c.find(2)
// c.merge(6, 7);
// c.merge(8, 7);
c.getColor()



// 示例二：使用按质优化后的版本，平均查找次数最优
//Quick-Union 算法：以平均查找次数作为标准，优化merge操作版本
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
    return this.find(this.boss[x]);
  }

  merge(a, b) {
    let fa = this.find(a);// 找到a所在树的根节点
    let fb = this.find(b);// 找到a所在树的根节点
    if (fa == fb) return;// 如果a\b所在树的根节点一样，说明他们在一棵树
    // 优化逻辑为两棵树相连接时，节点数量更少的树作为被链接方；
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
