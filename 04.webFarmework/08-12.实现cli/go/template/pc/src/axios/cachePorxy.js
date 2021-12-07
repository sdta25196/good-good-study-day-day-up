/**
*
* @author: 田源
* @date: 2021-08-03 10:51
* @description: 缓存代理
* @argument {apiMap} api的缓存数据
* @argument {pending} pending中的接口
*/
class CachePorxy {
  static #instance = null
  apiMap = new Map()
  pending = new Map()

  constructor() {
    return this.#setTnstance()
  }

  #setTnstance() {
    if (!CachePorxy.#instance) {
      CachePorxy.#instance = this;
    }
    return CachePorxy.#instance
  }
}

export default CachePorxy