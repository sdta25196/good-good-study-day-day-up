# LangChain

LangChain是一个由大型语言模型 (LLM) 驱动的应用程序开发框架。

LangChain 表达式语言 (LCEL) 是一种声明式方法，可轻松组合链。






## todo

分模块测试学习

import { ChatOpenAI } from "@langchain/openai"  // 模型

import { HumanMessage, SystemMessage } from "@langchain/core/messages" // message模块

import { StringOutputParser } from "@langchain/core/output_parsers" // 解析模块

import { ChatPromptTemplate } from "@langchain/core/prompts" // 提示词模块

import { InMemoryChatMessageHistory } from "@langchain/core/chat_history"; // 

import { RunnableWithMessageHistory } from "@langchain/core/runnables";   // 