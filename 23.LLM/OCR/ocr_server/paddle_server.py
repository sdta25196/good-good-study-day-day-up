from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from paddleocr import PaddleOCR
import uvicorn

# ! 百度paddle的OCR服务

app = FastAPI()
ppocr = PaddleOCR()  # need to run only once to download and load model into memory

# 在根目录下定义一个路由


@app.get("/", response_class=HTMLResponse)
async def read_root():
    # 读取 index.html 文件内容
    with open("static/index.html", "r", encoding="utf-8") as file:
        html_content = file.read()
    # 返回 HTML 内容
    return html_content


@app.get("/ocr")
def ocr():
    img_path = '3.jpg'
    result = ppocr.ocr(img_path, cls=True)
    # for line in result:
    #     print(line)
    return {"data": result}


if __name__ == '__main__':
    # 运行fastapi程序
    uvicorn.run(app="paddle_server:app",
                host="0.0.0.0", port=8000, reload=True)
