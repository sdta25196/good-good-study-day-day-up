import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import EolAxios, { API } from "../../axios"
import { currentTopPageType, Layout, Space } from "../../components/common"
import { NewsBanner, NewsHotNews, NewsSchool, NewsBottomList } from "../../components/news"

/**
*
* @author : 田源
* @date : 2021-08-20 17:44
* @description : 职教热点
*
*/
export default function News(props) {
  const { provinceid: provinceId } = useSelector(store => store.userLocation)

  const [banner, setBanner] = useState([])
  const [newSchool, setNewSchool] = useState([])

  useEffect(() => {
    EolAxios.staticRequest({
      path: API.newsYYSchool,
      params: [provinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setNewSchool(res.info)
      }
    })
  }, [provinceId])

  useEffect(() => {
    EolAxios.staticRequest({
      path: API.newsYY
    }).then(res => {
      if (res === null) return
      if (res[1].status === "1") {
        setBanner(banner => banner = res[1].info)
      }
    })
    return () => {
      EolAxios.cancel()
    }
  }, [])

  return (
    <Layout title="职业热点" currentTopPage={currentTopPageType.NEWS}>
      <div>
        <Space height='30px' />
        <div className="clearfix">
          <NewsBanner banner={banner} />
          <NewsHotNews />
        </div>
        <Space height="50px" />
        <NewsSchool newSchool={newSchool} />
        <Space height="50px" />
        <NewsBottomList />
        <Space height="20px" />
      </div>
    </Layout>
  )
}