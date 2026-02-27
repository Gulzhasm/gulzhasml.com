import type { StructuredContent } from "@/lib/structured-content";

export const pytorchBasicsContent: StructuredContent = {
  overview:
    "PyTorch is a deep learning framework built around tensors, automatic differentiation (autograd), and a simple module system for building neural networks. This chapter takes you from zero PyTorch knowledge to writing and understanding a complete training loop for a small neural network.",

  youWillLearn: [
    "What tensors are in PyTorch and how they relate to NumPy arrays",
    "How autograd tracks operations and computes gradients for backpropagation",
    "How to define models by subclassing nn.Module and implementing forward",
    "How to choose and use common loss functions and optimisers",
    "How to write clean training and evaluation loops",
    "How to move models and data between CPU and GPU",
  ],

  mainContent: [
    {
      heading: "Tensors: PyTorch’s Core Data Structure",
      body:
        "At the heart of PyTorch is the tensor: an n-dimensional array very similar to a NumPy ndarray but with first-class support for GPU acceleration and automatic differentiation. You create tensors with functions like `torch.tensor`, `torch.zeros`, `torch.ones`, and `torch.randn`. Every tensor has a `.shape`, `.dtype`, and `.device`. For example, a batch of 32 samples with 10 features each has shape `(32, 10)`. A good mental model is that tensors are to PyTorch what arrays are to NumPy: the universal container for numeric data.",
    },
    {
      heading: "Autograd: Automatic Differentiation",
      body:
        "Training neural networks requires gradients of a loss function with respect to model parameters. PyTorch’s autograd system does this automatically. When you create tensors with `requires_grad=True` and perform operations on them, PyTorch builds a computation graph behind the scenes. Calling `loss.backward()` traverses this graph in reverse and computes `.grad` for every leaf tensor that requires gradients. This is backpropagation implemented generically: you still choose the model and loss, but you no longer have to derive or code gradients by hand.",
    },
    {
      heading: "Building Models with nn.Module",
      body:
        "PyTorch organises learnable models using the `nn.Module` class. To define a model, you subclass `nn.Module`, declare layers in `__init__`, and implement a `forward(self, x)` method that describes how inputs flow through those layers. For example, a simple multilayer perceptron might have two `nn.Linear` layers with a ReLU nonlinearity in between. Calling `model(x)` runs the `forward` method, building the computation graph that autograd will later use to compute gradients.",
    },
    {
      heading: "Loss Functions and Optimisers",
      body:
        "Loss functions measure how wrong predictions are. PyTorch provides many in `torch.nn`: `MSELoss` for regression, `BCEWithLogitsLoss` for binary classification with logits, `CrossEntropyLoss` for multi-class classification, and more. Optimisers in `torch.optim` (e.g. SGD, Adam) update model parameters using gradients. A typical training step looks like: compute predictions, compute loss, call `optimizer.zero_grad()`, call `loss.backward()`, and then `optimizer.step()`. The optimiser reads gradients from `.grad` fields and applies the chosen update rule.",
    },
    {
      heading: "Training and Evaluation Loops",
      body:
        "Real training code wraps the basic optimisation step inside loops. For each epoch you iterate over batches from a `DataLoader`, call the model, compute loss, backpropagate, and step the optimiser. During evaluation, you disable gradient tracking with `torch.no_grad()` and set the model to evaluation mode with `model.eval()`. This turns off training-specific behaviour such as dropout and batch normalisation statistics updates. Separating training and evaluation code keeps your metrics meaningful and your models reproducible.",
    },
    {
      heading: "Using GPUs",
      body:
        "One of PyTorch’s strengths is seamless GPU acceleration. You can move a model or tensor to a GPU device with `.to(device)` or `.cuda()`, where `device` is typically something like `torch.device(\"cuda\")` or `torch.device(\"cpu\")`. The important rule is that all tensors involved in the same operation must live on the same device. A common pattern is to create `device = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")`, then call `model.to(device)` once and move each batch to that device before computing `outputs = model(x_batch)`.",
    },
  ],

  examples: [
    {
      title: "Tensors and Autograd in a Nutshell",
      description: "A minimal example showing tensor creation and gradient computation.",
      code: `import torch

x = torch.tensor(2.0, requires_grad=True)
y = (3 * x + 1) ** 2  # computation graph

y.backward()          # compute dy/dx
print(x.grad)         # should be 2 * (3x + 1) * 3 = 42`,
    },
    {
      title: "A Tiny MLP and Training Step",
      description: "Defining a simple classifier and running one optimisation step.",
      code: `import torch
import torch.nn as nn
import torch.optim as optim

class MLP(nn.Module):
    def __init__(self, in_features: int, hidden: int, out_features: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden),
            nn.ReLU(),
            nn.Linear(hidden, out_features),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

model = MLP(in_features=2, hidden=8, out_features=1)
criterion = nn.BCEWithLogitsLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-2)

x_batch = torch.randn(32, 2)
y_batch = torch.randint(0, 2, (32, 1)).float()

optimizer.zero_grad()
logits = model(x_batch)
loss = criterion(logits, y_batch)
loss.backward()
optimizer.step()`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting optimizer.zero_grad() before loss.backward()",
      why:
        "Gradients accumulate by default; without resetting, each backward pass adds to the previous gradients, leading to incorrect updates.",
      fix:
        "Always call `optimizer.zero_grad()` (or `model.zero_grad()`) before `loss.backward()` in each training iteration.",
    },
    {
      mistake: "Using the wrong loss for the output activation",
      why:
        "For example, applying `sigmoid` in the model and then using `BCEWithLogitsLoss` applies sigmoid twice and harms numerical stability.",
      fix:
        "Match loss and output correctly: use raw logits with `BCEWithLogitsLoss` or `CrossEntropyLoss`, and only apply softmax/sigmoid manually when you need probabilities for inspection.",
    },
    {
      mistake: "Mixing CPU and GPU tensors in the same operation",
      why:
        "PyTorch cannot add or multiply tensors on different devices; this raises runtime errors.",
      fix:
        "Choose a `device` and move both model and data to it (`model.to(device)` and `x.to(device)`) before computing.",
    },
  ],

  exercises: [
    {
      question:
        "Write a function `train_step(model, optimizer, criterion, x_batch, y_batch)` that runs one optimisation step in PyTorch. What are the three key API calls inside?",
      answer:
        "A typical implementation calls `optimizer.zero_grad()`, then `loss = criterion(model(x_batch), y_batch)`, then `loss.backward()` and `optimizer.step()`. The three key calls are: `optimizer.zero_grad()`, `loss.backward()`, and `optimizer.step()`.",
    },
    {
      question:
        "Create a tensor of shape (4, 3) with requires_grad=True and compute the gradient of the mean of its squared entries with respect to the tensor.",
      answer:
        "Example: `x = torch.randn(4, 3, requires_grad=True); y = (x ** 2).mean(); y.backward();` then `x.grad` holds the gradient, which should be `2x / (4*3)` for each element.",
    },
  ],

  furtherReading: [
    {
      title: "PyTorch I — Tensors, Matmul & Broadcasting",
      href: "/learn/ml/1/pytorch-tensors",
      type: "internal",
    },
    {
      title: "PyTorch II — Building Complete Training Pipelines",
      href: "/learn/ml/1/pytorch-pipelines",
      type: "internal",
    },
    {
      title: "Python Fundamentals for ML (Notebook)",
      href: "/learn/ml/1/python-fundamentals",
      type: "internal",
    },
    {
      title: "PyTorch: Learn the Basics",
      href: "https://pytorch.org/tutorials/beginner/basics/intro.html",
      type: "external",
    },
    {
      title: "PyTorch: Build the Neural Network",
      href: "https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
      type: "external",
    },
  ],
};

