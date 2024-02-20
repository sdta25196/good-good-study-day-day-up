import re
import jieba
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')  

def to_keywords(input_string):
    """将句子转成检索关键词序列"""
    # 按搜索引擎模式分词
    word_tokens = jieba.cut_for_search(input_string)
    # 加载停用词表
    stop_words = set(stopwords.words('chinese'))
    # 去除停用词
    filtered_sentence = [w for w in word_tokens if not w in stop_words]
    return ' '.join(filtered_sentence)

def sent_tokenize(input_string):
    """按标点断句"""
    # 按标点切分
    sentences = re.split(r'(?<=[。！？；?!])', input_string)
    # 去掉空字符串
    return [sentence for sentence in sentences if sentence.strip()]

    
if "__main__" == __name__:
    # 测试关键词提取
    print(to_keywords("小明硕士毕业于中国科学院计算所，后在日本京都大学深造"))
    # 测试断句
    print(sent_tokenize("这是，第一句。这是第二句吗？是的！啊"))