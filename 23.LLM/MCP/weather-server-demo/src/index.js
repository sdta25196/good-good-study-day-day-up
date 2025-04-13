import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 初始化server
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "加法",
  "计算数字相加",
  {
    "a": z.number().describe("加法的第一个数字"),
    "b": z.number().describe("加法的第二个数字"),
    "c": z.number().describe("加法的第三个数字").optional(),
  },
  async ({ a, b, c }) => {
    console.error(`服务端: 收到加法API，计算${a}和${b}两个数的和。模型API发送`) //
    let data = a + b
    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve alerts data",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: a + '+' + b + '的结果是：' + data,
        },
      ],
    };
  },
);

server.tool(
  "减法",
  "计算数字相减",
  {
    "a": z.number().describe("减法的第一个数字"),
    "b": z.number().describe("减法的第二个数字"),
    "c": z.number().describe("减法的第三个数字").optional(),
  },
  async ({ a, b, c }) => {
    // ! 工具的处理逻辑
    console.error(`服务端: 发送减法API，计算${a}和${b}两个数的差。c是这个：${c}`)
    let data = a - b
    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve alerts data",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: a + '-' + b + '的结果是：' + data,
        },
      ],
    };
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP服务器启动成功");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});