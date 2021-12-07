import {Map as ImmutableMap} from 'immutable'
import { FormItem } from './Form'

export type Store = ImmutableMap<string, Store>

export enum FormTopic {
  ValueChanged
}

export type FormItemMeta = {
  type : string, 
  path? : Array<string | number>,
  cond ? : (ctx : any) => any,
  default? : any,
  items? : Array<FormItemMeta>
}

export type Meta = {
  form : FormItemMeta 
}

export type FormItemProps = {
  onChange? : (value : any) => any,
  item : FormItem,
  defaultValue? : any
}