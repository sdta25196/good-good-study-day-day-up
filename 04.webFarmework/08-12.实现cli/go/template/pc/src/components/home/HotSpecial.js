import { Space } from '../common'
import { useHistory } from 'react-router-dom'
import { openWindow } from '../../tools'
import styles from './sass/HotSpecial.module.scss'
import HOT from '../../assets/images/hot.png'

/**
*
* @author: 田源
* @date: 2021-08-03 17:12
* @description: 热门专业
*
*/
function HotSpecial({ hootSpecial = [] }) {
  const history = useHistory()
  return (
    <div>
      <div className={styles.title}>
        <img src={HOT} alt="" width="18px" height="22px" className={styles.hot} />
        <span>热门专业</span>
        <span className={styles.subTitle} onClick={() => history.push('/special')}>更多</span>
      </div>
      <Space height="20px" />
      <div className={styles.box}>
        {hootSpecial.map((item, i) => {
          return <SpecialCard specialName={item.title} specialImg={item.img_url}
            onClick={() => openWindow(item.link)} key={i} />
        })}
      </div>
    </div >
  )
}

export default HotSpecial

function SpecialCard({ specialName, specialImg, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div>
        <img src={specialImg} alt="" width="96px" height="96px" />
        <Space height="15px" />
        <p className="ellipsis" title={specialName}>{specialName}</p>
      </div>
    </div>
  )
}
