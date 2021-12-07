import { createStore } from 'redux'
(function() {

	const initialState = {
		list : [],
		users : []
	}
	function reducer(state : any = initialState, action : any) {
		if(action.type === 'add') {
			state.list.push("xxx")

			return {...state}
		}
		return state
	}


	const store = createStore(reducer)

	// 发布者 ： store
	// 接收者 ： UI
	
	// store subscribe UI????

	const unsubscribe = store.subscribe(() => {
		const state = store.getState()

		const list = state.list
		console.log(store.getState())
	})


	// function select(state) {
	// 	return {
	// 		list : state.list.map(..) 
	// 	}
	// }
	// const App = () => {
	// 	const [list, setList] = useState([])
	// 	useEffect(() => {
	// 		store.subscribe(() => {
	// 			const state = store.getState()
	// 			const props = select(state)
	// 			setList(props)
	// 		})
	// 	})

	// 	return <List list={list} />
	// }

	store.dispatch({type : "add"})
	store.dispatch({type : "add"})
	unsubscribe()


})()