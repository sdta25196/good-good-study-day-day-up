import { MCPClient } from './mcp-client-agent.js';

async function main(query) {

  // 创建自己的MCP客户端类型
  const mcpClient = new MCPClient();
  try {
    // 链接MCP服务器
    await mcpClient.connectToServer("http://localhost:8931/mcp");
    let toolsName = []
    while (true) {
      // 开启循环对话，这一步获取到了第一个工具以及打开页面后的页面信息
      let { tool, toolContent } = await mcpClient.getTool(query);
      if (tool.length > 0) {
        let toolName = tool[0].function.name
        toolsName.push(toolName)
        console.log('调用工具：' + toolName)

        let res = await mcpClient.callTool({ tool: tool[0] })
        let content = JSON.stringify(res.content)

        query = `
        用户发起的问题${query}，目前我们已经使用了工具${toolsName.join('、')}，最后一个工具${toolName}得到了内容${content}，继续判定我们接下来要做什么。
        如果已经完成了用户问题中的所有任务，则回复【已完成】。
      `
        console.log('得到内容：' + content)
        console.log('-----------------------------------------------')
      } else {
        // ! 退出的逻辑：没匹配到工具
        console.log('退出：：：：' + toolContent)
        break;
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    // 退出
    // await mcpClient.cleanup();
    // process.exit(0);
  }
}

// main("打开浏览器，访问https://www.gaokao.cn").catch(console.error);
// main("打开浏览器，访问百度的首页").catch(console.error);
// main("打开浏览器，分别用两个tab页面访问百度的首页和https://www.gaokao.cn").catch(console.error);
// main("打开浏览器，访问百度的首页，然后再输入框搜索清华大学，最后帮我给清华大学相关信息都截个图").catch(console.error);
// main("打开浏览器，访问https://graduate.ahut.edu.cn/info/1132/8817.htm 然后帮我把文章pdf下载下来。").catch(console.error);
main("访问https://www.gaokao.cn/school/61/sturule，告诉我中国海洋大学在北京2024年的招生计划中第一条数据的招生计划细节。注意筛选条件。如果需要筛选，你需要先逐一点击筛选项，然后再点击悬浮在那附近的标签。").catch(console.error);
