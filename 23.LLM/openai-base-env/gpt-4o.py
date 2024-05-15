from openai import OpenAI

# ! GPT-4o的demo

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
            "content": [
                {"type": "text", "text": "图片上有什么字？"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://dummyimage.com/600x400/000/fff",
                    },
                },
            ]
        }
    ],
    temperature=0.1,
    frequency_penalty=2,
    model="gpt-4o",
)

print(response)
