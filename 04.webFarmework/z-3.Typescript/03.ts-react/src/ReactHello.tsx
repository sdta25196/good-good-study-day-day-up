import React from 'react'
import ReactDom from "react-dom"

const App: (() => JSX.Element) = () => {
  return (
    <div>
      哈哈
    </div>
  )
}
ReactDom.render(<App />, document.getElementById("root"))