from arguments import ModelArguments, PeftArguments
from transformers import (
    AutoConfig,
    AutoModel,
    AutoTokenizer,
    HfArgumentParser,
)
import os
import torch
from peft import get_peft_model, LoraConfig, TaskType

def load_model():
    parser = HfArgumentParser((ModelArguments, PeftArguments))
    model_args, peft_args = parser.parse_args_into_dataclasses()

    tokenizer = AutoTokenizer.from_pretrained(
        model_args.model_name_or_path, trust_remote_code=True)
    config = AutoConfig.from_pretrained(
        model_args.model_name_or_path, trust_remote_code=True)

    if peft_args.pre_seq_len is not None:
        config.pre_seq_len = peft_args.pre_seq_len
        config.prefix_projection = peft_args.prefix_projection

    model = AutoModel.from_pretrained(model_args.model_name_or_path, config=config, trust_remote_code=True)

    if peft_args.ptuning_checkpoint is not None:
        print(f"Loading prefix_encoder weight from {peft_args.ptuning_checkpoint}")
        prefix_state_dict = torch.load(os.path.join(peft_args.ptuning_checkpoint, "pytorch_model.bin"))
        new_prefix_state_dict = {}
        for k, v in prefix_state_dict.items():
            if k.startswith("transformer.prefix_encoder."):
                new_prefix_state_dict[k[len("transformer.prefix_encoder."):]] = v
        model.transformer.prefix_encoder.load_state_dict(new_prefix_state_dict)
    elif peft_args.lora_checkpoint is not None:
        peft_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            inference_mode=True,
            r=peft_args.lora_rank,
            lora_alpha=peft_args.lora_alpha,
            lora_dropout=0,
            target_modules=["query_key_value"],
        )
        model = get_peft_model(model, peft_config)
        model.load_state_dict(torch.load(
                os.path.join(peft_args.lora_checkpoint, "pytorch_model.bin")
            ), 
            strict=False
        )
        model = model.merge_and_unload()

    if model_args.quantization_bit is not None:
        print(f"Quantized to {model_args.quantization_bit} bit")
        model = model.quantize(model_args.quantization_bit)
    
    model = model.half()
    
    if peft_args.pre_seq_len is not None:
        # P-tuning v2
        model.transformer.prefix_encoder.float()
    
    model = model.eval()
    return model, tokenizer, model_args.cache_dir

def save_model(model,tokenizer,output_dir):
    os.makedirs(output_dir,exist_ok=True)
    model.save_pretrained(output_dir, state_dict=model.state_dict(),max_shard_size="50GB")
    tokenizer.save_pretrained(output_dir)

if __name__ == '__main__':
    model, tokenizer, output_dir = load_model()
    save_model(model,tokenizer,output_dir)
