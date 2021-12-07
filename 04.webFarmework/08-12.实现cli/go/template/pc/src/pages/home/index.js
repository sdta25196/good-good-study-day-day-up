import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import EolAxios, { API } from "../../axios"
import { currentTopPageType, Layout, RadiusImage, Space } from "../../components/common"
import {
  HomeBanner, TouTiao, HotSchool,
  HotSpecial, HomeNews, SchoolView,
} from "../../components/home"
import styles from '../../components/home/sass/index.module.scss'
import { openWindow } from "../../tools"

/**
*
* @author : 田源
* @date : 2021-08-06 14:18
* @description : 首页
*
*/
export default function Home(props) {
  const [bgColor, setBgColor] = useState("")
  const [homeBanner, setHomeBanner] = useState([])
  const [ttList, setTtList] = useState([])
  const [middleImg, setMiddleImg] = useState([])
  const [hootSchool, setHootSchool] = useState([])
  const [hootSpecial, setHootSpecial] = useState([])
  const [schoolView, setSchoolView] = useState([])
  const { provinceid: provinceId } = useSelector(store => store.userLocation)

  useEffect(() => {
    EolAxios.staticRequest({
      path: API.homeYY
    }).then(res => {
      if (res === null) return
      if (res[1].status === "1") {
        setHomeBanner(banner => banner = res[1].info)
      }
      if (res[2].status === "1") {
        setTtList(TtList => TtList = res[2].info)
      }
      if (res[3].status === "1") {
        setMiddleImg(img => img = res[3].info)
      }
      if (res[5].status === "1") {
        setHootSpecial(img => img = res[5].info)
      }
    })
    EolAxios.staticRequest({
      path: API.homeYYSchool,
      params: [provinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setHootSchool(res.info)
      }
    })
    EolAxios.staticRequest({
      path: API.homeYYView,
      params: [provinceId]
    }).then(res => {
      if (res === null) return
      if (res.status === "1") {
        setSchoolView(res.info)
      }
    })
    return () => {
      EolAxios.cancel()
    }
  }, [provinceId])

  return (
    <div style={{ backgroundImage: `linear-gradient(#${bgColor} 0px, white 300px, white 100%)` }}>
      <Layout title="首页" currentTopPage={currentTopPageType.HOME}>
        <div className={styles.home}>
          <Space height='30px' />
          <div className="clearfix">
            <HomeBanner banner={homeBanner} onChange={setBgColor} />
            <TouTiao list={ttList} />
          </div>
          <Space height='20px' />
          <div className={styles.litleImgBox}>
            {middleImg.map((item, i) => {
              return <RadiusImage src={item.img_url} width="285px" height="146px" radius="10px"
                alt={item.title} onClick={() => openWindow(item.link)} key={i} />
            })}
          </div>
          <Space height='50px' />
          <HotSchool hootSchool={hootSchool} />
          <Space height='50px' />
          <HotSpecial hootSpecial={hootSpecial} />
          <Space height='50px' />
          <SchoolView schoolView={schoolView} />
          <Space height='50px' />
          <HomeNews />
        </div>
      </Layout>
    </div >
  )
}