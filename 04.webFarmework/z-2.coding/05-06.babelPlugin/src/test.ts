import * as babel from "@babel/core"
import plugin from './babelPlugin'


const code = `
  const a = 99
`

const result = babel.transformSync(code, {
  babelrc: false,
  ast: true,
  plugins: [plugin(null, null, null)],
  sourceMaps: true,
  sourceFileName: "aaa",
  configFile: false
})

console.log(result!.code)