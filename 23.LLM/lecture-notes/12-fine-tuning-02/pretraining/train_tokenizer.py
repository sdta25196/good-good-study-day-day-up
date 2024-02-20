from tqdm import tqdm
from transformers import GPT2TokenizerFast
from datasets import load_dataset
import os

VOCAB_SIZE = 50257
MAX_LENGTH = 1024
SEED = 42
MODEL_NAME = "gpt-2"

raw_datasets = load_dataset("openwebtext", split="train")
raw_datasets = raw_datasets.train_test_split(test_size=0.01)
raw_train_dataset = raw_datasets["train"]
raw_valid_dataset = raw_datasets["test"]

# 定义一个批量加载数据的迭代器


def batch_iterator(batch_size=10000):
    for i in tqdm(range(0, len(raw_train_dataset), batch_size)):
        yield raw_train_dataset[i: i + batch_size]["text"]


# 加载预训练的tokenizer（为了复用其定义的特殊token）
tokenizer = GPT2TokenizerFast.from_pretrained(MODEL_NAME)
tokenizer.pad_token = tokenizer.eos_token

gpt_tokenizer = tokenizer.train_new_from_iterator(
    text_iterator=batch_iterator(), vocab_size=VOCAB_SIZE)
gpt_tokenizer.save_pretrained("my-tokenizer-"+MODEL_NAME)