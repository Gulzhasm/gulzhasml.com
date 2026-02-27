import type { StructuredContent } from "@/lib/structured-content";

export const huggingFaceBasicsContent: StructuredContent = {
  overview:
    "The Hugging Face ecosystem — especially the Transformers library — is the standard way to work with pretrained NLP and vision models. This chapter gives you a clean mental model for tokenizers, models, pipelines, and fine-tuning, so you can move from copy-pasting examples to designing your own experiments.",

  youWillLearn: [
    "How tokenizers turn raw text into model-ready integer sequences",
    "How AutoModel and AutoTokenizer pick the right architecture from a checkpoint name",
    "How to use high-level pipelines for fast prototyping",
    "How to fine-tune sequence classification models with the Trainer API",
    "How to manage padding, truncation, and attention masks correctly",
    "How to think about model sizes, checkpoints, and transfer to your own domains",
  ],

  mainContent: [
    {
      heading: "Checkpoints, Architectures, and AutoClasses",
      body:
        "In the Hugging Face world, a **checkpoint** (like `bert-base-uncased` or `distilbert-base-multilingual-cased`) encodes both a model architecture and its pretrained weights. `AutoTokenizer.from_pretrained(name)` and `AutoModel.from_pretrained(name)` inspect this name, download the correct config and weights, and construct the appropriate model class under the hood. This means you almost never instantiate `BertModel` or `GPT2Model` directly — you rely on AutoClasses and the repository name. The key idea: everything revolves around a single string identifier for the model, and APIs are designed to be architecture-agnostic.",
    },
    {
      heading: "Tokenisation and Attention Masks",
      body:
        "Transformers operate on integer token IDs, not raw strings. The tokenizer splits text into subword tokens (e.g. WordPiece or BPE), maps them to IDs, and handles special tokens like `[CLS]`, `[SEP]`, and padding. When you call `tokenizer(batch_texts, padding=True, truncation=True, return_tensors=\"pt\")`, you receive a dictionary with `input_ids`, `attention_mask`, and sometimes `token_type_ids`. `attention_mask` tells the model which positions are real tokens (1) and which are padding (0), so that attention weights for padding do not affect the computation. Correct handling of padding and truncation is essential: if you forget `truncation=True`, very long inputs may crash your program or be silently truncated in an inconsistent way.",
    },
    {
      heading: "Pipelines for Fast Prototyping",
      body:
        "The `pipeline` API wraps tokenisation, model inference, and post-processing into a single call. For example, `pipeline(\"sentiment-analysis\")` downloads a default sentiment model and lets you run `pipe(\"I love this\")` to get a label and score. Under the hood, it is doing exactly what you would do manually: tokenize, move tensors to a device, run the model, apply the appropriate head and activation, and map indices back to human-readable labels. Pipelines are ideal for exploration and demos, but for serious training and evaluation you typically drop down to the lower-level model + tokenizer APIs.",
    },
    {
      heading: "Fine-Tuning with Trainer and Datasets",
      body:
        "The `Trainer` API is a high-level training loop that integrates tokenizers, models, metrics, and the `datasets` library. You define a dataset (either loaded from the Hugging Face Hub or built from your own CSV/JSON), write a tokenisation function that maps raw examples to `input_ids` and `attention_mask`, and then call `Trainer.train()`. The Trainer handles batching, gradient accumulation, evaluation at intervals, logging, and checkpointing. Crucially, it respects the model type — sequence classification, token classification, QA, etc. — based on the config loaded from the checkpoint. For more control or custom architectures, you can always drop to plain PyTorch and use the model classes directly.",
    },
    {
      heading: "Model Sizes, Latency, and Deployment Tradeoffs",
      body:
        "Checkpoints like `bert-base-uncased` (~110M parameters) and `distilbert-base-uncased` (~66M) trade accuracy for speed and size. Larger models generally perform better but are slower and more memory-hungry. In production you often choose a distilled or quantised model and limit max sequence length (e.g. 128 instead of 512 tokens) to keep latency within budgets. Hugging Face also offers `optimum` and `transformers` integration with ONNX Runtime and other accelerators. The key is to think explicitly about your constraints — latency, throughput, cost — when choosing a model, rather than always reaching for the largest checkpoint.",
    },
  ],

  examples: [
    {
      title: "Sentiment Analysis with a Pipeline",
      description:
        "The fastest way to get from raw text to model predictions using a pretrained checkpoint.",
      code: `from transformers import pipeline

clf = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

result = clf("I love using transformers, the API is so clean!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9995}]`,
    },
    {
      title: "Manual Tokenisation and Model Call",
      description:
        "Doing manually what pipelines do under the hood: tokenizer → model → logits.",
      code: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

texts = ["I love this", "I hate this"]
enc = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")

with torch.no_grad():
    outputs = model(**enc)
    probs = outputs.logits.softmax(dim=-1)

print(probs)`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting padding and truncation when batching variable-length texts",
      why:
        "Models expect tensors with a consistent max sequence length. If you only tokenize single examples or forget `padding=True`, you will hit shape errors when you batch examples of different lengths.",
      fix:
        "Always use `tokenizer(batch_texts, padding=True, truncation=True, return_tensors=...)` for batched inputs. Inspect `input_ids.shape` to confirm the sequence length.",
    },
    {
      mistake: "Using the wrong AutoClass for the task",
      why:
        "Loading `AutoModel` when you need `AutoModelForSequenceClassification` (or another head) forces you to implement the classification head and loss manually, and often leads to mismatched shapes.",
      fix:
        "Choose the AutoClass that matches your task: `AutoModelForSequenceClassification` for text classification, `AutoModelForTokenClassification` for NER, `AutoModelForSeq2SeqLM` for translation, etc.",
    },
    {
      mistake: "Passing raw logits directly to metrics that expect probabilities or labels",
      why:
        "Metrics like accuracy and F1 require class labels; ROC AUC and calibration curves require probabilities. Raw logits do not satisfy these assumptions.",
      fix:
        "Apply `softmax` or `sigmoid` as appropriate to obtain probabilities, then convert to predicted labels with `argmax` or thresholding before computing metrics.",
    },
  ],

  exercises: [
    {
      question:
        "You want to fine-tune a sequence classification model on a CSV with columns `text` and `label`. Outline the steps using `datasets`, `AutoTokenizer`, and `Trainer`.",
      answer:
        "Load the data with `datasets.load_dataset('csv', data_files=...)`, map string labels to integers, create a tokenisation function that calls `tokenizer(example['text'], truncation=True, padding='max_length')`, and apply it with `dataset.map(..., batched=True)`. Then load a checkpoint with `AutoModelForSequenceClassification.from_pretrained`, define a compute_metrics function, instantiate a `Trainer` with model, tokenized datasets, tokenizer, and training arguments, and finally call `trainer.train()`.",
    },
    {
      question:
        "You deploy a text classifier and see latency spikes on very long inputs. What practical steps can you take using Hugging Face tooling to improve latency without retraining a completely new model from scratch?",
      answer:
        "Limit `max_length` in tokenisation (e.g. 128 or 256), switch to a smaller or distilled checkpoint (e.g. DistilBERT), enable dynamic padding or batch by length to reduce wasted computation, and export the model to an optimised runtime (ONNX/Optimum). You can also quantise weights or move inference to GPU if it is currently on CPU.",
    },
  ],

  furtherReading: [
    {
      title: "Transformers Documentation — Quick Tour",
      href: "https://huggingface.co/docs/transformers/quicktour",
      type: "external",
    },
    {
      title: "Transformers — Training with Trainer",
      href: "https://huggingface.co/docs/transformers/training",
      type: "external",
    },
  ],
};

