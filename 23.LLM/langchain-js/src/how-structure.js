import { ChatOpenAI } from "@langchain/openai";
import { RunnableLambda } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv"

dotenv.config() // 加载环境变量


const model = new ChatOpenAI("gpt-3.5-turbo");

// ! 如何进行结构化
const joke = {
  name: "joke",
  description: "给我讲一个笑话",
  parameters: {
    title: "Joke",
    type: "object",
    properties: {
      setup: { type: "string", description: "笑话的背景" },
      punchline: { type: "string", description: "笑点" },
      rating: { type: "number", description: "笑话的可笑程度，1到10" },
    },
    required: ["setup", "punchline", "rating"],
  },
}

const structuredLlm = model.withStructuredOutput(joke);

let res = await structuredLlm.invoke("用中文讲个笑话");

console.log(res)



// ! 自定义格式化

// 自定义解析函数
// const extractJson = (output) => {
//   const text = output.content;
//   // Define the regular expression pattern to match JSON blocks
//   const pattern = /```json(.*?)```/gs;

//   // Find all non-overlapping matches of the pattern in the string
//   const matches = text.match(pattern);

//   // Process each match, attempting to parse it as JSON
//   try {
//     return (
//       matches?.map((match) => {
//         // Remove the markdown code block syntax to isolate the JSON string
//         const jsonStr = match.replace(/```json|```/g, "").trim();
//         return JSON.parse(jsonStr);
//       }) ?? []
//     );
//   } catch (error) {
//     throw new Error(`Failed to parse: ${output}`);
//   }
// };

// const schema = `{ name: "string", say: "string" }`;

// // Prompt 让大模型返回某格式
// const prompt = await ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     `Answer the user query. Output your answer as JSON that
// matches the given schema: \`\`\`json\n{schema}\n\`\`\`.
// Make sure to wrap the answer in \`\`\`json and \`\`\` tags`,
//   ],
//   ["human", "{query}"],
// ]).partial({
//   schema,
// });


// const chain = prompt
//   .pipe(model)
//   .pipe(new RunnableLambda({ func: extractJson }));

// let res = await chain.invoke({ query: "小张说hello啊" });

// console.log(res)