import { ChatOpenAI } from "@langchain/openai"  // 模型
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";

import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! pipe管道
const prompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");

const chain = prompt.pipe(model).pipe(new StringOutputParser());

// let res = await chain.invoke({ topic: "bears" });

// console.log(res)


// ! 多链结合
const analysisPrompt = ChatPromptTemplate.fromTemplate(
  "is this a funny joke? {joke}"
);

const composedChain = new RunnableLambda({
  func: async (input) => {
    const result = await chain.invoke(input);
    return { joke: result };
  },
})
  .pipe(analysisPrompt)
  .pipe(model)
  .pipe(new StringOutputParser());

// let res = await composedChain.invoke({ topic: "bears" });

// console.log(res)


// ! 多链结合
const composedChainWithLambda = RunnableSequence.from([
  chain,
  (input) => ({ joke: input }),
  analysisPrompt,
  model,
  new StringOutputParser(),
]);

await composedChainWithLambda.invoke({ topic: "beets" });