import axios from 'axios'
import React, { useEffect, useState, useLayoutEffect } from "react"

//! 写一个组件，依据组件生成一个dsl，然后打包上传服务器的时候，根据dsl文件对组件进行打包
//! 使用组件打包后代码。在class组件中成功，function组件中需要setState使用函数修改值才可成功
//! eval使用远程打包后字符串 成功
//! 研究打包组件 - 成功 - 使用webpack打包umd即可
//! 提供业务上下文 - 

class Modules {

  static inst = new Modules()

  static get() {
    return Modules.inst
  }

  resolve(name) {
    console.log('resolve name:' + name)
    switch (name) {
      case 'react':
        return React
    }
  }

}

// webpack amd打包的效果
async function getComponent() {
  let require = function (dependencies, factory) {
    return factory()
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
    let val = await axios.get('main.js')
    eval(val.data)
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
    getComponent().then(cmp => {
      setC(c => cmp.default)
    })
    // getComponent2().then(() => {
    //   console.log(window.MyComponent.default)
    //   setC(c => window.MyComponent.default)
    // })
  }, [])

  if (C === null) {
    return (
      <div>sss</div>
    )
  }
  return (
    <div>
      555
      <C x={99} />
    </div>
  )
}

export default Codeless