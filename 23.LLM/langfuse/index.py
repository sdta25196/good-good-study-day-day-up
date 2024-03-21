from langfuse.callback import CallbackHandler
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from loadenv import loadenv

loadenv()

# ! 集成langchain初级版

handler = CallbackHandler(
    trace_name="SayHello",
    user_id="wzr",
)

model = ChatOpenAI()

prompt = ChatPromptTemplate.from_messages([
    HumanMessagePromptTemplate.from_template("Say hello to {input}!")
])


# 定义输出解析器
parser = StrOutputParser()

chain = (
    {"input": RunnablePassthrough()}
    | prompt
    | model
    | parser
)

res = chain.invoke(input="borther valor", config={"callbacks": [handler]})

print(res)

