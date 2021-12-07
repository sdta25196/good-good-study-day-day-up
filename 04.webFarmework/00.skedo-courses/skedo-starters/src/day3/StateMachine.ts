
// enum States{
//   Start,
//   DragStart,
//   Moving,
//   Stoped,
//   Selected
// }

// export enum Actions {
//   AUTO,
//   EvtDragStart,
//   EvtDrag,
//   EvtDragEnd,
// }

type StateTransferFunction = () => void




class StateMachine<S extends number, A extends number> {

	s : S
	table : Map<S, Map<A, [StateTransferFunction, S]>>

	register(from : S, to : S, action : A, fn : StateTransferFunction) {
		if(!this.table.has(from)) {
			this.table.set(from, new Map())
		}

		const adjTable = this.table.get(from)
		adjTable.set(action, [fn, to])
	}

	dispatch(action : A) : boolean {
		const adjTable = this.table.get(this.s)
		if(!adjTable) {
			return false
		}

		if(!adjTable.has(action)) {
			return false
		}

		const [fn, nextS] = adjTable.get(action)
		fn()
		this.s = nextS

		while(this.dispatch(0 as A));
		return true
	}


}