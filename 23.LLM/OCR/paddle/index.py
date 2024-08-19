from paddleocr import PaddleOCR

ocr = PaddleOCR()  # need to run only once to download and load model into memory
img_path = '123.png'
result = ocr.ocr(img_path, cls=True)
for line in result:
    print(line)
