import json
def str_to_json(s):
    try:
        # 将字符串转换为JSON对象
        json_obj = json.loads(s)
        return json_obj
    except json.JSONDecodeError as e:
        # 如果转换失败，返回错误信息
        return f"Error: {e}"
# 使用示例
# my_str = '{"name": "张三", "age": 30, "city": "北京"}'
# result = str_to_json(my_str)
# print(result) 