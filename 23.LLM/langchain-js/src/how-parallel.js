import { ChatOpenAI } from "@langchain/openai"  // 模型
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableMap, RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! parallel 并行
const jokeChain = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
).pipe(model);

const poemChain = PromptTemplate.fromTemplate(
  "write a 2-line poem about {topic}"
).pipe(model);

const mapChain = RunnableMap.from({
  joke: jokeChain,
  poem: poemChain,
});

// const result = await mapChain.invoke({ topic: "bear" });
// console.log(result);


// ! RunnablePassthrough 保留信息直接向下传递

const template = `Answer the question based only on the following context:
{context}

Question: {question}`;

const prompt = PromptTemplate.fromTemplate(template);

const retrievalChain = RunnableSequence.from([
  { context: () => '小明79岁', question: new RunnablePassthrough() },
  prompt,
  model,
  new StringOutputParser(),
]);

const result = await retrievalChain.invoke(
  "小明多大了"
);
console.log(result);