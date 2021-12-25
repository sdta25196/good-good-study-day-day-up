import { Form, FormItem } from './Form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Meta, Store, FormItemMeta, propsType } from './dsl.types'

function useForm(meta: Meta) {
  const form = useMemo(() => new Form(meta), [])
  return form
}
// 使用元数据渲染组件
export default ({ meta }: { meta: Meta }) => {
  const form = useForm(meta)
  return <FormCompont item={form.getRoot()} />
}

// 表单组件
const FormCompont = (props: propsType) => {
  const item = props.item
  return <div>
    {
      item.getChildren().map((child, i) => {
        return <React.Fragment key={i}>
          {render(child)}
        </React.Fragment>
      })
    }
  </div>
}

// 最终根据元数据渲染的函数
function render(formItem: FormItem) {
  const passProps = {
    onChange: (value: any) => formItem.setValue(value),
    defaultValue: formItem.getValue(),
    item: formItem
  }
  switch (formItem.getType()) {
    case 'form':
      return <FormCompont {...passProps} />
    case 'input':
      return <Input {...passProps} />
    default:
      throw new Error('666')
  }
}

// input组件
const Input = (props: propsType) => {
  const inp = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inp.current && inp.current.value != props.defaultValue) {
      inp.current.value = props.defaultValue
    }
  }, [])

  return (
    <input
      ref={inp}
      onChange={e => { props.onChange && props.onChange(e.target.value) }}
      defaultValue={props.defaultValue}
    />)
}