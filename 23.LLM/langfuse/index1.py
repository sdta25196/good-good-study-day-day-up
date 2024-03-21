import json
from langfuse import Langfuse
from tqdm import tqdm
from loadenv import loadenv

loadenv()

# ! 创建并上传数据集

# 调整数据格式 {"input":{...},"expected_output":"label"}
data = []
with open('my_annotations.jsonl', 'r', encoding='utf-8') as fp:
    for line in fp:
        example = json.loads(line.strip())
        item = {
            "input": {
                "outlines": example["outlines"],
                "user_input": example["user_input"]
            },
            "expected_output": example["label"]
        }
        data.append(item)

# init
langfuse = Langfuse()

# 创建数据集，如果已存在不会重复创建
langfuse.create_dataset(name="assistant-data")

# 考虑演示运行速度，只上传前50条数据
for item in tqdm(data[:50]):
    langfuse.create_dataset_item(
        dataset_name="assistant-data",
        input=item["input"],
        expected_output=item["expected_output"]
    )
