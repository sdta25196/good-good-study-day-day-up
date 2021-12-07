import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import EolAxios, { API } from "../../axios"
import { Breadcrumb, currentTopPageType, Layout, Space } from "../../components/common"
import styles from '../../components/location/sass/index.module.scss'
import { updateUserLocation } from "../../redux/actions"
import { isIE } from "../../tools"


export default function Location(props) {
  const { history, breadcrumb } = props
  const dispatch = useDispatch()
  const [proKeys, SteProKeys] = useState([])
  const [provinceJson, SteProvinceJson] = useState([])
  const [currentProKey, SteCurrentProKey] = useState("A")
  useEffect(() => {
    EolAxios.staticRequest({
      path: API.location
    }).then(e => {
      if (!e) return
      SteProKeys(keys => keys = Object.keys(e))
      SteProvinceJson(province => province = e)
    })
  }, [])

  const handleKeyClick = (item) => {
    SteCurrentProKey(key => key = item)
    scrollToElement("#" + item)
  }
  /**选择城市 */
  const chooseCity = (province, city) => {
    dispatch(updateUserLocation({
      ...province,
      ...city
    }))

    const path = history.location.search.match(/path=([^&=]+)/)?.[1]
    history.replace(path || "/")
  }
  /** 滚动到指定元素位置 */
  const scrollToElement = (element) => {
    const dom = document.querySelector(element)
    if (isIE()) {
      window.scrollTo(0, dom.offsetTop - 10)
    } else {
      window.scrollTo({
        top: dom.offsetTop - 10,
        behavior: "smooth"
      })

    }
  }
  return (
    <Layout title="职教网" currentTopPage={currentTopPageType.HOME}>
      <div>
        <Breadcrumb breadcrumb={breadcrumb} />
        <div>
          <span className="font-bold color-black">
            按省份首字母选择：
          </span>
          {proKeys.map(prokey => {
            return (
              <span key={prokey} className={`${styles.proKey} ${currentProKey === prokey ? styles.active : ""}`}
                onClick={() => handleKeyClick(prokey)}>
                {prokey}
              </span>
            )
          })}
        </div>
        <Space height="40px"></Space>
        <div className={styles.contentBox}>
          {proKeys.map((prokey, i) => {
            return (
              <div key={(prokey + i)} id={prokey} className={`${styles.singleBox} ${currentProKey === prokey ? styles.active : ""}`}>
                <span className={styles.key}>{prokey}</span>
                <div className={styles.proBox}>
                  {provinceJson[prokey]?.map(pro => {
                    return <div key={pro.provinceid} className={styles.l}
                      //港澳台外国的id是大于70的 
                      style={{ display: parseInt(pro.provinceid) > 70 ? "none" : "" }}>
                      <div className={styles.pro}>
                        <span>{pro.province}</span>
                      </div>
                      <div className={styles.cityBox}>
                        {
                          pro.city?.map(city => {
                            return <span className={styles.city} key={city.cityid}
                              onClick={() => chooseCity(pro, city)}>
                              {city.city}
                            </span>
                          })
                        }
                      </div>
                    </div>
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <Space height="36px"></Space>
      </div>
    </Layout >
  )
}