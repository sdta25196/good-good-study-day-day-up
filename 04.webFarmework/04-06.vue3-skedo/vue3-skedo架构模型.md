# 实现搭建平台



## 架构



## 核心Node



一个Node就是一个虚拟的DOM节点。（搭建系统抽象）

Node继承于Emiter, 可以发送消息。

 Node内部的数据采用Immutable方便实现操作回滚。

![image-20210723190512526](assets/image-20210723190512526.png)

node是一个递归结构，node.children中记录childNode。



### 交互的核心UIStateMachine



用状态机组成交互的核心。

- 通知机制采用拉取模式（poll)

  - 减少组件间依赖
  - 灵活控制渲染

- 状态机控制全部的用户体验（让交互行为可预测）

  

![image-20210723191644731](assets/image-20210723191644731.png)

### 渲染器



渲染器递归绘制，遇到容器类型时会发生递归。

![image-20210723191115925](assets/image-20210723191115925.png)

## 元数据



什么是“元(Meta)”？

元数据是描述程序的数据（俗称代码）。元编程就是让程序程序，是元（代码）在编程。 

在一个搭建平台中：元数据，就是可以深刻反应、并且可以运行时控制系统行为的数据。那么这些数据有哪些呢？

- 对组件的描述
- 对组件父子结构的描述
- 对组件属性的描述
- ……

举个例子，运行时加载了一个外部组件，然后将外部组件加入系统的元数据，那么——系统获得了创建外部组件的能力。

###  题外：JS中有哪些元编程的技巧？

- eval
- Reflect
- 直接修改一个函数 obj[foo] = function...
- Prxoy
- Decorator
- babel plugin 

思考：小明写了一段支付程序，function pay(){...} 这段支付程序本身是元数据吗？ 



# 模型理解
一个vue3版本的拖动功能 见`D:\ONE_PACE\04.web架构\00.skedo-courses\skedo-courses\vue3-examples`

我们panel中渲染的元素都是一个个的Node
逻辑是editor一开始把状态机所有的状态都注册上，然后拖动事件触发dispatch，通知Node修改位置 -- 
Dragable 可以自动维护位置，这个组件在看看
左侧的按钮触发新增node状态，然后Dragable就添加node进去

