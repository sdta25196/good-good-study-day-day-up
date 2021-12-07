// 自定义双向链表
class ListNode {
  constructor(data, next, pre) {
    this.data = data;
    this.next = next;
    this.pre = pre;
  }
  // 在当前节点前插入一个节点
  insertPre(node) {
    node.pre = this.pre;
    node.next = this;
    if (this.pre) this.pre.next = node;
    this.pre = node;
  }
  // 在当前节点后加上一个节点
  insertNext(node) {
    node.pre = this;
    node.next = this.next;
    if (this.next) this.next.pre = node;
    this.next = node;
  }
  // 删除当前节点前一个节点
  delPre() {
    if (!this.pre) return;
    let p = this.pre;
    this.pre = p.pre;
    if (p.pre) p.pre.next = this;
  }
  // 删除当前节点下一个节点
  delNext() {
    if (!this.next) return;
    let p = this.next;
    this.next = p.next;
    if (p.next) p.next.pre = this;
  }
}
// 实现双端队列
class Queue {
  constructor() {
    // 定义虚拟头结点、虚拟尾结点
    this.head = new ListNode();
    this.tail = new ListNode();
    this.count = 0;
    // 虚拟头尾节点互相指向
    this.head.next = this.tail;
    this.head.pre = null;
    this.tail.next = null;
    this.tail.pre = this.head;
  }
  pushBack(val) {
    this.tail.insertPre(new ListNode(val))
    this.count += 1;
  }
  pushFront(val) {
    this.head.insertNext(new ListNode(val))
    this.count += 1;
  }
  popBack() {
    if (this.isEmpty()) return -1;
    let val = this.tail.pre.val;
    this.tail.delPre();
    this.count -= 1;
    return val;
  }
  popFront() {
    if (this.isEmpty()) return -1;
    let val = this.head.next.val;
    this.head.delNext();
    this.count -= 1;
    return val;
  }
  isEmpty() {
    return this.head.next == this.tail
  }
  getSize() {
    return this.count;
  }
}