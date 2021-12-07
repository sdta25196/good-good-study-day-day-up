import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { ScrollerExample } from './Scroll';
import {ControlledCounter} from './WithHook'


export const Controlled =  () => {
  const [val, setVal] = useState("")
  return <ConrolledInput value={val} onChange={e => {
    setVal(e.target.value)
  }} />
}

export default {
  title: '受控-非受控',
  component: Controlled,
}

export const Scroller = () => {
  return <ScrollerExample />

}

export const UnControlled = () => {
  return <UnControlledInput defaultValue="abc" />
}

const UnControlledInput = ({defaultValue,onChange} : {
  defaultValue : string,
  onChange? : Function
}) => {
  const [value, setValue] = useState<string>(defaultValue)
  
  useEffect(() => {
    if(value !== defaultValue) {
      onChange && onChange(value)          
    }
  }, [value])
  
  return <input onChange={e => {
    setValue(e.target.value)        
  }} value={value} />
}


export const Mixed = () => {
  return <MixedControlInput defaultValue="123" />
}
const MixedControlInput = ({
  defaultValue,
  value,
  onChange,
}: {
  value ? : string,
  defaultValue ? : string,
  onChange ? : Function
}) => {
  const controlled = typeof value !== 'undefined'
  const [_value, setValue] = useState<string>(defaultValue || value)
    
  
  useEffect(() => {
    if(value !== defaultValue) {
      onChange && onChange(value)          
    }
  }, [_value])
  
  return (
    <input
      onChange={(e) => {
        setValue(e.target.value)
      }}
      value={controlled ? value : _value}
      defaultValue={defaultValue}
    />
  )
  
}

const ConrolledInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return <input onChange={onChange} value={value} />
} 

export const Counter = () => {
  return <ControlledCounter />
}