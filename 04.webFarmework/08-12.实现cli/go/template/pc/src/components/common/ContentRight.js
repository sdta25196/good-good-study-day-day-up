import styles from './sass/ContentRight.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-06 15:54
* @description : 左右布局页面的右侧
*
*/
function ContentRight({ children }) {
  return (
    <div className={styles.box}>
      {children}
    </div>
  )
}

export default ContentRight