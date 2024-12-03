from PIL import Image
import streamlit as st

st.set_page_config(
    page_title="Assistants Demo",
    page_icon="🧬",
)

var1 = 123
var1


"""
# 滴滴打车车费预估助手 首页 🍎🤖🍏
> 请在左侧点击“滴滴打车车费预估”

**通过 OpenAI 开发者后台的配置，以及 OpenAI 公司的 Assistant API 进行开发**

有什么功能
帮你计算出发地到目的地的里程、时长、预估费用


"""

image = Image.open('static/didi.png')
st.image('static/didi.png')
