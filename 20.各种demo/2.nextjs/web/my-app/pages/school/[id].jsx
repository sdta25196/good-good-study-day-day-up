import Link from 'next/link'

export const getStaticPaths = async () => {
  return {
    paths: [1, 2, 3].map((id) => {
      return {
        params: {
          id: id.toString()
        },
      }
    }),
    fallback: 'blocking',
  }
}

export const getStaticProps = async (
  context
) => {
  const { id } = context.params
  // const postData = await (await fetch('http://localhost:9996/' + id)).json()
  const postData = { s: id }
  console.log(postData)
  return {
    props: {
      postData: postData.s,
    },
    // revalidate: 10,
  }
}

function App({ postData }) {
  return (
    <div>
      <a href='/school/1'>去1</a>
      <a href='/school/2'>去2</a>
      <a href='/school/3'>去3</a>
      <a href='/school/4'>去4</a>
      <a href='/school/5'>去5</a>
      <Link href='/school/1'>
        <a>link去1</a>
      </Link>
      <Link href='/school/2'>
        <a>link去2</a>
      </Link>
      <Link href='/school/3'>
        <a>link去3</a>
      </Link>
      哈哈哈哈哈{postData}这个是第二次更新哦
      <div>
        这是第三次更新了
      </div>
      <div>
        这是第4次更新了
      </div>
      <div>
        这是第5次更新了6666
      </div>
    </div>
  )
}

export default App