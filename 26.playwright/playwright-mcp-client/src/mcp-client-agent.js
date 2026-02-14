// client.js
import OpenAI from 'openai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const model = 'doubao-1.5-pro-32k-250115'

if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
  throw new Error("OPENAI_API_KEY or OPENAI_BASE_URL is not set");
}

class MCPClient {
  client;
  openai;
  transport = null;
  tools = [];

  constructor() {
    this.openai = new OpenAI();

    this.client = new Client({ name: "playwright-mcp-client", version: "1.0.0" });
  }

  // 链接服务器 - 连接到server 然后把工具转行成想要的结构
  async connectToServer(serverScriptPath) {
    try {
      // 创建 SSE 传输层，连接到指定服务器地址
      const transport = new StreamableHTTPClientTransport(
        new URL(serverScriptPath)
      );
      // 连接到服务器
      await this.client.connect(transport);
      console.log("成功连接到 MCP 服务器!!!");

      // 列出可用工具
      const listTools = await this.client.listTools();

      // 格式化工具结构
      this.tools = listTools.tools.map((tool) => {
        return {
          "type": "function",
          "function": {
            "name": tool.name,
            "description": tool.description,
            "parameters": tool.inputSchema,
          },
        }
      });

      // console.log("从服务端获取的工具：", this.tools.map((tool) => tool.function.name));

    } catch (error) {
      console.log("Failed to connect to MCP server: ", error);
    }
  }

  // ! 处理多任务的逻辑
  // ! 获取工具、调用工具、根据结果继续分析继续调用、过程中以及结束后可以返回内容给到前端。
  // ! while(true) 不断的调用工具。

  // 获取需要用到的工具
  async getTool(query) {
    const messages = [
      {
        role: "user",
        content: query,
      },
    ];
    try {
      console.log("判断query所需的工具中...")
      const response = await this.openai.chat.completions.create({
        model: model,
        max_tokens: 1000,
        messages,
        tools: this.tools,
        temperature: 0.7,
        // top_p: 0.6,
        stream: false,
      });
      let calltools = response.choices[0].message.tool_calls || []
      let content = response.choices[0]?.message?.content
      return { tool: calltools, toolContent: content }

    } catch (error) {
      console.log(error);
    }
  }
  async callTool({ tool }) {
    const toolName = tool.function.name;
    const toolArgs = JSON.parse(tool.function.arguments);
    // 证明大模型说的使用工具，确实存在
    if (this.tools.filter(tool => tool.function.name === toolName).length === 0) {
      return { content: '大模型扯淡，给了个假工具：' + toolName };
    }
    console.log("AI判定使用工具：" + toolName + '\n' + tool.function.arguments)
    // 交给MCP进行调用
    const result = await this.client.callTool({
      name: toolName,
      arguments: toolArgs,
    });

    return { content: result.content }; // ! 这个结果里面有yaml格式的整个页面。

  }
  // 关闭mcp
  async cleanup() {
    // 关闭MCP
    await this.client.close();
  }
}

// 导出 MCPClient 类供其他模块使用
export { MCPClient };