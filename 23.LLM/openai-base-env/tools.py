import json
def str_to_json(s):
    try:
        # 将字符串转换为JSON对象
        json_obj = json.loads(s)
        return json_obj
    except json.JSONDecodeError as e:
        # 如果转换失败，返回错误信息
        return f"Error: {e}"
    
def print_json(data):
    """
    打印参数。如果参数是有结构的（如字典或列表），则以格式化的 JSON 形式打印；
    否则，直接打印该值。
    """
    if hasattr(data, 'model_dump_json'):
        data = json.loads(data.model_dump_json())

    if (isinstance(data, (list))):
        for item in data:
            print_json(item)
    elif (isinstance(data, (dict))):
        print(json.dumps(
            data,
            indent=4,
            ensure_ascii=False
        ))
    else:
        print(data)