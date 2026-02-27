import type { StructuredContent } from "@/lib/structured-content";

export const pytorchPipelinesContent: StructuredContent = {
  overview:
    "Building complete training pipelines in PyTorch: Dataset and DataLoader for batching, nn.Module for models, loss functions (BCEWithLogitsLoss, CrossEntropyLoss, MSELoss), the Adam optimizer, training and validation loops, saving/loading models, and metrics basics with debugging signals (loss curves, overfitting).",

  youWillLearn: [
    "Dataset and DataLoader: __len__, __getitem__, batching, shuffling",
    "nn.Module: defining layers in __init__, forward pass",
    "Loss functions: BCEWithLogitsLoss, CrossEntropyLoss, MSELoss",
    "Optimizer: Adam",
    "Training loop: forward, loss, backward, step, zero_grad",
    "Validation loop with torch.no_grad()",
    "Saving and loading model state_dict",
    "Metrics and debugging: loss curves, overfitting signals",
  ],

  mainContent: [
    {
      heading: "Dataset and DataLoader",
      body: "Subclass torch.utils.data.Dataset: implement __len__ (return number of samples) and __getitem__(i) (return the i-th sample as (x, y)). DataLoader wraps the Dataset and handles batching, shuffling, and num_workers for parallel loading. Iterate with for batch_x, batch_y in loader.",
    },
    {
      heading: "nn.Module",
      body: "Subclass nn.Module. In __init__, define layers (nn.Linear, nn.ReLU, etc.) as attributes. In forward(self, x), wire them: x = self.fc1(x); x = self.relu(x); return self.fc2(x). Call model(x) to run the forward pass. Parameters are registered automatically.",
    },
    {
      heading: "Loss Functions",
      body: "BCEWithLogitsLoss: binary classification; input is raw logits, no sigmoid. CrossEntropyLoss: multi-class; input is (N, C) logits, target is (N,) class indices. MSELoss: regression; both input and target are (N, *). Match the loss to the task and output activation.",
    },
    {
      heading: "Optimizer",
      body: "Adam is the default choice: optimizer = torch.optim.Adam(model.parameters(), lr=1e-3). It adapts learning rates per parameter and works well out of the box. Call optimizer.zero_grad() before backward to clear old gradients, then optimizer.step() after backward to update weights.",
    },
    {
      heading: "Training Loop",
      body: "For each epoch: for batch in loader: (1) predictions = model(batch_x), (2) loss = criterion(predictions, batch_y), (3) loss.backward(), (4) optimizer.step(), (5) optimizer.zero_grad(). Move data to device (model.to(device), x.to(device)).",
    },
    {
      heading: "Validation Loop",
      body: "model.eval() and with torch.no_grad(): iterate over validation loader, compute loss and metrics. No backward. This gives an unbiased estimate of generalization. Compare train vs val loss: if train drops but val rises, you're overfitting.",
    },
    {
      heading: "Saving and Loading",
      body: "Save: torch.save(model.state_dict(), 'model.pt'). Load: model.load_state_dict(torch.load('model.pt')). Always call model.eval() when loading for inference. Save optimizer state too if resuming training.",
    },
    {
      heading: "Metrics and Debugging",
      body: "Plot loss curves: train and val loss vs epoch. Healthy: both decrease and stabilize. Overfitting: train keeps dropping, val rises. Underfitting: both high. Use early stopping when val loss stops improving.",
    },
  ],

  examples: [
    {
      title: "Custom Dataset",
      description: "Minimal Dataset implementation.",
      code: `from torch.utils.data import Dataset
class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = X
        self.y = y
    def __len__(self):
        return len(self.X)
    def __getitem__(self, i):
        return self.X[i], self.y[i]`,
    },
    {
      title: "Simple MLP",
      description: "Two-layer MLP with ReLU.",
      code: `import torch.nn as nn
class MLP(nn.Module):
    def __init__(self, in_f, hidden, out_f):
        super().__init__()
        self.fc1 = nn.Linear(in_f, hidden)
        self.fc2 = nn.Linear(hidden, out_f)
        self.relu = nn.ReLU()
    def forward(self, x):
        x = self.relu(self.fc1(x))
        return self.fc2(x)`,
    },
    {
      title: "Training Loop Skeleton",
      description: "One epoch of training.",
      code: `model.train()
for x, y in train_loader:
    x, y = x.to(device), y.to(device)
    pred = model(x)
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting model.train() and model.eval()",
      why: "Dropout and BatchNorm behave differently in train vs eval mode.",
      fix: "Call model.train() before training loop, model.eval() before validation/inference.",
    },
    {
      mistake: "Forgetting optimizer.zero_grad()",
      why: "Gradients accumulate; you'll get wrong updates.",
      fix: "Call optimizer.zero_grad() at the start of each batch (or after step).",
    },
    {
      mistake: "Using BCEWithLogitsLoss with sigmoid output",
      why: "BCEWithLogitsLoss applies sigmoid internally; double sigmoid causes numerical issues.",
      fix: "Use raw logits with BCEWithLogitsLoss; use sigmoid + BCELoss only if you need the probability explicitly.",
    },
  ],

  exercises: [
    {
      question: "What is the difference between BCEWithLogitsLoss and BCELoss?",
      answer:
        "BCEWithLogitsLoss combines sigmoid + BCE in one step, numerically stable. BCELoss expects probabilities (0–1); you must apply sigmoid yourself. Prefer BCEWithLogitsLoss for binary classification.",
    },
    {
      question: "Why do we use torch.no_grad() during validation?",
      answer:
        "We don't need gradients for evaluation; disabling them saves memory and speeds up the forward pass.",
    },
    {
      question: "Your training loss decreases but validation loss increases. What is happening and what can you try?",
      answer:
        "Overfitting. Try: more data, regularization (weight decay), dropout, early stopping, or a simpler model.",
    },
  ],

  furtherReading: [
    { title: "What Is ML, Really?", href: "/learn/ml/1/intro-to-ml", type: "internal" },
    { title: "Python Fundamentals for ML", href: "/learn/ml/1/python-fundamentals", type: "internal" },
    { title: "PyTorch I — Tensors & Broadcasting", href: "/learn/ml/1/pytorch-tensors", type: "internal" },
    { title: "PyTorch nn.Module", href: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html", type: "external" },
    { title: "PyTorch DataLoader", href: "https://pytorch.org/docs/stable/data.html", type: "external" },
  ],
};
