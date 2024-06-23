# LangChain

LangChain是一个由大型语言模型 (LLM) 驱动的应用程序开发框架。

LangChain 表达式语言 (LCEL) 是一种声明式方法，可轻松组合链。

## modal模块

```js
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages" // message模块
import dotenv from "dotenv"

dotenv.config() // 加载环境变量
const model = new ChatOpenAI("gpt-3.5-turbo");


const messages = [
  new SystemMessage("扮演一个傻子"),
  new HumanMessage("傻子，你叫什么名字"),
];

const result = await model.invoke(messages); // 请求

```


## tools模块

使用model绑定一系列函数，随后通过结果进行函数调用即可

```js
const modelWithTools = model.bind({
  tools: [
    {
      type: "function",
      function: {
        name: "calculator",
        description: "Can perform mathematical operations.",
        parameters: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              description: "The type of operation to execute.",
              enum: ["add", "subtract", "multiply", "divide"],
            },
            number1: { type: "number", description: "First integer" },
            number2: { type: "number", description: "Second integer" },
          },
          required: ["number1", "number2"],
        },
      },
    },
  ],
});


let res = await modelWithTools.invoke(`hi,20-6`);

if (res.tool_calls.length > 0) {
  console.log(res.tool_calls)
  console.log(await myTool(res.tool_calls[0].args))
} else {
  console.log(await parser.invoke(res))
}

```

## parser模块

```js
import { StringOutputParser } from "@langchain/core/output_parsers" // 解析模块

const parser = new StringOutputParser(); // 解析器

// 解析器处理 模型返回的结果
// let str = await parser.invoke(result); 

// 解析器和模型pipe起来，随后使用chain发起请求
// const chain = model.pipe(parser); 

```
- `JsonOutputParser`  对输出json格式化
- `StringOutputParser`  对输出字符串格式化


## prompt模块

```js
import { ChatPromptTemplate } from "@langchain/core/prompts" // 提示词模块

// 提示词 chain
const systemTemplate = "Translate the following into {language}:"; // 提示词

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const chain = promptTemplate.pipe(model).pipe(parser);

let res = await chain.invoke({ language: "italian", text: "hi" });
console.log(res)

```

- `ChatPromptTemplate` 用来做对话提示词模版
- `PromptTemplate` 用来做提示词模版

## 示例

- 平行发送多个请求：`src/how-parallel.js`
- 传递原始问题至链中：`src/how-parallel.js`
- 管道操作：`src/how-runnables-pipe.js`
- 自定义函数处理输入、输出：`src/how-custom-function.js`
- 判别器，判断执行路径：`src/how-routing.js` [官方示例](https://js.langchain.com/v0.2/docs/how_to/routing)

## 其他模型

`toolLama` ，训练用来精准调用API的模型
