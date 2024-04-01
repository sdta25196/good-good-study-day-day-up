from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ModelArguments:
    """
    Arguments pertaining to which model/config/tokenizer we are going to fine-tune from.
    """
    model_name_or_path: str = field(
        metadata={"help": "Path to pretrained model or model identifier from huggingface.co/models"}
    )
        
    cache_dir: Optional[str] = field(
        default=None,
        metadata={"help": "Where to store the pretrained models downloaded from huggingface.co"},
    )

    quantization_bit: Optional[int] = field(
        default=None
    )
    

@dataclass
class PeftArguments:
    lora_rank: int = field(
        default=None,
        metadata={"help": "LoRA rank number"}
    )
    lora_alpha: int = field(
        default=32,
        metadata={"help": "LoRA alpha weight"}
    )
    lora_dropout: float = field(
        default=0.1,
        metadata={"help": "LoRA dropout probability"}
    )
    lora_checkpoint: str = field(
        default=None,
        metadata={"help": "Path to LoRA checkpoints"}
    )
    
    pre_seq_len: Optional[int] = field(
        default=None,
        metadata={"help": "Prefix encoder length for P-Tuning V2"}
    )
    prefix_projection: bool = field(
        default=False,
        metadata={"help": "Whether add projection layers for prefix encoder"}
    )
    ptuning_checkpoint: str = field(
        default=None, 
        metadata={"help": "Path to P-Tuning V2 checkpoints"}
    )

@dataclass
class DataTrainingArguments:
    """
    Arguments pertaining to what data we are going to input our model for training and eval.
    """
    prompt_column: Optional[str] = field(
        default=None,
        metadata={"help": "The name of the column in the datasets containing the full texts (for summarization)."},
    )
    response_column: Optional[str] = field(
        default=None,
        metadata={"help": "The name of the column in the datasets containing the summaries (for summarization)."},
    )
    history_column: Optional[str] = field(
        default=None,
        metadata={"help": "The name of the column in the datasets containing the history of chat."},
    )
    train_file: Optional[str] = field(
        default=None, metadata={"help": "The input training data file (a jsonlines or csv file)."}
    )
    validation_file: Optional[str] = field(
        default=None,
        metadata={
            "help": (
                "An optional input evaluation data file to evaluate the metrics (rouge) on (a jsonlines or csv file)."
            )
        },
    )
    test_file: Optional[str] = field(
        default=None,
        metadata={
            "help": "An optional input test data file to evaluate the metrics (rouge) on (a jsonlines or csv file)."
        },
    )
    overwrite_cache: bool = field(
        default=False, metadata={"help": "Overwrite the cached training and evaluation sets"}
    )
    preprocessing_num_workers: Optional[int] = field(
        default=None,
        metadata={"help": "The number of processes to use for the preprocessing."},
    )
    max_source_length: Optional[int] = field(
        default=1024,
        metadata={
            "help": (
                "The maximum total input sequence length after tokenization. Sequences longer "
                "than this will be truncated, sequences shorter will be padded."
            )
        },
    )
    max_target_length: Optional[int] = field(
        default=256,
        metadata={
            "help": (
                "The maximum total sequence length for target text after tokenization. Sequences longer "
                "than this will be truncated, sequences shorter will be padded."
            )
        },
    )
    ignore_pad_token_for_loss: bool = field(
        default=True,
        metadata={
            "help": "Whether to ignore the tokens corresponding to padded labels in the loss computation or not."
        },
    )
