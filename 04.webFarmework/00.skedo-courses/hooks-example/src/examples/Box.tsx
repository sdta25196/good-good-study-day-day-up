type Children = JSX.Element | JSX.Element[] | null
const Box = ({children ,element} : {children : Children, element : Children}) => {

	// JSX -> Javascript 
	return <div style={{
		display: 'flex',
		alignItems : 'center',
		justifyContent : 'center'
	}} className="xxx">
		{children || element}
	</div>
}

const App = () => {
	return <Box element={
		<>
			<h1>This is title</h1>
			<p>..........</p>
		</>
	}>

	</Box>
}

export default App