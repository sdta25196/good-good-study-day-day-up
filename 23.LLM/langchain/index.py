from langchain_openai import ChatOpenAI
import os

# ! langchain 封装大模型

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

os.environ["LANGCHAIN_PROJECT"] = ""
os.environ["LANGCHAIN_API_KEY"] = ""
os.environ["LANGCHAIN_ENDPOINT"] = ""
os.environ["LANGCHAIN_TRACING_V2"] = ""

llm = ChatOpenAI(model="gpt-4")  # 默认是gpt-3.5-turbo
response = llm.invoke("你是谁,详细一点介绍")
print(response.content)
