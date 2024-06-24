import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai"  // 模型
import { cosineSimilarity } from "@langchain/core/utils/math";
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型

// ! 按语义距离来判断路由

// 物理学家提示词模版
const physicsTemplate = `You are a very smart physics professor.
You are great at answering questions about physics in a concise and easy to understand manner.
When you don't know the answer to a question you admit that you don't know.
Do not use more than 100 words.

Here is a question:
{query}`;


// 数学家提示词模版
const mathTemplate = `"You are a very good mathematician. You are great at answering math questions.
You are so good because you are able to break down hard problems into their component parts,
answer the component parts, and then put them together to answer the broader question.
Do not use more than 100 words.

Here is a question:
{query}`;

const embeddings = new OpenAIEmbeddings({});

const templates = [physicsTemplate, mathTemplate];
const templateEmbeddings = await embeddings.embedDocuments(templates);

const promptRouter = async (query) => {
  const queryEmbedding = await embeddings.embedQuery(query);
  const similarity = cosineSimilarity([queryEmbedding], templateEmbeddings)[0]; // 计算余弦距离
  const isPhysicsQuestion = similarity[0] > similarity[1];
  let promptTemplate;
  if (isPhysicsQuestion) {
    console.log(`Using physics prompt`);
    promptTemplate = ChatPromptTemplate.fromTemplate(templates[0]);
  } else {
    console.log(`Using math prompt`);
    promptTemplate = ChatPromptTemplate.fromTemplate(templates[1]);
  }
  return promptTemplate.invoke({ query });
};

const chain = RunnableSequence.from([
  promptRouter,
  model,
  new StringOutputParser(),
]);

console.log(await chain.invoke("what's a 3+2?"));