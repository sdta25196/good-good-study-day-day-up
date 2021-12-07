// 链表：
// 线性数据结构，松散的数据结构
// 一串由指针域与数据域构成的松散的数据节点，其中指针域指向下一个节点的指针（内存地址）：
// 节点间具有唯一指向性；
// 链表查找复杂度O(n);
// 链表添加复杂度 在确定节点的情况下O(1); 
// 链表删除复杂度 在确定节点的情况下O(1); 
// 虚拟头结点：仅当链表的头结点地址有可能发生改变的情况下使用
(() => {
  // 链表形式一
  class node {
    constructor(value) {
      this.data = value; // 定义链表的数据域为value
      this.next = null;  // 定义链表的指针域为null
    };
  }
  let head = new node(1);  // 设置第一个节点head数据域为1
  let head1 = new node(2); // 设置第二个节点head1数据域为2
  head.next = head1; // 设置第一个节点head指针域 指向第二个节点head1
  head2 = new node(3); // 设置第三个节点head2数据域为3
  head1.next = head2;// 设置第二个节点head指针域 指向第三个节点head2
  head3 = new node(4); // 设置第四个节点head3数据域为4
  head2.next = head3;// 设置第三个节点head指针域 指向第四个节点head3,第四个节点的指针域为null,链表结束
  p = head; //定义p为第一个节点，依次循环输出节点的数据域，并将节点赋值为当前节点的指针域(下一节点)
  console.log("链表形式一输出如下:");
  while (p != null) {
    console.log(p.data);
    p = p.next;
  }
})();


(() => {
  // 链表形式二
  const data = Array(10);
  const next = Array(10);
  add = (ind, p, val) => {
    next[ind] = p; // 设置指针域ind指向了指针p
    data[p] = val; // 设置指针p的数据域为val
  }

  head = 3;    // 设置头节点指向指针3
  data[3] = 0; //设置 指针3的数据为0
  add(3, 5, 1); // 设置 指针3的指针域为 5，设置指针5的数据为1
  add(5, 2, 2); // 设置 指针5的指针域为 2，设置指针2的数据为2
  add(2, 7, 3); // 设置 指针2的指针域为 7， 设置指针7的数据域为3
  add(7, 9, 100);// 设置 指针7的指针域为 9， 设置指针9的数据域为100，指针9的指针域未设置
  p = head; //定义p 指向第一个节点的指针，依次循环输出节点的数据域,并将指针重新赋值为当前节点的指针域(下一节点)
  console.log("链表形式二输出如下:");
  while (p != undefined) {
    console.log(data[p]);
    p = next[p];
  }
})();