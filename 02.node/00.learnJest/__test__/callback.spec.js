const { callBack } = require("../callback")

test("测试异步", done => {
  callBack();
  // jest 等待异步执行函数，done
  setTimeout(done,1000)
})