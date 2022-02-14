import React, { useState, useEffect } from "react"
import axios from 'axios'

const externalCompType = {
  "amd": "amd",
  "umd": "umd",
}

async function getAmdComponent(path) {
  const require = function (dependencies, factory) {
    return factory(React)
  }
  try {
    let val = await axios.get(path)
    return eval(val.data)
  }
  catch (error) {
    console.error(error)
    return null
  }
}

async function getUmdComponent(path) {
  try {
    window.React = React
    let val = await axios.get(path)
    eval(val.data)
    window.React = undefined
    return Object.create(window.EolComponent || {})
  }
  catch (error) {
    console.error(error)
    return null
  }
}

function useExternalComp(path, { type = externalCompType.amd }) {
  let [Component, setComponent] = useState(null)

  useEffect(() => {
    switch (type) {
      case externalCompType.umd:
        getUmdComponent(path).then((component) => {
          setComponent(() => component.default)
        })
        break;
      case externalCompType.amd:
        getAmdComponent(path).then(component => {
          setComponent(() => component.default)
        })
        break;
    }
  }, [path])

  return Component || LoadComponent
}

export default useExternalComp

function LoadComponent() {
  return <div>loading...</div>
}