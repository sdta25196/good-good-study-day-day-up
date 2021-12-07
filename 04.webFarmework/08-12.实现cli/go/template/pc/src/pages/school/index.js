import { useEffect, useState } from "react"
import {
  currentTopPageType, Layout, ContentLeft, ContentRight, Laypage,
  RadiusImage, HotSchoolAdList, HotNewsAdList, Space, FilterCompents, Nodata
} from "../../components/common"
import { SchoolList } from "../../components/school"
import EolAxios, { API } from "../../axios"
import styles from '../../components/school/sass/index.module.scss'
import { useCity, useProvince } from "../../hooks"
import { controlScroll, openWindow } from "../../tools"
import { useSelector } from "react-redux"

/**
*
* @author : 田源
* @date : 2021-08-09 14:56
* @description : 学校列表页
*
*/
export default function School(props) {
  const { provinceid: localProvinceId } = useSelector(store => store.userLocation)

  const { setProvinceId, province, provinceId } = useProvince()
  const { setCityId, setCity, city, cityId } = useCity(provinceId)

  const [schoolType, setSchoolType] = useState([])
  const [schoolTypeId, setSchoolTypeId] = useState("")
  const [schoolFeature, setSchoolFeature] = useState([])
  const [schoolFeatureId, setSchoolFeatureId] = useState("")

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
      path: API.schoolYYHotSchool,
      params: [localProvinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setHotSchool(res.info)
      }
    })
  }, [localProvinceId])

  useEffect(() => {
    /** 运营位 */
    EolAxios.staticRequest({
      path: API.schoolYY
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
      path: API.schoolFilter
    }).then(res => {
      if (res === null) return
      setSchoolType(type => {
        let format = res[2].map(item => ({ name: item.name, id: item.code }))
        return type = format
      })
      setSchoolFeature(feature => {
        let format = res[4].map(item => ({ name: item.name, id: item.code }))
        return feature = format
      })
    })
  }, [])

  useEffect(() => {
    getList({
      page: 1,
      province_id: provinceId,
      city_id: cityId,
      type: schoolTypeId,
      characteristic: schoolFeatureId,
      size: pageData.size,
    })
  }, [provinceId, cityId, schoolTypeId, schoolFeatureId, pageData.size])

  const chooseProvince = (id) => {
    setProvinceId(id)
    setCity(id)
    setCityId("")
  }

  const pageChange = (page) => {
    controlScroll({ y: 0 })
    getList({
      page,
      province_id: provinceId,
      city_id: cityId,
      type: schoolTypeId,
      characteristic: schoolFeatureId,
      size: pageData.size,
    })
  }

  function getList({
    page = 1,
    province_id,
    city_id,
    type,
    characteristic,
    size
  }) {
    EolAxios.dynamicRequest({
      path: API.schoolList,
      formData: {
        province_id,
        city_id,
        type,
        characteristic,
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
    <Layout title="中职学校" currentTopPage={currentTopPageType.SCHOOL}>
      <div className={styles.box}>
        <ContentLeft>
          <div className={styles.filterBox}>
            <FilterCompents title="院校省份" filter={province} activeId={provinceId} onClick={chooseProvince} />
            <FilterCompents title="院校地区" filter={city} activeId={cityId} onClick={setCityId} addAll />
            <FilterCompents title="办学性质" filter={schoolType} activeId={schoolTypeId}
              onClick={setSchoolTypeId} addAll />
            <FilterCompents title="院校特色" filter={schoolFeature} activeId={schoolFeatureId}
              onClick={setSchoolFeatureId} addAll />
          </div>
          <div className={styles.listBox}>
            <SchoolList dataList={pageData.dataList} />
            <Laypage current={pageData.currentPage} pageSize={pageData.size} total={pageData.total} onChange={pageChange} />
            <Nodata isShow={pageData.nodata} />
          </div>
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
      </div>
    </Layout>
  )
}