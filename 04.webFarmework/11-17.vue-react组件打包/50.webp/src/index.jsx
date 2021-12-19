import React from "react"
import styles from './index.module.less'

function App({ x,img }) {
  return (
    <div className={styles.box}>
      这个组件使用上下文x:{x}
      <img src={img} alt="" />
    </div>
  )
}

export default App