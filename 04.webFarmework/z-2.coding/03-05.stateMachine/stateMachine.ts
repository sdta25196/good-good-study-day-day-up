
type StateTransferFunction = () => void

/** 
 * @param S:state 状态 
 * @param A：action 行为
 */
class StateMachine<S extends number, A extends number>{
  s: S
  table: Map<S, Map<A, [StateTransferFunction, S]>>

  register(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.table.has(from)) {
      this.table.set(from, new Map())
    }

    const adjTable = this.table.get(from)
    adjTable.set(action, [fn, to])
  }

  dispatch(active: A): boolean {
    const adjTable = this.table.get(this.s)
    if (!adjTable) { return false }
    if (!adjTable.has(active)) { return false }
    const [fn, nextS] = adjTable.get(active)
    fn()
    this.s = nextS
    while (this.dispatch(0 as A));
    return true
  }
}

// enum States {
//   Start,
//   DragStart,
//   Moving,
//   Stoped,
//   Selected
// }

// enum Actions {
//   AUTO,
//   EvtDragStart,
//   EvtDrag,
//   EvtDragEnd,
// }

// skedo源码中是用一个Editor类继承了stateMachine。然后注册了 所有状态。之后就直接使用Editor的示例dispatch。
// let s = States.Start
// let a = Actions.EvtDrag
// let oState = new StateMachine<States, Actions>()
// oState.register(States.Start, States.Moving, a, () => { })

