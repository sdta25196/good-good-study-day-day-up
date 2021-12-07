const path = require("path");
module.exports = class TextNow {
  /*
  *
  * @author: 田源
  * @date: 2021-05-29 07:43
  * @description: 自动生成测试代码
  *
  */
  getTestSoucer(methodName, classFile, isClass = false) {
    return `
test('TEST_${methodName}',()=>{
  const ${isClass ? { methodName } : methodName} = require('../${classFile}')
  const ret = ${methodName}()
  //  expect(ret)
  //    .toBe('test result')
})
    `
  }

  /*
  *
  * @author: 田源
  * @date: 2021-05-29 07:15
  * @description: 自动生成测试文件
  *
  */
  getTestFileName(filename) {
    const dirName = path.dirname(filename);
    const baseName = path.basename(filename);
    const extName = path.extname(filename);
    const testName = baseName.replace(extName, `.spec${extName}`);
    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }
}