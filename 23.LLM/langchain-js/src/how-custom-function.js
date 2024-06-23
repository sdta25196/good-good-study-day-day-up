import { ChatOpenAI } from "@langchain/openai"  // 模型
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! 处理自定义函数。使用RunnableLambda

const lengthFunction = (input) => {
  return {
    length: input.foo.length.toString(),
  };
};

const prompt = ChatPromptTemplate.fromTemplate("What is {length} squared?");

const chain = RunnableLambda.from(lengthFunction)
  .pipe(prompt)
  .pipe(model)
  .pipe(new StringOutputParser());

// let res = await chain.invoke({ foo: "bar" });
// console.log(res)


// ! 处理自定义函数。使用RunnableSequence

const chainWithCoercedFunction = RunnableSequence.from([
  prompt,
  model,
  (input) => input.content.slice(0, 5),
]);


let res = await chainWithCoercedFunction.invoke({ length: "8" });
console.log(res)
