import styles from './sass/ContentLeft.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-06 15:54
* @description : 左右布局页面的左侧
*
*/
function ContentLeft({ children }) {
  return (
    <div className={styles.box}>
      {children}
    </div>
  )
}

export default ContentLeft