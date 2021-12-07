import { useEffect, useState } from 'react'
import { getDate } from '../../tools'
import styles from './sass/NewsCard.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-05 11:58
* @description : 资讯卡片
*
*/
function NewsCard({ time, title, subTitle, scource, height = "139px", width = "100%", onClick }) {
  const [day, setDay] = useState()
  const [year, setYear] = useState()

  useEffect(() => {
    const date = getDate(time)
    let { year, month, day } = date
    setDay(`${month}-${day}`)
    setYear(year)
  }, [time])

  return (
    <div className={styles.box} style={{ width, height }} onClick={onClick}>
      <div className={styles.date}>
        <span className={styles.day}>{day}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.t}>
          {title}
        </p>
        <p className={styles.subT}>
          {/* {subTitle} */}
        </p>
        <p className={styles.source}>
          文章来源：{scource}
        </p>
      </div>
    </div>
  )
}

export default NewsCard