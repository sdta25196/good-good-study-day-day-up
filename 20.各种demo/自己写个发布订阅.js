class observer {
  constructor() {
    this.observerList = []
  }

  push(info) {
    // console.log("发布信息:" + info);
    this.observerList.forEach(item => {
      item.receive(info)
    });
  }

  addObserver(val) {
    // console.log("添加订阅者" + val.name);
    let ind = this.observerList.length
    this.observerList.push(val)
    return () => {
      this.observerList.splice(ind, 1);
    }
  }
}

class o1 {
  constructor(name) {
    this.name = name
    this.infoList = []
  }
  get historyInfo() {
    return this.infoList.join("\n");
  }
  receive(info) {
    // console.log(this.name + "接收到信息：" + info);
    this.infoList.push(info)
  }
}

let ob = new observer();
let server1 = new o1("老田");
let server2 = new o1("老张");
ob.addObserver(server1);
ob.addObserver(server2);
ob.push("我要开始发消息了===========")
ob.push("春眠不觉晓")
ob.push("处处闻啼鸟")
ob.push("夜来风雨声")
ob.push("花落知多少")
ob.push("消息发送完毕===============")
console.log(server1.name + "收到的全部信息如下:\n", server1.historyInfo);