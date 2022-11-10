const js = import("jia-mi-vaolor");
import md5 from 'md5'
// const md5 = import("md5")
// var md5 = require('md5');
js.then(js => {
  // js.greet("66");
  let a = `很溜啊，6666666666666666666666666`
  console.time('rust')
  console.log(js.kaka(a))
  console.timeEnd('rust')
  console.time('js')
  console.log(md5(a));
  console.timeEnd('js')
})