import { useEffect, useState } from "react"
import styles from './sass/Loading.module.scss'
/**
*
* @author: 田源
* @date: 2021-08-02 14:56
* @description: 显示loading组件，延迟300毫秒显示
*
*/
function Loading() {
  const [waiting, setWait] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setWait(true)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div>
      {
        waiting &&
        <div className={styles.loadingBox}>
          <div >
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
          </div>
        </div>
      }
    </div>
  )
}

export default Loading