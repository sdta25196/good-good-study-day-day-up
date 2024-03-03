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
            "content": "我在python3.8.8环境中安装了markupsafe 2.1.5，使用 Flask启动服务时，提示cannot import name 'soft_unicode' from 'markupsafe'。",
        }
    ],
    model="gpt-3.5-turbo",
)

# print(response)

print(print(response.choices[0].message.content))  # 更具体的的打印
