import { Meta, Store, FormItemMeta } from './dsl.types'
import { Map as ImmutableMap } from 'immutable'

export class FormItem {
  private meta: FormItemMeta
  private form: Form
  private children: FormItem[]
  constructor(meta: FormItemMeta, form: Form) {
    this.meta = meta
    this.form = form
    this.children = []
    this.meta.items?.forEach(item => {
      this.children.push(new FormItem(item, form))
    })
  }

  public getChildren() {
    return this.children
  }

  public getType() {
    return this.meta.type
  }

  public getValue() {
    const val = this.form.getValue(this.meta.path!)
    if (typeof val === 'undefined') {
      return this.meta.default
    }
  }
  public setValue(val: any) {
    this.form.setValue(this.meta.path!, val)
  }

  public updateStoreByDefault() {
    if (typeof this.meta.default !== 'undefined') {
      this.setValue(this.meta.default)
    }
    for (let child of this.getChildren()) {
      child.updateStoreByDefault()
    }

  }
}

export class Form {
  // 元数据
  private form: FormItem
  // 实例数据
  store: Store
  constructor(meta: Meta) {
    this.form = new FormItem(meta.form, this)
    this.store = this.initStore()
    // @ts-ignore
    window.f = this
    this.updateStore()
  }

  public getValue(path: Array<string | number>) {
    return this.store.getIn(path)
  }
  public setValue(path: Array<string | number>, value: any) {
    this.store = this.store.setIn(path, value)
  }
  public getRoot() {
    return this.form
  }
  public getData() {
    return this.store.toJS()
  }
  // 初始化store
  private initStore() {
    const store = ImmutableMap<string, Store>()
    return store
  }

  // 初始化默认值
  private updateStore() {
    this.form.updateStoreByDefault()
  }
}