import type { StructuredContent } from "@/lib/structured-content";

export const week6Content: Record<string, StructuredContent> = {
  "neural-networks-theory": {
    overview:
      "Neural networks generalise linear models by composing many simple nonlinear units. This chapter introduces perceptrons, activation functions, random initialization and the backpropagation algorithm, culminating in multi-layer perceptrons that can solve XOR and more complex tasks.",
    youWillLearn: [
      "How perceptrons compute weighted sums and apply nonlinear activations",
      "Why activation functions such as sigmoid and ReLU are needed",
      "The structure of a multilayer perceptron and forward propagation",
      "Backpropagation as an application of the chain rule",
      "The role of random weight initialization and symmetry breaking",
    ],
    mainContent: [
      {
        heading: "Perceptrons as Building Blocks",
        body:
          "A perceptron receives inputs x ∈ ℝᵈ, computes z = wᵀx + b, and produces an output a = φ(z), where φ is an activation function such as sigmoid or ReLU. Geometrically this corresponds to projecting x onto w, shifting by b, and passing through a nonlinearity. As with logistic regression, a single perceptron with a step or sigmoid activation can implement any linear decision boundary.",
      },
      {
        heading: "Activation Functions",
        body:
          "Without nonlinear activations, stacking linear layers would collapse to a single linear transformation. Common activations include sigmoid, tanh and ReLU. Sigmoid and tanh are bounded and saturating; they are useful for probabilistic outputs but can suffer from vanishing gradients in deep networks. ReLU(z) = max(0, z) is unbounded on the positive side and zero for negative inputs, which often leads to faster training and mitigates vanishing gradients, though it can cause 'dead' neurons when weights push activations permanently negative.",
      },
      {
        heading: "Multilayer Perceptrons and XOR",
        body:
          "A multilayer perceptron (MLP) stacks layers of perceptrons such that each hidden layer computes a nonlinear transformation of the previous layer’s activations. Even a tiny MLP with a single hidden layer of just two or three units can solve XOR by carving feature space into nonlinear regions. This demonstrates the universal approximation property: with enough hidden units, an MLP can approximate any continuous function on a compact domain.",
      },
      {
        heading: "Backpropagation via the Chain Rule",
        body:
          "Backpropagation efficiently computes gradients of a loss function with respect to all network parameters by applying the chain rule layer by layer in reverse. Conceptually it proceeds in four steps: (1) compute activations at each layer via forward pass, (2) compute the loss and its derivative with respect to the output layer activations, (3) propagate derivatives backwards through each layer using local Jacobians, and (4) update weights using gradient descent. This is not a 'magic' algorithm; it is simply systematic application of calculus in a computational graph.",
      },
      {
        heading: "Random Initialization and Symmetry Breaking",
        body:
          "If you initialise all weights in a layer identically, each neuron in that layer computes the same function and receives identical gradients, so they remain identical through training. Random initialization breaks this symmetry, enabling different neurons to specialise in different features. Initialisation scale also matters: too large and activations explode or saturate; too small and signals vanish. He and Xavier initialisations are principled schemes that choose variance based on fan-in and fan-out.",
      },
    ],
    examples: [
      {
        title: "Manual XOR Solution with a 2-2-1 Network",
        description:
          "Construct a tiny network by hand that solves XOR exactly.",
        code:
          "# Hidden layer weights chosen to carve input space into regions\nimport numpy as np\n\n# XOR inputs\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\ny = np.array([[0], [1], [1], [0]])\n\n# Example parameters (one possible solution)\nW1 = np.array([[1, 1], [1, 1]])\nb1 = np.array([0, -1])\nW2 = np.array([[1], [-2]])\nb2 = np.array([0.5])\n\nsigmoid = lambda z: 1 / (1 + np.exp(-z))\n\nh = sigmoid(X @ W1 + b1)\nout = sigmoid(h @ W2 + b2)\nprint(np.round(out))  # should approximate y",
      },
    ],
    commonMistakes: [
      {
        mistake: "Thinking backpropagation is fundamentally different from gradient descent",
        why:
          "Backprop is simply an efficient way to compute gradients for gradient descent in layered architectures.",
        fix:
          "View backprop as repeated application of the chain rule on a computational graph rather than as a black-box algorithm.",
      },
      {
        mistake:
          "Initialising all weights to zero or with too small variance in deep networks",
        why:
          "Zero initialisation prevents symmetry breaking; tiny variance can cause vanishing signals and gradients.",
        fix:
          "Use principled random initialisers (e.g., Xavier, He) and verify activation statistics in early layers.",
      },
    ],
    exercises: [
      {
        question:
          "Show formally why a network without nonlinear activations collapses to a single linear transformation.",
        answer:
          "Composing two affine maps yields another affine map: W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂). By induction, any number of stacked linear layers remains linear. Without nonlinearities, depth adds no expressive power over a single layer.",
      },
      {
        question:
          "In your own words, explain how backpropagation uses the chain rule.",
        answer:
          "Backprop expresses each layer’s gradient as the product of the gradient from the layer above and the local derivative of that layer’s transformation. It propagates derivatives backwards from the loss to earlier layers using these local Jacobians.",
      },
    ],
    furtherReading: [
      {
        title: "Neural Networks Notebook — XOR & Iris MLP",
        href: "/learn/ml/6/neural-networks-notebook",
        type: "internal",
      },
      {
        title: "CS231n Notes — Neural Networks Part 1",
        href: "https://cs231n.github.io/neural-networks-1/",
        type: "external",
      },
    ],
  },

  "neural-networks-notebook": {
    overview:
      "This chapter walks through building a neural network from scratch in NumPy to solve XOR, then training MLPs with scikit-learn on Iris while varying width to observe underfitting and overfitting.",
    youWillLearn: [
      "Implementing forward and backward passes in pure NumPy",
      "Training a small network to solve XOR",
      "Using scikit-learn’s MLPClassifier on Iris",
      "Exploring the effect of hidden layer width on train/test performance",
      "Visualising decision boundaries of learned neural classifiers",
    ],
    mainContent: [
      {
        heading: "From Equations to NumPy Code",
        body:
          "You start by translating the mathematical definition of a 2-layer network into NumPy. Each layer performs z = Wx + b, a = φ(z). During backprop you compute gradients layer-by-layer: δᶫ = (W^{ᶫ+1})ᵀ δ^{ᶫ+1} ⊙ φ′(zᶫ), ∂J/∂Wᶫ = δᶫ (a^{ᶫ−1})ᵀ and ∂J/∂bᶫ = δᶫ. Implementing these formulas directly in code demystifies how frameworks like PyTorch work internally.",
      },
      {
        heading: "Solving XOR Numerically",
        body:
          "You initialise a small network with random weights and train it on the four XOR points using gradient descent. Watching the loss curve descend and the predictions converge to the correct pattern illustrates how the network gradually discovers a nonlinear representation that separates the classes.",
      },
      {
        heading: "MLPs on Iris: Capacity vs Generalisation",
        body:
          "Using MLPClassifier, you train networks with hidden layer sizes such as 1, 2, 4, 8, 16, 32. For each you record training and test accuracy. Very small networks underfit; very large networks can overfit or simply plateau with no gain in performance. Plotting accuracy vs width and visualising decision boundaries gives a concrete sense of how model capacity interacts with dataset complexity.",
      },
    ],
    examples: [
      {
        title: "Manual Backprop Skeleton in NumPy",
        description:
          "Outline of forward and backward steps for a 2-layer network.",
        code:
          "# Forward\nz1 = X @ W1 + b1\na1 = np.tanh(z1)\nz2 = a1 @ W2 + b2\na2 = sigmoid(z2)\n\n# Backward for binary cross-entropy\nm = X.shape[0]\ndz2 = a2 - y\ndW2 = a1.T @ dz2 / m\ndb2 = dz2.mean(axis=0)\nda1 = dz2 @ W2.T\ndz1 = da1 * (1 - np.tanh(z1) ** 2)\ndW1 = X.T @ dz1 / m\ndb1 = dz1.mean(axis=0)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Implementing backprop with incorrect tensor shapes",
        why:
          "Shape mismatches can silently produce wrong gradients or crash with broadcasting errors.",
        fix:
          "Carefully track matrix dimensions for each layer and verify intermediate shapes with asserts or print statements.",
      },
      {
        mistake: "Judging model quality only by training accuracy on Iris",
        why:
          "Iris is small; a network can easily overfit. Training accuracy near 100% does not guarantee good generalisation.",
        fix:
          "Always compare training and test accuracy and, when possible, visualise decision boundaries.",
      },
    ],
    exercises: [
      {
        question:
          "Add L2 regularisation to the NumPy implementation and observe its effect on weight magnitudes and decision boundaries.",
        answer:
          "Modify the loss to J_reg = J + λ(‖W1‖² + ‖W2‖²), add corresponding gradient terms 2λW1 and 2λW2, then train for multiple λ values; higher λ shrinks weights and produces smoother boundaries.",
      },
      {
        question:
          "For MLPClassifier, vary both hidden layer size and regularisation strength (alpha). What patterns do you see?",
        answer:
          "Larger hidden layers increase capacity, improving training accuracy but potentially harming test accuracy unless regularisation (larger alpha) is increased. There is often a sweet spot where moderate width and regularisation yield the best validation performance.",
      },
    ],
    furtherReading: [
      {
        title: "Neural Networks from First Principles",
        href: "/learn/ml/6/neural-networks-theory",
        type: "internal",
      },
      {
        title: "scikit-learn: MLPClassifier",
        href: "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
        type: "external",
      },
    ],
  },
};

