import json
import logging

from dotenv import load_dotenv
from openai import OpenAI

from tools.utils import *
from tools.amap import get_distance_time

load_dotenv()

# ========== 基础初始化工作 ==========
# 日志级别设置
logging.basicConfig(level=logging.DEBUG)  # 如需要更细致的观察run状态时可以将 `level` 的值改为 `logging.DEBUG`

# 初始化OpenAI
client = OpenAI()

# 本地工具函数与OpenAI的函数映射。这里定义好，方便后面动态调用
available_functions = {
    'get_current_time': get_current_time,
    'get_distance_and_duration': get_distance_time,
}

# 获取已经在Playground中创建好的Assistants
assistant = client.beta.assistants.retrieve('asst_WpkRahBbDpgUTDAIqsH0TSH4')


# ========== Streamlit 初始化 ==========
# 设置页面标题和图标
st.set_page_config(
    page_title="滴滴打车车费预估",
    page_icon="🚕",
)

'# 滴滴打车车费预估 🚕💰🚕'
st.caption('🚀 使用OpenAI Assistants API 结合 RAG、Code interpreter、Function call 三大能力，实现了一个滴滴打车车费预估的Demo')

# ========== Streamlit 对话框架初始化 ==========
# 初始化messages列表到Streamlit的session_state中
if "messages" not in st.session_state:
    st.session_state["messages"] = [{"role": "assistant", "content": "我是你的打车助手，请问你要从哪里出发？"}]

# 初始化thread到Streamlit的session_state中
if "thread" not in st.session_state:
    thread = client.beta.threads.create()
    logging.info(f'创建了新的thread: {thread.id}')
    st.session_state["thread"] = thread

# 侧边栏展示 thread ID，方便调试
with st.sidebar:
    st.write('Thread ID:', st.session_state.thread.id)

# 将st中的messages列表中的消息显示出来
for msg in st.session_state.messages:
    st.chat_message(msg["role"], avatar=ICON_AI if msg["role"] == 'assistant' else ICON_USER).write(msg["content"])


################################################################################################
##### 如果有bug，st.chat_input() 无法用户输入内容的话，就改用下面的代码
# def print_text():
#     print(st.session_state.user_input)
#     if st.session_state.user_input is not None:
#         prompt = st.session_state.user_input
#
# prompt = st.chat_input(random_placeholder_text(), on_submit=print_text, key="user_input")
# logging.info(f'用户输入：{prompt}')
#
# # if prompt:
# # if prompt := st.chat_input(random_placeholder_text()):

if prompt := st.chat_input():
    # 将用户的输入存储到st的messages列表中，并显示出来
    append_and_show("user", prompt)

    # 创建 message
    message = client.beta.threads.messages.create(
        thread_id=st.session_state.thread.id,
        role="user",
        content=prompt
    )

    # 创建 run
    run = client.beta.threads.runs.create(
        thread_id=st.session_state.thread.id,
        assistant_id=assistant.id
    )

    while True:
        try:
            # 轮询等待，并更新run状态（如果 还在排队 或者 运行中）
            if run.status == 'queued' or run.status == 'in_progress':
                logging.info(f'等待run完成，当前状态：{run.status}')
                time.sleep(1)
                run = client.beta.threads.runs.retrieve(thread_id=st.session_state.thread.id, run_id=run.id)
                logging.debug(run)

            # 执行本地方法并返回给OpenAI（如果需要 Function Call）
            elif run.status == 'requires_action':
                logging.debug(run)
                logging.info('run需要action')
                # append_and_show("assistant", "请稍等，我需要一些时间来计算车费\n\n需要调用本地能力辅助完成")

                # 依次取回要执行的函数和参数，动态执行本地方法
                tool_outputs = []
                for tool_call in run.required_action.submit_tool_outputs.tool_calls:
                    # 从函数映射字典中找到对应的本地函数
                    func = available_functions[tool_call.function.name]

                    # 提取出要执行函数的参数
                    args = json.loads(tool_call.function.arguments)

                    logging.info(f'调用本地方法：{func.__name__}，参数：{args}')
                    append_and_show("assistant",
                                    f"正在调用本地能力 `{func.__doc__.rpartition('。')[0]}` 来辅助完成任务...")
                    output = func(**args)  # 动态执行本地方法
                    logging.info(f'调用本地方法：{func.__name__}，结果：{output}')
                    append_and_show("assistant", f"`{func.__doc__.rpartition('。')[0]}` 完成，结果为：{output}")

                    # 将结果添加到tool_outputs中
                    tool_outputs.append({
                        'tool_call_id': tool_call.id,
                        'output': output,
                    })

                # 将所有执行结果一并提交
                run = client.beta.threads.runs.submit_tool_outputs(
                    thread_id=st.session_state.thread.id,
                    run_id=run.id,
                    tool_outputs=tool_outputs,
                )

                # append_and_show("assistant", "本地执行完成，我将继续，请稍等")

            # 显示最新消息（如果完成）
            elif run.status == 'completed':
                logging.info('run完成')
                # 获取完整messages列表
                messages = client.beta.threads.messages.list(thread_id=st.session_state.thread.id)
                # 获取最新一条消息对象
                first_message = client.beta.threads.messages.retrieve(thread_id=st.session_state.thread.id,
                                                                      message_id=messages.first_id)
                # 获取消息对象中的文本内容
                msg = first_message.content[0].text.value
                # 将assistant的回复（即最新一条消息）添加到st的messages列表中
                append_and_show("assistant", msg)
                break

        except Exception as e:
            logging.error(e)
            append_and_show("assistant", '我好像出错了，请重试')
            run = client.beta.threads.runs.cancel(
                thread_id=st.session_state.thread.id,
                run_id=run.id
            )
            logging.debug(run)
            break
