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

// Register weather tools

// {
//   "type": "function",
//   "function": {
//     "name": "加法",
//     "description": "计算两个数相加",
//     "parameters": {
//       "type": "object",
//       "properties": {
//         "a": { "type": "number", "description": "First integer" },
//         "b": { "type": "number", "description": "Second integer" },
//       },
//       "required": ["a", "b"],
//     },
//   },
// },

server.tool(
  "加法",
  "计算数字相加",
  {
    "a": z.number().describe("加法的第一个数字"),
    "b": z.number().describe("加法的第二个数字"),
    "c": z.number().describe("加法的第三个数字").optional(),
  },
  async ({ a, b, c }) => {
    // ! 工具的处理逻辑
    // const stateCode = state.toUpperCase();
    // const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    // const alertsData = await makeNWSRequest(alertsUrl);
    console.log(`发送算法API，计算${a}和${b}两个数的和。c是这个：${c}`)
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
    // const stateCode = state.toUpperCase();
    // const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    // const alertsData = await makeNWSRequest(alertsUrl);
    console.log(`发送算法API，计算${a}和${b}两个数的差。c是这个：${c}`)
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
  console.error("111Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});