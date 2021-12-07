import {fromJS, Map as ImmutableMap} from 'immutable'
import { Action } from 'redux'

class Form {

  data : ImmutableMap<string, any>

  constructor(initialValues : any){
    this.data = fromJS(initialValues) as ImmutableMap<string, any>
  }

  set(path : string[], value : any) {
    this.data = this.data.setIn(path, value)
  }

  getData(){
    return this.data.toJS()
  }

}



const formMeta = {
  name : "form1",
  children : [{
    "name" : 'personName',
    "type" : "input" ,
    path : 'person.name'

  }, {
    name : "group",
    type : "group",
    children : [{
      name : "memo",
      type : "textarea",
      path : 'person[%i].memo'
    }]
  }]
}


function reducer(state = new Form(), action : Action & {
  path : string[],
  value : any
}) {


  switch(action.type){
    case 'set':
      const {path, value} = action
      state.set(path, value)
      break
  }
  return state
}

const RenderFrom =(config, formData, path = []) => {
  switch(config.type) {
    case 'input':
      return <Input path={config.path} />
    case 'form':
      return config.children.map(child => {
        return RenderFrom(child, path.concat(child.name))
      })
  }
}

const FormItem = ({path})  => {
  const data = useSelector(...)
}