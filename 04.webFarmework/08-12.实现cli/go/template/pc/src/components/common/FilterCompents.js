import { memo } from 'react'
import { useEffect, useState } from 'react'
import styles from './sass/FilterCompents.module.scss'

/**
*
* @author : 田源
* @date : 2021-08-09 11:05
* @description : 筛选条件
* @param filter Array<{name,id}> 筛选数据
* @param activeId string 当前选中数据id
* @param click function (id)=>void 点击事件
*/
function FilterCompents({ title, filter = [], activeId, onClick, addAll = false }) {
  const [filterData, setFilterData] = useState(filter)
  useEffect(() => {
    if (addAll && filter[0]?.id !== "") {
      filter.unshift({
        "name": "全部",
        "id": ""
      })
    }
    setFilterData([...filter])
  }, [filter, addAll])
  return (
    <div className={styles.filterBox}>
      <div className={styles.titleBox}>
        <span className={styles.filterTitle}>{title} ：</span>
      </div>
      <div className={styles.itemBox}>
        {
          filterData.map(item => {
            return <span className={`${styles.filterItem} ${item.id === activeId ? styles.active : ""}`}
              key={item.id} onClick={() => onClick(item.id)}>
              {item.name}
            </span>
          })
        }
      </div>
    </div>
  )
}

export default memo(FilterCompents)