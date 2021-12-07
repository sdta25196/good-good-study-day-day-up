// 自定义loader结构
// 导出函数不能是箭头函数，会影响this
// 通过source接收源文件内容
// 必须有返回值
module.exports = function (source) {
  // console.log(this.query); // 获取配置文件中的options
  let result = source.replace("hello", "我擦，你好")
  /** 最简单的单一返回值 **/
  // return result

  /** 如何返回多个信息 **/
  // this.callback(null, result)  //callbacl第一个参数 为错误信息或者null

  /** 如何处理异步逻辑 **/
  const callback = this.async()
  setTimeout(() => {
    callback(null, result)
  }, 2000)

}