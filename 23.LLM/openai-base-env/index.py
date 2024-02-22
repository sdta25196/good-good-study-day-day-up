import os
from openai import OpenAI

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 配置 OpenAI 服务

client = OpenAI()

response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "给我一个中文二义性的示例",
        }
    ],
    model="gpt-3.5-turbo",
)

# print(response)

print(print(response.choices[0].message.content))  # 更具体的的打印
