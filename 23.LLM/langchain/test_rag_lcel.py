from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# ! 这是一个网站解析做RAG的demo

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

model = ChatOpenAI(temperature=0.3)
output_parser = StrOutputParser()

# ! 网站解析器
loader = WebBaseLoader("https://career.tsinghua.edu.cn/info/1031/4878.htm")
docs = loader.load()
# ! 向量化模型
embeddings = OpenAIEmbeddings()
# 文件拆分
text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)
# 对文档进行向量化
vector = FAISS.from_documents(documents, embeddings)

prompt = ChatPromptTemplate.from_template("""仅根据所提供的上下文回答以下问题 :

<context>
{context}
</context>

问题: {input}""")

retriever = vector.as_retriever()

setup_and_retrieval = RunnableParallel(
    {"context": retriever, "input": RunnablePassthrough()}
)

chain = setup_and_retrieval | prompt | model | output_parser

res = chain.invoke("这是哪所学校？他们学校的毕业生都去哪了？")

print(res)