import React, { useEffect, useState } from 'react'
import FormRender from "./FormRender" 
import meta from './meta.config'
import {Input} from './Input'
function App() {
  return <FormRender meta={meta} context={{
    user : {
      state : "loggedin"
    }
  }} />
  // const [val, setVal] = useState("hello")

  // useEffect(() => {
  //   setTimeout(()=>{
  //     debugger
  //     setVal('world!')
  //   }, 3000)

  // }, [])
  // return <Input defaultValue={val} onChange={() => {}} />
}

export default App
