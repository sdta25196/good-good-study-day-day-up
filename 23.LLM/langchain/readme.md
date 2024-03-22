需要安装基础库：

`pip install --upgrade langchain`

`pip install --upgrade langchain-openai` 使用langchain封装的openai

- [openai基础对话](./index1.py)
- [多轮对话](./index1.py)
- [国产大模型](./index2.py) 需要安装千帆 `!pip install qianfan`
- [prompt模板](./index3.py)  包含基础模板、从文件中加载模板、对话模板、上下文模板
- [输出封装器OutputParser](./index4.py) 包含 Auto-Fixing Parser
- [上下文封装memory](./index5.py)
- [LCEL链式调用](./index6.py)
- [LCEL实现RAG](./index7.py) `pip install pypdf`、 `pip install --upgrade langchain-text-splitters`、 `pip install chromadb`
- [LangServer](./index8.py) `pip install langserve[server]`
- [网站解析RAG](./test_rag.py) 这是一个网站解析做RAG的demo


## langchain 教程

LangChain 是一个开发由语言模型驱动的应用程序的框架。主要用来方便的的编写大模型程序。

六大核心模块：

- 代理（agent）涉及 LLM 做出行动决策、执行该行动、查看一个观察结果，并重复该过程直到完成。LangChain 提供了一个标准的代理接口，一系列可供选择的代理，以及端到端代理的示例。
- 链（chain）不仅仅是单个 LLM 调用，还包括一系列调用（无论是调用 LLM 还是不同的实用工具）。LangChain 提供了一种标准的链接口、许多与其他工具的集成。LangChain 提供了用于常见应用程序的端到端的链调用。
- 索引（index）与您自己的文本数据结合使用时，语言模型往往更加强大——此模块涵盖了执行此操作的最佳实践。
- 记忆（memory）在链/代理调用之间保持状态的概念。LangChain 提供了一个标准的内存接口、一组内存实现及使用内存的链/代理示例。
- 模型（model）LangChain 支持的各种模型类型和模型集成。
- 提示词（prompt）包括提示管理、提示优化和提示序列化。


### 相关库

`pip install beautifulsoup4` 使用`WebBaseLoader`解析网站时，需要使用这个库

`pip install faiss-cpu` 一个使用向量化数据库，做RAG时使用

`pip install --upgrade langchain-text-splitters` RAG入库时文本拆分


