import { ChatOpenAI } from "@langchain/openai"  // 模型

import dotenv from "dotenv"

dotenv.config() // 加载环境变量

// ! 执行保底逻辑，解决模型出错的问题

const fakeModel = new ChatOpenAI("potato!");  // 假模型
const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

const modelWithFallback = fakeModel.withFallbacks({
  fallbacks: [model],
});

const result = await modelWithFallback.invoke("What is your name?");

console.log(result);
