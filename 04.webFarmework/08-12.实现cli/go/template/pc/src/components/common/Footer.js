import { memo } from 'react'
import styles from './sass/Footer.module.scss'
/**
*
* @author: 田源
* @date: 2021-08-02 15:16
* @description: 页脚组件，禁止使用，由layout组件自动引入
*
*/
function Footer(props) {
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.leftBox}>
          <p className={styles.title}>
            系统使用说明
          </p>
          <p className={styles.info}>
            1、本查询系统的信息仅供参考，具体数据请以学校官网或考试院公布为准。<br />
            2、本站数据未经授权严禁转载，违者将依法追究责任。<br />
            3、如对本系统或相关服务有任何疑问，可发送邮件至：wuhh@eol.cn, 或拨打电话400-666-9766。<br />
          </p>
        </div>
        {/* <div className={styles.qrBox} >
          <img src="https://gkcx.eol.cn/assets/images/app-hash.png" alt="" width="105px" />
          <p>职教网微信公众号</p>
        </div> */}
      </div>
      <div className={styles.beianBox}>
        京ICP证140769号 | 京ICP备12045350号 | 京网文[2014]2016-306号 | 京公网安备 11010802020236号
        <br />
        Mail to:webmaster@eol.cn
      </div>
    </footer>
  )
}

export default memo(Footer)