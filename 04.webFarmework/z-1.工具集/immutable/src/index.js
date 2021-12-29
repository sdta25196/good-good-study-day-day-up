import { Map as ImmutableMap } from 'immutable'

// const oldMap = []
// const svaeOldMap = (map) => {
//   oldMap.push(map.toJS())
// }

// const map = ImmutableMap({ 'a': 1 })
// svaeOldMap(map)
// svaeOldMap(map.set('c', 2))

// console.log(map.toJS())
// console.log(oldMap)

const map = ImmutableMap({ 'a': { d: { d: 2 } } })

console.log(map.getIn(['a', 'd', 'd']))
