from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langfuse import Langfuse
import uuid
from loadenv import loadenv

loadenv()

# ! prompt升级测试。使用数据集

# 定义评估函数
def simple_evaluation(output, expected_output):
  return output == expected_output

# 定义待测试提示词
need_answer = PromptTemplate.from_template("""
*********
你是AIGC课程的助教，你的工作是从学员的课堂交流中选择出需要老师回答的问题，加以整理以交给老师回答。
 
课程内容:
{outlines}
*********
学员输入:
{user_input}
*********
如果这是一个需要老师答疑的问题，回复Y，否则回复N。
只回复Y或N，不要回复其他内容。""")

model = ChatOpenAI(temperature=0, model_kwargs={"seed": 42})
parser = StrOutputParser()

chain_v1 = (
    need_answer
    | model
    | parser
)

langfuse = Langfuse()

def run_evaluation(chain, dataset_name, run_name):
    dataset = langfuse.get_dataset(dataset_name)
    
    def process_item(item):
        handler = item.get_langchain_handler(run_name=run_name)
        
        # Assuming chain.invoke is a synchronous function
        output = chain.invoke(item.input, config={"callbacks": [handler]})
        
        # Assuming handler.root_span.score is a synchronous function
        handler.root_span.score(
            name="accuracy",
            value=simple_evaluation(output, item.expected_output)
        )
        print('.', end='',flush=True)

    for item in dataset.items:
        process_item(item)

    # 建议并行处理
    # with ThreadPoolExecutor(max_workers=4) as executor:
        # executor.map(process_item, dataset.items)


# 运行完成后，去后台查看即可
run_evaluation(chain_v1, "assistant-data", "v1-"+str(uuid.uuid4())[:8])