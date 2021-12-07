# 悦读：Vue Reactivity Source Code

源代码地址：https://github.com/vuejs/vue-next/blob/master/packages/reactivity

## 什么是Reactive?

Reactive就是一个形容词，中文是“响应的”。一个程序是响应的，代表它接收通知，然后触发行为。

举个例子：Webpack hot module reload is reactive to source file changes (webpack的热更新可以响应代码文件的变化）。那么webpack Hot Module Replacement的设计是？——Reactive。

`vue` 中设计了一个Reactive的值，vue可以响应这个值的更新，从而更新整个vnode(Vue中的节点)，我们说`vue` 是Reactive（vue可以响应数值的变化）。



## 为什么要响应式？

普通的值，比如一个number,string，是不能通知vue触发更新的。例如：

```tsx
const Component = {
    setup : () => {
        let counter = 1        
        function add(){
            counter ++
        }
        return () => {
            return <div>
                {counter}
                <button onClick={add}>add</button>
            </div>
        }
    }
}
```

虽然不能触发更新，但是用户的意图很明显了，希望`add` 方法触发vue更新，于是`vue` 提供了一种响应式的写法：

先尝试用一下下面的程序，思考`vue` 是如何做到counter++后更新整个组件的？

```tsx
import {ref} from 'vue'
const Component = {
    setup : () => {
        const counter = ref(0)
        
        function add(){
            counter.value ++
        }
        return () => {
            return <div>
                {counter.value}
                <button onClick={add}>add</button>
            </div>
        }
    }
}
```

### Counter 是什么？

https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/ref.ts

Counter的类型是RefImpl，具体代码如下：

```tsx
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly _shallow = false) {
    this._rawValue = _shallow ? value : toRaw(value)
    this._value = _shallow ? value : convert(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      triggerRefValue(this, newVal)
    }
  }
}
```

首先你要理解：counter是一个拥有getter/setter的对象。当读取counter.value时，会触发`get value()` ；写入`counter` 时会触发`set value()` 。

`counter.value++` 是一次读取和一次写入。

## Ref怎么通知vue更新呢？

有同学可能会说， counter通知vue更新还不简单？

设置counter值的时候，触发`set` ，于是vue就更新了。 有这样思考的同学，还没有把握住问题的本质。

counter是一个RefImpl，请大家再回去看下RefImpl的实现——RefImpl是一个对象，在这个对象中既没有`vue` 的VNode，也没有任何运行时的`vue` 状态。RefImpl是一个和`vue`没有关联的对象，它是一个单纯的数值对象。

当然有同学会说：在`set` 方法里我看到了`triggerRefValue`函数，一定是这个函数驱动了`vue` 更新，话没错，但是怎么驱动更新？

重新梳理下思路：

我们在`Component`组件中定义了RefImpl类型的`counter` ，但是`counter` 怎么知道现在在哪个组件实例之内呢？

比如下面这段程序：

```tsx
class A {
    name = "123"
    
    foo(){
        console.log(this.name)
    }
}
```

我们在foo方法中，通过this指针可以知道当前实例的`name` 是"123"。

但是如果是这样呢？

```tsx
class A {
    name = "123"
    
    foo(){
        const x = ref(0)
    }
    
    update(){
        
    }
}

function ref(val){
    let _value = val
    return {
        get value() {
            return val
        },
        set value(value) {
            _value = value
            // ref怎么调用A.update?
            // A.update ???
        }
    }
}
```

具体来说，ref在`set` 的时候，怎么调用A.update?  ——不可能！ 

请问vue怎么做到的？

有同学会说：一定是vue提供了一个全局的变量或者类似的机制，那么你再思考，哪怕`vue` 提供了这个全局变量：

```tsx
import vue from 'vue'

function ref(val){
    let _value = val
    return {
        get value() {
            return val
        },
        set value(value) {
            _value = value
            vue.update(???)
        }
    }
}
```

注意我划？？？的地方，就算vue提供了全局`update` 函数，`set` 处知道通知`vue` 的哪个虚拟DOM节点吗？ ——不可能！！



##  动态绑定：重新梳理`reactive` 的概念

 `import { ref } from 'vue'` 中的`ref` ，是一个响应式的值。它的内部实现是`getter` 和`setter` 。当值发生变化的时候，`ref` 的`setter` 会触发，但是这里碰到一个技术难点，就是`ref` 怎么知道自己定义在哪个`vNode` 上？

但是从这个角度来说，正是因为`ref`  和`vue` 没有关联，那么`ref` 很纯净。如果需要用户创建`ref` 的时候手动传入vNode，就不好了。例如：

```tsx
const counter = ref(0, vNode)
```

上面的程序，一下子就丢失了**动态绑定**的特性。

准确说，`ref` 需要动态绑定到定义`ref` 的组件。在Counter的例子中，`ref` 需要绑定到`Counter` 所在的组件。准确说，`ref` 要动态绑定定义`ref` 的虚拟vNode节点。

**划重点：难点不在想到getter和setter，而是动态绑定。**



## 继续阅读源码

vue采用了一种hack进入函数调用栈的方法。

在vNode加载前，设置一个全局的`effect` 函数，这个函数对应更新当前`vNode` 的方法。

伪代码如下：

```tsx
// before vNode mount
global.effect = vNode.update

// setup 函数开始执行
const counter = ref(0)

// 渲染函数开始执行
return <div>{counter.value}</div>

// 触发counter.get value()
counter.dep = global.effect

// 初始化子组件

……
    
```

可以看到，`vue` 利用了一个脏的全局变量解决了counter.dep赋值的问题。

counter的getter会触发一个叫做`track` 的函数，它负责将全局变量中的`effect` 存入`counter.dep` 。

counter的setter会触发一个叫做`trigger` 的函数，它负责执行`dep`中的函数。

这个全局变量在：

https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/effect.ts

定义：

```tsx
let activeEffect: ReactiveEffect | undefined
```

而设置个全局变量在`vue/runtime-core` 中：

具体参考这个文件：https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/renderer.ts

```tsx
import {
  ReactiveEffect
} from '@vue/reactivity'

const effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    )

const update = (instance.update = effect.run.bind(effect) as SchedulerJob)
update()
// 这里的effect，是从vue/reactivity/effect中import进来的
// update函数调用的时候，就会设置activeEffect
```









