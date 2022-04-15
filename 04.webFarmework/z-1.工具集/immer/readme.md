## immer

**当前版本9.0.12**

immer让我们以更方便的方式使用不可变状态。

immer本身与框架无关。

使用 Immer，会将所有的更改操作应用在临时的`draft`，它是`currentState`的代理。一旦你完成了所有的`mutations`，Immer 将根据对`draft state` 的 `mutations` 生成 `nextState`。这意味着您可以通过简单地修改数据来与数据交互，同时保留不可变数据的所有好处。

![immer](./immer.png)

## 安装

  安装immer: `yarn add immer`

  react安装use-immer`yarn add use-immer`

## 示例

```js
import { produce } from "immer"

// 复杂数据结构例子
const store = {
  users: {
    "17":
    {
      name: "Michel",
      todos: [
        {
          title: "Get coffee",
          done: false
        }
      ]
    }
  }
}

// 深度更新
const nextStore = produce(store, draft => {
  draft.users["17"].todos[0].done = true
})

// 过滤
const nextStore = produce(store, draft => {
  const user = draft.users['17']
  user.todos = user.todos.filter(todo => todo.done)
})

```

## 术语

* (base)state， 传递给 produce 的不可变状态
* recipe: produce 的第二个参数，它捕获了 (base)state 应该如何 mutated。
* draft: 任何 recipe 的第一个参数，它是可以安全 mutate 的原始状态的代理。
* producer. 一个使用 produce 的函数，通常形式为 `(baseState, ...arguments) => resultState`

```js
// toggleTodo => producer
function toggleTodo(state, id) {
    return produce(state, draft => {
        const todo = draft.find(todo => todo.id === id)
        todo.done = !todo.done
    })
}
```

## 支持Map和Set

如果需要支持map和set 需要手动开启一下`enableMapSet()`, 如果是react项目，只要在入口文件调用即可
```js
// 在你的应用程序入口文件
import { enableMapSet, produce } from "immer"

enableMapSet()

const usersById_v1 = new Map([
  ["michel", { name: "Michel Weststrate", country: "NL" }]
])

const usersById_v2 = produce(usersById_v1, draft => {
  draft.get("michel").country = "UK"
})
```
## react和immer

useState 假定存储在其中的任何 state 都被视为不可变的。使用 Immer 可以大大简化 React 组件状态的深度更新

主要解决react state不可变的痛点。

在react useState中对象是需要使用扩展符来进行修改的

```js
  const [state,setState] = useState({a:1,b:2})

  setState({...state,a:2})
```
### immer

使用`immer`可以直接使用`produce`进行操作`state`

```js
  import React, { useCallback, useState } from "react";
  import produce from "immer";

  const TodoList = () => {
    const [todos, setTodos] = useState([
      {
        id: "React",
        title: "Learn React",
        done: true
      },
      {
        id: "Immer",
        title: "Try Immer",
        done: false
      }
    ]);

    const handleToggle = useCallback((id) => {
      setTodos(
        produce((draft) => {
          const todo = draft.find((todo) => todo.id === id);
          todo.done = !todo.done;
        })
      );
    }, []);

    const handleAdd = useCallback(() => {
      setTodos(
        produce((draft) => {
          draft.push({
            id: "todo_" + Math.random(),
            title: "A new todo",
            done: false
          });
        })
      );
    }, []);

    return (<div>{*/ See CodeSandbox */}</div>)
  }
```

### use-immer

使用`use-immer`后, 可以直接对数组、对象进行修改
```js
import React, { useCallback } from "react";
import { useImmer } from "use-immer";

const TodoList = () => {
  const [todos, setTodos] = useImmer([
    {
      id: "React",
      title: "Learn React",
      done: true
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false
    }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false
      });
    });
  }, []);
```

### redux+immer

```js
  import produce from "immer"

  // 初始 state
  const INITIAL_STATE = [
      /* 一系列 todos */
  ]

  const todosReducer = produce((draft, action) => {
    switch (action.type) {
        case "toggle":
            const todo = draft.find(todo => todo.id === action.id)
            todo.done = !todo.done
            break
        case "add":
            draft.push({
                id: action.id,
                title: "A new todo",
                done: false
            })
            break
        default:
            break
    }
  })
```

## immer常见问题

* 永远不要重新分配`draft`（例如：`draft = myCoolNewState`），要么修改 `draft`，要么返回新状态。
* Immer 只支持单向树, 不支持循环引用的树
* Immer 不支持特殊对象 比如 window.location.
* Immer 中的 draft 对象包装在 Proxy 中，因此您不能使用 == 或 === 来测试原始对象与其 draft 之间的相等性

## 更多

* [immer官方文档](https://immerjs.github.io/immer/)

* [react+immer更多示例](https://immerjs.github.io/immer/example-setstate/)