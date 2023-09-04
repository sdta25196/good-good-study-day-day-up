
from modelscope import GenerationConfig
from modelscope import AutoModelForCausalLM, AutoTokenizer
import dashscope
import os
from dotenv import load_dotenv
from dashscope import TextEmbedding
from dashvector import Client, Doc

# 部署了个通义千问

# 导入环境变量文件
load_dotenv()

# 读环境变量里的灵积模型 kei
dashscope.api_key = os.getenv('DASHSCOPE_KEY')

# 初始化向量服务
dashvector_client = Client(
    api_key='sk-spQV94Hqv2fVt21KSY2tOMobYqhHM220A467B48A011EEA3F22E5542FF7E21')

# define collection name
collection_name = 'news_embeddings'

# delete if already exist
dashvector_client.delete(collection_name)

# create a collection with embedding size of 1536
rsp = dashvector_client.create(collection_name, 1536)
collection = dashvector_client.get(collection_name)


# 从文件夹读取多个文件
def prepare_data_from_dir(path, size):
    # prepare the data from a file folder in order to upsert to dashvector with a reasonable doc's size.
    batch_docs = []
    for file in os.listdir(path):
        with open(path + '/' + file, 'r', encoding='utf-8') as f:
            batch_docs.append(f.read())
            if len(batch_docs) == size:
                yield batch_docs[:]
                batch_docs.clear()

    if batch_docs:
        yield batch_docs


# 从单个大文件读取
def prepare_data_from_file(path, size):
    # prepare the data from file in order to upsert to dashvector with a reasonable doc's size.
    batch_docs = []
    chunk_size = 12
    with open(path, 'r', encoding='utf-8') as f:
        doc = ''
        count = 0
        for line in f:
            if count < chunk_size and line.strip() != '':
                doc += line
                count += 1
            if count == chunk_size:
                batch_docs.append(doc)
                if len(batch_docs) == size:
                    yield batch_docs[:]
                    batch_docs.clear()
                doc = ''
                count = 0

    if batch_docs:
        yield batch_docs


# 向量Embedding基于DashScope文本向量（TextEmbedding）模型生成，这里生成的向量将作为向量引擎的索引
def generate_embeddings(docs):
    # create embeddings via DashScope's TextEmbedding model API
    rsp = TextEmbedding.call(model=TextEmbedding.Models.text_embedding_v1,
                             input=docs)
    embeddings = [record['embedding'] for record in rsp.output['embeddings']]
    return embeddings if isinstance(news, list) else embeddings[0]


# 向量、原始文本数据会在这一段写入 DashVector，从而完成本地知识库索引的构建。
id = 0
dir_name = 'CEC-Corpus/raw corpus/allSourceText'

# indexing the raw docs with index to dashvector
collection = dashvector_client.get(collection_name)

# embedding api max batch size
batch_size = 4

for news in list(prepare_data_from_dir(dir_name, batch_size)):
    ids = [id + i for i, _ in enumerate(news)]
    id += len(news)
    # generate embedding from raw docs
    vectors = generate_embeddings(news)
    # upsert and index
    ret = collection.upsert(
        [
            Doc(id=str(id), vector=vector, fields={"raw": doc})
            for id, doc, vector in zip(ids, news, vectors)
        ]
    )
    print(ret)


# 定义检索方法，用于召回知识库信息
def search_relevant_context(question, topk=1, client=dashvector_client):
    # query and recall the relevant information
    collection = client.get(collection_name)

    # recall the top k similiar results from dashvector
    rsp = collection.query(generate_embeddings(question), output_fields=['raw'],
                           topk=topk)
    return "".join([item.fields['raw'] for item in rsp.output])


# 初始化ModelScope上的7B千问模型

tokenizer = AutoTokenizer.from_pretrained(
    "qwen/Qwen-7B-Chat", revision='v1.0.5', trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    "qwen/Qwen-7B-Chat", revision='v1.0.5', device_map="auto", offload_folder="offload_folder", trust_remote_code=True, fp16=True).eval()
model.generation_config = GenerationConfig.from_pretrained(
    "Qwen/Qwen-7B-Chat", revision='v1.0.5', trust_remote_code=True)  # 可指定不同的生成长度、top_p等相关超参
model.float()

# 定义提示词模板


def answer_question(question, context):
    prompt = f'''请基于```内的内容回答问题。"
  ```
  {context}
  ```
  我的问题是：{question}。
    '''
    history = None
    print(prompt)
    response, history = model.chat(tokenizer, prompt, history=None)
    return response


# 测试用例
question = '清华博士发生了什么？'
answer = answer_question(question, '')
print(f'question: {question}\n' f'answer: {answer}')
