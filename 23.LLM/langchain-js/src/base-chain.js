import { ChatOpenAI } from "@langchain/openai"  // 模型
import { HumanMessage, SystemMessage } from "@langchain/core/messages" // message模块
import { StringOutputParser } from "@langchain/core/output_parsers" // 解析模块
import { ChatPromptTemplate } from "@langchain/core/prompts" // 提示词模块

import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型
const parser = new StringOutputParser(); // 解析器

const messages = [
  new SystemMessage("扮演一个傻子"),
  new HumanMessage("傻子，你叫什么名字"),
];

// const result = await model.invoke(messages); // 请求

// let str = await parser.invoke(result); // 解析器处理结果

const chain = model.pipe(parser); // 请求和处理器 pipe起来

// let str = await chain.invoke(messages); // 普通调用
// console.log(str)

let stream = await chain.stream(messages); // 流式调用
const chunks = [];

for await (const chunk of stream) {
  chunks.push(chunk);
}
console.log(chunks);



// 提示词 chain

// const systemTemplate = "Translate the following into {language}:"; // 提示词

// const promptTemplate = ChatPromptTemplate.fromMessages([
//   ["system", systemTemplate],
//   ["user", "{text}"],
// ]);

// // const result = await promptTemplate.invoke({ language: "italian", text: "hi" });

// const chain1 = promptTemplate.pipe(model).pipe(parser);

// let a = await chain1.invoke({ language: "italian", text: "hi" });
// console.log(a)


