/**
*
* @author : 田源
* @date : 2023-02-08 17:03
* @description : 马里奥状态机
*
*/


// 完成马里奥状态机
// ! 普通状态，遇怪 死亡
// ! 超级状态，积分+100；遇怪 -100，其他状态类推
// ! 火焰状态，积分+300；遇怪 -300，其他状态类推
// ! 斗篷状态，积分+500；遇怪 -500，其他状态类推

// 状态机
class StateMachine {
  constructor() {
    this.table = new Map()
  }

  register(action, event) {
    this.table.set(action, event)
  }

  dispatch(action, ...params) {
    const event = this.table.get(action)
    if (!event) return
    event(...params)
  }

}

const ACTIONS = {
  init: {
    state: 'small',
    score: 0
  }, // 初始状态
  mogu: {
    name: 'mogu',
    state: 'super',
    score: 100
  }, // 吃蘑菇，变超级状态，积分+100
  huo: {
    name: 'huo',
    state: 'fire',
    score: 300
  }, // 吃火，变火焰状态，积分+300
  pipeng: {
    name: 'pipeng',
    state: 'cloak',
    score: 500
  }, // 吃披风，变斗篷状态，积分+500
  monster: {
    name: 'monster',
    state: 'samll',
    score: -1
  }, // 遇怪物，变回普通状态，积分减当前状态所加积分
}

// 马里奥状态机
class Msm {
  constructor() {
    this.state = ACTIONS.init
    this.historyScore = []
    this.sm = new StateMachine()
    this.init()
  }

  init() {
    this.sm.register(ACTIONS.mogu.name, () => {
      this.state.state = ACTIONS.mogu.state
      this.state.score += ACTIONS.mogu.score
      this.historyScore.push(ACTIONS.mogu.score)
      console.log("马里奥吃蘑菇，变为" + this.state.state + "状态，当前积分为" + this.state.score)
    })
    this.sm.register(ACTIONS.huo.name, () => {
      this.state.state = ACTIONS.huo.state
      this.state.score += ACTIONS.huo.score
      this.historyScore.push(ACTIONS.huo.score)
      console.log("马里奥吃火，变为" + this.state.state + "状态，当前积分为" + this.state.score)
    })
    this.sm.register(ACTIONS.pipeng.name, () => {
      this.state.state = ACTIONS.pipeng.state
      this.state.score += ACTIONS.pipeng.score
      this.historyScore.push(ACTIONS.pipeng.score)
      console.log("马里奥吃披风，变为" + this.state.state + "状态，当前积分为" + this.state.score)
    })
    this.sm.register(ACTIONS.monster.name, () => {
      this.state.score -= this.state.state === ACTIONS.init.state ? 100 : this.historyScore.shift()
      this.state.state = ACTIONS.init.state
      console.log("马里奥遇险，变为普通状态，当前积分为" + this.state.score)
      if (this.state.score < 0) {
        console.log("马里奥死亡")
      }
    })
  }
  dispatch(action) {
    this.sm.dispatch(action)
  }
}

let msm = new Msm()
msm.dispatch(ACTIONS.mogu.name)
msm.dispatch(ACTIONS.huo.name)
msm.dispatch(ACTIONS.mogu.name)
msm.dispatch(ACTIONS.mogu.name)
msm.dispatch(ACTIONS.monster.name)
msm.dispatch(ACTIONS.monster.name)
msm.dispatch(ACTIONS.monster.name)
msm.dispatch(ACTIONS.huo.name)
msm.dispatch(ACTIONS.monster.name)
msm.dispatch(ACTIONS.huo.name)
msm.dispatch(ACTIONS.huo.name)
msm.dispatch(ACTIONS.huo.name)
msm.dispatch(ACTIONS.monster.name)
msm.dispatch(ACTIONS.pipeng.name)
msm.dispatch(ACTIONS.pipeng.name)
msm.dispatch(ACTIONS.monster.name)