import { useState } from "react"
import { useValue } from "./useValue"

export const ControlledCounter = () => {

  // const [c , setC ] = useState(0)
  const [counter, setCounter] = useValue({
    defaultValue : 0
  })


  return (
    <div>

      {counter}
      <button onClick={() => setCounter(counter + 1)}>
        +
      </button>
    </div>
  )
}


const Input = ({value, defaultValue} : {
  value ? : string,
  defaultValue ? : string
}) => {
  const [_value, setValue] = useValue({
    value, 
    defaultValue
  })

  return (
    <input
      value={_value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}