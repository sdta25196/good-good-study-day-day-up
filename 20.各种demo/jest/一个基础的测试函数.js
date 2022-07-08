// 加法函数
function add(a, b) {
  return a + b;
}
// 测试用例
test("测试加法", () => {
  expect(add(1, 2)).toBe(5);
})

// 测试函数
function test(title, fn) {
  try {
    fn();
    console.log(title,"成功");
  } catch (error) {
    console.log(title, error);
  }
}
// 测试预期函数
function expect(ans){
  return {
    toBe(x){
      if(ans != x){
        throw Error("出错了")
      }
    }
  }
}