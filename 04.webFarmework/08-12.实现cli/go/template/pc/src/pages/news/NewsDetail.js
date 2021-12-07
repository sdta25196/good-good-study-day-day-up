import { useEffect, useState } from "react"
import EolAxios, { API } from "../../axios"
import { Layout, currentTopPageType, Breadcrumb, Nodata } from "../../components/common"
import styles from '../../components/news/sass/NewsDetail.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-12 16:43
* @description : 文章详情页面
*
*/
function NewsDetail(props) {
  const { breadcrumb, match: { params: { newsId } } } = props
  const [nodata, setNodata] = useState(false)
  const [detail, setDetail] = useState({
    content: "",
    keywords: "",
    publish_time: "",
    title: "",
  })

  useEffect(() => {
    EolAxios.staticRequest({
      path: API.newsDetail,
      params: [newsId]
    }).then(res => {
      if (!res) {
        setNodata(true)
        return
      }
      setDetail(res)
    })
  }, [newsId])

  return (
    <Layout title="职业热点" currentTopPage={currentTopPageType.NEWS}>
      <div>
        <div className={styles.titleBox}>
          <Breadcrumb breadcrumb={breadcrumb} />
          <p className={styles.title}>{detail.title}</p>
          <span className={styles.source}>{detail.keywords && `来源：${detail.keywords}`}</span>
          <span className={styles.date}>{detail.publish_time}</span>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: detail.content }}></div>
        <Nodata isShow={nodata} />
      </div>
    </Layout>
  )
}

export default NewsDetail