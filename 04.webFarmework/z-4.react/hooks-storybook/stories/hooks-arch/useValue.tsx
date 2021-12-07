import { useEffect, useState } from "react"


export function useValue<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue?: T
  onChange?: (val : T) => void 
}): [T, (val: T) => void] {
  const controlled = typeof value !== "undefined"
  const [_value, setValue] = useState<T>(
    controlled ? value : defaultValue
  )
  useEffect(() => {
    if (controlled && value !== _value) {
      setValue(value)
    }
  }, [value])

  useEffect(() => {
    if (value !== defaultValue) {
      onChange && onChange(value)
    }
  }, [_value])

  const setHandler = (val: T) => {
    if (!controlled) {
      setValue(val)
    } else {
      onChange && onChange(val)
    }
  }
  return [_value, setHandler]
}