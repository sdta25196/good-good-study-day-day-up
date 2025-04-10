import OpenAI from 'openai';

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env

const model = 'doubao-1-5-pro-32k-250115'

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// if (!OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY is not set");
// }

class MCPClient {
  mcp;
  doubao;
  transport = null;
  tools = [];

  constructor() {
    this.doubao = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: "https://ark.cn-beijing.volces.com/api/v3"
    });

    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async connectToServer(serverScriptPath) {
    /**
     * Connect to an MCP server
     *
     * @param serverScriptPath - Path to the server script (.py or .js)
     */
    try {
      // Determine script type and appropriate command
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      // Initialize transport and connect to server
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport);

      // List available tools
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name),
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  async processQuery(query) {
    /**
     * Process a query using Claude and available tools
     *
     * @param query - The user's input query
     * @returns Processed response as a string
     */
    const messages = [
      {
        role: "user",
        content: query,
      },
    ];

    console.log(this.tools[0].input_schema.properties)
    console.log(messages)

    //! MCP怎么使用openai规范的内容
    // Initial Claude API call
    try {
      const response = await this.doubao.chat.completions.create({
        model: model,
        max_tokens: 1000,
        messages,
        tools: [
          {
            state: {
              type: 'string',
              minLength: 2,
              maxLength: 2,
              description: 'Two-letter state code (e.g. CA, NY)'
            }
          },
          {
            "type": "function",
            "function": {
              "name": "加法",
              "description": "Multiply two integers together.",
              "parameters": {
                "type": "object",
                "properties": {
                  "a": { "type": "number", "description": "First integer" },
                  "b": { "type": "number", "description": "Second integer" },
                },
                "required": ["a", "b"],
              },
            },
          }
        ]
        // tools: this.tools, // ! 这个tools打开之后就导致不能输出了, 因为server服务那边返回的数据结构不是 tools需要的。 需要再确认怎么才能返回想要的数据结构
        // temperature: 1,
        // top_p: 1,
        // stream: true,
      });

      console.log(response.choices[0])
      return response.choices[0]?.message?.content

      // Process response and handle tool calls
      const finalText = [];
      const toolResults = [];

      for (const content of response.content) {
        if (content.type === "text") {
          finalText.push(content.text);
        } else if (content.type === "tool_use") {
          // Execute tool call
          const toolName = content.name;
          const toolArgs = content.input;

          const result = await this.mcp.callTool({
            name: toolName,
            arguments: toolArgs,
          });
          toolResults.push(result);
          finalText.push(
            `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`,
          );

          // Continue conversation with tool results
          messages.push({
            role: "user",
            content: result.content,
          });

          // Get next response from Claude
          const response = await this.doubao.chat.completions.create({
            messages: [
              { role: 'user', content: 'who are you' },
            ],
            temperature: 1,
            top_p: 1,
            model: model,
            stream: true,
            // model: model,
            // max_tokens: 1000,
            // messages,
          });

          finalText.push(
            response.content[0].type === "text" ? response.content[0].text : "",
          );
        }
      }

      return finalText.join("\n");
    } catch (error) {
      console.log(error)
    }
  }

  async chatLoop() {
    /**
     * Run an interactive chat loop
     */
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

  async cleanup() {
    /**
     * Clean up resources
     */
    await this.mcp.close();
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node build/index.js <path_to_server_script>");
    return;
  }
  const mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(process.argv[2]);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();