const testNow = require("../index");

test("测试生成代码", () => {
  const _testNow = new testNow()
  const ret = _testNow.getTestSoucer("fun", "classfile")
  expect(ret)
    .toBe(`
test('TEST_fun',()=>{
  const fun = require('../classfile')
  const ret = fun()
  //  expect(ret)
  //    .toBe('test result')
})
    `)
})

test("自动生成测试目录", () => {
  const _testNow = new testNow();
  let testPath = _testNow.getTestFileName('abc/class.js')
  expect(testPath).toBe('abc/__test__/class.spec.js')
})