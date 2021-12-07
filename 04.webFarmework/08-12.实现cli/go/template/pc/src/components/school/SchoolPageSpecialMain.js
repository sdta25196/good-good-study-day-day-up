import { useParams } from 'react-router-dom'
import { openWindow } from '../../tools'
import { Nodata, Space } from '../common'
import styles from './sass/SchoolPageSpecial.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-09 15:19
* @description : 中职院校落地页开设专业左侧内容
*
*/

function SchoolPageSpecialMain({ featureSpecial = [], special = [] }) {

  const { schoolCode } = useParams()

  if (!featureSpecial.length && !special.length) {
    return <Nodata isShow />
  }

  return (
    <div className={styles.specialBox}>
      <div className={styles.detialTitle}>
        热门专业
      </div>
      {
        !!featureSpecial.length && <div className={styles.tese}>
          <div className={styles.left}>
            特色专业
          </div>
          <div className={styles.right}>
            {featureSpecial.map(item => {
              return <span className={styles.rightSpan} key={item.id}
                onClick={() => openWindow(`/school/${schoolCode}/special/${item.id}/detail`)}>
                {item.name}
              </span>
            })}
          </div>
        </div>
      }
      <Space height="20px" />
      {
        !!special.length && <div className={styles.special}>
          <div className={styles.t}>
            <span className={styles.lt}>类别</span>
            <span className={styles.rt}>专业</span>
          </div>
          {special.map(item => {
            return <div className={styles.content} key={item.parent_special.spe_id}>
              <span className={styles.lc}>{item.parent_special.name}</span>
              <span className={styles.rc}>
                {
                  item.special?.map((special, i) => {
                    return <span key={i} className={styles.specialItem}
                      onClick={() => openWindow(`/school/${schoolCode}/special/${special.id}/detail`)}>
                      {special.name}
                    </span>
                  })
                }
              </span>
            </div>
          })}
        </div>
      }
    </div>
  )
}

export default SchoolPageSpecialMain