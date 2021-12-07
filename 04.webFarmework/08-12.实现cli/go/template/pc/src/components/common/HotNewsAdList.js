import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { getDate } from '../../tools'
import styles from './sass/HotNewsAdList.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-06 16:22
* @description : 右侧资讯推荐列表
*
*/
function HotNewsAdList({ hotNews = [] }) {
  const history = useHistory()
  const getDay = (time) => {
    const date = getDate(time)
    let { month, day } = date
    return `${month}-${day}`
  }

  return (
    <div>
      <div className={styles.title}>
        热门资讯
      </div>
      <div className={styles.box}>
        <ul>
          {
            hotNews.map((item, i) => {
              return <li key={i} onClick={() => history.push(`/news/detail/${item.news_id}`)}>
                <span className={styles.day}>{getDay(item.publish_time)}</span>
                <span className={styles.name}>
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

export default memo(HotNewsAdList)