import {fromJS, Map as ImmutableMap} from 'immutable'
import { FormItemMeta, FormTopic, Meta, Store } from './dsl.types'
import { Emiter } from './Emiter'


export class FormItem extends Emiter<FormTopic> {

  private meta : FormItemMeta 
  private children : FormItem[]
  private form : Form 
  private oldValue : any
  constructor(meta : FormItemMeta, form : Form){
    super()
    this.form = form 
    this.meta = meta
    this.children = []

    this.meta.items?.forEach(subItem => {
      this.children.push(new FormItem(subItem, form))
    })
  }

  private _getValue(){
    
    let val : any

    if(this.meta.path) {
      val = this.form.getValue(this.meta.path!) 
    }
    if(typeof val === 'undefined') {
      val = this.meta.default
    }
    return val
  }

  public getValue() : any{
    const val = this._getValue() 
    this.oldValue = val
    return val
  }

  public getChildren(){
    return this.children
  }

  public setValue(value : any){
    this.form.setValue(this.meta.path!, value)
  }

  public getType(){
    return this.meta.type
  }

  public updateStoreByDefault(){
    if(typeof this.meta.default !== 'undefined') {
      this.setValue(this.meta.default)
    }

    for(let child of this.getChildren()) {
      child.updateStoreByDefault()
    }

  }

  public updated(){

    const value = this._getValue()
    if(this.oldValue !== value) {
      this.emit(FormTopic.ValueChanged, value)
    }
    this.oldValue = value
    
    for(let item of this.children) {
      item.updated()
    }
  }

  public getCond(){
    return () => {
      return this.meta.cond!(this.form.getContext())
    }
  }


}

export class Form extends Emiter<FormTopic> {

  private meta : Meta 
  private form : FormItem
  private store : Store
  private context ? : any
  constructor(meta : Meta, context ? : any){
    super()
    this.meta = meta
    this.store = this.initStore()
    this.form = new FormItem(this.meta.form, this)
    this.context = context
    this.updateDefaultValues()

    // @ts-ignore
    window.frm = this
  }

  public getContext(){
    return this.context
  }

  public getRoot(){
    return this.form
  }

 
  public getValue(path : Array<string | number>) {
    return this.store.getIn(path)
  }

  public setValue(path : Array<string | number>, value : any) {
    this.store = this.store.setIn(path, value)
  }

  public getData(){
    return this.store.toJS()
  }

  private initStore(){
    const store = ImmutableMap<string, Store>()
    return store
  }

  public setData(data : any){
    this.store = fromJS(data) as ImmutableMap<string, Store>

    this.form.updated()
  }

  private updateDefaultValues(){
    this.form.updateStoreByDefault()
  }
}

