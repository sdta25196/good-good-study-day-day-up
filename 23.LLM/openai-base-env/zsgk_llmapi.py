from openai import OpenAI
import json
import tools

# 计算器

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())


def zsgkFunctionCalling(question):

    # 配置 OpenAI 服务

    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0.7,
        tool_choice="auto",
        messages=[
            {
                "role": "user",
                "content": question,
                # "content": "山东省985师范类公办院校有哪些",
                # "content": "山东物化生500能上什么大学",
                # "content": "山东大学在北京的录取分",
                # "content": "山东大学在北京的招生计划",
                # "content": "计算机专业都学什么",
            },
        ],
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "school_info",
                    "description": "提供【大学】、【院校】的基本信息，【大学】和【院校】只能是国内合法的大学名称",
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
            {
                "type": "function",
                "function": {
                    "name": "tzy",
                    "description": "提供志愿填报相关的信息，需要用到省份（province）、选科（xuanke）、分数（fenshu）信息",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "province": {
                                "type": "string",
                                "description": "填报志愿信息中的省份，返回省份代码：山东【37】、北京【11】、湖南【43】、天津【12】、广东省【44】、河北【13】、广西【45】、山西【14】、海南省【46】、内蒙古【15】"
                            },
                            "xuanke": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "多选，填报志愿信息中的选科，返回【】中的全名，包含：物【物理】、化【化学】、生【生物】、政【政治】、地【地理】、史【历史】"
                            },
                            "fenshu": {
                                "type": "string",
                                "description": "填报志愿信息中的分数"
                            }
                        }
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "school_luqufen",
                    "description": "提供【大学】、【院校】在某【省份】的录取分数，【大学】和【院校】只能是国内合法的大学名称",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "school_name": {
                                "type": "string",
                                "description": "用户问题中的大学名称"
                            },
                            "province": {
                                "type": "string",
                                "description": "省份，返回省份代码：山东【37】、北京【11】、湖南【43】、天津【12】、广东省【44】、河北【13】、广西【45】、山西【14】、海南省【46】、内蒙古【15】"
                            },
                        }
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "school_list",
                    "description": "提供某【类型】的大学、院校的名单",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "leixing": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "类型，可多选：位置【province】、院校类型【leixing】、办学层次【cengci】、办学类型【banxue】、院校特色【tese】"
                            },
                        }
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "school_zhaosheng",
                    "description": "提供【大学】、【院校】在某【省份】的招生计划，【大学】和【院校】只能是国内合法的大学名称",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "school_name": {
                                "type": "string",
                                "description": "用户问题中的大学名称"
                            },
                            "province": {
                                "type": "string",
                                "description": "省份，返回省份代码：山东【37】、北京【11】、湖南【43】、天津【12】、广东省【44】、河北【13】、广西【45】、山西【14】、海南省【46】、内蒙古【15】"
                            },
                        }
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "school_pecial",
                    "description": "提供【大学】、【院校】开设的专业，【大学】和【院校】只能是国内合法的大学名称",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "school_name": {
                                "type": "string",
                                "description": "用户问题中的大学名称"
                            },
                        }
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "special_info",
                    "description": "提供大学所学专业的介绍",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "special_name": {
                                "type": "string",
                                "description": "用户问题中的专业名称"
                            },
                        }
                    }
                }
            },
        ]
    )

    # 打印 message
    print(response.choices[0].message)

    # 测试function calling

    def school_info(param):
        return '查院校信息意图：' + json.dumps(param, ensure_ascii=False)

    def tzy(param):
        return '高考志愿填报：' + json.dumps(param, ensure_ascii=False)

    def school_luqufen(param):
        return '查学校录取分意图：' + json.dumps(param, ensure_ascii=False)

    def school_list(param):
        return '查学校名单意图：' + json.dumps(param, ensure_ascii=False)

    def school_zhaosheng(param):
        return '查学校招生计划意图：' + json.dumps(param, ensure_ascii=False)

    def school_pecial(param):
        return '查学校开设专业意图：' + json.dumps(param, ensure_ascii=False)

    def special_info(param):
        return '查专业简介意图：' + json.dumps(param, ensure_ascii=False)

    # 可支持多函数调用，但是目前对于有关联性的函数调用效果不好

    if (response.choices[0].message.tool_calls is not None):
        tool_call =response.choices[0].message.tool_calls[0]
        # for tool_call in response.choices[0].message.tool_calls:
        args = tools.str_to_json(tool_call.function.arguments)
        if (tool_call.function.name == "school_info"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school_info(args)
        if (tool_call.function.name == "tzy"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = tzy(args)
        if (tool_call.function.name == "school_luqufen"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school_luqufen(args)
        if (tool_call.function.name == "school_list"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school_list(args)
        if (tool_call.function.name == "school_zhaosheng"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school_zhaosheng(args)
        if (tool_call.function.name == "school_pecial"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = school_pecial(args)
        if (tool_call.function.name == "special_info"):
            args = tools.str_to_json(tool_call.function.arguments)
            result = special_info(args)
        print(result)
        return result
    else:
        print(response.choices[0].message.content)
        return response.choices[0].message.content


# res = zsgkFunctionCalling("山东大学在哪?")

# print(res)
