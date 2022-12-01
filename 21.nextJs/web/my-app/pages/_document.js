import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head >
        <script type="text/javascript"
          src="https://api.map.baidu.com/api?v=3.0&ak=AfRIcmwSb5H9ZZR9KzMaFs9CedSs3l1U&s=1"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}