/*
*
* @author: 田源
* @date: 2021-03-19 06:35
* @description:  表达式求值
*
*/

calc = (expre, l, r) => {
  let op = -1, pri = 10000 - 1, cur_pri, temp = 0;
  for (let i = l; i <= r; i++) {
    cur_pri = 10000;
    switch (expre[i]) {
      case "+":
      case "-": cur_pri = 1 + temp; break;
      case "*":
      case "/": cur_pri = 2 + temp; break;
      case "(": temp += 100; break;
      case ")": temp -= 100; break;
    }
    if (cur_pri <= pri) {
      pri = cur_pri;
      op = i;
    }
  }
  if (op == -1) {
    let num = expre.slice(l, r + 1).match(/\d+(\.\d+)*/g)
    return num && (num[0] - 0);
  };
  let a = calc(expre, l, op - 1);
  let b = calc(expre, op + 1, r);
  switch (expre[op]) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
  }
  return 0;
}
// 测试用例
let expre = "3*(4+5)";
let result = calc(expre, 0, expre.length - 1);
console.log(result);