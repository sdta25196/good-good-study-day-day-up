// client.js
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function main() {
  // 创建客户端实例
  const client = new Client(
    {
      name: "my-mcp-client",
      version: "1.0.0"
    },
    {
      capabilities: {}
    }
  );

  // 创建 SSE 传输层，连接到指定服务器地址
  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:8931/mcp")
  );

  try {
    // 连接到服务器
    await client.connect(transport);
    console.log("成功连接到 MCP 服务器");

    // 获取服务器信息
    // const serverInfo = await client.initialize();
    // console.log("服务器信息:", serverInfo);

    // 列出可用资源
    // const resources = await client.listResources();
    // console.log("可用资源:", resources);

    // 列出可用工具
    const tools = await client.listTools();
    tools.tools.forEach(tool => {
      console.log("可用工具:", tool.name);
    })


  } catch (error) {
    console.error("连接失败:", error);
  }
}

main().catch(console.error);