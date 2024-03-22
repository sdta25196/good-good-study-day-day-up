from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

llm = ChatOpenAI(temperature=0.3)
prompt = PromptTemplate(input_variables=["x"], template="你懂不懂{x}?")
output_parser = StrOutputParser()  # 解析成字符串

runnable = (
  {"x": RunnablePassthrough()} | prompt | llm | output_parser
)

# ! 普通请求
# res = runnable.invoke("langchain")
# # print(res.json())
# print(res)

# ! 流式请求
for chunk in runnable.stream("高考"):
  print(chunk, end="", flush=True)
