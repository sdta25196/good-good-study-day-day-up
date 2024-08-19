from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
import cv2

# ! 文本识别

# 通用场景
ocr_recognition = pipeline(
    Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-general_damo')
# 自然场景
# ocr_recognition = pipeline(Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-scene_damo')
# 印刷文档场景
# ocr_recognition = pipeline(Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-document_damo')
# 手写场景
# ocr_recognition = pipeline(Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-handwritten_damo')

# read file
img_path = '1.jpg'
img = cv2.imread(img_path)
result = ocr_recognition(img)
print(result)

# or read url
# img_url = 'http://duguang-labelling.oss-cn-shanghai.aliyuncs.com/mass_img_tmp_20220922/ocr_recognition.jpg'
# result_url = ocr_recognition(img_url)
# print(result_url)
