import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai"  // 模型
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! 自定义函数-判别器，判断执行逻辑

const promptTemplate =
  ChatPromptTemplate.fromTemplate(`Given the user question below, classify it as either being about \`LangChain\`, \`Anthropic\`, or \`Other\`.
                                     
Do not respond with more than one word.

<question>
{question}
</question>

Classification:`);

// 判别器
const classificationChain = RunnableSequence.from([
  promptTemplate,
  model,
  new StringOutputParser(),
]);

// const classificationChainResult = await classificationChain.invoke({
//   question: "how do I call Anthropic?",
// });
// console.log(classificationChainResult);

// 分类任务链 - langChainChain
const langChainChain = ChatPromptTemplate.fromTemplate(
  `You are an expert in langchain.
Always answer questions starting with "As Harrison Chase told me".
Respond to the following question:

Question: {question}
Answer:`
).pipe(model);

// 分类任务链 - anthropicChain
const anthropicChain = ChatPromptTemplate.fromTemplate(
  `You are an expert in anthropic. \
Always answer questions starting with "As Dario Amodei told me". \
Respond to the following question:

Question: {question}
Answer:`
).pipe(model);

// 分类任务链 - generalChain
const generalChain = ChatPromptTemplate.fromTemplate(
  `Respond to the following question:

Question: {question}
Answer:`
).pipe(model);


// 自定义函数，处理分类任务
const route = ({ topic }) => {
  if (topic.toLowerCase().includes("anthropic")) {
    return anthropicChain;
  } else if (topic.toLowerCase().includes("langchain")) {
    return langChainChain;
  } else {
    return generalChain;
  }
};

// 任务链，输入question, 经过判别器，分发给route函数，执行对应的任务
const fullChain = RunnableSequence.from([
  {
    topic: classificationChain,
    question: (input) => input.question,
  },
  route,
  // (i) => i + '11111111111' // ! 没搞明白怎么在最终的结果区分是哪个任务。
]);

const result1 = await fullChain.invoke({
  question: "how do I use Anthropic?",
});

console.log(result1);

// const result2 = await fullChain.invoke({
//   question: "how do I use LangChain?",
// });

// console.log(result2);

// const result3 = await fullChain.invoke({
//   question: "what is 2 + 2?",
// });

// console.log(result3);
