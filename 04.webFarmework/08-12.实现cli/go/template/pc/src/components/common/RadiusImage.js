import { memo } from 'react'
import styles from './sass/RadiusImage.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-03 17:00
* @description : 圆角图片
* @param : {hoverAnimation boolean}  开启hover动画
* @param : { coverContent }  底部封面文案
*
*/
//! 如果后续的样式更多，可以传style进来
function RadiusImage({
  src,
  width,
  height,
  radius = "10px",
  alt = "职教网",
  hoverAnimation = true,
  coverContent,
  onClick,
}) {
  return (
    <div className={`${hoverAnimation ? styles.box : styles.box1}`} style={{ borderRadius: radius }} onClick={onClick}>
      <img src={src} alt={alt} width={width} height={height} style={{ borderRadius: radius }}
        className={hoverAnimation ? styles.hoverAnimation : ""} />
      {coverContent && <div className={styles.cover}>{coverContent}</div>}
    </div >
  )
}

export default memo(RadiusImage)