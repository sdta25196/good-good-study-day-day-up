/*
*
* @author: 田源
* @date: 2021-03-19 06:35
* @description:  表达式求值
* 计算一段字符串表达式（expre）的结果，
* expre中如果没有运算符，就返回expre中的数字，
* 如果有运算符就递归以运算为分界的左右两侧字符串，直到没有运算符时返回数字；
* 如果有多个运算符，就以权重最低的运算符为分界线
* 此表达式暂不支持负值，负值的解决方案为，在负值前添加0值，例：
* 5+-3 转化为 5+0-3；即可解决负值
*/

calc = (expre, l, r) => {
  // 运算符下标位置
  let op = -1;
  // 默认最低权重为10000, 默认权重变量为0;  加减权重+1 乘除权重+2 每层括号内权重+100
  let pri = 10000, temp = 0;
  for (let i = l; i <= r; i++) {
    // 每次循环让当前权重大于目前最低的权重
    let cur_pri = pri + 1;
    switch (expre[i]) {
      case "+":
      case "-": cur_pri = 1 + temp; break;
      case "*":
      case "/": cur_pri = 2 + temp; break;
      case "(": temp += 100; break;
      case ")": temp -= 100; break;
    }
    // 匹配当前下标的字符串如果是运算符，就会出现权重变化，如果当前是运算符，切运算符权限低于目前最低权重，就修改当前运算符为最低权重
    if (cur_pri <= pri) {
      pri = cur_pri;
      op = i;
    }
  }
  // 循环整个字符串完成，如果op为 -1 就代表本段字符串没有计算法，取出本段字符串中的数字返回即可，此时退出递归；
  if (op == -1) {
    // let num = 0;
    // for (let j = l; j <= r; j++) {
    //   if (expre[j] < "0" || expre[j] > "9") continue; //小于字符串0大于字符串9 判断原理为asiii码排序大小
    //   num = num * 10 + (expre[j] - 0);
    // }
    let num = expre.slice(l, r + 1).match(/\d+(\.\d+)*/g)
    return num && (num[0] - 0);
  };
  // 如果op 不为-1 代表当前字符串中含有运算符。以最低的运算符为界限二分递归左右两组字符串
  // 二分计算更低的优先级
  let a = calc(expre, l, op - 1);
  let b = calc(expre, op + 1, r);
  // 不停的递归，直到碰到递归出口 (op==-1),证明已经找到运算符优先级最高的两个值，相应调用运算符即可 
  switch (expre[op]) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
  }
  return 0;
}
// 测试用例
let expre = "12-(-6)";
// let expre = "3*(4+5)+(55*8)-9.1";
let result = calc(expre, 0, expre.length - 1);
console.log(result);