import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EolAxios, { API } from '../../axios'
import { controlScroll, getDate, openWindow } from '../../tools'
import { Laypage, Nodata } from '../common'
import styles from './sass/SchoolPageNews.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-11 11:29
* @description : 学校落地页招生快讯-列表
*
*/
function SchoolPageNewsList(props) {
  const { schoolCode } = useParams()

  const [pageData, setPageData] = useState({
    dataList: [],
    total: 0,
    currentPage: 1,
    nodata: false,
    size: 20
  })

  useEffect(() => {
    getList({ page: 1, data_code: schoolCode })
  }, [schoolCode])

  const pageChange = (page) => {
    controlScroll({ y: 450 })
    getList({ page, data_code: schoolCode })
  }

  function getList({
    page = 1,
    data_code,
  }) {
    EolAxios.dynamicRequest({
      path: API.schoolNews,
      formData: {
        type: "6001",
        data_code
      }
    }).then(res => {
      if (res === null) return
      if (res.info.length) {
        setPageData(data => data = {
          ...data,
          dataList: res.info,
          total: parseInt(res.rows),
          currentPage: page,
          nodata: false,
        })
      } else {
        setPageData(data => data = {
          ...data,
          dataList: [],
          total: 0,
          currentPage: 1,
          nodata: true,
        })
      }
    })
  }
  return (
    <div className={styles.newsBox}>
      <div className={styles.detialTitle}>
        招生快讯
      </div>
      <div>
        {
          pageData.dataList.map((item, i) => {
            let { year, month, day } = getDate(item.publish_time)
            return (
              <div className={styles.box} key={i} onClick={() => openWindow(item.url)}>
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
      </div>
      <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
      <Nodata isShow={pageData.nodata} />
    </div>
  )
}

export default SchoolPageNewsList