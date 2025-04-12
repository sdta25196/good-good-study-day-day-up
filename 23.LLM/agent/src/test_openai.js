import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env

const model = 'doubao-1-5-pro-32k-250115'
const client = new OpenAI();

const tools = [
  {
    "type": "function",
    "function": {
      "name": "加法",
      "description": "计算两个数相加",
      "parameters": {
        "type": "object",
        "properties": {
          "a": { "type": "number", "description": "First integer" },
          "b": { "type": "number", "description": "Second integer" },
        },
        "required": ["a", "b"],
      },
    },
  },
  {
    "type": "function",
    "function": {
      "name": "减法",
      "description": "计算两个数相减",
      "parameters": {
        "type": "object",
        "properties": {
          "a": { "type": "number", "description": "First integer" },
          "b": { "type": "number", "description": "Second integer" },
        },
        "required": ["a", "b"],
      },
    },
  }
]

// ! 这个不对，这是openai官方的py调用方式。
const response = await client.responses.create({
  model: model,
  max_tokens: 1000,
  messages: [{ "role": "user", "content": "1+1  1-1" }],
  tools,
  tool_
})

console.log(response.choices[0].message)
console.log(response.choices[0].message.tool_calls)
