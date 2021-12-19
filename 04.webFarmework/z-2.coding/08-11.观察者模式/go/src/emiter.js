//! 注意点：1 监听事件要返回取消监听函数
//!        2 handler应该是对象而不是用数组

const topic = {
  add: "add",
  minus: "minux",
}

class Emiter {
  handler = []

  // 注册监听
  on(topic, fun) {
    if (!this.handler[topic]) {
      this.handler[topic] = []
    }
    let len = this.handler[topic].push(fun)
    return () => {
      // this.handler[topic] = this.handler[topic].filter(e => e !== fun)
      this.handler[topic].splice(len - 1, 1)
    }
  }

  // 发送消息
  emit(topic, info) {
    this.handler[topic] && this.handler[topic].forEach(fun => {
      fun(info)
    })
  }
}
class A extends Emiter {

}
const a = new Emiter()
a.on(topic.add, (info) => {
  console.log(info);
})
a.emit(topic.add, "6666")
