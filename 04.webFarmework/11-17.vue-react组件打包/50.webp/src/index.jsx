import React from 'react'

function A({ x }) {
  return (
    <div>
      这是我打包的组件
      <p>
        这是参数x：{x}
      </p>
    </div>
  )
}

export default A