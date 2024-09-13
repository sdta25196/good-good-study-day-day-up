import OpenAI from 'openai';
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import fs from 'fs';

// 在 ES 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config() // 加载环境变量

const model = 'ep-20240719062210-l5lq7'
const openai = new OpenAI();

getFile()
async function getFile() {
  const sourceDir = path.join(__dirname, '../data/不是吧君子也防');
  const files = fs.readdirSync(sourceDir);
  for (let i = 0; i < files.length; i++) {
    // 构建完整的文件路径
    const filePath = path.join(sourceDir, files[i]);
    const newfilePath = path.join(sourceDir, '../../n/' + files[i]);
    // 读取文件内容
    let article = fs.readFileSync(filePath, 'utf8');
    await main(newfilePath, article);
  }
  console.log('所有文件内容已写入新文件');
}


async function main(filePath, article) {
  console.log('----- 开始 -----')
  article.replace('@无限好文，尽在晋江文学城', '')
  article.replace('求月票', '')
  let prompt = `
${article}

对上述文章进行段落排版，删除不合理的标点符号。
只返回排版后的新文章，不要返回其他内容。
  `
  const res = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: prompt },
    ],
    temperature: 1,
    top_p: 1,
    model: model,
    stream: true,
  });

  // ! 流失输出
  for await (const part of res) {
    // process.stdout.write(part.choices[0]?.delta?.content || '');
    // 将文件内容追加到新文件中
    fs.appendFileSync(filePath, part.choices[0]?.delta?.content || '')
  }
}
