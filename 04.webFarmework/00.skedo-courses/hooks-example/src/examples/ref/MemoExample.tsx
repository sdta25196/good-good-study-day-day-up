import { useMemo } from "react"

function useConter() {
  const counter = useMemo(() => {
    return 0
  }, [])

  return counter
}
export default () => {
  const counter = useConter() 
  const foo = useConter()

  return <div>{counter}</div>
}

// Virtual DOM
// lexcial scope
