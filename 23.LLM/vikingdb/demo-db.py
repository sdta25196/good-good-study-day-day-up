from volcengine.viking_db import *
from volcengine.auth.SignerV4 import SignerV4
from volcengine.Credentials import Credentials
from volcengine.base.Request import Request
import sys
import requests
import json
import csv
import math
import pandas as pd

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
collection_description = ''  # 此处替换为您的数据集描述，不填默认为空

fields = [
    Field(
        field_name="id",
        field_type=FieldType.String,
        is_primary_key=True
    ),
    Field(
        field_name="question",
        field_type=FieldType.Text,
        # 设置使用m3模型，向量数据库不切分文本，直接调用 bge m3 抽取短文本的稀疏特征和稠密特征，存入系统预设的稠密向量字段和稀疏向量字段。
        pipeline_name="text_bge_m3"
    ),
    Field(
        field_name="answer",
        field_type=FieldType.Text
    )
]
# 创建数据集
# [collection.collection_name for collection in vikingdb_service.list_collections()] 由列表中的每个元素的collection_name组成的一个新列表
if collection_name not in [collection.collection_name for collection in vikingdb_service.list_collections()]:
    print(vikingdb_service.create_collection(
        collection_name, fields, collection_description))

collection = vikingdb_service.get_collection(collection_name)

# 将数据从文件中读取为字典列表
csv_file_path = "./zxks.faq.csv"  # 替换为您的文件路径，此处以包含一列问题一列答案的csv文件为例读取，可以根据实际情况替换
with open(csv_file_path, mode='r', encoding='gbk') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    # 转换为字典列表
    dict_list = [row for row in csv_reader]

# print(csv_reader.fieldnames)
# 输出第一条问答对
# print(dict_list[0])

i = 0
datas = []
for d in dict_list:
    field = {
        "id": d["que_id"],
        "question": d["que_q"],
        "answer": d["que_a"]  # ! 如果是问题和答案合并到一列的数据结构，就直接使用一个字段就好了
    }
    if i == 0:
        print(field)
        i = 1
    data = Data(field)
    datas.append(data)

# batch_size 是每批数据的大小，用户手册限制单次写入的数据数目不超过100
batch_size = 100

# 计算需要多少批来处理所有数据
num_batches = math.ceil(len(datas) / batch_size)

# 分批处理数据
for i in range(num_batches):
    # 计算每批数据的起始和结束坐标
    start_loc = i * batch_size
    end_loc = min((i + 1) * batch_size, len(datas))

    # 获取当前批次的数据
    batch_data = datas[start_loc:end_loc]

    # 写入当前批次的数据
    collection.upsert_data(batch_data)

index_name = "zxks"  # 以英文字母开头且不能为空，只能包含字母、数字及 _，长度为 1 ～ 128 个字母
index_description = '广东考试院自学考试的faq数据'

path = '/api/index/create'
method = 'POST'
DOMAIN = "api-vikingdb.volces.com"

request_params = {
    "collection_name": collection_name,
    "index_name": index_name,
    "description": index_description,
    "vector_index": {
        # 表示混合检索的 HNSW 算法。只有在索引对应的数据库同时包含稠密向量和稀疏向量时可使用这个算法，否则api 返回错误。hnsw的相关参数包含 quant、distance、hnsw_m、hnsw_cef、hnsw_sef，可参考用户手册配置
        "index_type": "hnsw_hybrid",
        "distance": "cosine",
        "quant": "float",
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

# ! -------------------------------------------------------

# 等待索引建立，三分钟左右，取决于数据量和索引参数
