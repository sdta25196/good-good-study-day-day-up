import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EolAxios, { API } from '../../axios'
import { Space, ContentLeft, ContentRight, HotSchoolAdList, HotNewsAdList } from '../../components/common'
import { SchoolPageSpecialMain } from '../../components/school'

/**
*
* @author : 田源
* @date : 2021-08-09 15:19
* @description : 中职院校落地页开设专业
*
*/

function SchoolPageSpecial(props) {
  const { match: { params: { schoolCode } } } = props
  const { provinceid: provinceId } = useSelector(store => store.userLocation)
  const [specialList, setSpecialList] = useState([])
  const [featureSpecialList, setFeatureSpecialList] = useState([])
  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.schoolSpecial,
      formData: {
        data_code: schoolCode
      }
    }).then(res => {
      if (res === null) return
      setFeatureSpecialList(res.unique)
      setSpecialList(res.no_unique)
    })
  }, [schoolCode])


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
        <SchoolPageSpecialMain special={specialList} featureSpecial={featureSpecialList} />
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

export default SchoolPageSpecial