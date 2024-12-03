import time

import streamlit as st


def get_current_time(*args, **kwargs):
    """获取当前时间。"""
    return f'现在时间是{time.strftime("%H:%M:%S", time.localtime())}'


def random_placeholder_text():
    text_list = [
        'Your message',
        'Say something',
        '你从何处来 又往何处去',
        '请先搞清楚你自己的定位',
        '月下旅途，终将抵达心之彼岸',
        '心之所向即是归处',
    ]
    return text_list[int(time.time()) % len(text_list)]


# 头像配置
ICON_AI = 'static/didi.png'
ICON_USER = 'user'


def append_and_show(role, content):
    """
    将消息添加到st的messages列表中，并显示出来
    :param role: 角色，暂时就两个：assistant和user
    :param content: 消息内容
    :return:
    """

    st.session_state.messages.append({"role": role, "content": content})
    st.chat_message(role, avatar=ICON_AI if role == 'assistant' else ICON_USER).write(content)



if __name__ == '__main__':
    # print(get_current_time())
    print(random_placeholder_text())