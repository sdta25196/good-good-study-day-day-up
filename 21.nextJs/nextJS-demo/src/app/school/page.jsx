import Link from 'next/link'
import styles from '../page.module.css'
import { Button } from './components'

export const revalidate = 0
// 修改head
// export const metadata = {
//   title: 'Next.js',
// }
// 动态修改元数据
export async function generateMetadata({ params, searchParams }, parent) {
  // // read route params
  // const id = params.id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  const aa = await new Promise((resolve, reject) => {
    setTimeout(() => { resolve('asdasdas') }, 1000)
  }).then(res => res)
  return {
    title: aa,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>
          就这破代码
        </h1>
        <Link href="/">回回回首页</Link>
        { }
        <img
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.vercelLogo}
          width={100}
          height={24}
        />
        <Button x={22} />
      </div>
    </main>
  )
}
