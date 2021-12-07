// 堆的实现，传入big是大顶堆，small是小顶堆
class Heap {
  constructor(type = "big") {
    this.type = type;
    this.arr = []; // 堆的存储空间
    this.count = 0;
  }
  push(n) {
    this.arr[this.count++] = n;
    // 大顶堆
    let index = this.count - 1;
    if (this.type == "big") {
      // (子节点下标-1 )/ 2 向下取整可得父节点下标 
      // 使用位移运算可以（(index - 1)>>1）；任意正整数 右移 1 就是向下取整的除以二
      while (index && this.arr[Math.floor((index - 1) / 2)] < this.arr[index]) {
        [this.arr[Math.floor((index - 1) / 2)], this.arr[index]] = [this.arr[index], this.arr[Math.floor((index - 1) / 2)]];
        index = Math.floor((index - 1) / 2);
      }
    }
    // 小顶堆
    if (this.type == "small") {
      // (子节点下标-1 )/ 2 向下取整可得父节点下标
      while (index && this.arr[Math.floor((index - 1) / 2)] > this.arr[index]) {
        [this.arr[Math.floor((index - 1) / 2)], this.arr[index]] = [this.arr[index], this.arr[Math.floor((index - 1) / 2)]];
        index = Math.floor((index - 1) / 2);
      }
    }
    // console.log(`push：${n} to heap`);
    // this.output()
  }
  pop() {
    if (!this.size()) return;
    // console.log(`pop：${this.top()} from heap`);
    // 将第一个元素与最后一个元素互换位置，同时堆的逻辑内存-1；这样做如果将堆内容一次性压入再全部弹出后就可以得到一个逆序的数组
    [this.arr[0], this.arr[this.count - 1]] = [this.arr[this.count - 1], this.arr[0]];
    this.count -= 1;
    let index = 0, n = this.count - 1;
    if (this.type == "big") {
      // 如果当前节点的左孩子小于总数量最后一位，就证明当前节点有左孩子
      while (index * 2 + 1 <= n) {
        let temp = index;
        // 与左右孩子进行大小比较；
        if (this.arr[temp] < this.arr[index * 2 + 1]) temp = index * 2 + 1;
        if (index * 2 + 2 <= n && this.arr[temp] < this.arr[index * 2 + 2]) temp = index * 2 + 2;
        if (temp == index) break;
        [this.arr[temp], this.arr[index]] = [this.arr[index], this.arr[temp]];
        index = temp;
      }
    }
    if (this.type == "small") {
      // 如果当前节点的左孩子小于总数量最后一位，就证明当前节点有左孩子
      while (index * 2 + 1 <= n) {
        let temp = index;
        // 与左右孩子进行大小比较；
        if (this.arr[temp] > this.arr[index * 2 + 1]) temp = index * 2 + 1;
        if (index * 2 + 2 <= n && this.arr[temp] > this.arr[index * 2 + 2]) temp = index * 2 + 2;
        if (temp == index) break;
        [this.arr[temp], this.arr[index]] = [this.arr[index], this.arr[temp]];
        index = temp;
      }
    }
    // this.output();
  }
  top() {
    return this.arr[0]
  }
  size() {
    return this.count
  }
  output() {
    console.log("当前推空间:", this.arr.slice(0, this.count));
  }
  ele() {
    return this.arr.slice(0, this.count);
  }
}

// 测试用例
let heap = new Heap("big");
heap.push(1);
heap.push(5);
heap.push(3);
heap.push(93);
heap.pop();
heap.pop();
heap.pop();