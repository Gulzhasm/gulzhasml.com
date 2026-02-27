import type { StructuredContent } from "@/lib/structured-content";

export const week6Content: Record<string, StructuredContent> = {
  "neural-networks-theory": {
    overview:
      "Neural networks extend linear classifiers by stacking layers of nonlinear transformations. This chapter develops the perceptron model, explains why single-layer networks fail on XOR, introduces multi-layer perceptrons, and derives the four-step backpropagation algorithm from first principles.",
    youWillLearn: [
      "The perceptron as a weighted sum passed through an activation function",
      "Why linear classifiers cannot solve XOR and how hidden layers fix this",
      "Random weight initialisation and the symmetry-breaking argument",
      "The four steps of backpropagation derived from the chain rule",
      "How varying hidden-layer width affects capacity and generalisation",
    ],
    mainContent: [
      {
        heading: "The Perceptron Model",
        body:
          "A perceptron receives inputs x\u2081, x\u2082, \u2026, x\u2099, multiplies each by a learned weight, sums the results, adds a bias term, and passes the total through an activation function: output = \u03c3(w\u2081x\u2081 + w\u2082x\u2082 + \u2026 + w\u2099x\u2099 + b). With a sigmoid activation \u03c3(z) = 1 / (1 + e\u207b\u1dbb), the output lies in (0, 1) and can be interpreted as a probability. A single perceptron is equivalent to logistic regression \u2014 it can separate any two classes that are linearly separable, but nothing more complex.",
      },
      {
        heading: "The XOR Problem and Hidden Layers",
        body:
          "XOR has four points: (0,0)\u21920, (0,1)\u21921, (1,0)\u21921, (1,1)\u21920. No single straight line can separate the 1s from the 0s. This was famously proven by Minsky and Papert in 1969 and stalled neural network research for over a decade. The fix is to add a hidden layer: the hidden neurons first transform the input space into a new representation where the classes become linearly separable, and then the output neuron draws a straight boundary in that transformed space. With just two hidden neurons and sigmoid activations, a network can solve XOR perfectly.",
      },
      {
        heading: "Why Random Initialisation Matters",
        body:
          "If all weights are initialised to zero, every neuron in a layer computes the same output, receives the same gradient, and updates identically \u2014 they remain copies of each other forever. This is called the symmetry problem. Random initialisation breaks the symmetry so that neurons can specialise. The scale matters too: weights drawn from a distribution with standard deviation \u2248 1/\u221a(fan_in) keep activations and gradients in a reasonable range for sigmoid networks, preventing both saturation (outputs stuck near 0 or 1 where gradients vanish) and explosion.",
      },
      {
        heading: "Backpropagation in Four Steps",
        body:
          "Backpropagation is just the chain rule applied systematically. Step 1 \u2014 Output deltas: compute \u03b4\u2096 = (o\u2096 \u2212 t\u2096) \u00b7 \u03c3\u2032(net\u2096), where o\u2096 is the output, t\u2096 is the target, and \u03c3\u2032 is the derivative of the activation (for sigmoid, \u03c3\u2032 = \u03c3(1\u2212\u03c3)). Step 2 \u2014 Hidden deltas: propagate the error backward via \u03b4\u2c7c = (\u03a3\u2096 \u03b4\u2096 \u00b7 w\u2c7c\u2096) \u00b7 \u03c3\u2032(net\u2c7c), where w\u2c7c\u2096 are the weights connecting hidden neuron j to output neuron k. Step 3 \u2014 Update output weights: w\u2c7c\u2096 \u2190 w\u2c7c\u2096 \u2212 \u03b7 \u00b7 \u03b4\u2096 \u00b7 h\u2c7c, where h\u2c7c is the hidden neuron's output and \u03b7 is the learning rate. Step 4 \u2014 Update hidden weights: w\u1d62\u2c7c \u2190 w\u1d62\u2c7c \u2212 \u03b7 \u00b7 \u03b4\u2c7c \u00b7 x\u1d62. Repeat for every training example.",
      },
      {
        heading: "Network Width and the Capacity\u2013Generalisation Trade-off",
        body:
          "A network with more hidden neurons has greater capacity \u2014 it can represent more complex decision boundaries. On Iris, training MLPs with 1, 2, 4, 8, 16 and 32 hidden neurons reveals a pattern: too few neurons underfit (the boundary is too simple), a moderate number fits well, and too many neurons risk overfitting (the boundary becomes unnecessarily wiggly). The sweet spot depends on the complexity of the data. Monitoring validation loss alongside training loss is the practical way to detect when you have crossed from useful capacity into memorisation.",
      },
    ],
    examples: [
      {
        title: "Sigmoid Activation and Its Derivative",
        description: "Compute the sigmoid output and its gradient for backpropagation.",
        code:
          "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\ndef sigmoid_derivative(z):\n    s = sigmoid(z)\n    return s * (1 - s)\n\nz = np.array([-2, 0, 2])\nprint(\"sigmoid:\", sigmoid(z))\nprint(\"derivative:\", sigmoid_derivative(z))",
      },
      {
        title: "Manual Forward Pass for XOR",
        description: "A 2-input, 2-hidden, 1-output network forward pass.",
        code:
          "import numpy as np\n\nW_hidden = np.array([[5.0, 5.0], [5.0, 5.0]])\nb_hidden = np.array([-2.0, -7.0])\nW_out = np.array([[10.0, -10.0]])\nb_out = np.array([-5.0])\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\nfor x in [[0,0], [0,1], [1,0], [1,1]]:\n    x = np.array(x)\n    hidden = sigmoid(W_hidden @ x + b_hidden)\n    output = sigmoid(W_out @ hidden + b_out)\n    print(f\"Input {x} -> Output {output[0]:.3f}\")",
      },
    ],
    commonMistakes: [
      {
        mistake: "Initialising all weights to zero",
        why: "Neurons stay identical throughout training due to symmetry \u2014 the network effectively has one neuron per layer.",
        fix: "Use random initialisation with appropriate scale, e.g. np.random.randn(fan_in, fan_out) * np.sqrt(1/fan_in).",
      },
      {
        mistake: "Using a very large learning rate with sigmoid activations",
        why: "Weights grow large, activations saturate near 0 or 1, and gradients vanish \u2014 training stalls.",
        fix: "Start with a small learning rate (0.01\u20130.1 for sigmoid) and increase carefully.",
      },
    ],
    exercises: [
      {
        question: "Walk through one full forward + backward pass for a 2-input, 2-hidden, 1-output XOR network with concrete weight values. What are the four \u03b4 values?",
        answer: "With input [1,0] and target 1: forward pass produces hidden activations h\u2081, h\u2082 and output o. Step 1: \u03b4_out = (o \u2212 1) \u00b7 o(1\u2212o). Step 2: \u03b4_h1 = \u03b4_out \u00b7 w\u2081_out \u00b7 h\u2081(1\u2212h\u2081), \u03b4_h2 = \u03b4_out \u00b7 w\u2082_out \u00b7 h\u2082(1\u2212h\u2082). The exact numbers depend on initial weights, but the process is always these four steps.",
      },
      {
        question: "Why does a network with 1 hidden neuron fail on Iris (3 classes) while 4 neurons succeed?",
        answer: "With 1 hidden neuron, the network can only learn a single nonlinear feature from the input space, which is insufficient to carve out three distinct class regions. With 4 neurons, the hidden layer can learn four different nonlinear features, providing enough representational capacity to separate three overlapping classes.",
      },
    ],
    furtherReading: [
      { title: "Neural Networks Notebook \u2014 XOR & Iris MLP", href: "/learn/ml/6/neural-networks-notebook", type: "internal" },
      { title: "3Blue1Brown \u2014 Neural Networks Series", href: "https://www.3blue1brown.com/topics/neural-networks", type: "external" },
      { title: "Michael Nielsen \u2014 Neural Networks and Deep Learning, Chapter 2", href: "http://neuralnetworksanddeeplearning.com/chap2.html", type: "external" },
    ],
  },

  "neural-networks-notebook": {
    overview:
      "This notebook builds a feedforward neural network from scratch using manual backpropagation to solve the XOR problem, then scales up to MLP classifiers on the Iris dataset with varying hidden-layer widths.",
    youWillLearn: [
      "Implementing a neural network without any deep learning framework",
      "Coding the four-step backpropagation algorithm by hand",
      "Training a network to solve XOR and watching convergence",
      "Comparing MLP performance across different hidden neuron counts (1\u201332)",
      "Visualising decision boundaries at different network capacities",
    ],
    mainContent: [
      {
        heading: "Building a Neural Network from Scratch",
        body:
          "The notebook starts with the NeuralNetwork class that uses a list of LogisticRegression neurons (reused from week 4). The architecture for XOR is 2 inputs + bias, 2 hidden neurons, and 1 output neuron, all with sigmoid activation. You implement the forward pass by computing activations layer by layer, then implement backpropagation with the four manual steps: output deltas, hidden deltas, output weight updates, hidden weight updates. No autograd, no PyTorch backward() \u2014 just NumPy and the chain rule.",
      },
      {
        heading: "Solving XOR",
        body:
          "The XOR training loop iterates over the four data points repeatedly, running forward and backward for each sample. With appropriate learning rate (typically 0.5\u20132.0) and enough iterations (500\u20135000), the loss drops from ~0.7 to near zero. You plot the BCE loss curve and verify that the network outputs values close to the correct labels. The decision boundary visualisation shows how the hidden layer warps the input space to separate the diagonal XOR pattern.",
      },
      {
        heading: "MLP Experiments on Iris",
        body:
          "The second part trains PyTorch MLPs with hidden layer sizes {1, 2, 4, 8, 16, 32} on the Iris dataset. For each configuration you track training and test accuracy across epochs. The results show a clear progression: 1 hidden neuron underfits (~60\u201370% accuracy), 4\u20138 neurons reach near-optimal performance (~95\u201397%), and 16\u201332 neurons achieve similar accuracy but with more variance across random seeds.",
      },
    ],
    examples: [
      {
        title: "XOR Training Loop",
        description: "Training a hand-coded neural network on XOR data.",
        code: "nn = NeuralNetwork(n_inputs=2, n_hidden=2, n_outputs=1)\n\nfor iteration in range(5000):\n    total_loss = 0\n    for x, target in xor_data:\n        output = nn.forward(x)\n        loss = -target*np.log(output) - (1-target)*np.log(1-output)\n        nn.backward(target, learning_rate=1.0)\n        total_loss += loss\n    if iteration % 1000 == 0:\n        print(f\"Iter {iteration}, Loss: {total_loss:.4f}\")",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using too small a learning rate for XOR with sigmoid",
        why: "The sigmoid gradient is at most 0.25, so gradients are already small. A tiny learning rate makes convergence painfully slow.",
        fix: "Start with learning rate 0.5\u20132.0 for small sigmoid networks.",
      },
    ],
    exercises: [
      {
        question: "Run the XOR network 10 times with different random seeds. How often does it converge?",
        answer: "With sigmoid and a reasonable learning rate, XOR typically converges in 8\u20139 out of 10 runs. Failures occur when initial weights land in a region where gradients are very small (near saturation), causing the loss to plateau at ~0.69 (random guessing).",
      },
    ],
    furtherReading: [
      { title: "Neural Networks from First Principles", href: "/learn/ml/6/neural-networks-theory", type: "internal" },
      { title: "PyTorch: Building Models with nn.Module", href: "https://pytorch.org/tutorials/beginner/introyt/modelsyt_tutorial.html", type: "external" },
    ],
  },
};
