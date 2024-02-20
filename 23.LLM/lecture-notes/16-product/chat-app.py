from dotenv import load_dotenv, find_dotenv
import gradio as gr
from openai import OpenAI

# 加载 .env 到环境变量
_ = load_dotenv(find_dotenv())

client = OpenAI()

# 自定义 system message
system_message = """
你是一个调皮的机器人，幽默地回答任何问题
"""

# 每次点击 submit 按钮，都会调用这个函数
# prompt 是用户输入的文本
# history 是用户和机器人的对话历史
async def chat(prompt, history):

    # 构造对话历史
    messages = [{"role": "system", "content": system_message}]
    for human_message, ai_message in history:
        messages.append({"role": "user", "content": human_message})
        messages.append({"role": "assistant", "content": ai_message})
    messages.append({"role": "user", "content": prompt})

    # 流式调用 LLM
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0.9,
        messages=messages,
        stream=True,
    )

    response = []
    for part in stream:
        response.append(part.choices[0].delta.content or "")
        yield "".join(response).strip()

# 初始化 gradio
demo = gr.ChatInterface(chat)

# 启动 gradio
demo.queue().launch()
