
import { useEffect, useState } from 'react'
import EolAxios, { API } from '../../axios'
import { getDate, openWindow } from '../../tools'
import styles from './sass/NewsHotNews.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-12 16:02
* @description : 职教热点顶部右侧热门资讯
*
*/
function NewsHotNews(props) {
  const [news, setNews] = useState([])
  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.newsList,
      formData: {
        size: 8,
        is_push: 1
      }
    }).then(res => {
      if (res === null) return
      setNews(res.data)
    })
  }, [])

  const getDay = (time) => {
    const date = getDate(time)
    let { month, day } = date
    return `${month}-${day}`
  }

  return (
    <div className={styles.hotNews}>
      <ul>
        {
          news.map((item, i) => {
            return <li key={i} onClick={() => openWindow(`/news/detail/${item.news_id}`)}>
              <span className={styles.day}>{getDay(item.publish_time)}</span>
              <span className={styles.name}>{item.title}</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default NewsHotNews