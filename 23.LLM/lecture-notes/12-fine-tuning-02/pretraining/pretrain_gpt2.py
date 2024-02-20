import torch
import torch.distributed
from datasets import load_dataset
import os
from transformers import GPT2TokenizerFast, DataCollatorForLanguageModeling
from transformers import TrainingArguments, Trainer
import multiprocessing
import random

MODEL_NAME = "gpt2"
SEED = 42
MAX_LENGTH = 1024
MIN_LENGTH = 4
VOCAB_SIZE = 50257

# 定义数据处理函数
def prepare_train_features(examples):
    # 略过空行
    examples["nonempty_text"] = [
        d.strip() for d in examples["text"] if len(d.strip()) > 0
    ]

    # Convert the tokens into ids using the trained tokenizer

    tokenized_example = tokenizer(
        examples["nonempty_text"],
        truncation=True,
        max_length=MAX_LENGTH*100,
    )

    # 模型输出的字段
    examples["input_ids"] = []
    examples["attention_mask"] = []

    del examples["text"]
    del examples["nonempty_text"]

    for input_ids, attention_mask in zip(tokenized_example["input_ids"], tokenized_example["attention_mask"]):

        trunc_ids = input_ids[:min(len(input_ids), MAX_LENGTH)]
        trunc_mask = attention_mask[:min(len(attention_mask), MAX_LENGTH)]

        # 把长句切成MAX_LENGTH长度的片段, 最后一段如果小于MIN_LENGTH则忽略
        while len(trunc_ids) > MIN_LENGTH:
            trunc_len = len(trunc_ids)
            if trunc_len < MAX_LENGTH:
                examples["input_ids"].append(
                    trunc_ids+[tokenizer.pad_token_id]*(MAX_LENGTH-trunc_len))
                examples["attention_mask"].append(
                    trunc_mask+[0]*(MAX_LENGTH-trunc_len))
            else:
                examples["input_ids"].append(trunc_ids)
                examples["attention_mask"].append(trunc_mask)

            input_ids = input_ids[trunc_len:]
            attention_mask = attention_mask[trunc_len:]

            trunc_ids = input_ids[:min(len(input_ids), MAX_LENGTH)]
            trunc_mask = attention_mask[:min(len(attention_mask), MAX_LENGTH)]

    examples['labels'] = examples['input_ids'].copy()

    return examples


# 开启多开训练模式
torch.distributed.init_process_group(
    backend='nccl', init_method="env://", rank=args.local_rank, world_size=args.word_size)
torch.cuda.set_device(args.local_rank)

# 自动下载openwebtext数据集，展开前几十GB，展开成arrow格式大约500G
raw_datasets = load_dataset("openwebtext", split="train")
# 这里只用1%的数据作为测试集，否则每次dev时间很长
raw_datasets = raw_datasets.train_test_split(test_size=0.01)

raw_train_dataset = raw_datasets["train"]
raw_valid_dataset = raw_datasets["test"]

transformers.set_seed(args.seed)

# 定义tokenizer
tokenizer = GPT2TokenizerFast.from_pretrained(MODEL_NAME)
# 获取CPU核数（用于数据加载线程数）
num_proc = multiprocessing.cpu_count()

if torch.distributed.get_rank() > 0:
    # 主进程加载数据，其它进程等待从缓存加载arrow文件"
    torch.distributed.barrier()

tokenized_train_dataset = raw_train_dataset.map(
    prepare_train_features,
    batched=True,
    num_proc=num_proc
)

tokenized_valid_dataset = raw_valid_dataset.map(
    prepare_train_features,
    batched=True,
    num_proc=num_proc
)

if torch.distributed.get_rank() == 0:
    # 主进程加载数据结束
    torch.distributed.barrier()

# 定义数据校准器（自动生成batch）
collater = DataCollatorForLanguageModeling(
    tokenizer=tokenizer, mlm=False, return_tensors="pt"
)

# 定义GPT-2模型config
model_config = GPT2Config(vocab_size=VOCAB_SIZE,
                          max_position_embeddings=MAX_LENGTH, return_dict=True)
# 定义模型（此处参数随机初始化）
model = GPT2LMHeadModel(config=model_config)

training_args = TrainingArguments(
    output_dir="./my_model",        # checkpoint保存路径
    evaluation_strategy="steps",    # 每N步做一次eval
    overwrite_output_dir=True,
    num_train_epochs=1,             # 训练epoch数
    per_device_train_batch_size=8,  # 每张卡的batch大小
    gradient_accumulation_steps=20,   # 累加几个step做一次参数更新
    per_device_eval_batch_size=16,  # evaluation batch size
    logging_steps=1000,             # 每1000步eval一次
    save_steps=1000,                # 每1000步保存一个checkpoint
    learning_rate=1e-3,             # 学习率
    warmup_steps=2000,              # 预热（可选）
    optim="adamw_hf",               # 求解器（默认）
)

# 定义训练器
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=collater,
    train_dataset=tokenized_train_dataset,
    eval_dataset=tokenized_valid_dataset,
)

os.environ["WANDB_DISABLED"] = "true"

# 开始训练
trainer.train()