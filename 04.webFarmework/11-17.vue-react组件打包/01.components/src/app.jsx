import React from "react"
import reactDom from "react-dom"
import APP from './index.jsx'
import IMG from './test.jpg'

reactDom.render(
  <APP x={888} img={IMG} />,
  document.querySelector('#root')
)