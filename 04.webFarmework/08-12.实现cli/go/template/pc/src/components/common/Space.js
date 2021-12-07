import { memo } from 'react'
/**
*
* @author: 田源
* @date: 2021-08-04 11:46
* @description: 间隔组件
*
*/
function Space({ width = "10px", height = "10px", inline = false }) {
  return (
    <div style={{ width, height, display: inline ? "inline-block" : "block" }}></div>
  )
}

export default memo(Space)