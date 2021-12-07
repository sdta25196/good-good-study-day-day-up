import { useHistory } from 'react-router-dom'
import { openWindow } from '../../tools'
import styles from './sass/SpecialPageSchoolList.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-09 14:25
* @description : 学校列表页面
*
*/
function SpecialPageSchoolList({ dataList = [] }) {
  const history = useHistory()

  const goSchoolPage = (schoolCode) => {
    openWindow(`/school/${schoolCode}`)
  }
  return (
    <div>
      {
        dataList.map((info, i) => {
          return (
            <div className={styles.box} key={i}>
              <div onClick={() => goSchoolPage(info.data_code)} className={'inlineBlock'}>
                <div className={styles.img}>
                  <img src={info.logo} alt="" width="100%" height="80px" />
                </div>
                <div className={styles.content}>
                  <div>
                    <span className={styles.name} title={info.name}>{info.name}</span>
                    <span className={styles.pos} title={info.province_city_town}>{info.province_city_town}</span>
                  </div>
                  {info.school_motto && <span className={styles.xiaoxun}>{info.school_motto}</span>}
                  <div>
                    {
                      info.tag.map((tag, i) => {
                        return <span key={tag} className={styles.label}>{i > 0 ? " | " : ""}{tag}</span>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className={styles.btn} onClick={() => history.push(`/school/${info.data_code}/special`)}>
                开设专业
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default SpecialPageSchoolList