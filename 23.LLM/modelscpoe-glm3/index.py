
# ! 从魔塔下载模型
# from modelscope import AutoTokenizer, AutoModel, snapshot_download
# model_dir = snapshot_download("ZhipuAI/chatglm3-6b", revision="v1.0.0")
# tokenizer = AutoTokenizer.from_pretrained(model_dir, trust_remote_code=True)
# model = AutoModel.from_pretrained(
#     model_dir, trust_remote_code=True).half().cuda()
# model = model.eval()
# response, history = model.chat(tokenizer, "你好", history=[])
# print(response)
# response, history = model.chat(tokenizer, "晚上睡不着应该怎么办", history=history)
# print(response)


# # ! 使用本地模型
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained(
    "D:\ChatGLM3\model-ChatGLM3-6B\models\THUDM_chatglm3-6b", trust_remote_code=True)
model = AutoModel.from_pretrained(
    "D:\ChatGLM3\model-ChatGLM3-6B\models\THUDM_chatglm3-6b", trust_remote_code=True).half().cuda()
model = model.eval()
response, history = model.chat(tokenizer, "你好", history=[])
print(response)
