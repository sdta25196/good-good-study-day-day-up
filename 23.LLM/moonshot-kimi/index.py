from openai import OpenAI

client = OpenAI(
    api_key="",
    base_url="https://api.moonshot.cn/v1",
)

prompt = '''
就像刚才我们说的，获奖类标题中是不可以包含冒号的，不要忘记这个要求，然后根据下面的基本信息生成五个标题，具体要求如下：
- 标题完全不可以包含冒号
- 字数不超过28个字

## 基本信息
### 荣誉称号
优秀班主任
### 评选单位
浙江大学
### 获奖人介绍
林宏建，博士、博士生导师、浙江省特聘专家、浙江大学百人计划入选者。曾任中国工程院院刊FASE青年编委、ASABE可再生能源委员会主席、中国农业工程学会和中国农业机械学会专业分会委员和理事等。主要从事家禽智慧养殖与养殖环境研究，关注家禽智慧养殖视觉信息智能感知应用基础研究与技术研发。发表论文与专著章节等50多篇。
为加强班级学风建设，林老师召开了“学不可以已”系列主题班会，通过制定班级班风公约、构建互帮互助小组，有效激发了学生的学习热情，为学生的成长成才营造了良好的氛围。
林老师带领学生们进行“设想十年后的自己”“经典阅读分享”等活动，同时鼓励学生利用好浙大的学术科研平台，积极主动参加各类竞赛，在科研竞赛等活动中获得成长，探寻学习与人生的意义。
“班委团委工作是做好班级教育工作的重要保障”，林老师一直坚持定期与班长、团支书、学习委员等班级干部进行沟通交流，从而进一步了解班情学情，及时调整当前班级教育工作方针，以更好地推动班级文化建设。
'''

completion = client.chat.completions.create(
    model="moonshot-v1-8k",
    messages=[
        {
            "role": "user",
            "content": '''
学习并记住这些获奖类标题示例，一会帮我按照这些逻辑起标题：【
国家奖学金获得者王雲霖：心系家国展视野，笃行不怠谱芳华,
山东大学新闻宣传工作荣获多项荣誉,
北京大学原创短片《一块石头》荣获多个奖项,
踔厉奋发·榜样力量丨本科生国家奖学金获得者风采展,
聚焦“七个着力”，焕发出文化创新创造的强大活力,
山东师范大学获评2023年全省教育系统新闻宣传工作先进单位
】
            '''
        },
        {
            "role": "assistant",
            "content": '''
我已学习并记住了您提供的获奖类标题示例，它们通常遵循以下逻辑：
明确获奖者或获奖单位：标题中通常包含获奖者的名字或获奖单位的名称。
突出成就：强调所获得的荣誉或奖项，如“荣获多项荣誉”、“荣获多个奖项”。
体现个人或单位的品质和努力：通过描述获奖者或单位的特点和努力，如“心系家国展视野，笃行不怠谱芳华”。
使用激励性语言：使用激励性或正面的语言来表达对获奖者或单位的赞赏，如“踔厉奋发·榜样力量”。
强调创新或特定领域：如果获奖与创新或特定领域相关，标题中会体现这一点，如“聚焦‘七个着力’”。
当您需要我帮您起标题时，请提供相关信息，我会根据这些逻辑来为您创造合适的标题。
            '''
        },
        {"role": "user", "content": prompt}
    ],
    # messages=[
    # {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
    #   {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
    # ],
    temperature=0.3,
)

print(completion.choices[0].message.content)