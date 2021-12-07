import { openWindow } from '../../tools'
import styles from './sass/NewsSchool.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-12 16:36
* @description : 职教热点首页-院校推荐
*
*/
function NewsSchool({ newSchool = [] }) {
  return (
    <div>
      <div className={styles.title}>
        院校推荐
      </div>
      <div className={styles.cardBox}>
        {newSchool.map((item, i) => {
          return <SchoolCard key={i}
            schoolName={item.title}
            schoolLogo={item.img_url}
            schoolTag={item.tag}
            onClick={() => openWindow(item.link)}
          />
        })}
      </div>
    </div>
  )
}

export default NewsSchool


function SchoolCard({ schoolName, schoolLogo, schoolTag, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={schoolLogo} alt="" width="59px" height="59px" />
      <div className={styles.cardRight}>
        <p className={`ellipsis ${styles.t}`} title={schoolName}>{schoolName}</p>
        <span className={styles.labelCard}>{schoolTag}</span>
      </div>
    </div>
  )
}
