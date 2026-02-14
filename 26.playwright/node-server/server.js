import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// import { MCPClient } from '../playwright-mcp-client/src/mcp-client.js';
import { MCPClient } from '../playwright-mcp-client/src/mcp-client-agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9997;
const MCP_PORT = 8931;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 存储 MCP 客户端实例（保持连接）
let mcpClient = null;
let isConnecting = false;

// 初始化 MCP 客户端连接
async function initMCPClient() {
  if (mcpClient && !isConnecting) {
    return mcpClient;
  }

  if (isConnecting) {
    // 等待连接完成
    while (isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return mcpClient;
  }

  isConnecting = true;
  try {
    mcpClient = new MCPClient();
    await mcpClient.connectToServer(`http://localhost:${MCP_PORT}/mcp`);
    console.log("MCP 客户端已初始化并连接到服务器");
    return mcpClient;
  } catch (error) {
    console.error("初始化 MCP 客户端失败:", error);
    mcpClient = null;
    throw error;
  } finally {
    isConnecting = false;
  }
}

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API 端点：处理查询（流式输出）
app.post('/api/query', async (req, res) => {
  let { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: '查询内容不能为空' });
  }

  // 设置 SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // 禁用 nginx 缓冲

  // 发送 SSE 数据的辅助函数
  const sendSSE = (type, data) => {
    res.write(`event: ${type}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // 确保 MCP 客户端已连接
    const client = await initMCPClient();

    // 处理查询
    console.log(`收到查询: ${query}`);
    sendSSE('message', { type: 'start', message: '开始处理查询...' });

    let toolsName = []
    let originalQuery = query; // 保存原始查询

    while (true) {
      // 开启循环对话，这一步获取到了第一个工具以及打开页面后的页面信息
      sendSSE('message', { type: 'info', message: '正在获取工具...' });

      let { tool, toolContent } = await client.getTool(query);

      if (tool.length > 0) {
        let toolName = tool[0].function.name
        toolsName.push(toolName)

        // 发送工具调用开始信息
        sendSSE('message', {
          type: 'tool',
          message: `正在调用工具: ${toolName}`
        });

        let res = await client.callTool({ tool: tool[0] })
        let content = JSON.stringify(res.content)

        // 发送工具调用结果
        sendSSE('message', {
          type: 'result',
          message: `调用工具：${toolName}`,
          content: content,
          separator: '-----------------------------------------------'
        });

        query = `
        用户发起的问题${originalQuery}，目前我们已经使用了工具${toolsName.join('、')}，最后一个工具${toolName}得到了内容${content}，继续判定我们接下来要做什么。
        如果已经完成了用户问题中的所有任务，则回复问题，如果没有问题就回复【已完成】。
      `
      } else {
        // ! 退出的逻辑：没匹配到工具
        sendSSE('message', {
          type: 'exit',
          message: '最终结果：\n' + toolContent
        });
        // await client.cleanup()
        break;
      }
    }

    // 发送完成事件
    sendSSE('message', { type: 'done', message: '任务已执行完成' });
    sendSSE('done', { success: true });

    // 关闭连接
    res.end();
  } catch (error) {
    console.error('处理查询时出错:', error);
    sendSSE('error', {
      error: error.message || '处理查询时发生错误'
    });
    res.end();
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('正在初始化 MCP 客户端连接...');
  console.log(`请确保 MCP 服务器正在运行在 http://localhost:${MCP_PORT}/mcp`);
  initMCPClient().catch(err => {
    console.error('初始化 MCP 客户端失败，请确保 MCP 服务器正在运行:', err);
  });
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('\n正在关闭服务器...');
  if (mcpClient) {
    await mcpClient.cleanup();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n正在关闭服务器...');
  if (mcpClient) {
    await mcpClient.cleanup();
  }
  process.exit(0);
});

