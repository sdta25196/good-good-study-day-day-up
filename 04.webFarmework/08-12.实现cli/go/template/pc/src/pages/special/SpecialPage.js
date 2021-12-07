import { useEffect, useState } from "react"
import { Switch } from "react-router-dom"
import {
  currentTopPageType, Layout, ContentLeft, ContentRight,
  RadiusImage, HotSchoolAdList, HotNewsAdList, Space, Breadcrumb
} from "../../components/common"
import { RouteWithSubRoutes } from '../../router'
import styles from '../../components/special/sass/SpecialPage.module.scss'
import EolAxios, { API } from "../../axios"
import { openWindow } from "../../tools"
import { useSelector } from "react-redux"
/**
*
* @author : 田源
* @date : 2021-08-11 14:11
* @description : 职教专业落地页
*
*/
function SpecialPage(props) {
  const { history, routes, match: { params: { specialId } }, breadcrumb } = props
  const { provinceid: provinceId } = useSelector(store => store.userLocation)

  const [activeTab, setActiveTab] = useState(0)
  const [topImg, setTopImg] = useState([])
  const [hotSchool, setHotSchool] = useState([])
  const [hotNews, setHotNews] = useState([])
  const [specialInfo, setSpecialInfo] = useState({})

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
  }, [])

  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.specialInfo,
      formData: {
        id: specialId
      }
    }).then(res => {
      if (res === null) return
      setSpecialInfo(res)
    })
  }, [specialId])

  // 设置选中的tab
  useEffect(() => {
    switch (history.location.pathname.split('/')[3]) {
      case "school":
        setActiveTab(1)
        break;
      default:
        setActiveTab(0)
        break;
    }
  }, [history.location.pathname])

  return (
    <Layout title="职教专业" currentTopPage={currentTopPageType.SPECIAL}>
      <div>
        <Breadcrumb breadcrumb={breadcrumb.concat([{ "name": specialInfo.name || "" }])} />
        <div className={styles.infoBox}>
          <div className={styles.title}>
            {specialInfo.name}
          </div>
          <div className={styles.content}>
            <span className={styles.label}>
              {specialInfo.tag?.join(" | ")}
            </span>
          </div>
        </div>
        <ContentLeft>
          <div className={styles.tabBarBox}>
            <span className={`${styles.tabBar} ${activeTab === 0 ? styles.active : ""}`}
              onClick={() => history.replace(`/special/${specialId}/`)}>
              专业介绍
            </span>
            <span className={`${styles.tabBar} ${activeTab === 1 ? styles.active : ""}`}
              onClick={() => history.replace(`/special/${specialId}/school`)}>
              开设院校
            </span>
          </div>
          <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </Switch>
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

export default SpecialPage