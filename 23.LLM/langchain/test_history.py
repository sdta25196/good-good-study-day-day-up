from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain_core.messages import HumanMessage, AIMessage


# ! 这是多轮对话版本的网站解析做RAG的demo

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

llm = ChatOpenAI(temperature=0.3)

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

retriever = vector.as_retriever()

prompt = ChatPromptTemplate.from_messages([
    ("system", "仅根据所提供的上下文回答以下问题 :\n\n{context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
])

document_chain = create_stuff_documents_chain(llm, prompt)

retrieval_chain = create_retrieval_chain(retriever, document_chain)

chat_history = [
    HumanMessage(content="我给你起个名字，你叫小王"),
    AIMessage(content="好的，收到。我叫小王！")
]

response = retrieval_chain.invoke({
    "chat_history": chat_history,
    "input": "你叫什么？这是哪所学校？"
})

print(response["answer"])
