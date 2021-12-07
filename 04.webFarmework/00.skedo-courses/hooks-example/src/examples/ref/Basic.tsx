import { useMemo, useRef, useState } from "react"

const Refed = () => {
  const ref = useRef(0)
  const [ver, setVer] = useState(0)
  return <div onClick={
    useMemo(() => e =>{
      ref.current ++
      setVer(v => v + 1)
    }, [])
  }>{ref.current}</div>
}

export default () => {
  return <>
    <Refed />
    <Refed />
    <Refed />
  </>
}

// Virtual DOM
// lexcial scope
