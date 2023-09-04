from modelscope.pipelines import pipeline

# 魔塔分词demo ,已经跑通了，python ./a.py

word_segmentation = pipeline(
    'word-segmentation', model='damo/nlp_structbert_word-segmentation_chinese-base')

input_str = '今天天气不错，适合出去游玩'
out = word_segmentation(input_str)
print(out)

# {'output': '今天 天气 不错 ， 适合 出去 游玩'}
