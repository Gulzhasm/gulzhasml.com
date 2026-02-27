import type { StructuredContent } from "@/lib/structured-content";

export const week4Content: Record<string, StructuredContent> = {
  "classification-theory": {
    overview:
      "This chapter introduces logistic regression as a probabilistic classifier, develops binary cross-entropy loss, decision boundaries, multi-class extensions, and exposes the fundamental limitation of linear classifiers via the XOR problem.",
    youWillLearn: [
      "How logistic regression maps linear scores to probabilities with the sigmoid",
      "Binary cross-entropy loss and why it strongly penalises confident mistakes",
      "How to interpret and visualise decision boundaries in feature space",
      "Multi-class extensions via one-vs-all and softmax regression",
      "Why XOR cannot be solved by any linear classifier and what that implies",
    ],
    mainContent: [
      {
        heading: "From Linear Scores to Probabilities",
        body:
          "Linear regression outputs unbounded real numbers, unsuitable as probabilities. Logistic regression instead models P(y = 1 | x) by passing a linear score z = wᵀx + b through the sigmoid σ(z) = 1 / (1 + exp(−z)). This squash function maps ℝ to (0, 1) and is monotonically increasing, so higher scores correspond to higher probabilities. The model is still linear in the input space, but the output is now interpretable as a probability, which is essential in calibrated decision-making.",
      },
      {
        heading: "Binary Cross-Entropy Loss",
        body:
          "Given predicted probability p_i = P(y_i = 1 | x_i) and true label y_i ∈ {0, 1}, the binary cross-entropy loss for a single example is ℓ_i = −[y_i log p_i + (1 − y_i) log(1 − p_i)]. For a dataset it becomes J(w, b) = (1/n) Σ ℓ_i. This loss arises from maximum likelihood under a Bernoulli model and has a crucial property: it punishes confident errors much more heavily than uncertain ones. Predicting p = 0.01 when y = 1 produces a very large loss, which pushes gradients to correct extreme miscalibrations aggressively.",
      },
      {
        heading: "Decision Boundaries",
        body:
          "In logistic regression, the decision rule for balanced classes is typically ŷ = 1 if p ≥ 0.5 and ŷ = 0 otherwise. The boundary p = 0.5 corresponds to z = 0, i.e., wᵀx + b = 0. This is a hyperplane in feature space: a line in 2D, a plane in 3D. Visualising this boundary on simple 2D problems (e.g., two Iris classes with two features) yields an immediate geometric interpretation of what the model is doing: it is carving the feature space into two half-spaces.",
      },
      {
        heading: "Multi-Class Extensions",
        body:
          "Multi-class classification with K > 2 classes can be handled by training K independent binary classifiers (one-vs-all) or by using softmax regression. Softmax models P(y = k | x) = exp(w_kᵀx + b_k) / Σ_j exp(w_jᵀx + b_j). The corresponding cross-entropy loss generalises binary cross-entropy and encourages the correct class’s logit to dominate. While logistic regression and softmax are linear in x, stacking them with non-linear feature maps yields the building blocks of deep networks.",
      },
      {
        heading: "The XOR Limitation",
        body:
          "The XOR dataset consists of four points: (0,0) and (1,1) with label 0, and (0,1) and (1,0) with label 1. No single line can separate the positive and negative points: any line that separates one positive from a negative will misclassify the other pair. Logistic regression will converge to a solution that minimises loss but cannot achieve zero training error; accuracy plateaus at 50%. This exposes a fundamental limit of all linear classifiers and motivates the need for non-linear feature transforms or multi-layer networks.",
      },
    ],
    examples: [
      {
        title: "Logistic Sigmoid and Decision Rule",
        description:
          "Compute probabilities and classify based on the 0.5 threshold.",
        code:
          "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\nz = np.linspace(-6, 6, 13)\nprobs = sigmoid(z)\nlabels = (probs >= 0.5).astype(int)\nfor zi, pi, yi in zip(z, probs, labels):\n    print(f\"z={zi:5.2f}, p={pi:5.2f}, y_hat={yi}\")",
      },
    ],
    commonMistakes: [
      {
        mistake: "Optimising logistic regression with MSE instead of cross-entropy",
        why:
          "MSE is less appropriate for probabilities and can lead to slower learning and poor calibration.",
        fix:
          "Use cross-entropy (binary or softmax) derived from maximum likelihood for classification tasks.",
      },
      {
        mistake: "Assuming linear decision boundaries can solve any classification problem",
        why:
          "Non-linearly separable problems like XOR cannot be solved by any linear classifier regardless of optimisation.",
        fix:
          "Apply feature engineering (e.g., polynomial features) or use non-linear models such as kernel methods or neural networks.",
      },
    ],
    exercises: [
      {
        question:
          "Write down the gradient of the binary cross-entropy loss with respect to the weights in logistic regression.",
        answer:
          "For logits z_i = wᵀx_i and predictions p_i = σ(z_i), the gradient is ∂J/∂w = (1/n) Σ_i (p_i − y_i) x_i. This closely resembles the gradient for MSE in linear regression, with (p_i − y_i) replacing the residual.",
      },
      {
        question:
          "Explain why logistic regression cannot solve XOR without feature transformations.",
        answer:
          "XOR’s positive and negative points are not linearly separable in the original input space; the convex hulls of the classes intersect. Since logistic regression’s decision boundary is a single hyperplane, it cannot represent the disjoint regions required. Mapping to a higher-dimensional feature space (e.g., including a product term x1·x2) or using a network with hidden layers can separate the classes.",
      },
    ],
    furtherReading: [
      {
        title: "Logistic Regression from Scratch in PyTorch",
        href: "/learn/ml/4/classification-implementation",
        type: "internal",
      },
      {
        title: "scikit-learn: Logistic Regression",
        href: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
        type: "external",
      },
    ],
  },

  "classification-implementation": {
    overview:
      "Here you implement logistic regression in PyTorch: sigmoid, linear layer, binary cross-entropy, training on Iris, decision boundary visualisation, one-vs-all multi-class, and a hands-on failure case on XOR.",
    youWillLearn: [
      "Implementing sigmoid and binary cross-entropy in PyTorch",
      "Building a LogisticRegression nn.Module",
      "Training and evaluating on a binary Iris subset",
      "Visualising decision boundaries in 2D feature space",
      "Extending logistic regression to multi-class via one-vs-all",
      "Empirically observing failure on XOR",
    ],
    mainContent: [
      {
        heading: "Implementing Sigmoid and BCE",
        body:
          "You begin by implementing the sigmoid function as a differentiable PyTorch operation: sigma = 1 / (1 + torch.exp(−z)). For numerical stability you typically compute BCE as −(y log(p + ε) + (1 − y) log(1 − p + ε)).mean(), where ε ≈ 1e−7 avoids log(0). Coding this yourself rather than relying on nn.BCELoss reinforces the connection between probabilities and loss.",
      },
      {
        heading: "LogisticRegression Module",
        body:
          "The LogisticRegression module consists of a single nn.Linear layer producing a logit z = wᵀx + b, followed by a sigmoid during training to obtain probabilities. For BCEWithLogitsLoss you feed logits directly into the loss without applying sigmoid in the forward method, leaving stabilisation to the loss implementation. This pattern generalises to many other models.",
      },
      {
        heading: "Training on Iris and Plotting Boundaries",
        body:
          "Selecting two Iris classes and two features yields a 2D problem that is easy to visualise. After training, you generate a dense grid over the feature space, pass each point through the model, and colour points by predicted class. Overlaying training data reveals how the linear boundary cuts the plane, which points are close to the boundary (uncertain), and which are far (confident).",
      },
      {
        heading: "One-vs-All Multi-Class and XOR",
        body:
          "For three-class Iris you train three binary logistic regressions, each distinguishing one class from the rest. At prediction time you take the argmax over the three predicted probabilities. Finally, you apply the same implementation to XOR and confirm that training loss stalls above zero and accuracy saturates at 0.5, regardless of optimisation details. This makes the linear limitation of logistic regression concrete.",
      },
    ],
    examples: [
      {
        title: "PyTorch LogisticRegression Module",
        description: "Minimal binary logistic regression model with logits.",
        code:
          "import torch\nimport torch.nn as nn\n\nclass LogisticRegression(nn.Module):\n    def __init__(self, in_features: int):\n        super().__init__()\n        self.linear = nn.Linear(in_features, 1)\n\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        return self.linear(x)  # logits; use with BCEWithLogitsLoss",
      },
      {
        title: "Decision Boundary Plotting Skeleton",
        description:
          "Generate a grid over 2D features and classify each point for visualisation.",
        code:
          "import numpy as np\n\n# assume model, x_train, y_train exist and features are 2D\nx_min, x_max = x_train[:, 0].min() - 1, x_train[:, 0].max() + 1\ny_min, y_max = x_train[:, 1].min() - 1, x_train[:, 1].max() + 1\nxx, yy = np.meshgrid(np.linspace(x_min, x_max, 200),\n                     np.linspace(y_min, y_max, 200))\n\nwith torch.no_grad():\n    grid = torch.from_numpy(np.c_[xx.ravel(), yy.ravel()]).float().to(device)\n    logits = model(grid)\n    probs = torch.sigmoid(logits).cpu().numpy().reshape(xx.shape)\n\n# contour plot on probs to show boundary at 0.5",
      },
    ],
    commonMistakes: [
      {
        mistake: "Applying sigmoid before using BCEWithLogitsLoss",
        why:
          "BCEWithLogitsLoss expects raw logits and applies sigmoid internally; a double sigmoid harms numerical stability and training.",
        fix:
          "Return logits from the model and feed them directly to BCEWithLogitsLoss; only apply sigmoid when you explicitly need probabilities for interpretation.",
      },
      {
        mistake: "Forgetting to balance classes when they are imbalanced",
        why:
          "In strongly imbalanced datasets, the model can achieve high accuracy by predicting the majority class.",
        fix:
          "Use class weights in the loss, resampling strategies, or evaluation metrics beyond accuracy (precision, recall, F1).",
      },
    ],
    exercises: [
      {
        question:
          "Modify the implementation to use BCEWithLogitsLoss instead of a manual BCE implementation. What changes in the model’s forward method are required?",
        answer:
          "Return logits from forward (no sigmoid), instantiate criterion = nn.BCEWithLogitsLoss(), and feed logits directly into criterion(logits, targets).",
      },
      {
        question:
          "Train logistic regression on XOR and report training loss and accuracy. Explain the results.",
        answer:
          "Training loss plateaus above zero and accuracy remains around 0.5 because no linear boundary can separate the XOR pattern. The optimiser finds the best compromise but cannot achieve perfect classification.",
      },
    ],
    furtherReading: [
      {
        title: "Logistic Regression — Drawing Lines Between Classes",
        href: "/learn/ml/4/classification-theory",
        type: "internal",
      },
      {
        title: "PyTorch: nn.BCEWithLogitsLoss",
        href: "https://pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html",
        type: "external",
      },
    ],
  },
};

