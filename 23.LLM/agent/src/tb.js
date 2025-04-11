//! 志愿填报模拟

import OpenAI from 'openai';
import dotenv from "dotenv";
import readline from "readline/promises";

dotenv.config(); // load environment variables from .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;

const model = 'doubao-1-5-pro-32k-250115'
const doubao = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL
});

let history = []
let userInfo = {
  "省份": "山东",
  "选科": "物化生",
  "分数": "580",
  "性别": "",
  "外语语种": "",
  "色盲色弱": "",
  "意向城市": "",
  "意向院校": "",
  "意向专业": "",
}

async function chatLoop() {

  console.log("请确认用户信息：" + JSON.stringify(userInfo))
  /**
   * Run an interactive chat loop
   */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("Type your queries or 'quit' to exit.");

    while (true) {
      const message = await rl.question("\nQuery: ");
      if (history.length == 0) {
        history.push({ "assistant": "请确认用户信息：" + JSON.stringify(userInfo) })
      }
      if (message.toLowerCase() === "quit") {
        break;
      }
      const response = await main(message);
      console.log("\n" + response);
    }
  } finally {
    rl.close();
  }
}


async function main(q) {
  const response = await doubao.chat.completions.create({
    model: model,
    max_tokens: 1000,
    messages: [
      {
        role: "system", content: `
你是一名志愿填报专家，你的任务是平和略带一点幽默的引导用户在志愿填报后进行专业、院校、城市的选择，回复中加入一些emoji。
你可以通过自己的技巧和话术，询问当前用户信息中没有的内容，一个一个引导用户提供内容。不要一次性问太多，一个一个信息进行引导。如果一个信息引导了三次用户还是没有给明确的回答，那么就需要换个信息引导。
当前用户信息：${JSON.stringify(userInfo)}
你可以使用的工具有：专业、院校、城市，这三个工具可以查询相关的信息，你可以先查询对应的信息再回复用户
如果用户自己也不知道应该选什么好的时候，结合用户的信息，以及使用工具获取你想要获得的信息，来给用户提出推荐。
user和assistant的历史对话如下：${history.map(x => JSON.stringify(x)).join('\n')}`
      },
      {
        role: "user", content: `
      ## 要求
      - 如果用户想要查看个人信息，在输出的开头加：1-
      - 如果用户想要修正个人信息，在输出的开头加：2-
      - 如果用户想要生成志愿表，在输出的开头加：3-
      - 如果都不需要，可以直接与用户对话
      ## user
      ${q}
      ## 输出
      ` }
    ],
    tools: [
      {
        "type": "function",
        "function": {
          "name": "专家",
          "description": "根据参数返回专业相关的信息",
          "parameters": {
            "type": "object",
            "properties": {
              "性格": { "type": "string", "description": "性格相匹配的专业" },
              "视觉": { "type": "string", "description": "对色盲色弱有要求的专业" },
            },
            "required": [],
          },
        },
      },
      {
        "type": "function",
        "function": {
          "name": "院校",
          "description": "根据参数返回院校相关的信息",
          "parameters": {
            "type": "object",
            "properties": {
              "层次": { "type": "string", "description": "985、211等层次院校" },
              "类型": { "type": "string", "description": "综合类、理工、农林等类型的院校" },
            },
            "required": [],
          },
        },
      },
      {
        "type": "function",
        "function": {
          "name": "城市",
          "description": "根据参数返回城市相关的信息",
          "parameters": {
            "type": "object",
            "properties": {
              "沿海": { "type": "string", "description": "沿海城市" },
              "东北": { "type": "string", "description": "东北、东三省城市" },
            },
            "required": [],
          },
        },
      }
    ]
    // temperature: 1,
    // top_p: 1,
    // stream: true,
  });

  if (response.choices[0]?.message.tool_calls?.length > 0) {
    console.log(response.choices[0]?.message.tool_calls)
    return "拿到了上面的信息。根据这些信息再次又提示词输出内容。"
  }


  let A = response.choices[0]?.message?.content

  if (response.choices[0]?.message?.content.includes('1-')) {
    return JSON.stringify(userInfo)
  }

  if (response.choices[0]?.message?.content.includes('2-')) {
    A = response.choices[0]?.message?.content.split('2-')[1]
  }

  if (response.choices[0]?.message?.content.includes('3-')) {
    A = response.choices[0]?.message?.content.split('3-')[1]
  }
  history.push({ "user": q, "assistant": A })
  info()
  return A
}


async function info() {
  const response = await doubao.chat.completions.create({
    model: model,
    max_tokens: 1000,
    messages: [
      {
        role: "user", content: `
根据历史对话，修改用户当前的信息。
当前用户的信息为：
${JSON.stringify(userInfo)}
        
user和assistant的历史对话如下：
${history.map(x => JSON.stringify(x)).join('\n')}

## 要求
- 根据历史对话信息，对应用户的当前信息，需要返回新的一组json格式的字符串即可，没有修改就返回当前信息，修改了就返回新的信息。
- 除了json格式外，不要返回任何内容，尤其是不要返回markdown语法的JSON
      `
      }
    ],
    tools: []
    // temperature: 1,
    // top_p: 1,
    // stream: true,
  });
  // console.log("当前userinfo为：" + response.choices[0]?.message?.content)

  userInfo = JSON.parse(response.choices[0]?.message?.content)
}

chatLoop()