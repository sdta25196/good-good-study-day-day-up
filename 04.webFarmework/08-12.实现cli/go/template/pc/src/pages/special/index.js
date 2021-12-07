import { useEffect, useState } from "react"
import {
  currentTopPageType, Layout, ContentLeft, ContentRight, Laypage,
  RadiusImage, HotSchoolAdList, HotNewsAdList, Space, FilterCompents, Nodata
} from "../../components/common"
import { SpecialList } from "../../components/special"
import EolAxios, { API } from "../../axios"
import styles from '../../components/special/sass/index.module.scss'
import { controlScroll, openWindow } from "../../tools"
import { useSelector } from "react-redux"


export default function Special(props) {
  const { provinceid: provinceId } = useSelector(store => store.userLocation)
  const [specialType, setSpecialType] = useState([])
  const [specialTypeId, setSpecialTypeId] = useState("")

  const [topImg, setTopImg] = useState([])
  const [hotSchool, setHotSchool] = useState([])
  const [hotNews, setHotNews] = useState([])

  const [pageData, setPageData] = useState({
    dataList: [],
    total: 0,
    currentPage: 1,
    nodata: false,
    size: 20
  })

  useEffect(() => {
    EolAxios.staticRequest({
      path: API.specicalYYHotSchool,
      params: [provinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setHotSchool(res.info)
      }
    })
  }, [provinceId])

  useEffect(() => {
    /** 运营位 */
    EolAxios.staticRequest({
      path: API.specicalYY
    }).then(res => {
      if (res === null) return
      if (res[1].status === "1") {
        setTopImg(topImg => topImg = res[1].info)
      }
    })

    // 右侧资讯推荐
    EolAxios.dynamicRequest({
      path: API.newsList,
      formData: {
        size: 10
      }
    }).then(res => {
      if (res === null) return
      setHotNews(res.data)
    })
    return () => {
      EolAxios.cancel()
    }
  }, [])

  /** 筛选条件 */
  useEffect(() => {
    EolAxios.staticRequest({
      path: API.specialFilter
    }).then(res => {
      if (res === null) return
      setSpecialType(type => res.map(item => ({ name: item.name, id: item.spe_id })))
    })
  }, [])

  useEffect(() => {
    getList({
      page: 1,
      spe_id: specialTypeId,
      size: pageData.size,
    })
  }, [specialTypeId, pageData.size])

  const pageChange = (page) => {
    controlScroll({ y: 100 })
    getList({
      page,
      spe_id: specialTypeId,
      size: pageData.size,
    })
  }

  function getList({ page = 1, spe_id, size }) {
    EolAxios.dynamicRequest({
      path: API.specialList,
      formData: {
        spe_id,
        size,
        page
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
    <Layout title="职教专业" currentTopPage={currentTopPageType.SPECIAL}>
      <Space height='20px' />
      <ContentLeft>
        <div className={styles.filterBox}>
          <FilterCompents title="专业门类" filter={specialType} activeId={specialTypeId}
            onClick={setSpecialTypeId} addAll />
        </div>
        <SpecialList dataList={pageData.dataList} />
        <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
        <Nodata isShow={pageData.nodata} />
      </ContentLeft>
      <ContentRight>
        {
          topImg.map((item, i) => {
            return <div style={{ marginBottom: i === 0 ? '20px' : '' }} key={i}>
              <RadiusImage src={item.img_url} onClick={() => openWindow(item.link)}
                width="360px" height="204px" hoverAnimation={false} />
            </div>
          })
        }
        <Space height="50px" />
        <HotSchoolAdList schoolAdList={hotSchool} />
        <Space height="50px" />
        <HotNewsAdList hotNews={hotNews} />
      </ContentRight>
    </Layout>
  )
}