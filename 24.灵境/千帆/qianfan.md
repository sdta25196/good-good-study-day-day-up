# 千帆


## 基于API应用开发模式

1. 【AI端】调用API接口（几行代码/Python语言），可通过Prompt设计引入相关知识（无需修改模型的结构或参数）
2. 【前端】写web端/移动端界面、交互（html/css/js/gradio/streamlit）
3. 【后端】整体任务逻辑/队列、集成和调用AI端能力、返回AI端结果

所需能力：无需有AI算法能力，需有前后端开发和工程落地能力

总结：AI部分难度较小，无需AI专业知识，主要开发工作在前后端和工程化落地。


## 基于大模型的微调应用开发模式

### Fine-tuning

1. 【AI端】加载已经预训练好的大模型，准备和上传训练数据（与目标任务相关的数据，符合fine-tuning文件格式），训练新的Fine-tuning模型，也可以加入一些分类层等；模型封装和部署：高性能/高并发/高可用
  a. 【数据】数据获取，仿照给定数据示例构建新的数据集（字段：Prompt-Completion）
2. 【前端】写web端/移动端界面、交互逻辑（html/css/js/gradio/streamlit）
3. 【后端】整体任务逻辑/队列、集成和调用AI端能力、返回AI端结果

所需能力：深度学习算法原理、跨模态数据处理、模型训练、模型部署/弹性部署；前后端开发和工程落地

总结：
1. AI部分难度较大，需懂深度学习原理，会数据处理（跨模态数据融合），会训练模型；算力资源消耗大。
2. 难点主要在于数据工程（数据采集、清洗、对齐）和训练推理资源。
3. 随着模型规模增大，效果提升逐渐饱和。

### Prompt-tuning-被放弃的模式

1. 【AI端】设计预训练语言模型的任务、设计输入模板样式(Prompt Engineering)、设计label 样式及模型的输出映射到label的方式(Answer Engineering)，prompt-completion-label；
  a. 【数据】标签数据准备、Verbalizer准备、prompt模板设定
2. 【前端】写web端/移动端界面、交互逻辑
3. 【后端】整体任务逻辑/队列、集成和调用AI端能力、返回AI端结果

所需能力：Prompt engineering相关技巧、前后端开发和工程落地

总结：无需数据标注，难点在于Prompt模板设计（人工设计模板/自动学习模板），需要根据下游任务和预训练模型的特性来选择合适的模板，微调消耗的存储和运算资源相比传统finetune有所降低。


## 基于大模型API或大模型微调+插件开发模式

**这种方式更适合我们。**

将垂直行业的领域知识向量化并存入向量数据库——用户提问——用户问题向量化——查询向量数据库，得到TopN条匹配知识——构建Prompt，调用 API——返回回答.

例如：向量知识库embedding

总结：AI部分难度较小，难点在于整体任务流程的工程化思考和落地。对任务流程拆解的工程化思考要求较高（节点/队列流程设计、弹性部署等）

## 相关链接 

[基于大模型的应用开发方式介绍](https://cloud.baidu.com/qianfandev/topic/267755)

[如何准备用于微调的数据集](https://cloud.baidu.com/qianfandev/topic/267759)

[基于文心大模型开发的应用在应用商店/微信小程序上架指南](https://cloud.baidu.com/qianfandev/topic/267218)



## 名词解释 

SFT：这是Selective Fine-tuning的缩写，被翻译为选择性精调。这是一种模型训练策略，在预训练模型的基础上，选择性地对部分参数进行精细调整，以适应特定的任务。这样可以在保留模型在大规模数据上训练得到的通用知识的同时，提升模型在特定任务上的性能。

Post-pretrain：也被称为后期预训练或者模型微调，通常是指在一个预训练模型（已在大量数据上进行过训练）的基础上，进行进一步的训练或优化，以适应特定任务或特定数据。

RLHF：这可能是指Reinforcement Learning with Human Feedback的缩写，即通过人类反馈进行强化学习的过程。在这一过程中，人类反馈被用作奖励信号，以指导模型进行学习和优化。

## post pre-training 后期预训练

* 所需数据为：无监督数据，千万tokens起步。15本红楼梦
* 搞一次整体流程需要几个月的时间。包含数据准备、训练、调优等，需要反复多次
## 微调流程 

- 数据集导入，建议直接导入标注好的数据
- 点击数据集的更多选项，发布导入的数据集
- 点击数据集的训练选项，或者点击模型精调选择SFT
- 模型精调完成后，就可以发布一个我的模型了
- 在我的模型中，选择方才发布的模型 点击部署。

## SFT 

  * 数据导入
    * 导入数据集
  * 数据标注
    * 对导入数据集进行逐一标注、2000 + 精选问答对，就足够了
    * 标注完成后，需要发布，否则训练任务中无法找到数据集
  * 训练配置
    * 根据训练量花钱的，训练前面发布的数据集
  * 模型纳管
    * 前面训练完成的数据集，点击发布。就可以成为自己的模型了
  * 发布服务
    * 发线上服务可就花钱了
  * 体验测试


SFT是采用预先训练好的网络模型（包括 post pre-training 训练后的模型），针对我们的专门任务，在少量的监督数据上进行重新训练的技术。

需要选择 多轮对话、非排序文本类的高质量的有标注的问答（一问一答、多问多答、一问多答）数据集，建议使用jsonl格式。数据量需要千条以上。

数据集中标注模版：非排序为一问一答数据。含排序为一问多答数据

数据集要求标注的数据就是正确答案，要做到问题和回答类型多样化，场景多样，避免重复，尽可能覆盖全场景

数据集标注必须达到100%，才能进行发布。发布后才能被使用。

数据集中10%以上的数据长度超过4k, 就需要选择8k版本模型

训练模式：
  * 全量更新： 更新了基础模型的全部参数。需要数据量巨大。场景：样本数量较多，并且主要注重这些效果的推理能力，不考虑大模型通用能力。
  * LoRA: 更新了基础模型局部参数。场景：样本数量少于1000，并且需要保留大模型自身的通用能力。
  * prompt tuning: 被放弃的模式, 保持了模型全部参数不变，作为提示词训练，使用提示词来引导模型更好适应特定的任务。能力最弱，不建议用。

epoch，迭代轮次，选择适合的轮次，太高会过拟合，过拟合会导致通用能力下降。**数据越多，轮次越少（数据量不够就需要更多次的训练）。100条数据15轮，1000条数据10轮，10000条数据2轮**

批处理大小，越大就越越能加速训练。但是可能导致内存问题。**千帆平台已经做了限制，选最大值就行。**

学习率，它决定了每次更新时权重的调整程度，默认就行。通常问题越复杂学习率越小，数据集越大学习率越大。通常，较大的学习率可能导致模型在训练过程中波动较大，收敛困难；较小的学习率可能导致收敛速度慢。

### 全量更新
只要进行调整，都会对大模型有一定的影响的。您这个场景想让大模型按照您的风格生成文章，这个必须使用全量更新，
在全量更新效果好的情况下，需要微调可以进行增量训练，其他情况都需要全量训练。

### 评估指标

图像是看不出来的，图形只能看模型收敛，效果要看指标。如果数据量不是很少，但是指标都很差，跟数据的标注关系就比较大，如果指标不错，模型也很收敛，但是推理不行，大概率是过拟合，需要减少迭代轮次增加数据。还有些场景本身就不需要模型收敛，需要模型的泛化能力，这个时候指标的用途就不大了。

## RLHF 人类反馈学习

反馈学习，奖励或者惩罚。根据反馈完成强化学习

微调模型 + 奖励模型，才能完成强化学习

### 奖励模型

训练奖励模型 需要含排序的文本对话数据集。（一问多答，答案排序越靠前，代表我们认为这个答案越好）

### 强化学习

强化学习需要query问题集。（只有问题，不需要答案，微调模型回答后奖励模型会进行奖惩，从而完成强化学习）

**目前千帆平台只支持BLOOMZ，其他模型不能使用强化学习。**

### 模型评估

1. 模型只能回答训练过的内容，可能是过拟合，需要调整数据或超参数
2. 查看评估报告：loss 和 perplexity 的收敛曲线，成功的训练会有明显的收敛的过程以及收敛后趋于平稳的走势。**收敛出现在训练的后半部分**
  * loss 上升，是未收敛，需要增加数据或者训练轮次
  * loss 持续下降，是收敛未完成，需要增加数据或者训练轮次
  * perplexity 在训练1/3处接近1，同时loss接近0，是过拟合。需要把训练轮次减少到1/3重新训练
  * perplexity（困惑度）。衡量了模型对自己预估结果的不确定性，困惑度越低说明模型对自己越自信，但不代表更准确，进作为测量模型可信度使用，不测量准确度

3. ROUGE 和 BLEU 评分。默认的基础模型大概只有不到20的评分。
  * 在确切答案的问题上，评分可达到100。例如：判断一道题是数学题还是语文题
  * 在开放式答案的问题上，评分达到50-60分已经很高了。例如：根据关键词写一个故事
  * 如果最终的评分还不如未训练的评分，则需要调整训练数据、超参配置等
  * BLEU-4得分29.56%：BLEU-4并不是只看4-gram的情况，而是计算从1-gram到4-gram的累积分数，加权策略为 1-gram, 2-gram, 3-gram和4-gram 的权重各占25%。
  * ROUGE-1得分49.20%：表示在1-gram层面上，机器生成的摘要与参考摘要之间有49.20%的匹配，这反映了生成摘要在词级别上与参考摘要的相似性。
  * ROUGE-2得分26.93%：在2-gram层面上，机器生成的摘要与参考摘要的重叠度为26.93%，这反映了生成摘要在短语级别上与参考摘要的相似性。
  * ROUGE-4得分29.56%：意味着在4-gram层面上，机器生成的文本与参考文本之间有29.56%的重叠，这反映了生成文本与参考文本在较短语序列上的匹配程度。
  * ROUGE-L得分33.24%：是ROUGE-L综合考虑所有长度的重复后的得分，反映了机器生成的摘要与参考摘要的整体相似度。
  * 4-gram 连续的四个词分布概率
4. 使用验证数据集来测试 评估模型
  * 打分模式：
    * 人工：需要设置评估维度，让人工来打分。
    * 自动规则：设置指标，自动打分
    * 自动裁判员：使用一个大模型根据提示词来给小模型打分

### 模型压缩

部署前 需要先进行压缩。减小机器学习模型的大小、复杂度和计算量，以便在资源受限的设备上部署和运行。

### 模型部署

在我的模型中选模型点部署就行。

需要创建应用，获取AppID、API Key、Secret Key。

固定的api加上后面的输入框中输入的后缀，就是完整的api，用在代码中请求的request_url。 

使用文档中的api鉴权及调用。在api列表中选一个模型创建chat,就可以获取到url。

**代码示例：**

[https://aistudio.baidu.com/aistudio/education/group/invitation/30191?code=sYWwg1](https://aistudio.baidu.com/aistudio/education/group/invitation/30191?code=sYWwg1)

![image.png](https://flowus.cn/preview/4c243819-26b2-4dac-9221-9d70f4fcef60)


## 知识库

上传数据做知识库，然后创建对话插件选择知识库就可以。
上服务前需要创建新的应用

* 温度和多样性 二选一进行配置，选择温度的话，建议配置低一些。
* 可以选择其他插件集成、例如百度搜索
* 使用命中测试才测试知识库命中。不断的修改置信度，来修正。


## 应用场景

招录 + AI助手，帮助老师快速查询数据，而不需要熟知每个功能。

高考 + AI助手，高考相关知识问答

巡检 + AI生成文章，提升能力

E答 + AI意图识别，增强能力

### 问题

0. 可以千帆关闭或放弃润色，按标准答案输出？  **这么干就变成unit了**
1. 插件是否可以做流程引导？ **业务**
2. 知识库可以调用接口么？ 我看到可以选择自定义插件，自定义插件是不是可以使用自己的接口？ **业务**
3. 知识库回答速度较慢。是否有办法提升？ **目前没有，算力有限**
4. 我是否可以提供一些简单的问题来覆盖大模型的回答。例如：你是谁？ 回答我是掌上高考智能客服 **测试一下**


5. 知识库答案中是否可以包含 markdown 或者 富文本 **可以用自定义插件或者提示词完成**
6. 根据教程中的案例，实际测试 提示词和其他插件都不生效 **可以使用斜杠+插件名调用。上线后可以使用plugin字段设置使用插件**
7. 提示词怎么修改成自己的，调试信息里有一堆不是我写的东西。而且我自制的prompt模版在导入界面搜索不到  **可以在插件-更多中去调整提示词**
## QA

Q：EB-turbo是啥？

A：EB-turbo 是EB大模型的优化版，参数少，速度快，能力差，是用来做测试的

Q：数据集 和 知识库的区别 

A：数据集用来做训练、微调，知识库用来做插件

##  文章

****

1. 解析markdown，可通过自定义提示词，让markdown渲染为html返回。（自定义提示词可能需要一些技巧），比如如果【检索结果】包含markdown文本，请以交互友好的方式返回等等。

有一篇文档，使用到了这个技巧：https://cloud.baidu.com/qianfandev/topic/267302


****

2. 自定义插件如何开发，和一言自定义插件有何差异：


https://cloud.baidu.com/qianfandev/topic/268092


里面有github的源代码链接，可供参考。

****

3. 您想实现systen人设的需求，可以通过自定义提示词来实现。

放在知识库内理论上也可以，不过效果可能不太稳定。


这里也有一篇：system人设的使用技巧，请您参考：https://cloud.baidu.com/qianfandev/topic/268158


`请回复时遵循以上设定，一定不能脱离你的人设。`

4. 知识库提示词

你的任务是做一名问答助手，根据【检索结果】来回答最后的【问题】。在回答问题时，你需要注意以下几点：
1.【检索结果】有多条，每条【检索结果】之间由-分隔。
2.如果某条【检索结果】与【问题】无关，就不要参考这条【检索结果】。
3.请仔细反复检查【问题】与【检索结果】是否匹配，如果不匹配，就不要参考【检索结果】。
4.请直接回答问题，不要强调客服的职责。此外，避免出现无关话术，如"根据【检索结果】..."等。
5.如果【检索结果】为空，可以尝试百度搜索【问题】后再回答问题。

【检索结果】
{context}

【问题】{question}
【回答】

## 备注

8k 更适合生成文章,输出限制2ktokens，**实际测试效果也没多好**

4.0 输出限制1ktokens，**实际测试并不是**。

**尝试文章生成接口？？**

**prompt使用**

**appbuilder** 24/2/4 体验效果不佳，知识库有数量和答案字数都有限制，响应速度也慢。

**高考时间**

**招生类型分类**

