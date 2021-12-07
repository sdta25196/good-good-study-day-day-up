export default function App () {
	return <Greetings message="Hello React!" />
}

function Greetings({message} : {message : string}) {
	return <h2>{message}</h2>
}