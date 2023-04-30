import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# 定义标题和文本
titles = ["这是标题一", "这是标题二", "这是标题三"]
texts = ["这是文本一", "这是文本二", "这是文本三"]

# 初始化Tokenizer
tokenizer = Tokenizer()
tokenizer.fit_on_texts(texts)

# 定义最大序列长度和词汇表大小
max_sequence_length = 100
vocab_size = len(tokenizer.word_index) + 1

# 将文本转换为序列
sequences = tokenizer.texts_to_sequences(texts)

# 对序列进行填充
padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding='post')

# 构建模型
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, 64, input_length=max_sequence_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(vocab_size, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# 训练模型
model.fit(padded_sequences, np.array(sequences), epochs=100)

# 生成文本
def generate_text(model, tokenizer, max_sequence_length, seed_text, num_words):
    for _ in range(num_words):
        # 将种子文本转换为序列
        seed_sequence = tokenizer.texts_to_sequences([seed_text])[0]
        # 对序列进行填充
        seed_padded = pad_sequences([seed_sequence], maxlen=max_sequence_length, padding='post')
        # 通过模型生成下一个单词的概率分布
        predicted_probs = model.predict(seed_padded)[0]
        # 从分布中抽样下一个单词的序号
        predicted_index = tf.random.categorical(predicted_probs, num_samples=1)[-1,0].numpy()
        # 将序号转换为单词
        predicted_word = tokenizer.index_word[predicted_index]
        # 将预测的单词添加到种子文本中
        seed_text += " " + predicted_word
    return seed_text

# 测试生成文本
generated_text = generate_text(model, tokenizer, max_sequence_length, "这是标题四", 10)
print(generated_text)




# 要运行这段程序，需要在安装好TensorFlow的Python环境中打开一个代码编辑器（如PyCharm、Spyder、Jupyter Notebook等），然后将程序复制到编辑器中并保存为一个Python文件（如“text_generation.py”）。接下来，需要安装必要的Python库（如tensorflow、numpy等），可以使用以下命令在命令行或终端中进行安装：

# Copy code
# pip install tensorflow numpy
# 然后，在命令行或终端中切换到保存了Python文件的目录，运行以下命令启动程序：

# Copy code
# python text_generation.py
# 程序将会开始训练模型，并输出每个epoch的训练损失和准确率。当训练完成后，程序将调用generate_text函数生成一段文本，并输出结果。