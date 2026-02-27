import type { StructuredContent } from "@/lib/structured-content";

export const pytorchTensorsContent: StructuredContent = {
  overview:
    "PyTorch tensors are the building blocks of deep learning: multi-dimensional arrays that run on CPU or GPU and support automatic differentiation. This chapter covers tensor creation, dtype and device, shape semantics, broadcasting rules, matrix multiplication, reshape/view/transpose/permute, and autograd basics.",

  youWillLearn: [
    "Tensor creation: from lists, NumPy, zeros, ones, randn, arange",
    "dtype and device (CPU vs CUDA)",
    "Shape semantics and common bugs",
    "Broadcasting rules with clear examples",
    "Matrix multiplication (matmul) rules and examples",
    "reshape, view, transpose, permute",
    "autograd: requires_grad, backward()",
  ],

  mainContent: [
    {
      heading: "Tensors: Creation and Properties",
      body: "Create tensors with torch.tensor(), torch.zeros(), torch.ones(), torch.randn(), torch.arange(). Every tensor has .shape, .dtype (float32, int64, etc.), and .device (cpu or cuda). Check these constantly — shape mismatches are the #1 source of bugs in deep learning.",
    },
    {
      heading: "Shape Semantics",
      body: "Convention: (batch, features) for 2D, (batch, channels, height, width) for images. A design matrix X has shape (n_samples, n_features). A batch of images has (B, C, H, W). Linear layer expects input (batch, in_features) and weight (out_features, in_features); output is (batch, out_features).",
    },
    {
      heading: "Broadcasting",
      body: "Dimensions are compared from right to left. They are compatible if equal or one is 1. (3, 4) and (4,) → (3, 4). (3, 1) and (1, 5) → (3, 5). Example: subtract a mean vector from a batch: x - x.mean(dim=0) broadcasts the mean across the batch.",
    },
    {
      heading: "Matrix Multiplication",
      body: "torch.matmul(A, B) or A @ B. For 2D: (m, k) @ (k, n) → (m, n). For batches: (b, m, k) @ (b, k, n) → (b, m, n). Element-wise * is the Hadamard product — same shape required. A linear layer does y = x @ W.T + b.",
    },
    {
      heading: "Reshape, View, Transpose, Permute",
      body: "view and reshape change shape without copying (if contiguous). squeeze() removes dims of size 1; unsqueeze(dim) adds one. transpose(dim0, dim1) swaps two dimensions. permute(dims) reorders all dimensions — e.g., (B,H,W,C) → (B,C,H,W) for conv layers.",
    },
    {
      heading: "Autograd Basics",
      body: "Set requires_grad=True on tensors you want to differentiate. Operations build a computation graph. Call .backward() on a scalar loss to compute gradients. Access gradients via .grad. Use torch.no_grad() when you don't need gradients (e.g., validation).",
    },
  ],

  examples: [
    {
      title: "Tensor Creation and Shape",
      description: "Create tensors and inspect properties.",
      code: `import torch
x = torch.randn(3, 4)
print(x.shape)   # (3, 4)
print(x.dtype)   # torch.float32
print(x.device)  # cpu`,
    },
    {
      title: "Broadcasting",
      description: "Subtract per-feature mean from a batch.",
      code: `import torch
X = torch.randn(32, 10)  # 32 samples, 10 features
mean = X.mean(dim=0)     # (10,)
X_centered = X - mean    # (32,10) - (10,) broadcasts to (32,10)`,
    },
    {
      title: "Matrix Multiplication",
      description: "Linear transformation: (batch, in) @ (out, in).T",
      code: `import torch
batch, in_f, out_f = 8, 64, 32
x = torch.randn(batch, in_f)
W = torch.randn(out_f, in_f)
y = x @ W.T  # (8, 64) @ (32, 64).T = (8, 32)`,
    },
    {
      title: "Autograd",
      description: "Compute gradients for a simple loss.",
      code: `import torch
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = x ** 2
loss = y.sum()
loss.backward()
print(x.grad)  # [2., 4., 6.]`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Using * instead of @ for matrix multiplication",
      why: "* is element-wise; you get shape errors or wrong results.",
      fix: "Use torch.matmul or @ for matrix multiplication.",
    },
    {
      mistake: "Broadcasting producing wrong shapes silently",
      why: "PyTorch broadcasts (1,) to match; you may get (3,4) when you wanted (4,3).",
      fix: "Check .shape after every operation; use unsqueeze explicitly when needed.",
    },
    {
      mistake: "In-place operations breaking autograd",
      why: "x.add_(1) modifies x in place; the graph may not track it correctly.",
      fix: "Avoid in-place ops on tensors with requires_grad=True; use x = x + 1.",
    },
  ],

  exercises: [
    {
      question: "What is the output shape of torch.randn(5, 3) @ torch.randn(3, 7)?",
      answer:
        "(5, 7) — (5,3) @ (3,7) → (5,7).",
    },
    {
      question: "Given x of shape (3, 4), write one line to add a batch dimension so it becomes (1, 3, 4).",
      answer:
        "x.unsqueeze(0) or x.unsqueeze(dim=0)",
    },
    {
      question: "Why does loss.backward() require loss to be a scalar?",
      answer:
        "Gradients are defined for scalar outputs; we need a single number to backpropagate through. For vector loss, use .sum() or .mean() first.",
    },
  ],

  furtherReading: [
    { title: "What Is ML, Really?", href: "/learn/ml/1/intro-to-ml", type: "internal" },
    { title: "Python Fundamentals for ML", href: "/learn/ml/1/python-fundamentals", type: "internal" },
    { title: "PyTorch II — Training Pipelines", href: "/learn/ml/1/pytorch-pipelines", type: "internal" },
    { title: "PyTorch Tensors Tutorial", href: "https://pytorch.org/tutorials/beginner/basics/tensor_tutorial.html", type: "external" },
    { title: "PyTorch Broadcasting Semantics", href: "https://pytorch.org/docs/stable/notes/broadcasting.html", type: "external" },
  ],
};
