from fastapi import FastAPI, Query
from fastapi.responses import HTMLResponse
from getVector import getVector
import uvicorn
from datetime import datetime

app = FastAPI()

# 在根目录下定义一个路由


@app.get("/", response_class=HTMLResponse)
async def read_root():
    # 读取 index.html 文件内容
    with open("static/index.html", "r", encoding="utf-8") as file:
        html_content = file.read()
    # 返回 HTML 内容
    return html_content


@app.get("/getAnswer")
def read_root(value=Query(1)):
    # 获取当前时间并格式化为字符串
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # 输出当前时间
    print(current_time,'---',value)
    res = getVector(value)
    return {"data": res}


if __name__ == '__main__':
    # 运行fastapi程序
    uvicorn.run(app="server:app", host="0.0.0.0", port=8000, reload=True)