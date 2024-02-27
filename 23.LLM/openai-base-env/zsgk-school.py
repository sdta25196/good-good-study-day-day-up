from openai import OpenAI
import json
import tools

# 计算器

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 配置 OpenAI 服务

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": "山东大学招生老师的手机",
        },
    ],
    tools=[
        {
            "type": "function",
            "function": {
                "name": "school",
                "description": "提供【大学】、【院校】的基本信息",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "school_name": {
                            "type": "string",
                            "description": "用户问题中的大学名称"
                        },
                        "info": {
                            "type": "string",
                            "description": "用户想要询问的信息有以下几种，返回英文部分：电话【phone】、邮箱【emil】、位置【position】、招生网站【weburl】"
                        }
                    }
                }
            }
        },
    ]
)

# 打印 message
print(response.choices[0].message)

# 测试function calling

def school(param):
    return '查院校意图：' + json.dumps(param, ensure_ascii=False)


def special(param):
    return '查专业意图：' + json.dumps(param, ensure_ascii=False)

# 可支持多函数调用，但是目前对于有关联性的函数调用效果不好


if (response.choices[0].message.tool_calls is not None):
    for tool_call in response.choices[0].message.tool_calls:
        args = tools.str_to_json(tool_call.function.arguments)
        if (tool_call.function.name == "school"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school(args)
            print(result)
        if (tool_call.function.name == "special"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = special(args)
            print(result)
else:
    print(response.choices[0].message.content)
