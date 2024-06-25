import { ChatPromptTemplate, FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai"  // 模型

import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! few-shot ，不咋好使

const examples = [
  { input: "2+2", output: "这他妈的不是4还能是几？" },
  { input: "2+3", output: "这他妈的不是5还能是几？" },
];

// This is a prompt template used to format each individual example.
const examplePrompt = ChatPromptTemplate.fromMessages([
  ["human", "{input}"],
  ["ai", "{output}"],
]);
const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  examplePrompt,
  examples,
  inputVariables: [], // no input variables
});

// 此处把 examples 的数据 按照 examplePrompt的格式组装成多条示例样本
// const result = await fewShotPrompt.invoke({});
// console.log(result.toChatMessages());


const finalPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a wondrous wizard of math."],
  fewShotPrompt, // 这里会被添加一些示例
  ["human", "按照前面的聊天记录来玩：{input}"],
]);

const chain = finalPrompt.pipe(model);

let res = await chain.invoke({ input: "9+6" });

console.log(res)