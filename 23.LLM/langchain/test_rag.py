from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader, UnstructuredExcelLoader, UnstructuredFileLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# ! 这是一个网站解析做RAG的demo

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

llm = ChatOpenAI(temperature=0.3)

# ! 网站解析器
loader = WebBaseLoader("https://career.tsinghua.edu.cn/info/1031/4878.htm")
# ! excel解析器
# loader = UnstructuredExcelLoader("./example_data/question.excel")
# ! txt解析器
# loader = UnstructuredFileLoader("qa.txt")
docs = loader.load()
print(docs[0])
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

document_chain = create_stuff_documents_chain(llm, prompt)

retriever = vector.as_retriever()
retrieval_chain = create_retrieval_chain(retriever, document_chain)

response = retrieval_chain.invoke({"input": "这是哪所学校？他们学校的毕业生都去哪了？"})
print(response["answer"])

# # ! 另外一种方式，可以直接执行
# # from langchain_core.documents import Document

# # document_chain.invoke({
# #     "input": "电话是多少?",
# #     "context": [Document(page_content="山东，刘凯，男，45岁，18545612345")]
# # })
