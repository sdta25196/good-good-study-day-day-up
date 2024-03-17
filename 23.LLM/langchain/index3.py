from langchain_core.messages import AIMessage, HumanMessage  # 多轮对话模板使用
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,  # 多轮对话模板使用
)
from langchain_openai import ChatOpenAI
# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# ! langchain prompt模板-基础版
# from langchain.prompts import PromptTemplate
# template = PromptTemplate.from_template("给我讲个关于{subject}的笑话")
# # 从文件中加载模板，文件要求是gbk格式的
# template = PromptTemplate.from_file("example_prompt_template.txt")
# print("===Template===")
# print(template)
# print("===Prompt===")
# print(template.format(subject='小明'))

# ! langchain prompt模板
template = ChatPromptTemplate.from_messages(
    [
        SystemMessagePromptTemplate.from_template(
            "你是{product}的客服助手。你的名字叫{name}"),
        HumanMessagePromptTemplate.from_template("{query}"),
    ]
)

llm = ChatOpenAI()
prompt = template.format_messages(
    product="AGI课堂",
    name="瓜瓜",
    query="你是谁"
)

ret = llm.invoke(prompt)

print(ret.content)

# !  langchain prompt模板 多伦对话改造
human_prompt = "Translate your answer to {language}."
human_message_template = HumanMessagePromptTemplate.from_template(human_prompt)

chat_prompt = ChatPromptTemplate.from_messages(
    # variable_name 是 message placeholder 在模板中的变量名
    # 用于在赋值时使用
    # conversation 用作了提示词模板的占位符，后续使用时，传入的值可以替代掉这个占位符
    # 所以就可以实现上下文了
    [MessagesPlaceholder(variable_name="conversation"), human_message_template]
)

human_message = HumanMessage(content="Who is Elon Musk?")
ai_message = AIMessage(
    content="Elon Musk is a billionaire entrepreneur, inventor, and industrial designer"
)

messages = chat_prompt.format_prompt(
    # 对 "conversation" 和 "language" 赋值
    # conversation中的human和ai就变成了上文
    conversation=[human_message, ai_message], language="日文"
)

# [
# HumanMessage(content='Who is Elon Musk?'),
# AIMessage(content='Elon Musk is a billionaire entrepreneur, inventor, and industrial designer'),
# HumanMessage(content='Translate your answer to 日文.')
# ]
print(messages.to_messages())
