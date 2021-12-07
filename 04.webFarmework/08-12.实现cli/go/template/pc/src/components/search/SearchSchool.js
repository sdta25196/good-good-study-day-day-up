import { useHistory } from 'react-router-dom'
import styles from './sass/SearchSchool.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-09 10:28
* @description : 搜索学校列表
*
*/
function SearchSchool({ dataList = [] }) {
  return (
    <div>
      {
        dataList.map(item => {
          return <SchoolCard key={item.data_code} info={item} />
        })
      }
    </div>
  )
}

export default SearchSchool

// 学校卡片
function SchoolCard({ info }) {
  const history = useHistory()
  const goSchoolPage = (schoolCode) => {
    history.push(`/school/${schoolCode}`)
  }
  return (
    <div className={styles.box}>
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
              info.tag?.map((item, i) => {
                return <span key={i} className={styles.label}>{i > 0 ? " | " : ""}{item}</span>
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
}