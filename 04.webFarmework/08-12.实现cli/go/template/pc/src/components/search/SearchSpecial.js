import { useHistory } from 'react-router-dom'
import styles from './sass/SearchSpecial.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-09 10:28
* @description : 搜索专业列表
*
*/
function SearchSpecial({ dataList = [] }) {
  const history = useHistory()
  return (
    <div className={styles.special}>
      {
        dataList.map(item => {
          return <div className={styles.item} key={item.id}>
            <div className={styles.l} onClick={() => history.push(`/special/${item.id}`)} >
              <span className={styles.name}>
                {item.name}
              </span>
              <span className={styles.label}>
                {
                  item.tag?.map((tag, i) => {
                    return <span key={i} className={styles.label}>{i > 0 ? " | " : ""}{tag}</span>
                  })
                }
              </span>
            </div>
            <div className={styles.r} onClick={() => history.push(`/special/${item.id}/school`)} >
              开设院校
            </div>
          </div>
        })
      }
    </div>
  )
}

export default SearchSpecial