/**
*
* @author : 田源
* @date : 2021-09-10 14:22
* @description : 状态机 - 包含注册与派发
*
*/
class StateMachine {

  table = new Map()

  register(action, callback) {
    this.table.set(action, callback)
  }

  dispatch(action, ...params) {
    const fn = this.table.get(action)
    if (!fn) return false
    fn(...params)
  }
}


const ACTIONS = {
  on: 'on',
  off: 'off',
}
class YourClass extends StateMachine {

  constructor() {
    super()
    this.init()
  }

  init() {
    this.register(ACTIONS.on, () => {
      console.log('打开了开关');
    })
    this.register(ACTIONS.off, (smthing) => {
      console.log('关闭了开关，然后：', smthing);
    })
  }
}

let yClass = new YourClass()
yClass.dispatch(ACTIONS.on)
yClass.dispatch(ACTIONS.off, '下班')