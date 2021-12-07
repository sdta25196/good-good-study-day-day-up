import jsdom from 'jsdom'
const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<body>
	<div>
		<div>
			<span />
			<span />
		</div>
		<a />
		<div>
			<span></span>
			<span></span>
		</div>
	</div>
</body>`)

const body = dom.window.document.body

function *bfs(node : Element) : Generator<Element> {
	const queue = new Array<Element>(1000) 
	let i = 0, j = 0
	queue[j++] = node

	while(i !== j) {
		const node = queue[i++]
		console.log('traverse to', node.tagName, node.children.length)
		yield node

		if(node.children) {
			for(let k = 0; k < node.children.length; k++) {
				const child = node.children[k]
				console.log('enqueue', child.tagName)
				queue[j++] = child
			}
		}
	}

} 

function *dfs(node : Element) : Generator<Element> {
	yield node
	if(node.children) {
		for(let i = 0; i < node.children.length; i++) {
			const child = node.children[i]
			yield * dfs(child)
		}
	}

}


console.log('bfs----')
for(const node of bfs(body)) {
	console.log(node.tagName)
}

// console.log('dfs----')
// for(const node of dfs(body)) {
// 	console.log(node.tagName)
// }