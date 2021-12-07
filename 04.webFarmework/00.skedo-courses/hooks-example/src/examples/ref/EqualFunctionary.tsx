import { useState, useEffect, useMemo } from "react"

type TabData = {
  title : string
}

const useTab = () => {
  // state 状态
  // ref 引用
  // memo 记忆
  // ref/reactive

  const obj = useRef(new SomeObj())
  const [tabList, setTabList] = useState([])
  const ref = useRef(() => (e) => {

  })

  return <div onClick={useMemo(() => e => )}></div>

  useEffect(() => {
    setTabList()
  })
  return tabList
}
export default () => {

  const tabList = useTab()


  return <>
    {tabList.map(x => <p>{x.title}</p>)}
  </>
  return null
}