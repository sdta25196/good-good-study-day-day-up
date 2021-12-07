import { useEffect, useState } from "react"
import { Switch } from "react-router-dom"
import { Layout, currentTopPageType, Breadcrumb } from "../../components/common"
import { RouteWithSubRoutes } from '../../router'
import styles from '../../components/school/sass/SchoolPage.module.scss'
import EolAxios, { API } from "../../axios"

/**
*
* @author : 田源
* @date : 2021-08-09 19:53
* @description : 中职院校落地页
*
*/
function SchoolPage(props) {
  const { history, routes, match: { params: { schoolCode } }, breadcrumb } = props

  const [schoolInfo, setSchoolInfo] = useState({})
  const [activeTab, setActiveTab] = useState(0)
  // 设置选中的tab
  useEffect(() => {
    switch (history.location.pathname.split('/')[3]) {
      case "special":
        setActiveTab(1)
        break;
      case "future":
        setActiveTab(2)
        break;
      case "news":
        setActiveTab(3)
        break;
      default:
        setActiveTab(0)
        break;
    }
  }, [history.location.pathname])

  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.schoolInfo,
      formData: {
        data_code: schoolCode
      }
    }).then(res => {
      if (res === null) return
      setSchoolInfo(res)
    })
  }, [schoolCode])

  return (
    <Layout title="中职学校" currentTopPage={currentTopPageType.SCHOOL}>
      <div>
        <Breadcrumb breadcrumb={breadcrumb.concat([{ "name": schoolInfo.name || "" }])} />
        <div className={styles.mainBox}>
          <div className={styles.infoBox}>
            <div className={styles.logo}>
              <img src={schoolInfo.logo} alt="" width="144px" height="144px" />
            </div>
            <div className={styles.info}>
              <div>
                <span className={styles.name}>{schoolInfo.name}</span>
                {schoolInfo.school_motto && <span className={styles.xiaoxun}>{schoolInfo.school_motto}</span>}
              </div>
              <div>
                {schoolInfo.tag?.map((tag) => {
                  return <span className={styles.label} key={tag}>{tag}</span>
                })}
              </div>
              <div>
                <span className={styles.pos}>官方地址：{schoolInfo.province_city_town || '--'}</span>
                <span className={styles.url}>官方网址：{schoolInfo.school_web || '--'}</span>
                <span className={styles.phone}>官方电话：{schoolInfo.school_telephone || '--'}</span>
                <span className={styles.emil}>电子邮箱：{schoolInfo.school_email || '--'}</span>
              </div>
            </div>
          </div>
          <div>
            <span className={`${styles.tabBar} ${activeTab === 0 ? styles.active : ""}`}
              onClick={() => history.replace(`/school/${schoolCode}/`)}>
              学校概况
            </span>
            <span className={`${styles.tabBar} ${activeTab === 1 ? styles.active : ""}`}
              onClick={() => history.replace(`/school/${schoolCode}/special`)}>
              开设专业
            </span>
            <span className={`${styles.tabBar} ${activeTab === 2 ? styles.active : ""}`}
              onClick={() => history.replace(`/school/${schoolCode}/future`)}>
              升学方向
            </span>
            <span className={`${styles.tabBar} ${activeTab === 3 ? styles.active : ""}`}
              onClick={() => history.replace(`/school/${schoolCode}/news`)}>
              招生快讯
            </span>
          </div>
        </div>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
      </div>
    </Layout>
  )
}

export default SchoolPage