import type { StructuredContent } from "@/lib/structured-content";

export const introToMLContent: StructuredContent = {
  overview:
    "Machine learning is the practice of teaching computers to learn patterns from data instead of hand-coding rules. This chapter introduces the formal notation, core paradigms (supervised, unsupervised, reinforcement learning), the end-to-end ML pipeline, and the bias–variance tradeoff that underpins every model choice.",

  youWillLearn: [
    "Formal definitions: dataset notation {(x_i, y_i)}, hypothesis f(x;θ), empirical vs expected risk, generalization",
    "Supervised vs unsupervised vs reinforcement learning",
    "The ML pipeline: features → model → loss → optimization → generalization",
    "Parametric vs non-parametric models",
    "Bias–variance tradeoff and overfitting vs underfitting",
    "A short Python demo with sklearn (linear regression or classification)",
  ],

  mainContent: [
    {
      heading: "What Is Machine Learning?",
      body: "Machine learning flips the traditional programming paradigm. Instead of writing explicit rules (if house has 3 bedrooms and is in Brooklyn, then price ≈ X), you provide examples — thousands of input–output pairs — and an algorithm discovers the mapping. The computer learns from data.",
    },
    {
      heading: "Formal Notation",
      body: "A dataset is a collection of examples: D = {(x₁, y₁), (x₂, y₂), …, (xₙ, yₙ)}. Each xᵢ is a feature vector (e.g., [sqft, bedrooms, age]) and yᵢ is the target (e.g., price). A model is a function f(x; θ) parametrized by θ. Training finds θ that minimizes a loss function. The empirical risk is the average loss on the training set: R̂(θ) = (1/n) Σ L(f(xᵢ; θ), yᵢ). The expected risk is the loss over the true data distribution — what we care about in production. Generalization is the gap between training performance and performance on unseen data.",
    },
    {
      heading: "Supervised vs Unsupervised vs Reinforcement Learning",
      body: "In supervised learning, every example has a label (x, y). The model learns to predict y from x. Regression predicts continuous values (prices, temperatures); classification predicts discrete labels (spam/not-spam, digit 0–9). In unsupervised learning, there are no labels. The algorithm discovers structure: clustering groups similar points, dimensionality reduction finds compact representations. Reinforcement learning trains an agent that takes actions and receives rewards; the goal is to maximize cumulative reward over time.",
    },
    {
      heading: "The ML Pipeline",
      body: "Every ML project follows the same flow: (1) Collect and clean data. (2) Extract features — numeric representations the model can use. (3) Choose a model family (linear, tree, neural network). (4) Define a loss function that measures prediction error. (5) Optimize: find parameters that minimize the loss (e.g., via gradient descent). (6) Evaluate on held-out data to assess generalization. (7) Deploy and monitor.",
    },
    {
      heading: "Parametric vs Non-Parametric",
      body: "Parametric models (e.g., linear regression, neural networks) have a fixed number of parameters regardless of dataset size. Non-parametric models (e.g., k-NN, decision trees) grow with the data — they store or use the training set at prediction time. Parametric models are faster at inference; non-parametric ones can be more flexible but need more data.",
    },
    {
      heading: "Bias–Variance Tradeoff",
      body: "Error decomposes into bias (how wrong the model is on average — underfitting) and variance (how much predictions vary with different training sets — overfitting). Simple models have high bias, low variance; complex models have low bias, high variance. Regularization, cross-validation, and early stopping help find the sweet spot.",
    },
  ],

  examples: [
    {
      title: "Linear Regression with scikit-learn",
      description:
        "A minimal example: load data, fit a linear model, and evaluate.",
      code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_diabetes

X, y = load_diabetes(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
score = model.score(X_test, y_test)
print(f"R² on test set: {score:.4f}")`,
    },
    {
      title: "Classification with Logistic Regression",
      description: "Binary classification on the Iris dataset (two species).",
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
# Use only 2 classes for binary classification
X, y = X[y != 2], y[y != 2]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
print(f"Accuracy: {acc:.4f}")`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Evaluating on the same data you trained on",
      why: "The model can memorize training examples, giving falsely high accuracy.",
      fix: "Always use a held-out test set (or cross-validation) for honest evaluation.",
    },
    {
      mistake: "Using test data for model selection or tuning",
      why: "You leak information into the model; the test set is no longer 'unseen.'",
      fix: "Use a validation set for hyperparameter tuning; reserve the test set for final evaluation only.",
    },
    {
      mistake: "Ignoring feature scale",
      why: "Gradient descent and distance-based methods are sensitive to feature magnitudes.",
      fix: "Standardize (z-score) or normalize features before training.",
    },
  ],

  exercises: [
    {
      question: "In your own words, what is the difference between empirical risk and expected risk?",
      answer:
        "Empirical risk is the average loss on the training set — what we actually minimize. Expected risk is the average loss over the true data distribution (all possible examples). We care about expected risk in production, but we can only estimate it via a held-out test set.",
    },
    {
      question: "Give one example each of a supervised, unsupervised, and reinforcement learning problem.",
      answer:
        "Supervised: predicting house prices from features. Unsupervised: clustering customers by purchase behavior. Reinforcement: training a robot to walk by rewarding forward motion.",
    },
    {
      question: "Why does a model that fits the training data perfectly often perform poorly on new data?",
      answer:
        "It has overfit — high variance. It memorized noise and idiosyncrasies of the training set instead of learning generalizable patterns. Regularization and validation help prevent this.",
    },
  ],

  furtherReading: [
    { title: "Python Fundamentals for ML", href: "/learn/ml/1/python-fundamentals", type: "internal" },
    { title: "PyTorch I — Tensors & Broadcasting", href: "/learn/ml/1/pytorch-tensors", type: "internal" },
    { title: "PyTorch II — Training Pipelines", href: "/learn/ml/1/pytorch-pipelines", type: "internal" },
    { title: "CS229 Lecture Notes — Introduction", href: "https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf", type: "external" },
    { title: "scikit-learn User Guide", href: "https://scikit-learn.org/stable/user_guide.html", type: "external" },
  ],
};
