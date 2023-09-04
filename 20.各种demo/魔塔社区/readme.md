# 魔塔社区

https://community.modelscope.cn/ 

# 环境安装过程

* 安装 `anaconda`，本机`python`版本 `v3.8`
* `conda`配置成环境变量
* 执行 `pip3 install tensorflow==2.5.0`
* 执行 `conda create -n modelscope python=3.7`
* 执行 `pip3 install torch torchvision torchaudio -i https://pypi.tuna.tsinghua.edu.cn/simple` 
* 执行 `pip install modelscope`
* 执行 `pip install modelscope --upgrade`
* 执行 `python -c "from modelscope.pipelines import pipeline;print(pipeline('word-segmentation')('今天天气不错，适合 出去游玩'))"`
  - 期间报错缺少xxx模块，使用`pip3 install [模块]`，分别安装缺少的模块 
  - `transformers` 安装时可能会提示`SSL Error`，解决方案如下：
    - 进入Anaconda安装目录，`D:\Anaconda\Library\bin` 中把文件`libcrypto-1_1-x64.dll`和`libssl-1_1-x64.dll`,复制到`D:\Anaconda\DLLs`
    - 然后再次执行 `python -m pip install transformers`，使用 `pip -m`可以解决安装完模块之后，依然提示找不到的问题。
* 再次执行 `python -c "from modelscope.pipelines import pipeline;print(pipeline('word-segmentation')('今天天气不错，适合 出去游玩'))"`, 成功输出分词。

# 知识库 + 大模型
 
[灵积模型服务](https://dashscope.console.aliyun.com/overview)

[向量检索服务](https://dashvector.console.aliyun.com/cn-hangzhou/overview)

一顿报错，一顿装依赖