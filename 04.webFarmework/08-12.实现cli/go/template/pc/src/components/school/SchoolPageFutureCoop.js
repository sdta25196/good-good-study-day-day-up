import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EolAxios, { API } from '../../axios'
import { openWindow } from '../../tools'
import { Nodata } from '../common'
import styles from './sass/SchoolPageFuture.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-11 11:29
* @description : 学校落地页升学方向-合作院校
*
*/
function SchoolPageFutureCoop(props) {
  const { schoolCode } = useParams()

  const [coopSchool, setCoopSchool] = useState([])
  let [noData, setNoData] = useState(false)
  useEffect(() => {
    EolAxios.dynamicRequest({
      path: API.schoolFutureCoop,
      formData: {
        data_code: schoolCode
      }
    }).then(res => {
      if (res === null) {
        setNoData(true)
        return
      }
      setCoopSchool(res)
      setNoData(res.length === 0)
    })
  }, [schoolCode])

  return (
    <div className={styles.coopBox}>
      <div className={styles.detialTitle}>
        合作院校
      </div>
      <div>
        {
          coopSchool.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className={styles.title}>{item.name}</div>
                <div>
                  {item.info.map((school, i) => {
                    return (
                      <div className={styles.card} key={i + 10}
                      // onClick={() => openWindow(school.tag_url)}
                      >
                        <img src={school.img_url} alt={school.name} className={styles.img} />
                        <span className={styles.name}>{school.name}</span>
                      </div>
                    )
                  })}
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
      <Nodata isShow={noData} />
    </div>
  )
}

export default SchoolPageFutureCoop