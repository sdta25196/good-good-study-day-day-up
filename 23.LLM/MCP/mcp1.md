# 困惑

MCP 怎么使用工具的？不是FC么？
rest API是怎么转换成MCP服务器的？ HSF怎么转的？为什么能转？

MCP服务器和MCP客户端到底是个啥情况？ SSE、标准等输出方式怎么实现的？

# MCP

- [MCP文档](https://modelcontextprotocol.io/quickstart/server)

- [MCP的git项目](https://github.com/modelcontextprotocol/)

- Anthropic 提出的MCP概念，包含客户端和服务端，服务端提供工具使用。[原文](https://www.anthropic.com/news/model-context-protocol)

## MCP概念

- MCP = Model Context Protocol（模型上下文协议）

- 模型上下文协议是一种开放标准，可让开发人员在其数据源和 AI 驱动的工具之间建立安全的双向连接。

- 该架构非常简单：开发人员可以通过 MCP 服务器公开其数据，也可以构建连接到这些服务器的 AI 应用程序（MCP 客户端）。

- MCP增强了function call的能力，能够自动利用上下文进行决策规划工具使用。

- 免费的一个MCP客户端：cherrystudio

- 通过**资源**暴露数据（类似于GET端点，用于将信息加载到LLM上下文中）
- 通过**工具**提供功能（类似于POST端点，用于执行代码或产生副作用）
- 通过**提示词**定义交互模式（可重用的LLM交互模板）

## MCP和FC的对比案例
**传统 Function Calling**

用户问：`“北京天气如何？”` → LLM 输出 `{"function": "get_weather", "args": {"city": "北京"}}` → 系统调用API返回结果。

**MCP 增强的调用**

用户问：“周末去北京该怎么穿？” → MCP 结合上下文（用户所在地、历史偏好）动态触发：
- 调用天气API获取北京周末温度。
- 根据温度调用穿搭推荐模型。
- 整合结果生成个性化回复，无需用户分步提问。


## DEMO学习

**知学堂-15.Fine-tuning技术与大模型优化**
[MCP官方文档](https://modelcontextprotocol.io/quickstart/client)
[MCP开源项目](https://github.com/modelcontextprotocol/)
[MCP快速开始demo](https://github.com/modelcontextprotocol/quickstart-resources)
[MCP-py-demo](https://github.com/modelcontextprotocol/python-sdk/tree/main)
[MCP-ts-demo](https://github.com/modelcontextprotocol/typescript-sdk)



## 官方demo

### 客户端

自己写了MCPClient，使用mcp接入服务端，然后结构化了服务端返回的工具，

- 链接服务端
- 从服务端拿到工具列表
- 大模型使用FC进行工具列表的使用
- 客户端调用工具（calltool），服务端执行。
- 大模型根据API返回的结果，进行回复