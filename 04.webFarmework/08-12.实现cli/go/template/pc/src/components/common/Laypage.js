import styles from './sass/Laypage.module.scss'
import { Pagination, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

/**
*
* @author : 田源
* @date : 2021-08-09 14:32
* @description : 分页组件
* @param onChange (page)=>void change事件
* @param defaultCurrent 默认起始页面
* @param total 总数
*/
function Laypage({ current = 1, pageSize = 10, total, onChange }) {
  return (
    <div className={styles.page}>
      <ConfigProvider locale={zh_CN}>
        <Pagination showQuickJumper hideOnSinglePage total={total} showTitle={false}
          current={current} pageSize={pageSize} onChange={onChange} />
      </ConfigProvider>
    </div>
  )
}

export default Laypage