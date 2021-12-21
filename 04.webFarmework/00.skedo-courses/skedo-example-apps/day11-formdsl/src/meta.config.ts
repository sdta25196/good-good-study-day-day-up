type FooContext = {
  user: {
    state: string
  }
}

// 元数据DSL
export default {
  form: {
    type: "form",
    items: [
      {
        type: 'input',
        path: ['user', 'name'],
        default: "hello55485"
      },
      {
        type: 'input',
        path: ['user', 'name1'],
        default: "hello55485"
      },
      // {
      //   type: "condition",
      //   cond: (ctx: FooContext) => {
      //     return ctx.user.state === 'loggedin' ?
      //       0 : 1
      //   },
      //   items: [{
      //     type: 'input',
      //     path: ['lang', 'ts'],
      //   }, {
      //     type: 'input',
      //     puath: ['lang', 'node']
      //   }]
      // }
    ],
  },
}

// 最小知识原则