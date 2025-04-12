import OpenAI from 'openai';

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

import dotenv from "dotenv";

dotenv.config();

const model = 'doubao-1-5-pro-32k-250115'

if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
  throw new Error("OPENAI_API_KEY or OPENAI_BASE_URL is not set");
}

class MCPClient {
  mcp;
  openai;
  transport = null;
  tools = [];

  constructor() {
    this.openai = new OpenAI();

    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  // 链接服务器 - 连接到server 然后把工具转行成想要的结构
  async connectToServer(serverScriptPath) {
    try {
      // Determine script type and appropriate command
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }

      // 获取node或者py的执行命令
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      // 链接MCP的标准服务器 - Transport 传输方式 stdio 适合本地服务器
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport); // MCP链接到服务器，传入了服务器文件和所用的命令

      // List available tools
      const toolsResult = await this.mcp.listTools();
      // console.log("MCP 服务器传过来的内容：", toolsResult.tools[0].inputSchema)
      // ! 这里把收过来的工具转换成了模型需要的结构！
      this.tools = toolsResult.tools.map((tool) => {
        return {
          "type": "function",
          "function": {
            "name": tool.name,
            "description": tool.description,
            "parameters": tool.inputSchema,
          },
        }
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map((tool) => tool.function.name),
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  // 真正执行大模型逻辑的部分
  async processQuery(query) {
    const messages = [
      {
        role: "user",
        content: query,
      },
    ];

    try {
      const response = await this.openai.chat.completions.create({
        model: model,
        max_tokens: 1000,
        messages,
        tools: this.tools,
        temperature: 1,
        top_p: 1,
        // stream: true, // ! 用的是MCP的标准输出服务，不接受流式的使用
      });

      const finalText = [];
      const toolResults = [];

      let calltools = response.choices[0].message.tool_calls
      let content = response.choices[0]?.message?.content
      console.log(calltools)
      if (calltools.length > 0) {
        // calltools.forEach(tools=>{
        // 准备执行工具调用
        const toolName = calltools[0].function.name;
        const toolArgs = JSON.parse(calltools[0].function.arguments);
        // ! 前面确定使用，这里执行API调用
        const result = await this.mcp.callTool({
          name: toolName,
          arguments: toolArgs,
        });

        console.log('result:' + JSON.stringify(result))

        toolResults.push(result);
        finalText.push(
          `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`,
        );

        // Continue conversation with tool results
        messages.push({
          role: "user",
          content: result.content,
        });

        // 最终获取到数据由大模型进行分析
        const aiResponse = await this.openai.chat.completions.create({
          messages: messages,
          temperature: 1,
          top_p: 1,
          model: model,
          // stream: true,
          max_tokens: 1000,
        });

        finalText.push(
          aiResponse.choices[0]?.message?.content
        );
        // })

      } else {
        finalText.push(content);
      }
      return finalText.join("\n");
    } catch (error) {
      console.log(error)
    }
  }


  // 循环在终端发起对话
  async chatLoop() {

    // 创建一个rl工具
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }

  // 关闭mcp
  async cleanup() {
    /**
     * Clean up resources
     */
    await this.mcp.close();
  }
}

async function main() {
  // 判断命令行工具参数
  if (process.argv.length < 3) {
    console.log("Usage: node build/index.js <path_to_server_script>");
    return;
  }
  // 创建自己的MCP客户端类型
  const mcpClient = new MCPClient();
  try {
    // 链接MCP服务器
    await mcpClient.connectToServer(process.argv[2]);
    // 开启循环对话
    await mcpClient.chatLoop();
  } finally {
    // 退出
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();