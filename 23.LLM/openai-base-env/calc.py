from openai import OpenAI
import tools

# 计算器

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 配置 OpenAI 服务

client = OpenAI()

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
    messages=[
        {
            "role": "user",
            "content": prompt + "1+2+3+4+5+6+7+8+9,然后再加个10",
        }
    ],
    model="gpt-3.5-turbo",
)

# print(response)

# 更具体的的打印
print(response.choices[0].message.content)

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


obj = {"sum": sum, "multiply": multiply}

res = tools.str_to_json(response.choices[0].message.content)
print(obj[res['name']](res['parameters']))
