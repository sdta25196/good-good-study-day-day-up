import { memo, useEffect, useRef, useState } from 'react'
import { openWindow } from '../../tools'
import styles from './sass/HotSchoolAdList.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-06 16:22
* @description : 右侧院校推荐列表
*
*/
function HotSchoolAdList({ schoolAdList = [] }) {
  const [activeLi, setActiveLi] = useState(0)
  const interval = useRef(null)

  useEffect(() => {
    startInterval(schoolAdList.length)
    return () => {
      stopInterval()
    }
  }, [schoolAdList])

  const handleEnter = (i) => {
    stopInterval()
    setActiveLi(active => active = parseInt(i))
  }

  const startInterval = (length = 0) => {
    interval.current = setInterval(() => {
      setActiveLi(active => active = ((active + 1) + length) % length)
    }, 1000);
  }

  const stopInterval = () => {
    clearInterval(interval.current)
  }

  return (
    <div>
      <div className={styles.title}>
        院校推荐
      </div>
      <div className={styles.box}>
        <ul>
          {
            schoolAdList.map((item, i) => {
              return <li key={i}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => startInterval(schoolAdList.length)}
                onClick={() => openWindow(item.link)}
              >
                <span className={styles.num}></span>
                <img src={item.img_url} alt=""
                  className={`${activeLi === i ? styles.active : ""} ${styles.logo}`} />
                <span className={`${activeLi === i ? styles.active : ""} ${styles.name}`}>
                  {item.title}
                </span>
              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default memo(HotSchoolAdList)