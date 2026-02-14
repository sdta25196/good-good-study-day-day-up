# Playwright MCP Web 服务器

这是一个基于 Express 的 Web 服务器，提供了一个简单的 Web 界面来通过 Playwright MCP 执行浏览器自动化任务。

## 功能特性

- 🌐 Web 界面：简洁美观的浏览器界面
- 🤖 AI 驱动：通过 AI 理解自然语言指令并执行 Playwright 任务
- 🔌 MCP 集成：与 Playwright MCP 服务器无缝集成

## 安装依赖

```bash
cd node-server
npm install
```

## 配置环境变量

在启动服务器之前，需要配置环境变量。创建 `.env` 文件在以下任一位置：

1. `node-server/.env`（推荐）
2. 项目根目录 `playwright/.env`
3. `playwright-mcp-client/.env`

`.env` 文件内容示例：

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=https://api.example.com/v1
```

**或者**，你也可以在系统环境变量中设置这些值。

## 启动服务器

### 1. 启动 MCP 服务器

首先，需要手动启动 Playwright MCP 服务器（默认端口 8931）：

```bash
# 在项目根目录或 playwright-mcp-server 目录下执行
npx @playwright/mcp@latest --port 8931
```

如果使用配置文件：

```bash
npx @playwright/mcp@latest --config playwright-mcp-server/playwright-mcp-config.json --port 8931
```

### 2. 启动 Web 服务器

在另一个终端窗口中，启动 Web 服务器：

```bash
cd node-server
npm start
```

服务器将在 `http://localhost:9997` 启动。

**注意**：
- 请确保 MCP 服务器在 Web 服务器启动之前已经运行
- MCP 服务器默认运行在 `http://localhost:8931/mcp`

## 使用方法

1. 在浏览器中访问 `http://localhost:9997`
2. 在输入框中输入您的指令，例如：
   - "打开浏览器，访问百度的首页"
   - "打开浏览器，访问 https://www.gaokao.cn"
   - "打开浏览器，搜索 Playwright"
3. 点击"执行任务"按钮
4. 等待任务执行完成，查看结果

## 项目结构

```
node-server/
├── server.js          # Express 服务器主文件
├── package.json       # 项目依赖配置
├── public/            # 静态文件目录
│   └── index.html     # Web 界面
└── README.md          # 本文件
```

## API 端点

### POST /api/query

处理用户查询并执行 Playwright 任务。

**请求体：**
```json
{
  "query": "打开浏览器，访问百度的首页"
}
```

**响应：**
```json
{
  "success": true,
  "result": "任务执行结果..."
}
```

## 注意事项

- **需要手动启动 MCP 服务器**：请先启动 Playwright MCP 服务器（端口 8931），然后再启动 Web 服务器
- 首次连接 MCP 服务器可能需要一些时间（通常 2-5 秒）
- 服务器会保持 MCP 客户端连接，以提高响应速度
- 关闭 Web 服务器时（Ctrl+C），只会关闭 Web 服务器，MCP 服务器需要单独关闭

