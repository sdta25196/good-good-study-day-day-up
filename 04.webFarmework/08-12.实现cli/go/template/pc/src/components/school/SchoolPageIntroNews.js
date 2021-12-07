import { useHistory, useParams } from 'react-router-dom'
import { getDate, openWindow } from '../../tools'
import { Space } from '../common'
import styles from './sass/SchoolPageIntro.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-10 10:57
* @description : 学校落地页简介-招生快讯
*
*/
function SchoolPageIntroNews({ news = [] }) {
  const { schoolCode } = useParams()

  const history = useHistory()
  if (!news.length) {
    return <div></div>
  }
  return (
    <>
      <Space height="50px" />
      <div className={styles.newsBox}>
        <div className={styles.title}>
          招生快讯
        </div>
        {
          news.map(item => {
            let { year, month, day } = getDate(item.publish_time)
            return (
              <div className={styles.box} key={item.id}
                onClick={() => openWindow(item.url)}>
                <div className={styles.date}>
                  <span className={styles.day}>{month}-{day}</span>
                  <span className={styles.year}>{year}</span>
                </div>
                <div className={styles.content}>
                  <p className={styles.t}>
                    {item.title}
                  </p>
                  <p className={styles.subT}>
                  </p>
                  <p className={styles.source}>
                    文章来源：{item.from}
                  </p>
                </div>
              </div>
            )
          })
        }
        <div className={styles.btnBox}>
          <button className='button' onClick={() => history.push(`/school/${schoolCode}/news`)}>
            查看更多
          </button>
        </div>
      </div >
    </>
  )
}

export default SchoolPageIntroNews