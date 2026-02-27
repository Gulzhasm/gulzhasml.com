import type { StructuredContent } from "@/lib/structured-content";

export const week3Content: Record<string, StructuredContent> = {
  "linear-regression-theory": {
    overview:
      "Linear regression is the canonical model for predicting continuous quantities. This chapter develops its hypothesis function, mean squared error loss, gradient descent optimisation, feature normalisation, and the bias–variance trade-off, culminating in Ridge (L2) regularisation.",
    youWillLearn: [
      "The linear regression hypothesis ŷ = wᵀx + b and geometric interpretation",
      "Mean Squared Error (MSE) as a loss function and its properties",
      "Batch gradient descent updates derived from first principles",
      "Why feature scaling is critical for optimisation",
      "How model complexity, noise and regularisation interact via bias–variance",
      "How L2 regularisation (Ridge) constrains weights and controls overfitting",
    ],
    mainContent: [
      {
        heading: "Hypothesis Function and Geometry",
        body:
          "For a d-dimensional feature vector x ∈ ℝᵈ, linear regression assumes a hypothesis of the form ŷ = wᵀx + b, where w ∈ ℝᵈ and b ∈ ℝ. Each weight w_j measures how sensitive the prediction is to feature x_j. In two dimensions the graph is a line; in higher dimensions it is a hyperplane. Interpreting w_j in the context of standardised features allows you to say things like 'a one-standard-deviation increase in BMI is associated with a β-unit change in the target,' which is the basis for effect size interpretation in many applied fields.",
      },
      {
        heading: "Mean Squared Error and Convexity",
        body:
          "Given n training examples (x_i, y_i), the Mean Squared Error loss is J(w, b) = (1/n) Σ (wᵀx_i + b − y_i)². This is a convex quadratic function in (w, b), which means it has a unique global minimum. Convexity is extremely valuable: any local descent method that continues to decrease the loss must converge to the global optimum. Analytically, one can solve for (w, b) in closed form via the normal equations, but in high dimensions or when adding regularisation, gradient-based methods are more practical and extend naturally to neural networks.",
      },
      {
        heading: "Gradient Descent for Linear Regression",
        body:
          "To minimise MSE via gradient descent we compute partial derivatives. Writing predictions as ŷ_i = wᵀx_i + b, the gradient with respect to w is ∂J/∂w = (2/n) Xᵀ(Xw + b1 − y), and the gradient for b is ∂J/∂b = (2/n) Σ (ŷ_i − y_i). The update rule is w ← w − α ∂J/∂w and b ← b − α ∂J/∂b, where α is the learning rate. Too large an α leads to divergence; too small slows convergence. In practice you diagnose bad choices of α by visualising the training loss over iterations.",
      },
      {
        heading: "Feature Scaling and Conditioning",
        body:
          "If features have wildly different scales (e.g., income in thousands vs age in years), the loss surface becomes elongated and ill-conditioned. Gradient descent then 'zig-zags' and converges slowly. Standardisation (z-scoring) each column of X to zero mean and unit variance makes the problem isotropic in parameter space, leading to more circular level sets and faster, more stable optimisation. Importantly, you must compute scaling parameters on the training set only and reuse them on validation and test sets to avoid data leakage.",
      },
      {
        heading: "Bias–Variance and L2 Regularisation",
        body:
          "Increasing model flexibility (more features, polynomial terms) reduces bias but increases variance: the model can fit training noise. L2 regularisation modifies the objective to J_reg(w, b) = J(w, b) + λ‖w‖²₂. This shrinks weights toward zero, effectively penalising overly complex solutions. Geometrically, the unconstrained optimum is projected onto a ball of radius depending on λ. As λ grows, variance decreases but bias increases. Cross-validation over a grid of λ values lets you trade these off empirically and pick the value that minimises validation error.",
      },
    ],
    examples: [
      {
        title: "Gradient Descent on a Toy Dataset",
        description:
          "Implement batch gradient descent for a 1D linear regression problem.",
        code:
          "import numpy as np\n\n# Synthetic data\nx = np.linspace(0, 10, 100)\ny_true = 3 * x + 5\nnoise = np.random.randn(*x.shape) * 2\ny = y_true + noise\n\nX = np.c_[x, np.ones_like(x)]  # shape (100, 2)\nw = np.zeros(2)\n\nalpha = 1e-3\nfor _ in range(1000):\n    preds = X @ w\n    grad = 2 / len(X) * X.T @ (preds - y)\n    w -= alpha * grad\n\nprint(\"Learned weights:\", w)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using unscaled features with gradient descent",
        why:
          "Leads to slow or unstable convergence because the loss surface is poorly conditioned.",
        fix:
          "Standardise features (subtract mean, divide by standard deviation) based on training data before optimisation.",
      },
      {
        mistake: "Choosing λ for L2 regularisation by eye on training loss",
        why:
          "Regularisation trades training error for generalisation; training loss alone cannot tell you the best λ.",
        fix:
          "Use a validation set or cross-validation to select λ that minimises validation error.",
      },
    ],
    exercises: [
      {
        question:
          "Show that the MSE loss for linear regression is convex in (w, b). Sketch the argument.",
        answer:
          "MSE is a composition of a convex quadratic function with an affine transformation of (w, b): J(w, b) = (1/n)‖Xw + b1 − y‖²₂. Quadratic forms with positive semidefinite matrices are convex. The Hessian is (2/n) [XᵀX  Xᵀ1; 1ᵀX  1ᵀ1], which is positive semidefinite, confirming convexity.",
      },
      {
        question:
          "Explain how increasing λ in Ridge regression affects the bias and variance of the estimator.",
        answer:
          "Larger λ shrinks coefficients more aggressively toward zero, which increases bias (the model underfits) but reduces variance (less sensitivity to sampling noise).",
      },
    ],
    furtherReading: [
      {
        title: "Building Linear Regression from Scratch in PyTorch",
        href: "/learn/ml/3/regression-implementation",
        type: "internal",
      },
      {
        title: "Elements of Statistical Learning — Chapter 3",
        href: "https://hastie.su.domains/ElemStatLearn/",
        type: "external",
      },
    ],
  },

  "regression-implementation": {
    overview:
      "This chapter turns the theory of linear regression into an end-to-end PyTorch implementation on a real dataset. You will implement a custom model, MSE loss, gradient descent, feature scaling and regularisation, and interpret learned weights.",
    youWillLearn: [
      "Implementing LinearRegression as an nn.Module with learnable parameters",
      "Computing MSE loss manually and via PyTorch",
      "Normalising features correctly using only training statistics",
      "Monitoring training and validation loss curves for convergence",
      "Inspecting and interpreting learned weights on a real dataset",
      "Extending to polynomial regression with and without L2 regularisation",
    ],
    mainContent: [
      {
        heading: "Custom LinearRegression Module",
        body:
          "Instead of relying on high-level scikit-learn wrappers, you build a LinearRegression module derived from nn.Module. Parameters w and b are registered as nn.Parameter tensors so that autograd tracks them. The forward method performs a single matrix multiplication plus bias addition. This design pattern mirrors how you will construct more complex neural architectures later.",
      },
      {
        heading: "Implementing and Using MSE Loss",
        body:
          "Although PyTorch provides nn.MSELoss, implementing loss = ((y_pred − y_true) ** 2).mean() makes the computation completely transparent. You confirm that autograd correctly computes gradients by checking that small perturbations to w and b change the loss as expected. This understanding is crucial for debugging when gradients later vanish or explode in deep networks.",
      },
      {
        heading: "Training on the Diabetes Dataset",
        body:
          "Using sklearn’s Diabetes dataset, you construct feature and target tensors and split them into training and validation sets. Features are standardised using the training set mean and standard deviation only. Training proceeds over multiple epochs: in each epoch you iterate over mini-batches (or the full batch), compute predictions and loss, call loss.backward(), and step the optimiser. Plotting training and validation loss against epochs reveals whether the model is converging and whether overfitting is occurring.",
      },
      {
        heading: "Interpreting Weights and Regularisation Effects",
        body:
          "Once training has converged, you inspect w. Features with large positive weights are strong positive predictors; large negative weights are strong negative predictors; near-zero weights are effectively irrelevant. Training models with different λ values for L2 regularisation shows how increasing λ shrinks coefficients and can stabilise estimates in the presence of multicollinearity. Comparing performance across λ values on the validation set reinforces the bias–variance trade-off empirically.",
      },
    ],
    examples: [
      {
        title: "LinearRegression Module in PyTorch",
        description:
          "Minimal implementation of a linear regression model with learnable parameters.",
        code:
          "import torch\nimport torch.nn as nn\n\nclass LinearRegression(nn.Module):\n    def __init__(self, in_features: int):\n        super().__init__()\n        self.weight = nn.Parameter(torch.randn(in_features, 1))\n        self.bias = nn.Parameter(torch.zeros(1))\n\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        return x @ self.weight + self.bias",
      },
      {
        title: "Train Loop with MSE",
        description: "One full training loop with manual MSE.",
        code:
          "model = LinearRegression(in_features=X_train.shape[1]).to(device)\noptimizer = torch.optim.SGD(model.parameters(), lr=1e-2)\n\nfor epoch in range(200):\n    model.train()\n    optimizer.zero_grad()\n    preds = model(X_train)\n    loss = ((preds - y_train) ** 2).mean()\n    loss.backward()\n    optimizer.step()",
      },
    ],
    commonMistakes: [
      {
        mistake: "Normalising using statistics computed on the full dataset",
        why:
          "Leaks information from validation/test into training and inflates reported performance.",
        fix:
          "Compute mean and std on the training partition only; apply the same transform to validation and test.",
      },
      {
        mistake: "Forgetting to call optimizer.zero_grad()",
        why:
          "Gradients accumulate across iterations, leading to incorrect updates and potential divergence.",
        fix:
          "Zero gradients at the start of each optimisation step or right after optimizer.step().",
      },
    ],
    exercises: [
      {
        question:
          "Modify the training script to track both training and validation MSE each epoch and plot them on the same graph. What patterns indicate overfitting?",
        answer:
          "Record loss_train and loss_val in lists, then use matplotlib to plot. Overfitting appears when training loss continues to decrease while validation loss bottoms out and then starts increasing.",
      },
      {
        question:
          "Extend the feature matrix with polynomial terms (e.g., x, x², x³) for a single selected feature and compare MSE with and without L2 regularisation.",
        answer:
          "Build an augmented design matrix with additional polynomial columns, retrain the model, and observe that without regularisation higher-degree polynomials can overfit badly (oscillatory fits), whereas L2 regularisation yields smoother curves and better generalisation on validation data.",
      },
    ],
    furtherReading: [
      {
        title: "Linear Regression — Predicting Numbers with Lines",
        href: "/learn/ml/3/linear-regression-theory",
        type: "internal",
      },
      {
        title: "scikit-learn: Linear Models",
        href: "https://scikit-learn.org/stable/modules/linear_model.html",
        type: "external",
      },
    ],
  },
};

