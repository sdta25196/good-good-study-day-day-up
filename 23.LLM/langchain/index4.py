from langchain.prompts import PromptTemplate
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from langchain_core.pydantic_v1 import BaseModel, Field, validator

# 加载 .env 到环境变量
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# ! 输出封装器OutputParser

# 定义你的输出对象


class Date(BaseModel):
    year: int = Field(description="Year")
    month: int = Field(description="Month")
    day: int = Field(description="Day")
    era: str = Field(description="BC or AD")
    haha: int = Field(description="固定值: 1")

    # ----- 可选机制 --------
    # 你可以添加自定义的校验机制
    @validator('month')
    def valid_month(cls, field):
        if field <= 0 or field > 12:
            raise ValueError("月份必须在1-12之间")
        return field

    @validator('day')
    def valid_day(cls, field):
        if field <= 0 or field > 31:
            raise ValueError("日期必须在1-31日之间")
        return field

    @validator('day', pre=True, always=True)
    def valid_date(cls, day, values):
        year = values.get('year')
        month = values.get('month')

        # 确保年份和月份都已经提供
        if year is None or month is None:
            return day  # 无法验证日期，因为没有年份和月份

        # 检查日期是否有效
        if month == 2:
            if cls.is_leap_year(year) and day > 29:
                raise ValueError("闰年2月最多有29天")
            elif not cls.is_leap_year(year) and day > 28:
                raise ValueError("非闰年2月最多有28天")
        elif month in [4, 6, 9, 11] and day > 30:
            raise ValueError(f"{month}月最多有30天")

        return day

    @staticmethod
    def is_leap_year(year):
        if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
            return True
        return False


temperature = 0
model = ChatOpenAI(model='gpt-4', temperature=temperature)

# 根据Pydantic对象的定义，构造一个OutputParser
parser = PydanticOutputParser(pydantic_object=Date)

# ! new_parser 可以处理解析数据出错的问题
new_parser = OutputFixingParser.from_llm(
    parser=parser, llm=ChatOpenAI(model="gpt-4"))

template = """提取用户输入中的日期。
{format_instructions}
用户输入:
{query}"""

prompt = PromptTemplate(
    template=template,
    input_variables=["query"],
    # 直接从OutputParser中获取输出描述，并对模板的变量预先赋值
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

print("====Format Instruction=====")
print(parser.get_format_instructions())


query = "2023年四月6日天气晴..."
model_input = prompt.format_prompt(query=query)

print("====Prompt=====")
print(model_input.to_string())
print(model_input.to_messages())

output = model.invoke(model_input.to_messages())
print("====模型原始输出=====")
print(output.content)
print("====Parse后的输出=====")
date = parser.parse(output.content)
print(date)


#! 把之前output的格式改错
output = output.content.replace("4", "四月")
print("===格式错误的Output===")
print(output)
# ! parser解析不正确的格式出现异常
try:
    date = parser.parse(output)
except Exception as e:
    print("===出现异常===")
    print(e)

# ! 用OutputFixingParser自动修复并解析
date = new_parser.parse(output)
print("===重新解析结果===")
print(date.json())
