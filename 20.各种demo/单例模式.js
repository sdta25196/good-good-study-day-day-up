// 使用私有变量实现
class Singleton {
  static #instance = null
  constructor(name) {
    this.name = name;
    return this.#setTnstance()
  }
  #setTnstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = this;
    }
    return Singleton.#instance
  }
  get oname() { return this.name }
  set oname(x) { this.name = x }
}
var oA = new Singleton('hi');
var oB = new Singleton('hisd');
console.log(oA === oB);

// 使用静态函数实现
class SingletonApple {
  constructor(name, creator, products) {
    this.name = name;
  }
  //静态方法
  static getInstance(name, creator, products) {
    if (!this.instance) {
      this.instance = new SingletonApple(name, creator, products);
    }
    return this.instance;
  }
  get oname() { return this.name }
  set oname(x) { this.name = x }
}

let appleCompany = SingletonApple.getInstance('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
let copyApple = SingletonApple.getInstance('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod'])

console.log(appleCompany === copyApple); //true