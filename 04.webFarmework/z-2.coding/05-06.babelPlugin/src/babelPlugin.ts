import * as t from '@babel/types'
import BabelCore from '@babel/core'

const plugin = (api: any, options: any, dirname: any) => {
  return {
    name: 'test',
    visitor: {
      VariableDeclaration: {
        enter: (path: BabelCore.NodePath<t.VariableDeclaration>) => {
          const dec = path.node.declarations[0]
          const id: t.Identifier = dec.id as t.Identifier
          id.name = "helper"
          const init: t.NumericLiteral = dec.init as t.NumericLiteral
          init.value=99
        }
      }
    }
  }
}

export default plugin