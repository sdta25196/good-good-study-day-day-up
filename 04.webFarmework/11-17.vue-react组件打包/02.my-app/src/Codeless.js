import axios from 'axios'
import React, { useEffect, useState, useLayoutEffect } from "react"
import IMG from './test.jpg'

//! 写一个组件，依据组件生成一个dsl，然后打包上传服务器的时候，根据dsl文件对组件进行打包
//! 使用组件打包后代码。在class组件中成功，function组件中需要setState使用函数修改值才可成功
//! eval使用远程打包后字符串 成功
//! 研究打包组件 - 成功 - 使用webpack打包umd即可
//! 提供业务上下文 - 

// webpack amd打包的效果
async function getComponent() {
  let require = function (dependencies, factory) {
    return factory(React)
  }
  try {
    let val = await axios.get('main.js')
    return eval(val.data)
  }
  catch (ex) {
    console.error(ex)
    return null
  }
}
// umd打包的效果 webpack
async function getComponent2() {
  try {
    window.react = window.react || React
    let val = await axios.get('main.js')
    eval(val.data)
    window.react = undefined
  }
  catch (ex) {
    console.error(ex)
    // throw new Error("eval error:" + text)
    return null
  }
}

const Codeless = (props) => {
  let [C, setC] = useState(null)

  useEffect(() => {
    // getComponent().then(cmp => {
    //   console.log(cmp.default)
    //   setC(c => cmp.default)
    // })
    getComponent2().then(() => {
      console.log(window.MyComponent.default)
      setC(c => window.MyComponent.default)
    })
  }, [])

  if (C === null) {
    return (
      <div>sss</div>
    )
  }
  return (
    <div>
      555
      <C x={99} img={IMG} />
    </div>
  )
}

export default Codeless