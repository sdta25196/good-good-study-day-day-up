export const dynamicParams = false

export async function generateStaticParams() {
  let data = await fetch('http://localhost:9997/aaa', { next: { revalidate: 10 } }).then(res => res.json())
  console.log(data)
  return data.map((i) => ({
    id: i.toString()
  }))
}

function App({ params }) {
  const { id } = params
  return (
    <div>
      test: 第{id}个图
    </div>
  )
}

export default App