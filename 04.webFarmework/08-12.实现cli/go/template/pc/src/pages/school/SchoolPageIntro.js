import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import EolAxios, { API } from "../../axios"
import {
  ContentLeft, ContentRight, HotSchoolAdList, HotNewsAdList, Space, Nodata,
} from "../../components/common"
import {
  SchoolPageIntroInfo, SchoolPageIntroHonour, SchoolPageIntroNews,
  SchoolPageIntroSpecial, SchoolPageIntroViews
} from "../../components/school"
import styles from '../../components/school/sass/SchoolPageIntro.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-09 15:18
* @description : 中职院校落地页简介
*
*/
function SchoolPageIntro(props) {
  const { history, match: { params: { schoolCode } } } = props
  const { provinceid: provinceId } = useSelector(store => store.userLocation)

  const [intro, setIntro] = useState({})
  const [hotSchool, setHotSchool] = useState([])
  const [hotNews, setHotNews] = useState([])
  const [contentNoData, setContentNoData] = useState(false)

  useEffect(() => {
    // 学校信息
    EolAxios.dynamicRequest({
      path: API.schoolIntro,
      formData: {
        data_code: schoolCode
      }
    }).then(res => {
      if (res === null) return
      setIntro(res)
      setContentNoData(res.content === "")
    })
  }, [schoolCode])

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
      <div className={styles.baseInfo}>
        <div className={styles.img}>
          <img src={intro.main} alt={intro.name} />
        </div>
        <div className={styles.content}>
          {
            intro.content ?
              <div>
                {intro.content.slice(0, 470)}
                {
                  intro.content.length > 470 ?
                    <span>
                      ......
                      <span className={styles.infoMore} onClick={() => history.push(`/school/${schoolCode}/intro/detail`)}>
                        更多
                      </span>
                    </span> : ""
                }
              </div> :
              <div>
                <Nodata isShow={contentNoData} />
              </div>
          }
        </div>
      </div>
      <ContentLeft>
        <SchoolPageIntroInfo info={intro} />
        <SchoolPageIntroHonour honour={intro.honour} />
        <SchoolPageIntroSpecial special={intro.no_unique} featureSpecial={intro.unique} />
        <SchoolPageIntroNews news={intro.news} />
        <SchoolPageIntroViews banner={intro.banner_scenery} />
      </ContentLeft>
      <ContentRight>
        <HotSchoolAdList schoolAdList={hotSchool} />
        <Space height="50px" />
        <HotNewsAdList hotNews={hotNews} />
      </ContentRight>
    </>
  )
}

export default SchoolPageIntro