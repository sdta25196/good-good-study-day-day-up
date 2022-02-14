import axios from 'axios'
import React, { useEffect, useState, useLayoutEffect } from "react"
import IMG from './test.jpg'
import useExternalComp from './useExternalComp'

const Codeless = (props) => {
  let D = useExternalComp("main.js", { type: 'amd' })
  let U = useExternalComp("umd.js", { type: 'umd' })

  return (
    <div>
      外部组件
      {/* <C x={99} img={IMG} /> */}
      <D x={99} img={IMG} />
      <U x={"umd"} img={IMG} />
    </div>
  )
}

export default Codeless