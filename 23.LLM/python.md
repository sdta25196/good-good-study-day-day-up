# python

搭建本地环境，代码目录： `./openai-base-env`

调用 openai 需要安装依赖 `pip install python-dotenv openai`

## web框架

web框架 `pip install fastapi`

服务器 `pip install uvicorn[standard]`

```py
from typing import Optional

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
```

启动命令 `uvicorn main:app --reload`