import { ChatOpenAI } from "@langchain/openai"  // 模型
import { JsonOutputParser } from "@langchain/core/output_parsers";


import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");  // 模型
const parser = new JsonOutputParser(); // 解析器

// ! 流式情况下使用json.

// TODO 还没处理完

// A function that does not operates on input streams and breaks streaming.
const extractCountryNames = (inputs) => {
  if (!Array.isArray(inputs.countries)) {
    return "";
  }
  return JSON.stringify(inputs.countries.map((country) => country.name));
};

const chain = model.pipe(parser).pipe(extractCountryNames); // 请求和处理器 pipe起来


const stream = await chain.stream(
  `Output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`
);

for await (const chunk of stream) {
  console.log(chunk);
}
