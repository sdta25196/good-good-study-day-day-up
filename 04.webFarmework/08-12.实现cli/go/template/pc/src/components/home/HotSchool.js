import { useEffect, useState } from 'react'
import { openWindow } from '../../tools'
import styles from './sass/HotSchool.module.scss'
import HOT from '../../assets/images/hot.png'

/**
*
* @author: 田源
* @date: 2021-08-03 17:12
* @description: 热门学校
*
*/
function HotSchool({ hootSchool = [] }) {
  const [showSchool, setShowSchool] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setShowSchool(showSchool => showSchool = hootSchool.slice(index, index + 7))
  }, [hootSchool, index])

  // 换一换
  const changeNext = () => {
    setIndex(index => index + 7 >= hootSchool.length ? 0 : index + 7)
  }

  return (
    <div>
      <div className={styles.title}>
        <img src={HOT} alt="" width="18px" height="22px" className={styles.hot} />
        <span>热门学校</span>
        {
          (hootSchool.length > 7 && hootSchool.length % 7 === 0) &&
          <span className={styles.subTitle} onClick={changeNext}>换一换</span>
        }
      </div>
      <div className={styles.box}>
        <div className={styles.left} onClick={() => openWindow(showSchool[0]?.link)}>
          <p className={"ellipsis " + styles.name}>{showSchool[0]?.title}</p>
          <div className={styles.label}>
            <span>{showSchool[0]?.tag}</span>
          </div>
          <div className={styles.logo}>
            <img src={showSchool[0]?.img_url} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          {showSchool.map((item, i) => {
            if (i === 0) return ""
            return <SchoolCard schoolName={item.title} schoolTag={item.tag} logo={item.img_url}
              onClick={() => openWindow(item.link)} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default HotSchool

function SchoolCard({ schoolName, schoolTag, logo, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={logo} alt="" width="60px" height="60px" />
      <div className={styles.cardRight}>
        <p className={`ellipsis ${styles.t}`} title={schoolName}>{schoolName}</p>
        <span className={styles.labelCard} >{schoolTag}</span>
      </div>
    </div>
  )
}
