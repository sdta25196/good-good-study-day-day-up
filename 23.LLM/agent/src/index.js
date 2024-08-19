import OpenAI from 'openai';
import dotenv from "dotenv"

dotenv.config() // 加载环境变量

const model = 'Doubao-pro-32k'
const openai = new OpenAI();

async function main() {
  console.log('----- 开始 -----')
  const res = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: 'who are you' },
    ],
    temperature: 1,
    top_p: 1,
    model: model,
    stream: true,
  });

  // ! 流失输出
  for await (const part of res) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }

  // ! 非流失输出
  // let str = res.choices[0]?.message?.content
  // console.log(str)
}

main();
