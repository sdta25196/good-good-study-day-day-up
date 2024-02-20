/**
 * Chatall.ts
 * 演示用 LangChain.js 实现的多 LLM 同时对话。
 * 运行：
 * $ npm install -g ts-node typescript @types/dotenv
 * $ npm install langchain dotenv
 * $ ts-node chatall.ts
 */

import { BaseChatModel } from "langchain/chat_models/base";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatBaiduWenxin } from "langchain/chat_models/baiduwenxin";
import { HumanMessagePromptTemplate } from "langchain/prompts";

import dotenv from 'dotenv';
dotenv.config();

// 1. 定义多个聊天模型
const models: BaseChatModel[] = [];
models.push(new ChatBaiduWenxin({}));
models.push(new ChatOpenAI({}));

// 2. 定义模板 prompt
const template = "怎样夸赞{object}";
const humanPrompt = HumanMessagePromptTemplate.fromTemplate(template);

// 3. 定义对象
const objects = [
    "领导",
    "同事",
    "女朋友",
    "男朋友",
    "老婆",
    "老公",
];

// 4. 开始对话
async function chatall() {
    try {
        for (const obj of objects) {
            const messages = await humanPrompt.formatMessages({
                object: obj,
            });
            console.log("===========\n提问：\n" + messages[0].content + "\n\n");
            for (const model of models) {
                const res = await model.call(messages);
                console.log(model._llmType() + "：\n" + res.content + "\n\n");
            }
        }
    } catch (e: any) {
        console.log(e.response.data);
    }
}

chatall();