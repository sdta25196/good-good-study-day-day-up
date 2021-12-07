import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import EolAxios, { API } from "../../axios"
import {
  ContentLeft, ContentRight, HotSchoolAdList, HotNewsAdList, Space,
} from "../../components/common"
import {
  SchoolPageFutureNews, SchoolPageFutureCoop
} from "../../components/school"

/**
*
* @author : 田源
* @date : 2021-08-09 15:18
* @description : 中职院校落地页升学方向
*
*/
function SchoolPageFuture(props) {

  const { provinceid: provinceId } = useSelector(store => store.userLocation)

  const [hotSchool, setHotSchool] = useState([])
  const [hotNews, setHotNews] = useState([])

  useEffect(() => {
    /** 院校推荐运营位 */
    EolAxios.staticRequest({
      path: API.schoolYYHotSchool,
      params: [provinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setHotSchool(res.info)
      }
    })
  }, [provinceId])

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Space height='10px' />
      <ContentLeft>
        <SchoolPageFutureCoop />
        <Space height="50px" />
        <SchoolPageFutureNews />
      </ContentLeft>
      <ContentRight>
        <Space height='20px' />
        <HotSchoolAdList schoolAdList={hotSchool} />
        <Space height="50px" />
        <HotNewsAdList hotNews={hotNews} />
      </ContentRight>
    </>
  )
}

export default SchoolPageFuture