import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}