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