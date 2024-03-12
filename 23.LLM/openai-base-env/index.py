import os
from openai import OpenAI

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# pip install python-dotenv openai

# 配置 OpenAI 服务

client = OpenAI()

response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "给金砖会议的新闻稿生成十个活泼风格的标题，要十个字以内。",
        }
    ],
    temperature=0.1,
    frequency_penalty=2,
    model="gpt-3.5-turbo",
)

# print(response)

print(print(response.choices[0].message.content))  # 更具体的的打印
