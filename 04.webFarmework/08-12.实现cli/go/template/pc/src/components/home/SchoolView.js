import styles from './sass/SchoolView.module.scss'
import { RadiusImage, Space } from "../../components/common"
import { openWindow } from '../../tools'
/**
*
* @author: 田源
* @date: 2021-08-03 17:12
* @description: 校园风光
*
*/
function SchoolView({ schoolView = [] }) {
  return (
    <div>
      <div className={styles.title}>
        校园风光
      </div>
      <Space height="20px" />
      <div className={styles.imgBox}>
        {schoolView.map((item, i) => {
          return <RadiusImage src={item.img_url} coverContent={item.title} key={i}
            onClick={() => openWindow(item.link)} width="285px" height="167px" radius="10px" />
        })}
      </div>
    </div>
  )
}

export default SchoolView