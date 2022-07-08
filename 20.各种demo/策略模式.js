function add() { }
add.prototype.calc = (x, y) => {
  return x + y
}
function sub() { }
sub.prototype.calc = (x, y) => {
  return x - y
}

class f {
  constructor(num) {
    this.num = num
  }
  performances = (f) => {
    this.d = new f()
  }
  calc = (x) => {
    return this.d.calc(this.num, x);
  }
}
c = new f(5)
c.performances(sub) // 使用减法策略
console.log(c.calc(5));
c.performances(add) // 使用加法策略
console.log(c.calc(5));




