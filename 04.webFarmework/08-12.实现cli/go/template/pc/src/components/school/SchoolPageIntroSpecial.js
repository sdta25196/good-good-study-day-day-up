import { useHistory, useParams } from 'react-router-dom'
import { controlScroll, openWindow } from '../../tools'
import { Space } from '../common'
import styles from './sass/SchoolPageIntro.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-10 10:57
* @description : 学校落地页简介-热门专业
*
*/
function SchoolPageIntroSpecial({ featureSpecial = [], special = [] }) {
  const history = useHistory()
  const { schoolCode } = useParams()


  const handleClickMore = () => {
    controlScroll({ y: 0 })
    history.push(`/school/${schoolCode}/special`)
  }

  if (!featureSpecial.length && !special.length) {
    return <div></div>
  }

  return (
    <>
      <Space height="50px" />

      <div className={styles.specialBox}>
        <div className={styles.title}>
          热门专业
          <span className={styles.more} onClick={handleClickMore}>更多</span>
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
    </>
  )
}

export default SchoolPageIntroSpecial