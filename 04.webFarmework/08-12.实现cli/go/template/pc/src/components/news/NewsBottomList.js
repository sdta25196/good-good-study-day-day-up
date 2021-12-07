import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import EolAxios, { API } from "../../axios"
import { openWindow } from "../../tools"
import { NewsCard, Nodata } from "../common"
import styles from './sass/NewsBottomList.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-18 12:59
* @description : 职业热点底部资讯列表
*
*/
function NewsBottomList(props) {
  const history = useHistory()
  const [tabbar, setTabbar] = useState([])
  const [tablist, setTablist] = useState([])
  const [active, setActive] = useState(0)
  const [nodata, setNodata] = useState(false)

  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.newsTabbar,
    }).then(res => {
      if (res === null) return
      setTabbar(res)
      getList(res[active].class_id)
    })
  }, [active])

  const getList = (classId) => {
    EolAxios.dynamicRequest({
      path: API.newsList,
      formData: {
        class_id: classId,
        page: 1,
        size: 10
      }
    }).then(res => {
      if (res === null) return
      if (res.data.length) {
        setTablist(res.data)
      } else {
        setNodata(true)
      }
    })
  }
  return (
    <div>
      <div className={styles.tab}>
        {
          tabbar.map((item, i) => {
            return (
              <span className={`${styles.span} ${active === i ? styles.active : ""}`} onClick={() => setActive(i)} key={i}>
                {item.name}
              </span>
            )
          })
        }
      </div>
      <div className={styles.list}>
        {
          tablist.map((item, i) => {
            return (
              <NewsCard time={item.publish_time} title={item.title} key={i} subTitle={item.synopsis} scource={item.froms}
                onClick={() => openWindow(`/news/detail/${item.news_id}`)} />
            )
          })
        }
        <Nodata isShow={nodata} />
      </div>
      <div className={styles.btnBox}>
        <button className={`button`} onClick={() => history.push(`/news/list/${tabbar[active].class_id}`)}>查看更多</button>
      </div>
    </div >
  )
}

export default NewsBottomList