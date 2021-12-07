import React from 'react'
import { openWindow } from '../../tools'
import styles from './sass/SpecialList.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-11 13:52
* @description : 职教专业列表
*
*/
function SpecialList({ dataList = [] }) {
  return (
    <div>
      {
        dataList.map((menlei, i) => {
          return <div className={styles.itemBox} key={i}>
            <div className={styles.itemTitle}>
              {menlei.info.name}
            </div>
            {menlei.infos.map((xueke => {
              return <React.Fragment key={xueke.info.name}>
                <div className={styles.itemSubTitle}>
                  {xueke.info.name}
                </div>
                <div className={styles.itemList}>
                  {xueke.infos.map(special => {
                    return <div className={styles.item} key={special.id}>
                      <div className={styles.l} onClick={() => openWindow(`/special/${special.id}`)} >
                        <span className={styles.name}>
                          {special.name}
                        </span>
                        <span className={styles.label}>
                          {
                            special.tag.map((tag, i) => {
                              return <span key={tag} className={styles.label}>{i > 0 ? " | " : ""}{tag}</span>
                            })
                          }
                        </span>
                      </div>
                      <div className={styles.r} onClick={() => openWindow(`/special/${special.id}/school`)} >
                        开设院校
                      </div>
                    </div>
                  })}
                </div>
              </React.Fragment>
            }))}
          </div>
        })
      }
    </div>
  )
}

export default SpecialList