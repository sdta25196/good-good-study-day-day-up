from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import uvicorn
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
from ocr_tools import crop_image, order_point
import cv2

# ! 魔塔社区的COR服务

app = FastAPI()

ocr_detection = pipeline(
    Tasks.ocr_detection, model='damo/cv_resnet18_ocr-detection-db-line-level_damo')
ocr_recognition = pipeline(
    Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-general_damo')

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
    image_full = cv2.imread(img_path)
    det_result = ocr_detection(image_full)
    det_result = det_result['polygons']
    res = []
    for i in range(det_result.shape[0]):
        pts = order_point(det_result[i])
        image_crop = crop_image(image_full, pts)
        result = ocr_recognition(image_crop)
        res.append(
            {'box': [str(e) for e in list(pts.reshape(-1))], 'text': result['text']})
        # print("box: %s" % ','.join([str(e) for e in list(pts.reshape(-1))]))
        # print("text: %s" % result['text'])
    return {"data": res}


# @app.get("/getAnswer")
# def read_root(value=Query(1)):
#     # 获取当前时间并格式化为字符串
#     current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
#     # 输出当前时间
#     print(current_time, '---', value)
#     res = 'getVector(value)'
#     return {"data": res}


if __name__ == '__main__':
    # 运行fastapi程序
    uvicorn.run(app="ms_server:app", host="0.0.0.0", port=8000, reload=True)
