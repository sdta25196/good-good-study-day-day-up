import React, { memo } from "react"
import { useHistory } from 'react-router-dom'
import styles from './sass/Breadcrumb.module.scss'
import Space from "./Space"

/**
*
* @author : 田源
* @date : 2021-08-05 16:41
* @description : 面包屑
* @requires {breadcrumb Array<{name,path}>} 
* 
*/
function Breadcrumb({ breadcrumb = [] }) {
  const history = useHistory()
  return (
    <div className={styles.bread}>
      <Space height="20px"></Space>
      {breadcrumb.map((item, i) => {
        return (
          <React.Fragment key={item.name}>
            {!!i && <span> &gt; </span>}
            <span onClick={() => history.push(item.path)}>{item.name}</span>
          </React.Fragment>
        )
      })}
      <Space height="36px"></Space>
    </div>
  )
}

export default memo(Breadcrumb)