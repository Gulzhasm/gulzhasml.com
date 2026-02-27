import type { StructuredContent } from "@/lib/structured-content";

export const pythonFundamentalsContent: StructuredContent = {
  overview:
    "Python is the lingua franca of machine learning. This chapter covers data types, collections (lists, dicts, sets, tuples) with ML-oriented examples, NumPy array basics and shapes, functions and comprehensions for dataset prep, reading CSV, basic data cleaning, and a simple train/test split.",

  youWillLearn: [
    "Data types (int, float, str, bool) and their use in ML code",
    "Lists, dicts, sets, tuples with ML examples (config dicts, class labels, tensor shapes)",
    "NumPy arrays: creation, shapes, indexing",
    "Functions and comprehensions for dataset preparation",
    "Reading CSV, basic data cleaning, train/test split",
  ],

  mainContent: [
    {
      heading: "Data Types in ML",
      body: "Integers store counts (num_epochs, batch_size). Floats store hyperparameters (learning_rate, dropout). Strings store names (optimizer='Adam', model_path). Booleans toggle behavior (is_training=True). These four types appear in every ML script.",
    },
    {
      heading: "Lists, Dicts, Sets, Tuples",
      body: "A list is an ordered, mutable sequence — e.g., a column of feature values. A tuple is immutable, ideal for fixed shapes like (28, 28, 1). A dict maps keys to values: config = {'lr': 0.01, 'epochs': 100} bundles hyperparameters. A set stores unique elements — useful for distinct class labels: set(y_train) gives you all classes.",
    },
    {
      heading: "NumPy Arrays",
      body: "NumPy arrays are the foundation of numerical Python. Create with np.array(), np.zeros(), np.ones(), np.arange(). The .shape attribute is critical — (n_samples, n_features) for a design matrix. Indexing and slicing work like lists but can operate on multiple dimensions. Vectorization (array operations without loops) is essential for speed.",
    },
    {
      heading: "Functions and Comprehensions",
      body: "Functions encapsulate logic: def normalize(x): return (x - x.mean()) / x.std(). List comprehensions build lists concisely: [x**2 for x in features]. Dict comprehensions: {k: v*2 for k, v in config.items()}. These patterns appear constantly in data preprocessing.",
    },
    {
      heading: "Reading CSV and Data Cleaning",
      body: "Use pandas: df = pd.read_csv('data.csv'). Inspect with df.head(), df.info(), df.describe(). Handle missing values: df.dropna() or df.fillna(value). Filter invalid rows: df[df['age'] > 0]. Convert types: df['date'] = pd.to_datetime(df['date']).",
    },
    {
      heading: "Train/Test Split",
      body: "Never evaluate on data you trained on. Use sklearn: X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42). The random_state ensures reproducibility. For classification, use stratify=y to preserve class proportions.",
    },
  ],

  examples: [
    {
      title: "Config Dict and List Comprehension",
      description: "Hyperparameters as a dict; build a list of squared features.",
      code: `config = {"lr": 0.001, "batch_size": 32, "epochs": 100}
features = [1.2, 3.4, 5.6, 7.8]
squared = [f**2 for f in features]
print(squared)  # [1.44, 11.56, 31.36, 60.84]`,
    },
    {
      title: "NumPy Array and Shape",
      description: "Create a design matrix and check its shape.",
      code: `import numpy as np
X = np.array([[1, 2], [3, 4], [5, 6]])
print(X.shape)  # (3, 2) — 3 samples, 2 features
print(X.mean(axis=0))  # [3., 4.] — mean per feature`,
    },
    {
      title: "CSV Load and Train/Test Split",
      description: "Load a CSV, extract features and target, split.",
      code: `import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("data.csv")
X = df[["feat1", "feat2"]].values
y = df["target"].values
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Using Python lists for large numerical computations",
      why: "Lists are slow; NumPy uses optimized C code.",
      fix: "Convert to np.array() and use vectorized operations.",
    },
    {
      mistake: "Splitting before cleaning",
      why: "Test set statistics can leak into training if you clean using global stats.",
      fix: "Split first, then compute normalization (mean, std) from the training set only and apply to both.",
    },
    {
      mistake: "Forgetting random_state in train_test_split",
      why: "Results are not reproducible; each run gives different splits.",
      fix: "Always set random_state=42 (or another fixed value) for reproducibility.",
    },
  ],

  exercises: [
    {
      question: "Write a function that takes a list of numbers and returns (mean, variance). Use only a loop and arithmetic.",
      answer:
        "def mean_var(nums):\n  n = len(nums)\n  mean = sum(nums) / n\n  variance = sum((x - mean)**2 for x in nums) / n\n  return mean, variance",
    },
    {
      question: "Given a list of dicts (e.g., [{'valid': True, 'x': 1}, {'valid': False, 'x': 2}]), write a comprehension to filter only valid entries.",
      answer:
        "[d for d in data if d.get('valid', False)]",
    },
    {
      question: "What does X.shape return for a 2D array with 100 samples and 5 features?",
      answer:
        "(100, 5) — (n_samples, n_features) is the standard convention.",
    },
  ],

  furtherReading: [
    { title: "What Is ML, Really?", href: "/learn/ml/1/intro-to-ml", type: "internal" },
    { title: "PyTorch I — Tensors & Broadcasting", href: "/learn/ml/1/pytorch-tensors", type: "internal" },
    { title: "PyTorch II — Training Pipelines", href: "/learn/ml/1/pytorch-pipelines", type: "internal" },
    { title: "NumPy Quickstart", href: "https://numpy.org/doc/stable/user/quickstart.html", type: "external" },
    { title: "Pandas Getting Started", href: "https://pandas.pydata.org/docs/getting_started/index.html", type: "external" },
  ],
};
