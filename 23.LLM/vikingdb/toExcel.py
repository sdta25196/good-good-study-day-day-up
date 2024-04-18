import pandas as pd
import json

# ! 读取 data1 文件，写成excel
with open('data1', 'r', encoding='utf-8') as data1_file:
    # 读取所有行
    lines = data1_file.readlines()

# 解析每行数据为字典，并存储在列表中
data_list = []
for line in lines:
    # 去除两端的空白字符，包括换行符
    line = line.strip()
    # 尝试解析 JSON 字符串
    try:
        # 将 JSON 字符串转换为字典
        data_dict = json.loads(line)
        # 假设 answer 是一个数组
        answer_array = data_dict['answer']
        # 如果数组长度是3，分别添加到字典中
        if len(answer_array) == 3:
            data_dict['answer1'] = answer_array[0]
            data_dict['answer2'] = answer_array[1]
            data_dict['answer3'] = answer_array[2]
        # 如果不是3，可以根据实际情况处理
        else:
            # 例如，可以设置为 None 或者其他默认值
            data_dict['answer1'] = answer_array[0] if len(
                answer_array) > 0 else None
            data_dict['answer2'] = answer_array[1] if len(
                answer_array) > 1 else None
            data_dict['answer3'] = answer_array[2] if len(
                answer_array) > 2 else None
        # 移除原始的 answer 字段
        del data_dict['answer']
        # 将字典添加到列表中
        data_list.append(data_dict)
    except json.JSONDecodeError as e:
        # 如果解析出错，打印错误信息
        print(f"Error parsing line: {line}. Error: {e}")

# 将列表转换为 pandas DataFrame
df = pd.DataFrame(data_list)

# 将 DataFrame 导出为 Excel 文件
df.to_excel('output.xlsx', index=False)

print("数据已成功写入 Excel 文件 output.xlsx。")
