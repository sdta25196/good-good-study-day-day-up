from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
import numpy as np
import cv2
import math
import base64

# ! 整张图片OCR


def crop_image(img, position):
    def distance(x1, y1, x2, y2):
        return math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
    position = position.tolist()
    for i in range(4):
        for j in range(i+1, 4):
            if(position[i][0] > position[j][0]):
                tmp = position[j]
                position[j] = position[i]
                position[i] = tmp
    if position[0][1] > position[1][1]:
        tmp = position[0]
        position[0] = position[1]
        position[1] = tmp

    if position[2][1] > position[3][1]:
        tmp = position[2]
        position[2] = position[3]
        position[3] = tmp

    x1, y1 = position[0][0], position[0][1]
    x2, y2 = position[2][0], position[2][1]
    x3, y3 = position[3][0], position[3][1]
    x4, y4 = position[1][0], position[1][1]

    corners = np.zeros((4, 2), np.float32)
    corners[0] = [x1, y1]
    corners[1] = [x2, y2]
    corners[2] = [x4, y4]
    corners[3] = [x3, y3]

    img_width = distance((x1+x4)/2, (y1+y4)/2, (x2+x3)/2, (y2+y3)/2)
    img_height = distance((x1+x2)/2, (y1+y2)/2, (x4+x3)/2, (y4+y3)/2)

    corners_trans = np.zeros((4, 2), np.float32)
    corners_trans[0] = [0, 0]
    corners_trans[1] = [img_width - 1, 0]
    corners_trans[2] = [0, img_height - 1]
    corners_trans[3] = [img_width - 1, img_height - 1]

    transform = cv2.getPerspectiveTransform(corners, corners_trans)
    dst = cv2.warpPerspective(
        img, transform, (int(img_width), int(img_height)))
    return dst


def order_point(coor):
    arr = np.array(coor).reshape([4, 2])
    sum_ = np.sum(arr, 0)
    centroid = sum_ / arr.shape[0]
    theta = np.arctan2(arr[:, 1] - centroid[1], arr[:, 0] - centroid[0])
    sort_points = arr[np.argsort(theta)]
    sort_points = sort_points.reshape([4, -1])
    if sort_points[0][0] > centroid[0]:
        sort_points = np.concatenate([sort_points[3:], sort_points[:3]])
    sort_points = sort_points.reshape([4, 2]).astype('float32')
    return sort_points


ocr_detection = pipeline(
    Tasks.ocr_detection, model='damo/cv_resnet18_ocr-detection-db-line-level_damo')
ocr_recognition = pipeline(
    Tasks.ocr_recognition, model='damo/cv_convnextTiny_ocr-recognition-general_damo')
# ! base64
# base64_img = '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'
# img = base64.b64decode(base64_img)
# # TODO 这里转文件还有问题
# with open("temp.jpg", 'wb') as f:
#     f.write(img)

# ! 本地文件
img_path = 'sz1.jpg'
image_full = cv2.imread(img_path)
det_result = ocr_detection(image_full)
det_result = det_result['polygons']
for i in range(det_result.shape[0]):
    pts = order_point(det_result[i])
    image_crop = crop_image(image_full, pts)
    result = ocr_recognition(image_crop)
    print("box: %s" % ','.join([str(e) for e in list(pts.reshape(-1))]))
    print("text: %s" % result['text'])
