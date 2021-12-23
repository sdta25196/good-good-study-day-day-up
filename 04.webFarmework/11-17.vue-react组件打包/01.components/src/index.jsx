import React, { useEffect, useState } from "react"
import styles from './index.module.less'

function App({ x, img }) {
  const [num, setNum] = useState('')
  useEffect(() => {
    fetch('http://localhost:3100/').then(res => res.json()).then(data => {
      console.log(data)
      setNum(data)
    })
  }, [])
  return (
    <div className={styles.box}>
      <p>
        外部传入的数据x：{x}
      </p>
      <p>
        远程获取的数据num：{num}
      </p>
      <img src={img} alt="" />
    </div>
  )
}

export default App