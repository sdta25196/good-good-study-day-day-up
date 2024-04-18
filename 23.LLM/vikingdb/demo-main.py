from volcengine.viking_db import *
from volcengine.auth.SignerV4 import SignerV4
from volcengine.Credentials import Credentials
from volcengine.base.Request import Request
import sys
import requests
import json
import pandas as pd
import time

# ! db.py 中创建好了数据和索引。在这里去查询

start_time = time.time()  # 记录开始时间

vikingdb_service = VikingDBService()

# 此处替换为您账号的 ak 和 sk
ak = ""
sk = ""

vikingdb_service.set_ak(ak)
vikingdb_service.set_sk(sk)

# API鉴权


def prepare_request_index(method, path, ak, sk, params=None, data=None, doseq=0):
    if params:
        for key in params:
            if (
                type(params[key]) == int
                or type(params[key]) == float
                or type(params[key]) == bool
            ):
                params[key] = str(params[key])
            elif sys.version_info[0] != 3:
                if type(params[key]) == unicode:
                    params[key] = params[key].encode("utf-8")
            elif type(params[key]) == list:
                if not doseq:
                    params[key] = ",".join(params[key])
    r = Request()
    r.set_shema("http")
    r.set_method(method)
    r.set_connection_timeout(1000)
    r.set_socket_timeout(1000)
    mheaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Host": "api-knowledgebase.ml_platform.cn-beijing.volces.com",
    }
    r.set_headers(mheaders)
    if params:
        r.set_query(params)
    r.set_host("api-knowledgebase.ml_platform.cn-beijing.volces.com")
    r.set_path(path)
    if data is not None:
        r.set_body(json.dumps(data))
    # 生成签名
    credentials = Credentials(ak, sk, "air", "cn-north-1")
    SignerV4.sign(r, credentials)
    return r


# 此处替换为您的数据集名字，以英文字母开头且不能为空，只能包含字母、数字及 _，长度为 1 ～ 128 个字母
collection_name = 'test_collection'
index_name = "zxks"  # 以英文字母开头且不能为空，只能包含字母、数字及 _，长度为 1 ～ 128 个字母
path = '/api/index/search'
method = 'POST'
DOMAIN = "api-vikingdb.volces.com"

# 索引建立完成后，可以直接检索，使用第一步的引用与定义即可
query = "重复缴纳了考试费，能退回吗"  # 需要替换
top_k = 1  # 返回相似度最高的top_k条数据
index = vikingdb_service.get_index(collection_name, index_name)


request_params = {
    "collection_name": collection_name,
    "index_name": index_name,
    "search": {
        "order_by_raw": {
            "text": query  # 非结构化数据检索，当前只支持文本搜文本
        },
        "limit": top_k,  # 检索结果数量，最大5000个。
        # 混合检索中稠密向量的权重，1 表示纯稠密检索 ，0表示纯字面检索。只有索引是混合索引时有效。范围限定 [0.2, 1]
        "dense_weight": 0.5
        # output_fields字段也可参考用户手册设置
    },
}

# 调用 prepare_request 生成请求并完成签名
info_req = prepare_request_index(
    method=method, path=path, ak=ak, sk=sk, data=request_params)

# 完成请求
r = requests.request(
    method=info_req.method,
    url="https://{}{}".format(DOMAIN, info_req.path),
    headers=info_req.headers,
    data=info_req.body,
)

res = r.json().get('data')[0]  # 此处根据实际情况

# 打印检索结果
print("检索结果：：：")
for item in res:
    print('相似度分数：', item['score'], '\n', item['fields'])

end_time = time.time()    # 记录结束时间
print('--------------------------------------------')
print(f"检索执行时间: {end_time - start_time} 秒")
print('--------------------------------------------')

start_time = time.time()  # 记录开始时间

# 重排
recalled_questions = [item['fields']['question'] for item in res]
recalled_answers = [item['fields']['answer'] for item in res]
score = [0 for _ in range(len(recalled_questions))]
res_df = pd.DataFrame(zip(score, recalled_questions, recalled_answers), columns=[
                      "score", "recalled_questions", "recalled_answers"])
for index, row in res_df.iterrows():
    question = row['recalled_questions']
    answer = row['recalled_answers']
    score = vikingdb_service.rerank(query, question)
    res_df.loc[index, 'score'] = score

res_df = res_df.sort_values(by='score', ascending=False)
print('重排结果：：：')
# print(res_df)
template = "相似度分数：{similarity}\n问题：{question}\n答案：{answer}\n\n"
# 应用模板并拼接文本
text = ''.join(res_df.apply(lambda row: template.format(
    similarity=row['score'], question=row['recalled_questions'], answer=row['recalled_answers']), axis=1))
# 输出最终的文本
print(text)

end_time = time.time()    # 记录结束时间
print('--------------------------------------------')
print(f"重排执行时间: {end_time - start_time} 秒")
print('--------------------------------------------')
