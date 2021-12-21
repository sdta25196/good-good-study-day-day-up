import React, { useEffect, useRef } from "react"

export const Input = (props: {
  defaultValue: any,
  onChange: (value: any) => void
}) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current!.value !== props.defaultValue) {
      ref.current!.value = props.defaultValue
    }
  }, [props.defaultValue])

  return (
    <input
      ref={ref}
      onChange={(e) => {
        props.onChange && props.onChange(e.target.value)
      }}
    />
  )
}