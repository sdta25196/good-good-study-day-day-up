# python

搭建本地环境，代码目录： `./openai-base-env`

调用 openai 需要安装依赖 `pip install python-dotenv openai`

## web框架

web框架 `pip install fastapi`

服务器 `pip install uvicorn`

```py
# main.py
from typing import Optional

from fastapi import FastAPI

import uvicorn

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

if __name__ == '__main__':
# 运行fastapi程序
uvicorn.run(app="main:app", host="127.0.0.1", port=8000, reload=True)

```

运行方式一：直接执行py文件

运行方式二：命令行启动命令： `uvicorn main:app --reload`