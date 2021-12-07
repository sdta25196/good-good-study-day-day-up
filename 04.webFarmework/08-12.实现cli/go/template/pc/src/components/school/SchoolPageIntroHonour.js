import { Space } from '../common'
import styles from './sass/SchoolPageIntro.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-10 10:57
* @description : 学校落地页简介-荣誉墙
*
*/
function SchoolPageIntroHonour({ honour = [] }) {
  if (!honour.length) {
    return <div></div>
  }
  return (
    <>
      <Space height="50px" />
      <div className={styles.honourBox}>
        <div className={styles.title}>
          荣誉墙
        </div>
        <div>
          {honour.map(item => {
            return <span className={styles.rongyu} key={item} title={item}>{item}</span>
          })}
        </div>
      </div>
    </>
  )
}

export default SchoolPageIntroHonour