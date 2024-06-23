import { ChatOpenAI } from '@langchain/openai'
import { StringOutputParser } from "@langchain/core/output_parsers" // 解析模块
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = new ChatOpenAI("gpt-3.5-turbo");
const parser = new StringOutputParser();

// ! 使用工具

let myTool = async ({ operation, number1, number2 }) => {
  // Functions must return strings
  if (operation === "add") {
    return `${number1 + number2}`;
  } else if (operation === "subtract") {
    return `${number1 - number2}`;
  } else if (operation === "multiply") {
    return `${number1 * number2}`;
  } else if (operation === "divide") {
    return `${number1 / number2}`;
  } else {
    throw new Error("Invalid operation.");
  }
}

const modelWithTools = model.bind({
  tools: [
    {
      type: "function",
      function: {
        name: "calculator",
        description: "Can perform mathematical operations.",
        parameters: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              description: "The type of operation to execute.",
              enum: ["add", "subtract", "multiply", "divide"],
            },
            number1: { type: "number", description: "First integer" },
            number2: { type: "number", description: "Second integer" },
          },
          required: ["number1", "number2"],
        },
      },
    },
  ],
});

let res = await modelWithTools.invoke(`hi,20-6`);

if (res.tool_calls.length > 0) {
  console.log(res.tool_calls)
  console.log(await myTool(res.tool_calls[0].args))
} else {
  console.log(await parser.invoke(res))
}
