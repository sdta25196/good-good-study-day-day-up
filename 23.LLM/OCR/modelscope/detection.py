from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
import cv2

# ! 文本检测

ocr_detection = pipeline(
    Tasks.ocr_detection, model='damo/cv_resnet18_ocr-detection-db-line-level_damo')
# result = ocr_detection(
#     'https://modelscope.oss-cn-beijing.aliyuncs.com/test/images/ocr_detection.jpg')
# print(result)


# read file
img = cv2.imread('1.jpg')
result = ocr_detection(img)
print(result)
