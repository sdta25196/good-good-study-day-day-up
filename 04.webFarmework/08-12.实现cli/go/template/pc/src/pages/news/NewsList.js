import { useEffect, useState } from "react"
import EolAxios, { API } from "../../axios"
import { currentTopPageType, Layout, Laypage, Breadcrumb, NewsCard, Nodata } from "../../components/common"
import { controlScroll, openWindow } from "../../tools"

/**
*
* @author : 田源
* @date : 2021-08-18 13:01
* @description : 职业热点 - 资讯列表页
*
*/
function NewsList(props) {
  const { match: { params: { classId } } } = props
  const [breadcrumb, setBreadcrumb] = useState(props.breadcrumb)
  const [pageData, setPageData] = useState({
    tablist: [],
    total: 0,
    currentPage: 1,
    size: 20,
    nodata: false
  })

  /** 处理面包屑名称 */
  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.newsTabbar,
    }).then(res => {
      if (res === null) return
      const bar = res.find(e => e.class_id === classId)
      setBreadcrumb(breadcrumb => {
        const hasName = breadcrumb.find(item => item.name === bar?.name)
        return hasName ? breadcrumb : breadcrumb.concat([{ "name": bar?.name }])
      })
    })
    getList({
      page: 1,
      class_id: classId,
      size: pageData.size
    })
  }, [classId, pageData.size])

  const pageChange = (page) => {
    controlScroll({ y: 0 })
    getList({
      page,
      class_id: classId,
      size: pageData.size
    })
  }

  const getList = ({
    page = 1,
    class_id,
    size
  }) => {
    EolAxios.dynamicRequest({
      path: API.newsList,
      formData: {
        page,
        class_id,
        size
      }
    }).then(res => {
      if (res === null) return
      if (res.data.length) {
        setPageData(data => data = {
          ...data,
          tablist: res.data,
          total: parseInt(res.rows),
          currentPage: page,
          nodata: false,
        })
      } else {
        setPageData(data => data = {
          ...data,
          tablist: [],
          total: 0,
          currentPage: 1,
          nodata: true,
        })
      }
    })
  }

  return (
    <Layout title="职业热点资讯" currentTopPage={currentTopPageType.NEWS}>
      <Breadcrumb breadcrumb={breadcrumb} />
      {
        pageData.tablist.map((item, i) => {
          return (
            <NewsCard time={item.publish_time} title={item.title} key={i} subTitle={item.synopsis} scource={item.froms}
              onClick={() => openWindow(`/news/detail/${item.news_id}`)} />
          )
        })
      }
      <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
      <Nodata isShow={pageData.nodata} />
    </Layout>
  )
}

export default NewsList