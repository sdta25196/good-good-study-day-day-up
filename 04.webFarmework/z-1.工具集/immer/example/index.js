// 在你的应用程序入口文件
import { enableMapSet, produce } from "immer"

enableMapSet()

// ...然后
const usersById_v1 = new Map([
  ["michel", { name: "Michel Weststrate", country: "NL" }]
])

const usersById_v2 = produce(usersById_v1, draft => {
  draft.get("michel").country = "UK"
})

// import { produce } from "immer"

// // 复杂数据结构例子
// const store = {
//   users: {
//     "17":
//     {
//       name: "Michel",
//       todos: [
//         {
//           title: "Get coffee",
//           done: false
//         }
//       ]
//     }
//   }
// }

// // 深度更新
// // const nextStore = produce(store, draft => {
// //   draft.users["17"].todos[0].done = true
// // })

// // 过滤
// const nextStore = produce(store, draft => {
//   const user = draft.users['17']
//   user.todos = user.todos.filter(todo => todo.done)
// })

// console.log(JSON.stringify(store, null, 2))
// console.log(JSON.stringify(nextStore, null, 2))

// // const baseState = [
// //   {
// //     title: "Learn TypeScript",
// //     done: true
// //   },
// //   {
// //     title: "Try Immer",
// //     done: false
// //   }
// // ]

// // const nextState = produce(baseState, draftState => {
// //   draftState.push({ title: "Tweet about it" })
// //   draftState[1].done = true
// // })

// // console.log(baseState)
// // console.log(nextState)