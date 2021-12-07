import styles from './sass/SchoolPageIntro.module.scss'
/**
*
* @author : 田源
* @date : 2021-08-10 10:57
* @description : 学校落地页简介-基本信息
*
*/
function SchoolPageIntroInfo({ info = {} }) {
  return (
    <>
      <div className={styles.title}>
        基本信息
      </div>
      <div className={styles.infoBox}>
        <span className={styles.shijian}>创建时间：{info.create_date || '--'}</span>
        <span className={styles.mianji}>占地面积(亩)：{info.area || '--'}</span>
        <span className={styles.lishu}>隶属于：{info.belong?.join(" ") || '--'}</span>
        <span className={styles.dizhi}>学校地址 : {info.address || '--'}</span>
        <span className={styles.zhengshu}>学历证书 : {info.level || '--'}</span>
      </div>
    </>
  )
}

export default SchoolPageIntroInfo