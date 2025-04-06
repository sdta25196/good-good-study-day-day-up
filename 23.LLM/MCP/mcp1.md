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

## MCP和FC的对比案例
**传统 Function Calling**

用户问：`“北京天气如何？”` → LLM 输出 `{"function": "get_weather", "args": {"city": "北京"}}` → 系统调用API返回结果。

**MCP 增强的调用**

用户问：“周末去北京该怎么穿？” → MCP 结合上下文（用户所在地、历史偏好）动态触发：
- 调用天气API获取北京周末温度。
- 根据温度调用穿搭推荐模型。
- 整合结果生成个性化回复，无需用户分步提问。


## DEMO学习

- get-alerts
- get-forecast