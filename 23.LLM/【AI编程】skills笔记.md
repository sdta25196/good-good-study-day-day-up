## Skills

技能（Skill） 是一套以简单文件夹形式打包的指令，用于教 Claude 如何处理特定任务或工作流程。

无需在每次对话中重新解释您的偏好、流程和领域专业知识，技能让您只需教 Claude 一次，即可在每次对话中受益。

**skill就是典型的经验资产化**

## 关于skills

**文件夹结构**

my-skill/
├── SKILL.md           # 主要说明（必需）
├── references         # 主要说明（必需）
│   └── xxx.md         # 其他说明文件,按需加载
├── examples/
│   └── sample.md      # 显示预期格式的示例输出
└── scripts/
│   └── validate.sh    # Claude 可以执行的脚本
└── assets/            # 可选 - 模板等
    └── report-template.md # 示例

- 技能文件夹命名：必须使用短横线连接
- SKILL.md 必须是大写
- 不要在技能文件夹内包含 README.md，所有文档放在 SKILL.md 或 references/ 中
- SKILL.md 前置元数据最低要求如下：
```md
---
name: your-skill-name
description: 它的作用。当用户要求[具体触发短语]时使用！
---
```
- 元数据中不允许有尖括号(<>)
- 技能名称中不允许包含"claude"或"anthropic"
- description字段构成：[它的作用] + [触发条件] + [关键能力]，例如：`管理 Linear 项目工作流程，包括冲刺规划、任务创建和状态跟踪。当用户提及"冲刺"、"Linear 任务"、"项目规划"或要求"创建任务"时使用。`
- 配置`disable-model-invocation: true`后，技能的触发方式只能是人工使用`/技能名称`触发。
- 配置`user-invocable: false`后，技能的触发方式只能是claude触发
- 占位符 `$ARGUMENTS` \ `${CLAUDE_SESSION_ID}`
- skills可以是本地 也可以是远程的，远程就需要先用插件市场/plugin来安装

**渐进式加载**

渐进式加载在保持专业化的同时最小化tokens使用。

- 第一级（YAML 前置元数据）：始终加载到 Claude 的系统提示中。提供足够的信息让 Claude 知道何时应使用每个技能，而无需将所有内容加载到上下文中。
- 第二级（SKILL.md 正文）：当 Claude 认为技能与当前任务相关时加载。包含完整的指令和指导。
- 第三级（链接文件）：技能目录内捆绑的其他文件，Claude 可以选择仅在需要时导航和发现。

**skill编写逻辑**

确认四件事：

- 想要完成什么？
- 这需要哪些多步骤、工作流程？
- 需要哪些工具？
- 应该嵌入哪些领域知识或最佳实践？

把所有事情，写清楚在SKILL.md中，如果需要脚本、其他文件，需要放到配套文件夹中

**skill测试**

- 正确的触发技能
- 不过度触发技能
- API 调用成功
- 生成的输出正确
- 涵盖边缘情况

**skill-creator**

可以先使用skill-creator技能创建初稿，然后根据初稿来进行修改。

## 搭配MCP

**首先skill确实没啥太大必要搭配MCP，直接API就够了**

如需搭配MCP使用时，`SKILL.md`示例如下：

**注意：需要确保MCP server已经链接，skill不会主动链接mcp**

```md
---
name: my-linear-skill
description: 管理 Linear 项目工作流程，包括冲刺规划、任务创建和状态跟踪。当用户提及"冲刺"、"Linear 任务"或"创建任务"时使用。
metadata:
  author: Your Name
  version: 1.0.0
  mcp-server: linear  # 声明依赖的 MCP 服务器名称
---

# Linear 项目管理技能

## 工作流程：创建冲刺任务

### 步骤 1：获取项目信息
使用 Linear MCP 获取当前项目列表：
- 调用 `linear_get_projects` 工具
- 展示项目供用户选择

### 步骤 2：创建任务
创建任务时：
- 调用 `linear_create_issue` 工具
- 参数：title（标题）、description（描述）、projectId（项目ID）
- 自动添加适当的标签和优先级

### 步骤 3：确认创建
向用户展示创建的任务链接和详情
```


# Claude Code 的经验教训：我们如何使用 Skill（翻译）


Skills 不只是 markdown 文件。它们是文件夹，可以包含脚本、资源、数据等内容，AI 可以发现、探索和操作这些内容。

这是skill和prompt的本质区别，prompt是单纯的提示词。

## Skills 的类型

最好的 Skills 干净利落地属于以下某一类；而容易让人困惑的 Skills 则往往跨越了好几类。


1. 库 & API 参考

  这类 Skills 解释如何正确使用某个库、CLI 或 SDK。

  可以是内部库，或者 Claude Code 有时容易出问题的常用库。

  这些 Skills 通常会包含一个参考代码片段文件夹，以及一份 Claude 编写脚本时需要避免的"坑"清单。 

  参考skill：frontend-design — 让 Claude 更懂你的设计系统

2. 产品验证

  这类 Skills 描述如何测试或验证代码是否正常工作。
 
  它们通常会配合 Playwright、tmux 等外部工具来执行验证。 验证类 Skills 对于确保 Claude 的输出正确性极为有用。

  可以让 Claude 录制输出视频，这样你就能看到它具体测试了什么；或者在每个步骤强制执行状态断言。

  参考skill：signup-flow-driver — 在无头浏览器中运行注册 → 邮箱验证 → 引导流程，并在每个步骤钩子中断言状态

3. 数据获取 & 分析

  这类 Skills 连接到你的数据与监控栈。

  它们可能包含带凭证获取数据的库、特定的数据看板 ID，以及常见工作流说明或数据获取方法。

  最终反馈数据或者分析结果

4. 业务流程 & 团队自动化

  这类 Skills 将重复性工作流自动化为一个命令。

  它们通常是比较简单的指令，但可能对其他 Skills 或 MCP 有更复杂的依赖。
  
  对于这类 Skills，将之前的结果保存到日志文件中可以帮助模型保持一致性，并反思之前的工作流执行情况。

  参考skill：weekly-recap — 已合并的 PR + 已关闭的工单 + 部署 → 格式化的每周回顾帖

5. 代码脚手架 & 模板
  
  这类 Skills 为代码库中的特定功能生成框架样板。

  结合可组合的脚本一起使用这些 Skills。当脚手架有无法用纯代码覆盖的自然语言需求时，它们尤其有用。 

  参考skill：create-app — 新内部应用，带有预先配置好的认证、日志和部署

6. 代码质量 & 评审

  这类 Skills 在组织内强制执行代码质量并帮助评审代码。

  这类 Skills 在组织内强制执行代码质量并帮助评审代码。它们可以包含确定性脚本或工具以获得最大稳定性。

  参考skill：code-style — 强制执行代码风格，特别是 Claude 默认做不好的那些风格
  
  参考skill：testing-practices — 如何编写测试以及测试什么的说明

7. CI/CD & 部署

  这类 Skills 帮助你在代码库中获取、推送和部署代码。

  参考skill：babysit-pr — 监控 PR → 重试不稳定的 CI → 解决合并冲突 → 启用自动合并

8. 系统运行手册
  
  能够根据系统症状（例如 Slack 线程、警报或错误签名）进行多工具调查，并生成结构化报告的技能

9. 基础设施运维

  这类 Skills 是执行日常维护和操作程序所需的技能，其中一些操作可能具有破坏性，因此需要采取防护措施。

  这类技能在最终执行时，需要人为进行确认执行操作。

## 提升skill的技巧

1. 不要说显而易见的事

Claude Code 对你的代码库了解很多，试着聚焦于那些能将 Claude 从其常规思维中拉出来的信息。

frontend-design 这个 Skill 就是一个很好的例子——它是由 Anthropic 的一位工程师通过与客户反复迭代、改善 Claude 的设计品味而构建的，避免了像 Inter 字体和紫色渐变这类经典套路。

2. 建立"避坑"专区

任何 Skill 中信息量最高的內容就是"避坑"（Gotchas）专区。

这些专区应该从 Claude 使用该 Skill 时遇到的常见失败点中积累。理想情况下，应该随着时间推移更新你的 Skill，以便在 Claude 遇到新的边缘案例时不断加入新的避坑经验。

3. 配合渐进式加载的逻辑

Skill 是一个文件夹，应该把整个文件系统当作一种上下文工程和渐进式加载来思考。告诉 Claude 你的 Skill 中有哪些文件，它会在适当的时候读取它们。 

4. 不要写太死

Skills 具有高度可复用性，你要小心不要在指令中过于具体。给 Claude 它需要的信息，但给它适应情况的灵活性。

5. 考虑配置

如果skill需要配置信息，最好是将这些设置信息存储在 Skill 目录中的 config.json 文件中。

6. 描述字段是给AI看的

描述字段不是摘要，而是何时触发skill的说明

7. 记忆 & 数据存储

当skill需要存储数据时，尽可能使用日志文件或者json文件来存储数据。

存储在 Skill 目录中的数据可能在升级 Skill 时被删除，因此你应该将数据存储在稳定的位置。目前提供 ${CLAUDE_PLUGIN_DATA} 作为每个插件的稳定文件夹来存储数据。

8. 存储脚本 & 生成代码

你能给 Claude 最强大的工具之一就是代码。提供辅助函数而不是提供函数库。

9. 按需使用钩子

Skills可以包含仅在 Skill 被调用时才激活的钩子，对于那些你不想一直运行但有时非常有用的高度定制化钩子，可以使用这个功能。

这里的钩子指的应该是skill的提示词中可以自行设置钩子，官网并没有找到针对skill的钩子函数。


# 资料

[Lessons from Building Claude Code: How We Use Skills](https://www.techtwitter.com/articles/lessons-from-building-claude-code-how-we-use-skills)

[The Complete Guide to Building Skill for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)

[skill 下载站点](https://clawhub.ai/)

[腾讯的 skill 技能网站](https://skillhub.tencent.com/)

[skill 技能网站](skills.sh)

[官方文档 skill说明可用字段参考](https://code.claude.com/docs/zh-CN/skills#frontmatter-%E5%8F%82%E8%80%83)

