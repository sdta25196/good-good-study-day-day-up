import { memo } from 'react'
import NODATA from '../../assets/images/nodata.png'
import styles from './sass/Nodata.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-23 10:58
* @description : 无数据组件
*
*/
function Nodata({ isShow = false, width, height }) {
  return (
    <div className={`${styles.nodata} ${isShow ? 'show' : 'hidden'}`}>
      <img src={NODATA} alt="" width={width} height={height} />
    </div>
  )
}

export default memo(Nodata)