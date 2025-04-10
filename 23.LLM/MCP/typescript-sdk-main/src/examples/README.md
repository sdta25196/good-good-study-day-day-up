# MCP TypeScript SDK 示例说明

本目录包含使用 TypeScript SDK 实现的 MCP 客户端和服务器的示例代码。

## 可流式 HTTP - 单节点部署与基础会话状态管理
多节点状态管理示例将在我们添加支持后很快补充。

### JSON响应模式服务器 (server/jsonResponseStreamableHttp.ts)
一个简单的 MCP 服务器，使用启用了 JSON 响应模式的可流式 HTTP 传输，基于 Express 实现。该服务器提供了一个简单的问候工具，可返回针对名称的问候语。

**运行服务器**
```bash
npx tsx src/examples/server/jsonResponseStreamableHttp.ts
```
服务器将在 3000 端口启动。您可以测试初始化和工具调用：

```bash
# 初始化服务器并从头部获取会话ID
SESSION_ID=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Accept: text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {
      "capabilities": {},
      "protocolVersion": "2025-03-26", 
      "clientInfo": {
        "name": "test",
        "version": "1.0.0"
      }
    },
    "id": "1"
  }' \
  -i http://localhost:3000/mcp 2>&1 | grep -i "mcp-session-id" | cut -d' ' -f2 | tr -d '\r')
echo "会话 ID: $SESSION_ID"

# 使用保存的会话ID调用问候工具
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Accept: text/event-stream" \
  -H "mcp-session-id: $SESSION_ID" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "greet",
      "arguments": {
        "name": "World"
      }
    },
    "id": "2"
  }' \
  http://localhost:3000/mcp
```
注意：在此示例中，我们通过设置 `Accept: application/json` 头部使用纯 JSON 响应模式。

### 基础服务器 (server/simpleStreamableHttp.ts)
一个简单的 MCP 服务器，使用可流式 HTTP 传输，基于 Express 实现。该服务器提供：

- 一个简单的问候工具，返回针对名称的问候语
- 一个问候模板提示，生成问候模板
- 一个静态的问候资源

**运行服务器**
```bash
npx tsx src/examples/server/simpleStreamableHttp.ts
```
服务器将在 3000 端口启动。您可以测试初始化和工具列表：

```bash
# 首先初始化服务器并将会话ID保存到变量
SESSION_ID=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Accept: text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {
      "capabilities": {},
      "protocolVersion": "2025-03-26", 
      "clientInfo": {
        "name": "test",
        "version": "1.0.0"
      }
    },
    "id": "1"
  }' \
  -i http://localhost:3000/mcp 2>&1 | grep -i "mcp-session-id" | cut -d' ' -f2 | tr -d '\r')
echo "会话 ID: $SESSION_ID"

# 然后使用保存的会话ID列出工具
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION_ID" \
  -d '{"jsonrpc":"2.0","method":"tools/list","params":{},"id":"2"}' \
  http://localhost:3000/mcp
```

### 客户端 (client/simpleStreamableHttp.ts)
一个连接服务器的客户端，演示如何：

- 列出可用工具并调用问候工具
- 列出可用提示并获取问候模板提示
- 列出可用资源

**运行客户端**
```bash
npx tsx src/examples/client/simpleStreamableHttp.ts
```
启动客户端前请确保服务器正在运行。

## 注意事项

- 这些示例演示了可流式 HTTP 传输的基本用法
- 服务器管理调用之间的会话
- 客户端处理直接的 HTTP 响应和 SSE 流式响应