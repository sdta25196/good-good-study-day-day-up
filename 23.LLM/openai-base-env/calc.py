from openai import OpenAI
import tools

# 计算器

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 配置 OpenAI 服务

client = OpenAI()


# 使用tools参数之后，提示词这种形式就不需要了。

prompt = '''

判断用户的意图，然后根据用户的意图和下方的functions中description的解释。
返回给我json，json要求包含函数名(name)、参数(parameters)，key用英文，value默认为字符串，参数字段使用数组。
如果不需要调用函数，函数名(name)的value就是none。

functions:
    description:"当用户需要计算加法时，调用这个函数，并且提供需要计算的数字"
    name: sum
    parameters:[a,b,...]
functions:
    description:"当用户需要计算乘法时，调用这个函数，并且提供需要计算的数字"
    name: multiply
    parameters:[a,b,...]

问题如下：\n
'''

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": "1+1 的结果乘2",
        },
    ],
    tools=[
        {  # 用 JSON 描述函数。可以定义多个。由大模型决定调用谁。也可能都不调用
           "type": "function",
           "function": {
               "name": "sum",
               "description": "加法器，计算一组数的和",
               "parameters": {
                   "type": "object",
                   "properties": {
                       "numbers": {
                           "type": "array",
                           "items": {
                               "type": "number"
                           }
                       }
                   }
               }
           }
        },
        {  # 乘法函数
           "type": "function",
           "function": {
               "name": "multiply",
               "description": "乘法器，计算一组数的积",
               "parameters": {
                   "type": "object",
                   "properties": {
                       "numbers": {
                           "type": "array",
                           "items": {
                               "type": "number"
                           }
                       }
                   }
               }
           }
        }
    ]
)

# 打印 message
print(response.choices[0].message)

# 测试function calling


def sum(param):
    total = 0
    for num in param:
        total += int(num)
    return total


def multiply(param):
    product = 1
    for num in param:
        product *= int(num)
    return product

# 可支持多函数调用，但是目前对于有关联性的函数调用效果不好

if (response.choices[0].message.tool_calls is not None):
    for tool_call in response.choices[0].message.tool_calls:
        args = tools.str_to_json(tool_call.function.arguments)
        print("函数参数展开：")
        tools.print_json(args)

        if (tool_call.function.name == "sum"):
            # 调用 sum
            args = tools.str_to_json(tool_call.function.arguments)
            result = sum(args["numbers"])
            print("=====加法函数返回=====")
            print(result)
        if (tool_call.function.name == "multiply"):
            # 调用 sum
            args = tools.str_to_json(tool_call.function.arguments)
            result = multiply(args["numbers"])
            print("=====乘法函数返回=====")
            print(result)
else:
    print(response.choices[0].message.content)
