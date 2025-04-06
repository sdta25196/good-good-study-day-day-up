# MCP demo - 来自于 https://github.com/modelcontextprotocol/typescript-sdk

# MCP TypeScript SDK ![NPM版本](https://img.shields.io/npm/v/%40modelcontextprotocol%2Fsdk) ![MIT许可](https://img.shields.io/npm/l/%40modelcontextprotocol%2Fsdk)

## 目录
- [MCP demo - 来自于 https://github.com/modelcontextprotocol/typescript-sdk](#mcp-demo---来自于-httpsgithubcommodelcontextprotocoltypescript-sdk)
- [MCP TypeScript SDK  ](#mcp-typescript-sdk--)
  - [目录](#目录)
  - [概述](#概述)
  - [安装](#安装)
  - [快速开始](#快速开始)
  - [什么是MCP？](#什么是mcp)
  - [核心概念](#核心概念)
    - [服务器](#服务器)
    - [资源](#资源)
    - [工具](#工具)
    - [提示词](#提示词)
  - [运行服务器](#运行服务器)
    - [标准输入输出](#标准输入输出)
    - [HTTP与SSE](#http与sse)
    - [测试与调试](#测试与调试)
  - [示例](#示例)
    - [回声服务器](#回声服务器)
    - [SQLite浏览器](#sqlite浏览器)
  - [高级用法](#高级用法)
    - [底层服务器](#底层服务器)
    - [编写MCP客户端](#编写mcp客户端)
  - [文档](#文档)
  - [贡献](#贡献)
  - [许可](#许可)

## 概述

模型上下文协议(MCP)允许应用程序以标准化方式为LLM提供上下文，将提供上下文与实际LLM交互的关注点分离。这个TypeScript SDK完整实现了MCP规范，可以轻松实现：

- 构建能连接任何MCP服务器的客户端
- 创建暴露资源、提示词和工具的MCP服务器
- 使用标准传输方式如stdio和SSE
- 处理所有MCP协议消息和生命周期事件

## 安装

```bash
npm install @modelcontextprotocol/sdk
```

## 快速开始

创建一个简单的MCP服务器，暴露计算器工具和一些数据：

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建MCP服务器
const server = new McpServer({
  name: "演示",
  version: "1.0.0"
});

// 添加加法工具
server.tool("加法",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// 添加动态问候资源
server.resource(
  "问候语",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `你好，${name}!`
    }]
  })
);

// 开始通过stdin接收消息，stdout发送消息
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 什么是MCP？

[模型上下文协议(MCP)](https://modelcontextprotocol.io)允许您构建向LLM应用程序安全、标准化地暴露数据和功能的服务器。可以把它想象成专为LLM交互设计的Web API。MCP服务器可以：

- 通过**资源**暴露数据（类似于GET端点，用于将信息加载到LLM上下文中）
- 通过**工具**提供功能（类似于POST端点，用于执行代码或产生副作用）
- 通过**提示词**定义交互模式（可重用的LLM交互模板）
- 以及其他功能！

## 核心概念

### 服务器

McpServer是与MCP协议交互的核心接口，处理连接管理、协议合规性和消息路由：

```typescript
const server = new McpServer({
  name: "我的应用",
  version: "1.0.0"
});
```

### 资源

资源是向LLM暴露数据的方式，类似于REST API中的GET端点：

```typescript
// 静态资源
server.resource(
  "配置",
  "config://app",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "这里是应用配置"
    }]
  })
);

// 带参数的动态资源
server.resource(
  "用户资料",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `用户${userId}的资料数据`
    }]
  })
);
```

### 工具

工具让LLM通过服务器执行操作，可以进行计算和产生副作用：

```typescript
// 带参数的简单工具
server.tool(
  "计算BMI",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);

// 调用外部API的异步工具
server.tool(
  "获取天气",
  { city: z.string() },
  async ({ city }) => {
    const response = await fetch(`https://api.weather.com/${city}`);
    const data = await response.text();
    return {
      content: [{ type: "text", text: data }]
    };
  }
);
```

### 提示词

提示词是可重用的模板，帮助LLM有效与服务器交互：

```typescript
server.prompt(
  "代码审查",
  { code: z.string() },
  ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `请审查这段代码:\n\n${code}`
      }
    }]
  })
);
```

## 运行服务器

TypeScript中的MCP服务器需要通过传输层与客户端通信，启动方式取决于传输选择：

### 标准输入输出

适用于命令行工具和直接集成：

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "示例服务器",
  version: "1.0.0"
});

// ...设置服务器资源、工具和提示词...

const transport = new StdioServerTransport();
await server.connect(transport);
```

### HTTP与SSE

适用于远程服务器，启动带有SSE端点的Web服务器：

```typescript
import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const server = new McpServer({
  name: "示例服务器",
  version: "1.0.0"
});

// ...设置服务器资源、工具和提示词...

const app = express();
const transports: {[sessionId: string]: SSEServerTransport} = {};

app.get("/sse", async (_: Request, res: Response) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('找不到该sessionId对应的传输');
  }
});

app.listen(3001);
```

### 测试与调试

可以使用[MCP检查器](https://github.com/modelcontextprotocol/inspector)测试服务器。

## 示例

### 回声服务器

展示资源、工具和提示词的简单服务器：

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "回声",
  version: "1.0.0"
});

server.resource(
  "回声",
  new ResourceTemplate("echo://{message}", { list: undefined }),
  async (uri, { message }) => ({
    contents: [{
      uri: uri.href,
      text: `资源回声: ${message}`
    }]
  })
);

server.tool(
  "回声",
  { message: z.string() },
  async ({ message }) => ({
    content: [{ type: "text", text: `工具回声: ${message}` }]
  })
);

server.prompt(
  "回声",
  { message: z.string() },
  ({ message }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `请处理这条消息: ${message}`
      }
    }]
  })
);
```

### SQLite浏览器

展示数据库集成的复杂示例：

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const server = new McpServer({
  name: "SQLite浏览器",
  version: "1.0.0"
});

const getDb = () => {
  const db = new sqlite3.Database("database.db");
  return {
    all: promisify<string, any[]>(db.all.bind(db)),
    close: promisify(db.close.bind(db))
  };
};

server.resource(
  "架构",
  "schema://main",
  async (uri) => {
    const db = getDb();
    try {
      const tables = await db.all(
        "SELECT sql FROM sqlite_master WHERE type='table'"
      );
      return {
        contents: [{
          uri: uri.href,
          text: tables.map((t: {sql: string}) => t.sql).join("\n")
        }]
      };
    } finally {
      await db.close();
    }
  }
);

server.tool(
  "查询",
  { sql: z.string() },
  async ({ sql }) => {
    const db = getDb();
    try {
      const results = await db.all(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [{
          type: "text",
          text: `错误: ${error.message}`
        }],
        isError: true
      };
    } finally {
      await db.close();
    }
  }
);
```

## 高级用法

### 底层服务器

直接使用底层Server类获得更多控制：

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "示例服务器",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {}
    }
  }
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [{
      name: "示例提示词",
      description: "示例提示词模板",
      arguments: [{
        name: "参数1",
        description: "示例参数",
        required: true
      }]
    }]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "示例提示词") {
    throw new Error("未知提示词");
  }
  return {
    description: "示例提示词",
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: "示例提示词文本"
      }
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 编写MCP客户端

SDK提供高级客户端接口：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "示例客户端",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
);

await client.connect(transport);

// 列出提示词
const prompts = await client.listPrompts();

// 获取提示词
const prompt = await client.getPrompt("示例提示词", {
  参数1: "值"
});

// 列出资源
const resources = await client.listResources();

// 读取资源
const resource = await client.readResource("file:///示例.txt");

// 调用工具
const result = await client.callTool({
  name: "示例工具",
  arguments: {
    参数1: "值"
  }
});
```

## 文档

- [MCP文档](https://modelcontextprotocol.io)
- [MCP规范](https://spec.modelcontextprotocol.io)
- [示例服务器](https://github.com/modelcontextprotocol/servers)

## 贡献

欢迎在GitHub提交问题和拉取请求：[https://github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## 许可

本项目采用MIT许可证，详见[LICENSE](LICENSE)文件。