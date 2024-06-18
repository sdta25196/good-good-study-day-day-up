
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages"
import { StringOutputParser } from "@langchain/core/output_parsers" // 解析模块

import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");
const parser = new StringOutputParser(); // 解析器

model.pipe(parser).invoke([
  new HumanMessage({ content: "HI, bor" }),
  new AIMessage({ content: "you are baby" }),
  new HumanMessage({ content: "你凭什么说我是baby" })
]).then(res => {
  console.log(res)
})

