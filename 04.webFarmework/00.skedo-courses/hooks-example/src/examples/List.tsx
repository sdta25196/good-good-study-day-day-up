function List ({data} : {data : Array<string>}) {
	return <ul>
		{data.map((word) => {
			return <li key={word}>{word}</li>
		})}
	</ul>
}

export default function App(){
    return <List data={['a', 'b', 'c']} />
}