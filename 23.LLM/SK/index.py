import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion
import os
import asyncio

#! pip install semantic-kernel==0.4.0.dev

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 创建 semantic kernel
kernel = sk.Kernel()

# 配置 OpenAI 服务。OPENAI_BASE_URL 会被自动加载生效
api_key = os.getenv('OPENAI_API_KEY')
model = OpenAIChatCompletion(
    "gpt-3.5-turbo",
    api_key
)

# 把 LLM 服务加入 kernel
# 可以加多个。第一个加入的会被默认使用，非默认的要被指定使用
kernel.add_text_completion_service("my-demo", model)


# 定义 semantic function
# 参数由{{ }}标识

tell_joke_about = kernel.create_semantic_function("给我讲个关于{{$input}}的笑话吧")


async def run_function(*args):
    return await kernel.invoke(*args)

# 运行 function 看结果
result = asyncio.run(
    run_function(tell_joke_about, input_str="Hello world")
)
print(result)