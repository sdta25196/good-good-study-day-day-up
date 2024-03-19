from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory, ConversationTokenBufferMemory
from langchain_openai import ChatOpenAI

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# ! 上下文记忆

history = ConversationBufferMemory()
history.save_context({"input": "你好啊"}, {"output": "你也好啊"})

print(history.load_memory_variables({}))

history.save_context({"input": "你再好啊"}, {"output": "你又好啊"})

print(history.load_memory_variables({}))

# ! 限制2轮上下文

window = ConversationBufferWindowMemory(k=2)
window.save_context({"input": "第一轮问"}, {"output": "第一轮答"})
window.save_context({"input": "第二轮问"}, {"output": "第二轮答"})
window.save_context({"input": "第三轮问"}, {"output": "第三轮答"})
# {'history': 'Human: 第二轮问\nAI: 第二轮答\nHuman: 第三轮问\nAI: 第三轮答'}
print(window.load_memory_variables({}))

# ! 通过token限制上下文

memory = ConversationTokenBufferMemory(
    llm=ChatOpenAI(),
    max_token_limit=40  # 限制最多40个字
)
memory.save_context(
    {"input": "你好啊"}, {"output": "你好，我是你的AI助手。"})
memory.save_context(
    {"input": "你会干什么"}, {"output": "我什么都会"})

# {'history': 'AI: 你好，我是你的AI助手。\nHuman: 你会干什么\nAI: 我什么都会'}
print(memory.load_memory_variables({}))
