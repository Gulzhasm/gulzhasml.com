export interface TopicResource {
  title: string;
  slug: string;
  description: string;
  content: string;
  type: "notebook" | "tutorial" | "theory" | "practice" | "post" | "project";
  link?: string;
}

export interface TopicSection {
  week: number;
  title: string;
  summary: string;
  resources: TopicResource[];
}

export interface Topic {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  overview: string;
  category: "topic" | "tool";
  icon: string;
  resources: TopicResource[];
  sections?: TopicSection[];
  tags: string[];
}

export const topics: Topic[] = [
  // --- Core Topics ---
  {
    slug: "ml",
    title: "Machine Learning",
    shortTitle: "ML",
    description:
      "Foundations of machine learning: supervised & unsupervised learning, model evaluation, feature engineering, and practical implementations with PyTorch and Scikit-learn.",
    overview:
      "A comprehensive journey through core machine learning concepts — from probability theory and linear models to neural networks and deep learning. Each topic builds on the previous, combining mathematical foundations with hands-on Python implementations. Covers regression, classification, clustering, density estimation, dimensionality reduction, and deep learning, all implemented from scratch and using industry-standard libraries like PyTorch and Scikit-learn.",
    category: "topic",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    resources: [],
    sections: [
      {
        week: 1,
        title: "Introduction to Machine Learning & Python Foundations",
        summary:
          "An introduction to the ML landscape: what machine learning is, the difference between supervised and unsupervised learning, and the types of problems ML can solve (regression, classification, clustering). The practical component covers Python fundamentals (variables, data types, control flow, functions) and PyTorch basics — tensor operations, matrix multiplication, broadcasting, reshaping, nn.Module, autograd, and building simple MLP pipelines for binary classification, multi-class classification, multi-label classification, and regression tasks.",
        resources: [
          {
            title: "Introduction to Machine Learning",
            slug: "intro-to-ml",
            description: "Overview of ML paradigms: supervised vs. unsupervised learning, model types, and the ML workflow from data to prediction.",
            content: "Machine learning is a branch of artificial intelligence that focuses on building systems capable of learning from data rather than being explicitly programmed. This exploration covers the fundamental paradigms of ML: supervised learning, where models learn from labeled examples to make predictions on unseen data, and unsupervised learning, where algorithms discover hidden structure in unlabeled datasets. Within supervised learning, the two main problem types are regression (predicting continuous values) and classification (predicting discrete categories).\n\nThe ML workflow is a structured pipeline that begins with data collection and preprocessing, moves through feature engineering and model selection, and culminates in training, evaluation, and deployment. Key concepts include the train/validation/test split methodology for honest performance evaluation, the bias-variance tradeoff that governs model complexity decisions, and the importance of choosing appropriate evaluation metrics for each problem type. Understanding this workflow is essential because every ML project — regardless of algorithm — follows these same fundamental steps.\n\nThis foundation also introduces the mathematical notation used throughout machine learning: feature vectors, weight matrices, hypothesis functions, and loss functions. The goal is to frame ML as an optimization problem where we search for model parameters that minimize prediction error on training data while generalizing well to new examples. These concepts form the bedrock upon which all subsequent topics — from linear regression to deep learning — are built.",
            type: "theory",
          },
          {
            title: "Python Fundamentals",
            slug: "python-fundamentals",
            description: "Core Python concepts: variables, data types (lists, tuples, dicts, sets), operators, control flow, input/output, and modules.",
            content: "Python serves as the primary programming language for machine learning, and this section establishes a strong foundation in its core features. The material covers fundamental data types including integers, floats, strings, and booleans, along with Python's powerful collection types: lists for ordered mutable sequences, tuples for immutable sequences, dictionaries for key-value mappings, and sets for unique element collections. Each data type has distinct use cases in ML workflows — lists for storing datasets, dictionaries for configuration parameters, and tuples for returning multiple values from functions.\n\nControl flow structures — if/elif/else conditionals, for and while loops, and list comprehensions — provide the logical building blocks for implementing algorithms. Functions are explored as reusable units of computation, covering parameter passing, default arguments, return values, and scope. The concept of modules and imports is introduced as the mechanism for organizing code and leveraging Python's rich ecosystem of scientific computing libraries.\n\nPractical exercises reinforce these concepts through hands-on coding: implementing basic algorithms using loops and conditionals, manipulating data structures, writing utility functions, and working with Python's built-in functions like map, filter, and zip. This practical fluency with Python is essential for everything that follows, from implementing gradient descent by hand to building neural network architectures with PyTorch.",
            type: "practice",
          },
          {
            title: "PyTorch Basics I — Tensors & Operations",
            slug: "pytorch-tensors",
            description: "Tensor creation, matrix multiplication (torch.matmul), element-wise operations (Hadamard product), broadcasting rules, transposing, reshaping, and in-place operations.",
            content: "Tensors are the fundamental data structure in PyTorch, generalizing scalars, vectors, and matrices to arbitrary dimensions. This notebook explores tensor creation from Python lists, NumPy arrays, and built-in functions like torch.zeros, torch.ones, torch.randn, and torch.arange. Understanding tensor shapes and dtypes is critical because shape mismatches are among the most common bugs in ML code. The material covers how to inspect tensor properties (shape, dtype, device) and convert between formats.\n\nMatrix multiplication via torch.matmul is the workhorse operation of machine learning — every linear layer, every attention mechanism, every forward pass relies on it. This notebook distinguishes between matrix multiplication (matmul), element-wise multiplication (the Hadamard product using the * operator), and dot products. Broadcasting rules are explored in depth: how PyTorch automatically expands dimensions to make operations compatible, which dimensions must match, and common pitfalls that lead to silent bugs.\n\nReshaping operations — view, reshape, squeeze, unsqueeze, permute, and transpose — are essential for preparing data for different layer types. The notebook demonstrates practical scenarios: flattening images for fully-connected layers, adding batch dimensions, and rearranging axes for convolutional networks. In-place operations (those ending with an underscore like add_) are discussed alongside their implications for memory efficiency and autograd compatibility. These tensor manipulation skills form the mechanical foundation for building and debugging every neural network architecture.",
            type: "notebook",
          },
          {
            title: "PyTorch Basics II — Training Pipelines",
            slug: "pytorch-pipelines",
            description: "Building complete ML pipelines: Dataset/DataLoader, train/val/test splits, SimpleMLP with nn.Module, loss functions (BCE, CrossEntropy, MSE), Adam optimizer, and training loops.",
            content: "Building a complete training pipeline in PyTorch requires orchestrating several components: data loading, model definition, loss computation, and parameter optimization. This notebook starts with PyTorch's Dataset and DataLoader abstractions — creating custom Dataset classes that implement __len__ and __getitem__, then wrapping them in DataLoaders for automatic batching, shuffling, and parallel data loading. The train/validation/test split strategy is implemented to ensure proper model evaluation.\n\nThe model architecture section introduces nn.Module, PyTorch's base class for all neural networks. A SimpleMLP (multi-layer perceptron) is built step by step: defining layers in __init__, implementing the forward pass, and understanding how autograd tracks operations for automatic differentiation. The model is configured for four different task types: binary classification (single sigmoid output with BCE loss), multi-class classification (softmax output with CrossEntropy loss), multi-label classification (independent sigmoid outputs with BCE loss), and regression (linear output with MSE loss).\n\nThe training loop ties everything together: iterating over batches from the DataLoader, computing forward passes, calculating loss, calling loss.backward() for gradient computation, stepping the optimizer (Adam), and zeroing gradients. Validation is performed after each epoch without gradient tracking (torch.no_grad()) to monitor generalization. Key practical details are covered: moving models and data to the correct device, tracking training and validation metrics, and implementing early stopping. This pipeline pattern is reused and extended throughout every subsequent implementation.",
            type: "notebook",
          },
        ],
      },
      {
        week: 2,
        title: "Probability Theory for Machine Learning",
        summary:
          "Foundational probability concepts essential for ML: Bayes' rule and its applications (loan approval systems, the prosecutor's fallacy), Gaussian distributions and their parameters, covariance and Pearson's correlation coefficient, joint and conditional probability distributions, and marginal probabilities. Practice involves implementing Bayes' rule calculations, plotting Gaussian PDFs with varying parameters, computing covariance/PCC for real data (exploring correlation vs. causation), and analyzing the Iris dataset's feature relationships through 2D histograms and probability matrices.",
        resources: [
          {
            title: "Probability Foundations",
            slug: "probability-foundations",
            description: "Bayes' rule, prior/posterior/likelihood, Gaussian distribution, random variables, covariance, and Pearson's correlation coefficient.",
            content: "Probability theory provides the mathematical language for reasoning about uncertainty, which is at the heart of every machine learning algorithm. This section begins with the fundamentals: sample spaces, events, and probability axioms, then builds up to conditional probability and the chain rule. Bayes' rule — P(A|B) = P(B|A)P(A)/P(B) — is derived and explored as the foundation for updating beliefs given evidence. The concepts of prior probability, likelihood, and posterior probability are explained through concrete examples like medical diagnosis and loan approval systems, illustrating how prior assumptions combine with observed data to form updated predictions.\n\nThe Gaussian (normal) distribution is introduced as the most important probability distribution in ML, parameterized by its mean and variance. The probability density function is examined, showing how the mean shifts the center and the variance controls the spread. Multivariate Gaussians extend this to higher dimensions, introducing the covariance matrix as the key object that captures both the spread of individual variables and their pairwise relationships. The distinction between diagonal and full covariance matrices is important for understanding model complexity in algorithms like Gaussian Mixture Models.\n\nCovariance and Pearson's correlation coefficient (PCC) quantify the linear relationship between two random variables. Covariance measures the degree to which two variables change together, while PCC normalizes this to the range [-1, 1] for easier interpretation. The critical distinction between correlation and causation is emphasized — a theme that recurs throughout statistical learning. Joint, conditional, and marginal probability distributions are covered as the tools for modeling relationships between multiple random variables, providing the foundation for probabilistic classifiers and density estimation methods explored in later sections.",
            type: "theory",
          },
          {
            title: "Probability Exercises",
            slug: "probability-exercises",
            description: "Implementing Bayes' rule for real scenarios, plotting Gaussian PDFs, computing covariance and PCC, analyzing Iris dataset joint/conditional/marginal probabilities.",
            content: "This hands-on session translates probability theory into working Python code. The first exercise implements Bayes' rule from scratch to solve a loan approval scenario: given prior probabilities of default, the likelihood of certain financial indicators given default/non-default, and observed evidence, the code computes the posterior probability of default. This exercise makes Bayes' theorem tangible and demonstrates how seemingly small changes in priors or likelihoods can dramatically shift the posterior — a lesson directly relevant to Bayesian classifiers.\n\nGaussian distribution plotting exercises explore how the parameters mu (mean) and sigma (variance) shape the probability density function. Using matplotlib, multiple Gaussians are overlaid to visualize how increasing variance flattens and widens the curve while keeping the total area equal to one. The implementation uses NumPy's vectorized operations for efficient computation across arrays of x-values, reinforcing both the mathematical concept and practical NumPy skills.\n\nThe Iris dataset analysis exercises bring everything together on real data. Covariance and Pearson's correlation coefficient are computed between all pairs of the four features (sepal length, sepal width, petal length, petal width), revealing which features are strongly correlated and which are relatively independent. Two-dimensional histograms and conditional probability matrices are constructed to visualize the joint distribution of features conditioned on species class, showing how different species occupy different regions of the feature space — directly motivating why these features are useful for classification.",
            type: "practice",
          },
        ],
      },
      {
        week: 3,
        title: "Linear Regression",
        summary:
          "Linear regression theory and implementation from scratch using PyTorch. Covers the hypothesis function y = w^T x, mean squared error (MSE) cost function, gradient descent optimization, and feature normalization (z-score standardization). Uses the Diabetes dataset to predict disease progression, implementing custom LinearRegression layers, gradient descent steps, and exploring the effect of learning rate on convergence. Extends to polynomial regression with L2 regularization to handle overfitting — fitting a 5th-order polynomial while penalizing large weights to control model complexity.",
        resources: [
          {
            title: "Linear Regression Theory",
            slug: "linear-regression-theory",
            description: "Hypothesis function, MSE cost, gradient descent derivation, feature normalization, overfitting/underfitting, and L2 regularization.",
            content: "Linear regression is the foundational supervised learning algorithm for predicting continuous-valued outputs. The model is defined by the hypothesis function y = w^T x + b, where w is the weight vector that determines how much each input feature contributes to the prediction, and b is the bias term. The goal is to find the optimal weights that minimize the mean squared error (MSE) cost function J(w) = (1/n) * sum((y_pred - y_true)^2), which measures the average squared difference between predictions and true values.\n\nGradient descent is the optimization algorithm used to minimize the cost function. The gradient of MSE with respect to each weight is derived analytically, yielding the update rule w := w - alpha * dJ/dw, where alpha is the learning rate. This section carefully derives the gradient, showing how the chain rule produces the familiar (2/n) * X^T * (X*w - y) expression. The choice of learning rate is critical: too large and the optimization diverges, too small and convergence is prohibitively slow. Feature normalization via z-score standardization (subtracting the mean and dividing by the standard deviation) ensures all features operate on the same scale, which is essential for gradient descent to work efficiently.\n\nOverfitting and underfitting are introduced through the lens of model complexity. An underfit model (too few parameters) has high bias and cannot capture the data's structure; an overfit model (too many parameters) has high variance and memorizes noise in the training data. L2 regularization (Ridge regression) addresses overfitting by adding a penalty term lambda * ||w||^2 to the cost function, discouraging large weight values and effectively reducing model complexity. The regularization strength lambda controls the trade-off between fitting the training data and keeping the model simple.",
            type: "theory",
          },
          {
            title: "Regression Implementation (PyTorch)",
            slug: "regression-implementation",
            description: "Building linear regression from scratch: custom nn.Module layer, MSE implementation, gradient descent, Diabetes dataset prediction, learning rate analysis.",
            content: "This implementation builds linear regression entirely from scratch in PyTorch, starting with a custom LinearRegression class that extends nn.Module. The model's weight vector and bias are initialized as nn.Parameter objects so that PyTorch's autograd system can automatically compute gradients. The forward method computes the linear transformation y = X @ w + b, and MSE loss is implemented manually rather than using nn.MSELoss, ensuring a deep understanding of the gradient computation.\n\nThe Diabetes dataset from sklearn (442 patients, 10 features, target: disease progression after one year) serves as the test bed. Features are normalized using z-score standardization computed from training data only — an important detail to prevent data leakage. The training loop implements gradient descent step by step: forward pass, loss computation, backward pass (loss.backward()), parameter update using the gradients (with torch.no_grad()), and gradient zeroing. Training and validation losses are tracked across epochs and plotted to visualize convergence.\n\nLearning rate experiments reveal the sensitivity of gradient descent to this hyperparameter. With a learning rate that is too high (e.g., 0.1), the loss oscillates or explodes; with one that is too low (e.g., 0.0001), the model barely improves within the allocated epochs. The optimal learning rate (found through experimentation) achieves smooth, rapid convergence. Weight analysis after training reveals which features most influence diabetes progression — BMI and blood serum measurements have the largest positive weights, directly interpretable as risk factors in the linear model.",
            type: "practice",
          },
          {
            title: "Regularized Polynomial Regression",
            slug: "regularized-polynomial",
            description: "5th-order polynomial fitting with L2 regularization. Exploring how lambda controls model complexity and prevents overfitting on small datasets.",
            content: "Polynomial regression extends linear regression by creating polynomial features from the input: given a single feature x, the model uses [x, x^2, x^3, x^4, x^5] as input features, allowing the model to fit nonlinear curves while remaining a linear model in terms of its parameters. This notebook demonstrates the power and danger of high-degree polynomials on a small synthetic dataset — a 5th-order polynomial has enough flexibility to pass through every training point exactly, but the resulting curve oscillates wildly between points, a textbook case of overfitting.\n\nL2 regularization is applied by adding lambda * ||w||^2 to the MSE cost function, where lambda (also called the regularization strength or weight decay) controls how much large weights are penalized. The notebook systematically varies lambda across several orders of magnitude (from 0 to 100) and visualizes the resulting polynomial curves. With lambda = 0, the unregularized model overfits dramatically; as lambda increases, the curve becomes progressively smoother, eventually approaching a straight line (underfitting) for very large values. The optimal lambda balances between these extremes, producing a curve that captures the true underlying trend without fitting the noise.\n\nThe training process tracks both the MSE loss and the regularization penalty separately, showing how they trade off: as lambda increases, the training MSE rises (worse fit to training data) but the regularization term decreases (smaller weights). Validation loss reveals the U-shaped curve characteristic of the bias-variance tradeoff, with the minimum indicating the optimal regularization strength. This experiment provides an intuitive understanding of why regularization is essential for controlling model complexity, a concept that applies broadly across all machine learning models.",
            type: "notebook",
          },
          {
            title: "Regression Analysis Report",
            slug: "regression-report",
            description: "Analysis of weight interpretation (BMI and sex effects on diabetes), learning rate impact on convergence, and regularization strength trade-offs.",
            content: "This report synthesizes the findings from the linear regression experiments into a comprehensive analysis of model behavior and interpretability. The weight interpretation section examines the trained model's coefficients on the Diabetes dataset, revealing that BMI (body mass index) consistently has the largest positive weight, indicating it is the strongest predictor of disease progression. Other significant features include certain blood serum measurements and blood pressure. Interestingly, the sex feature's weight provides insight into how the model captures demographic differences, though the report cautions against over-interpreting individual coefficients in the presence of correlated features.\n\nThe learning rate analysis presents a systematic comparison of convergence behavior across multiple learning rate values. Convergence curves (loss vs. epoch) are plotted side by side, clearly demonstrating three regimes: divergence (learning rate too high, loss increases exponentially), slow convergence (learning rate too low, loss decreases but plateaus far from the optimum within the training budget), and optimal convergence (appropriate learning rate, smooth exponential decrease to the minimum). The report quantifies the relationship between learning rate and the number of epochs needed to reach a target loss value.\n\nThe regularization analysis evaluates the tradeoff between model complexity and generalization performance. Training and validation loss curves as a function of lambda are presented, showing the characteristic U-shape in validation loss. The report discusses how regularization affects weight magnitudes — plotting the L2 norm of the weight vector versus lambda — and how strongly regularized models produce more interpretable, stable predictions at the cost of slightly higher training error. The conclusion ties these findings together, recommending a practical approach to hyperparameter selection that combines learning rate scheduling with appropriate regularization strength.",
            type: "project",
          },
        ],
      },
      {
        week: 4,
        title: "Linear Classification & Logistic Regression",
        summary:
          "Moving from regression to classification: the sigmoid function as a decision boundary, logistic regression for binary classification, and the cross-entropy (BCE) loss function. Implementation includes building a custom LogisticRegression class in PyTorch, deriving and coding gradient descent for BCE loss, visualizing decision boundaries, and extending to multi-class classification using the one-vs-all strategy with built-in PyTorch methods (nn.Sequential, nn.Sigmoid, optim.SGD). Analysis of the XOR problem reveals the fundamental limitations of linear classifiers.",
        resources: [
          {
            title: "Classification & Logistic Regression",
            slug: "classification-theory",
            description: "Sigmoid function, decision boundaries, binary cross-entropy loss, gradient descent for classification, and multi-class one-vs-all strategy.",
            content: "Classification is the supervised learning task of predicting discrete class labels from input features. Logistic regression, despite its name, is a classification algorithm that models the probability of class membership using the sigmoid function sigma(z) = 1 / (1 + exp(-z)), which squashes any real-valued input into the range (0, 1). The decision boundary is the surface in feature space where the predicted probability equals 0.5 — for a linear model, this is a hyperplane defined by w^T x + b = 0, with points on one side classified as positive and points on the other side classified as negative.\n\nThe loss function for binary classification is binary cross-entropy (BCE): L = -(1/n) * sum(y*log(p) + (1-y)*log(1-p)), where y is the true label (0 or 1) and p is the predicted probability. BCE has several important properties: it is convex (guaranteeing a single global minimum for logistic regression), it penalizes confident wrong predictions heavily (due to the logarithm approaching negative infinity near 0), and its gradient with respect to the model parameters takes the elegant form (1/n) * X^T * (p - y), remarkably similar to the MSE gradient for linear regression.\n\nMulti-class classification extends binary logistic regression through the one-vs-all (OvA) strategy: for K classes, K separate binary classifiers are trained, each distinguishing one class from all others. At prediction time, the class whose classifier outputs the highest probability wins. An alternative approach uses the softmax function to directly model the probability distribution over all K classes simultaneously, with cross-entropy loss as the natural generalization of BCE. The theoretical limitations of linear classifiers are discussed — they can only separate classes with a hyperplane, making them incapable of solving problems like XOR where the decision boundary must be nonlinear.",
            type: "theory",
          },
          {
            title: "Classification Implementation (PyTorch)",
            slug: "classification-implementation",
            description: "Implementing sigmoid, LogisticRegression class, BCE loss, decision boundary visualization on Iris dataset, multi-class 1-vs-all with softmax.",
            content: "This implementation builds logistic regression from the ground up in PyTorch, starting with a manual implementation of the sigmoid function and binary cross-entropy loss. The LogisticRegression class extends nn.Module with a single linear layer followed by sigmoid activation. The forward pass computes the predicted probabilities, and BCE loss is computed manually using the formula -(y*log(p) + (1-y)*log(1-p)), with a small epsilon added inside the logarithm for numerical stability to prevent log(0) errors.\n\nThe Iris dataset (150 samples, 4 features, 3 classes) serves as the primary testbed. For binary classification, only two classes are used initially, and the model is trained using gradient descent with the custom BCE loss. Decision boundary visualization is a key component: for two selected features, a dense grid of points is evaluated by the model, and the resulting probability surface is plotted as a colored contour map with training points overlaid. This visualization makes the linear decision boundary tangible and shows exactly how the model separates the feature space.\n\nMulti-class classification is implemented using the one-vs-all strategy, training three separate binary classifiers. Each classifier learns to distinguish one Iris species from the other two. At inference, all three classifiers score each input, and the class with the highest predicted probability is selected. The implementation then transitions to using PyTorch's built-in nn.Sequential with nn.Linear and nn.Sigmoid, optim.SGD optimizer, and nn.CrossEntropyLoss for a more streamlined multi-class approach. The XOR problem is attempted with logistic regression to demonstrate its failure on non-linearly separable data — the linear decision boundary cannot correctly separate the four XOR points regardless of training duration, motivating the need for neural networks.",
            type: "practice",
          },
          {
            title: "Classification Report",
            slug: "classification-report",
            description: "Decision boundary analysis, multi-class prediction accuracy, and discussion of XOR as a non-linearly separable problem.",
            content: "This report provides a thorough analysis of the logistic regression experiments, focusing on three key themes: decision boundary geometry, multi-class performance, and the fundamental limitations of linear classifiers. The decision boundary analysis examines how the learned weights and bias define the separating hyperplane, interpreting the weight magnitudes as indicators of feature importance. For the Iris dataset, petal features (length and width) produce cleaner separation than sepal features, reflected in higher classification accuracy when using petal features alone.\n\nMulti-class prediction accuracy is evaluated using confusion matrices for each one-vs-all classifier, revealing where misclassifications occur. The Iris setosa class is perfectly separable from the other two with a linear boundary, while Iris versicolor and virginica overlap in feature space, leading to misclassification errors at the boundary. The report compares the one-vs-all approach with the softmax-based multi-class approach, noting that softmax produces better-calibrated probability estimates and slightly higher accuracy because it considers all classes simultaneously during training rather than independently.\n\nThe XOR analysis constitutes the most insightful section. The four XOR points — (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0 — require a nonlinear decision boundary because no single line can separate the positive from the negative examples. The report visualizes the logistic regression model's best attempt at fitting XOR, showing how it converges to a diagonal boundary that achieves at best 50% accuracy. This limitation is traced back to the linear nature of the model's hypothesis function and directly motivates the introduction of neural networks, which overcome this limitation by stacking nonlinear transformations.",
            type: "project",
          },
        ],
      },
      {
        week: 5,
        title: "Advanced Classification — Decision Trees & Naive Bayes",
        summary:
          "Beyond logistic regression: multinomial logistic regression (softmax), decision trees using entropy-based information gain, and Gaussian Naive Bayes. Applied to both the Iris dataset and the much larger Forest Covertype dataset (580K samples, 54 features, 7 classes). Introduces critical ML concepts: confusion matrix analysis, handling class imbalance with weighted loss and SMOTE (Synthetic Minority Over-sampling Technique), and comparing classifier performance across algorithms. Scikit-learn becomes the primary framework here.",
        resources: [
          {
            title: "Trees & Bayesian Classification",
            slug: "trees-bayes-theory",
            description: "Multinomial logistic regression, decision trees (entropy, information gain), Gaussian Naive Bayes, and probabilistic classification.",
            content: "This section advances beyond binary logistic regression to explore three powerful classification paradigms. Multinomial logistic regression uses the softmax function to model the probability distribution over K classes directly: P(class_k | x) = exp(w_k^T x) / sum_j(exp(w_j^T x)). Unlike the one-vs-all approach, softmax training considers all classes simultaneously, producing a single model with K sets of weights optimized jointly using multi-class cross-entropy loss. This approach is the foundation for classification layers in modern neural networks.\n\nDecision trees take a fundamentally different approach by recursively partitioning the feature space using axis-aligned splits. At each node, the algorithm selects the feature and threshold that maximizes information gain — the reduction in entropy (impurity) achieved by the split. Entropy is defined as H = -sum(p_k * log(p_k)), where p_k is the proportion of samples belonging to class k. A pure node (all one class) has zero entropy, while maximum entropy occurs when all classes are equally represented. The tree grows by greedily choosing the split that produces the purest child nodes, continuing until a stopping criterion is met (maximum depth, minimum samples per leaf, or perfect purity). Decision trees are highly interpretable but prone to overfitting without proper pruning or depth limits.\n\nGaussian Naive Bayes is a probabilistic classifier rooted in Bayes' theorem. It models the likelihood P(x|class_k) as a product of independent Gaussian distributions for each feature: P(x|class_k) = product_j(N(x_j; mu_kj, sigma_kj^2)). The \"naive\" assumption is that features are conditionally independent given the class, which is rarely true in practice but works surprisingly well nonetheless. Classification selects the class with the highest posterior probability P(class_k|x), computed via Bayes' rule. The simplicity of Gaussian NB — requiring only mean and variance estimates per class per feature — makes it extremely fast to train and effective as a baseline classifier.",
            type: "theory",
          },
          {
            title: "Advanced Classification Practice",
            slug: "advanced-classification",
            description: "Comparing LogisticRegression, DecisionTreeClassifier, and GaussianNB on Forest Covertype. Confusion matrices, class imbalance handling with SMOTE.",
            content: "This practical session applies three classification algorithms to a real-world large-scale dataset: the Forest Covertype dataset from the UCI repository (580,000 samples, 54 features, 7 forest cover types). Using scikit-learn's implementations of LogisticRegression, DecisionTreeClassifier, and GaussianNB, the exercise provides direct performance comparison across fundamentally different modeling approaches. Data preprocessing includes proper train/test splitting with stratification to maintain class proportions, and feature standardization for the logistic regression model.\n\nConfusion matrix analysis reveals nuanced classifier behavior beyond simple accuracy metrics. For each model, the full 7x7 confusion matrix is computed and visualized as a heatmap, showing which cover types are frequently confused with each other. Per-class precision, recall, and F1-score are computed, exposing how aggregate accuracy can mask poor performance on minority classes. The Forest Covertype dataset has significant class imbalance — some cover types comprise over 40% of samples while others account for less than 5% — making this analysis particularly important.\n\nClass imbalance is addressed through two strategies: weighted loss functions (assigning higher weight to minority classes during training) and SMOTE (Synthetic Minority Over-sampling Technique), which generates synthetic training examples for underrepresented classes by interpolating between existing minority samples and their nearest neighbors. The exercise compares classifier performance before and after SMOTE, showing how oversampling can dramatically improve recall for minority classes at a modest cost to majority-class precision. The comparison across algorithms reveals that decision trees handle the raw feature space well due to their nonlinear splitting capability, while logistic regression benefits most from careful feature engineering and class balancing.",
            type: "practice",
          },
        ],
      },
      {
        week: 6,
        title: "Neural Networks",
        summary:
          "Introduction to neural networks: multi-layer perceptrons (MLPs), activation functions (ReLU, sigmoid, softmax), the universal approximation theorem, and backpropagation. First revisits the XOR problem — demonstrating that a 2-layer neural network can solve what linear classifiers cannot. Then builds a complete MLP classifier for the Iris dataset using PyTorch's nn.Module with customizable architecture (hidden layers, neurons, activation functions), proper training/validation loops, and performance evaluation.",
        resources: [
          {
            title: "Neural Networks Fundamentals",
            slug: "neural-networks-theory",
            description: "MLP architecture, activation functions, universal approximation theorem, backpropagation algorithm, and weight initialization.",
            content: "Neural networks are computational models inspired by biological neurons, consisting of layers of interconnected units that transform inputs through a series of nonlinear operations. A multi-layer perceptron (MLP) is the simplest deep neural architecture: an input layer receives the features, one or more hidden layers apply linear transformations followed by nonlinear activation functions, and an output layer produces the final prediction. The key insight is that stacking multiple nonlinear transformations allows the network to learn arbitrarily complex decision boundaries — something impossible with a single linear layer.\n\nActivation functions introduce the nonlinearity that gives neural networks their expressive power. The sigmoid function sigma(z) = 1/(1+exp(-z)) squashes outputs to (0,1), suitable for probabilities but suffering from vanishing gradients in deep networks. ReLU (Rectified Linear Unit) f(z) = max(0, z) has become the default hidden layer activation due to its computational simplicity and gradient-friendly behavior (gradient is either 0 or 1). Softmax generalizes sigmoid to multi-class settings, converting a vector of raw scores into a probability distribution. The universal approximation theorem guarantees that a single hidden layer with enough neurons can approximate any continuous function to arbitrary precision — though in practice, deeper networks with fewer neurons per layer are more efficient and generalize better.\n\nBackpropagation is the algorithm that makes training neural networks feasible. It computes the gradient of the loss function with respect to every weight in the network by applying the chain rule backwards from the output layer to the input layer. For each layer, the gradient is decomposed into the local gradient (derivative of the activation function) multiplied by the gradient flowing from the layer above. This recursive structure makes gradient computation efficient — proportional to a single forward pass. Weight initialization is critical: all-zero initialization causes symmetry problems (all neurons learn the same features), while random initialization with appropriate scaling (Xavier/Glorot for sigmoid, He for ReLU) ensures healthy gradient flow at the start of training.",
            type: "theory",
          },
          {
            title: "Neural Networks Implementation (PyTorch)",
            slug: "neural-networks-implementation",
            description: "Solving XOR with a 2-layer MLP, building configurable neural networks for Iris classification, training loops with validation.",
            content: "This implementation demonstrates the power of neural networks by first conquering the XOR problem that defeated logistic regression. A simple 2-layer MLP with 2 input neurons, 4 hidden neurons (with ReLU activation), and 1 output neuron (with sigmoid activation) is built using PyTorch's nn.Module. The XOR dataset consists of just four points, but the network learns a nonlinear decision boundary that correctly classifies all of them. Visualizing the hidden layer's learned representations reveals how the network transforms the input space to make XOR linearly separable — the two hidden layers effectively \"unfold\" the data into a higher-dimensional space where a linear boundary suffices.\n\nA configurable MLP class is then implemented, accepting parameters for the number of hidden layers, neurons per layer, and activation function type. This flexibility allows systematic experimentation with architecture design. The network is applied to the full Iris dataset (3 classes), using nn.CrossEntropyLoss which internally applies softmax and computes multi-class cross-entropy. The training loop includes proper train/validation splitting, per-epoch loss tracking, and accuracy computation on both splits. Different architectures are compared: shallow wide networks (1 hidden layer with 64 neurons) versus deep narrow networks (3 hidden layers with 16 neurons each), revealing how architecture choices affect convergence speed and final accuracy.\n\nThe implementation also explores practical training dynamics: how learning rate affects convergence, how batch size influences gradient noise and training stability, and how the number of training epochs relates to overfitting. Validation loss is monitored to detect when the model begins to overfit — the point where training loss continues to decrease but validation loss starts to rise. The comparison between neural network performance and logistic regression on the Iris dataset quantifies the advantage of nonlinear models: the neural network achieves near-perfect accuracy even on the challenging versicolor/virginica boundary where logistic regression struggles.",
            type: "practice",
          },
          {
            title: "Neural Network Report",
            slug: "neural-network-report",
            description: "Architecture design choices, XOR solution analysis, comparison of NN vs. logistic regression accuracy, and training dynamics.",
            content: "This report presents a comprehensive analysis of neural network experiments, starting with the XOR problem as a case study in the power of nonlinear models. The report examines the trained XOR network's weights and biases to understand exactly how it solves the problem: the hidden layer creates two new features from the inputs, and the output layer combines them with a simple linear boundary. Visualization of the decision boundary shows the characteristic curved region that separates the XOR classes — a boundary impossible for any linear classifier.\n\nThe architecture comparison section systematically evaluates how network depth and width affect performance on the Iris dataset. Results are presented in a table showing accuracy, training time, and number of parameters for each configuration. Key findings include: deeper networks converge faster but are more sensitive to learning rate, wider networks have more parameters but not always better generalization, and the simplest network that achieves near-perfect accuracy (1 hidden layer with 8 neurons) is preferred under the principle of parsimony. The report also analyzes learning curves (accuracy vs. epoch) for each architecture, noting that overfitting becomes visible earlier in larger networks.\n\nThe comparison of neural networks versus logistic regression provides a rigorous evaluation of when the added complexity is justified. On the Iris dataset, logistic regression achieves approximately 95-97% accuracy while the neural network reaches 98-100%, with the improvement concentrated on the difficult versicolor/virginica boundary. The report discusses the tradeoff between model complexity and interpretability: logistic regression provides directly interpretable weights, while neural network decisions are harder to explain. The conclusion argues that for linearly separable problems, the simplicity and interpretability of logistic regression is preferred, but for problems with nonlinear structure (like XOR, or image/speech data), neural networks are essential.",
            type: "project",
          },
        ],
      },
      {
        week: 7,
        title: "Clustering — K-Means & Hierarchical Methods",
        summary:
          "Unsupervised learning begins with clustering: the K-means algorithm (initialization, assignment, update steps), selecting optimal K using the elbow method (inertia plot), and hierarchical agglomerative clustering with dendrograms. Applied to the Iris dataset for comparison with known labels, then to a real-world customer segmentation task using the iFood marketing dataset (2206 customers, features like income, spending, demographics). Explores how clustering reveals natural groupings without supervision.",
        resources: [
          {
            title: "Clustering Algorithms",
            slug: "clustering-theory",
            description: "K-means algorithm, convergence properties, initialization strategies, elbow method, hierarchical/agglomerative clustering, and dendrograms.",
            content: "Clustering is the quintessential unsupervised learning task: discovering natural groupings in data without any labels. K-means is the most widely used clustering algorithm, operating through an iterative process: (1) initialize K cluster centroids (randomly or using K-means++), (2) assign each data point to its nearest centroid based on Euclidean distance, (3) recompute each centroid as the mean of all points assigned to it, and repeat steps 2-3 until convergence (when assignments no longer change). K-means is guaranteed to converge but only to a local minimum, making initialization critically important — the K-means++ strategy selects initial centroids that are spread out across the data, dramatically improving results.\n\nChoosing the number of clusters K is a fundamental challenge since the \"correct\" number of clusters is rarely known a priori. The elbow method plots the total within-cluster sum of squares (inertia) as a function of K: as K increases, inertia monotonically decreases, but the rate of decrease typically slows at a characteristic \"elbow\" point that suggests a natural number of clusters. The silhouette score provides a complementary metric, measuring how similar each point is to its own cluster compared to the nearest neighboring cluster. Both methods provide heuristic guidance rather than definitive answers, and domain knowledge remains essential for interpreting clustering results.\n\nHierarchical agglomerative clustering takes a bottom-up approach: each data point starts as its own cluster, and pairs of clusters are iteratively merged based on a linkage criterion (single linkage: minimum distance, complete linkage: maximum distance, average linkage: mean distance, Ward's method: minimum increase in total within-cluster variance). The result is a dendrogram — a tree diagram that visualizes the entire hierarchy of merges, allowing clusters to be extracted at any level by cutting the tree at a chosen height. Hierarchical clustering does not require specifying K in advance and provides a rich multi-scale view of data structure, but it is computationally expensive (O(n^3)) for large datasets.",
            type: "theory",
          },
          {
            title: "Clustering Practice",
            slug: "clustering-practice",
            description: "K-means on Iris dataset, elbow curve analysis, hierarchical clustering with dendrograms, customer segmentation on iFood marketing data.",
            content: "This practical session applies clustering algorithms to two datasets of increasing complexity. The Iris dataset serves as a controlled testbed where the true labels are known, allowing direct evaluation of clustering quality. K-means with K=3 is applied to the four-dimensional feature space, and the resulting cluster assignments are compared with the true species labels using the adjusted Rand index and cluster purity metrics. Visualization of the clusters in 2D (using the first two principal components) reveals that K-means successfully identifies the setosa cluster perfectly but sometimes merges versicolor and virginica due to their overlap in feature space.\n\nThe elbow method is applied to the Iris dataset by running K-means for K values from 1 to 10 and plotting the inertia curve. The elbow at K=3 confirms the known number of species. Hierarchical clustering with Ward's linkage produces a dendrogram that is cut at a height yielding three clusters, with results compared to the K-means assignments. The dendrogram visualization provides additional insight by showing that setosa separates from the other species at a much higher distance (earlier in the merging process) than versicolor separates from virginica, consistent with the known biological relationships.\n\nThe iFood marketing dataset (2,206 customers with features including income, total spending across categories, number of purchases through different channels, number of children, and age) presents a real-world customer segmentation challenge. After feature standardization, K-means is applied with K values from 2 to 8, and the elbow method suggests K=3 or K=4 as optimal. The resulting customer segments are profiled by examining the mean feature values within each cluster: for example, one cluster might represent high-income, high-spending customers who prefer wine and catalog purchases, while another represents younger families with moderate income who buy more via the website. This segmentation directly supports marketing strategy decisions, demonstrating the practical value of clustering for business applications.",
            type: "practice",
          },
        ],
      },
      {
        week: 8,
        title: "Density Estimation — Mixture of Gaussians & EM",
        summary:
          "Parametric density estimation using Mixture of Gaussians (MoG) trained with the Expectation-Maximization (EM) algorithm. Covers the mathematical formulation of Gaussian mixtures (mixing coefficients, means, covariances), the E-step (responsibility calculation) and M-step (parameter updates), and convergence via log-likelihood monitoring. Applied to vowel phoneme classification using formant frequencies (F1, F2), building a Bayesian classifier from two class-conditional MoGs. Explores the singularity problem in EM and strategies to overcome it.",
        resources: [
          {
            title: "Density Estimation & EM Algorithm",
            slug: "density-estimation-theory",
            description: "Mixture of Gaussians model, EM algorithm (E-step, M-step), log-likelihood convergence, and Bayesian classification from density models.",
            content: "Density estimation addresses the fundamental problem of modeling the probability distribution that generated observed data. The Mixture of Gaussians (MoG) model represents a distribution as a weighted sum of K Gaussian components: p(x) = sum_k(pi_k * N(x; mu_k, Sigma_k)), where pi_k are the mixing coefficients (which must sum to 1), mu_k are the component means, and Sigma_k are the component covariance matrices. This model is remarkably flexible — with enough components, a MoG can approximate any continuous distribution to arbitrary precision, making it a universal density estimator.\n\nThe Expectation-Maximization (EM) algorithm is the standard method for fitting MoG models when the component assignments are unknown (latent variables). The E-step computes the \"responsibilities\" — the posterior probability that each data point belongs to each Gaussian component: r_nk = pi_k * N(x_n; mu_k, Sigma_k) / sum_j(pi_j * N(x_n; mu_j, Sigma_j)). The M-step then updates the model parameters using these responsibilities as soft assignments: new means are responsibility-weighted averages of the data, new covariances are responsibility-weighted scatter matrices, and new mixing coefficients are the average responsibilities. The algorithm alternates between E and M steps, monotonically increasing the log-likelihood at each iteration until convergence.\n\nBayesian classification from density models connects unsupervised density estimation to supervised classification. For each class c, a class-conditional density p(x|c) is estimated using a MoG. Classification then applies Bayes' rule: P(c|x) = p(x|c) * P(c) / p(x), selecting the class with the highest posterior probability. The singularity problem in EM occurs when a Gaussian component collapses onto a single data point, causing its variance to approach zero and the likelihood to tend toward infinity. Strategies to prevent this include adding a small regularization term to diagonal covariance elements, setting a minimum variance threshold, or reinitializing collapsed components.",
            type: "theory",
          },
          {
            title: "Density Estimation Practice",
            slug: "density-estimation-practice",
            description: "Implementing MoG with EM for vowel phoneme data, building classifiers from density estimates, exploring K values and singularity handling.",
            content: "This implementation builds a complete Mixture of Gaussians model with the EM algorithm from scratch in Python/NumPy. The model is applied to vowel phoneme classification using formant frequency data — each vowel sound is characterized by its first two formant frequencies (F1 and F2), creating a 2D feature space where different vowels form distinct but overlapping clusters. The implementation handles all the numerical challenges: log-sum-exp trick for computing responsibilities without overflow, regularization of covariance matrices to prevent singularity, and convergence detection via log-likelihood monitoring.\n\nThe E-step implementation computes the responsibility matrix by evaluating each Gaussian component's probability density at every data point, weighting by mixing coefficients, and normalizing. The M-step updates all parameters: component means become responsibility-weighted centroids, covariance matrices become responsibility-weighted scatter matrices, and mixing coefficients become the normalized sum of responsibilities. The log-likelihood is computed after each iteration and plotted to verify monotonic increase and convergence. The implementation is tested first on synthetic 2D data with known parameters, verifying that EM recovers the true means and covariances.\n\nFor vowel classification, separate MoG models are trained on each vowel class's training data. The number of components K is varied (K=1, 3, 6, 10) to explore the tradeoff between model flexibility and overfitting. Classification is performed using Bayes' rule with equal class priors, and accuracy is evaluated on a held-out test set. The experiment reveals that too few components (K=1) underfits the complex vowel distributions while too many components risk overfitting and singularity issues. The singularity problem is encountered in practice when a component's covariance matrix becomes nearly singular, and the implementation demonstrates both detection (monitoring determinant values) and mitigation (adding epsilon to diagonal elements) strategies.",
            type: "practice",
          },
          {
            title: "Density Estimation Report",
            slug: "density-estimation-report",
            description: "MoG parameter analysis, classification accuracy comparison for K=3 vs K=6, decision boundary visualization, and singularity problem solutions.",
            content: "This report provides an in-depth analysis of Mixture of Gaussians models for vowel phoneme classification. The parameter analysis section visualizes the learned MoG components as ellipses in the F1-F2 formant space, where each ellipse's center represents a component mean and its shape is determined by the covariance matrix eigenvalues and eigenvectors. This visualization reveals how different vowels occupy distinct but overlapping regions of the formant space, and how multiple Gaussian components capture the internal structure of each vowel's distribution — accounting for speaker variation, coarticulation effects, and recording conditions.\n\nThe classification accuracy comparison between K=3 and K=6 components per class is the central result. With K=3, the model achieves moderate accuracy, capturing the broad structure of each vowel distribution but missing finer details. With K=6, accuracy improves as the additional components can model the tails and multimodal structure of the distributions more faithfully. However, K=6 also introduces instability: some components become redundant (near-zero mixing coefficients), and the risk of singularity increases. The report presents confusion matrices for both K values, identifying which vowel pairs are most frequently confused (typically vowels with overlapping formant frequencies like certain front/back vowel pairs).\n\nDecision boundary visualization shows the regions of formant space assigned to each vowel class by the Bayesian classifier. A dense grid of points is classified, and the boundaries — where the posterior probabilities of two or more classes are equal — are plotted. The decision boundaries are smooth, nonlinear curves that reflect the underlying Gaussian mixture structure. The report concludes with an analysis of the singularity problem: when it occurs (typically when K is too large relative to the data size or when the data contains near-duplicate points), what diagnostic signs indicate its onset (component variance approaching zero, log-likelihood jumping suddenly), and practical solutions (covariance regularization, minimum variance thresholds, component pruning/reinitialization).",
            type: "project",
          },
        ],
      },
      {
        week: 9,
        title: "Feature Selection & Dimensionality Reduction",
        summary:
          "Techniques for handling high-dimensional data: Principal Component Analysis (PCA) from scratch — computing covariance matrices, eigenvalue decomposition, selecting principal components, and reconstructing data. Quantitative evaluation through explained variance ratios and qualitative evaluation through 2D/3D visualization. Practical PCA applications using sklearn on real datasets. Feature selection methods including filter methods (variance threshold, correlation) and wrapper methods (forward/backward selection) applied to the Diabetes dataset.",
        resources: [
          {
            title: "PCA & Feature Selection",
            slug: "pca-theory",
            description: "Dimensionality reduction motivation, PCA derivation (covariance, eigenvalues, projection), explained variance, and feature selection methods.",
            content: "High-dimensional data presents challenges for machine learning: increased computational cost, the curse of dimensionality (data becomes sparse in high dimensions), and difficulty in visualization and interpretation. Dimensionality reduction and feature selection are two complementary approaches to addressing these challenges. Feature selection chooses a subset of the original features, preserving interpretability, while dimensionality reduction creates new features as combinations of the originals, potentially capturing more information in fewer dimensions.\n\nPrincipal Component Analysis (PCA) is the most widely used dimensionality reduction technique. It finds the directions of maximum variance in the data and projects the data onto these directions. Mathematically, PCA is derived by computing the covariance matrix of the centered data, then finding its eigenvalue decomposition. The eigenvectors define the principal component directions (orthogonal axes in feature space along which the data varies most), and the eigenvalues quantify the variance along each direction. The first principal component captures the most variance, the second captures the most remaining variance orthogonal to the first, and so on. Dimensionality reduction is achieved by keeping only the top d eigenvectors (principal components), projecting the data onto this d-dimensional subspace.\n\nThe explained variance ratio for each principal component is its eigenvalue divided by the sum of all eigenvalues, indicating the fraction of total data variance captured by that component. The cumulative explained variance curve helps decide how many components to retain: a common heuristic is to keep enough components to explain 95% of the variance. Feature selection methods complement PCA by choosing original features rather than linear combinations. Filter methods (variance threshold, correlation-based selection) evaluate features independently based on statistical properties, while wrapper methods (forward selection, backward elimination) evaluate feature subsets by training a model and measuring performance, providing better results at higher computational cost.",
            type: "theory",
          },
          {
            title: "Dimensionality Reduction Practice",
            slug: "dimensionality-reduction-practice",
            description: "PCA from scratch with eigenvectors, explained variance analysis, 2D visualization of high-dimensional data, feature selection on Diabetes dataset.",
            content: "This implementation builds PCA entirely from scratch using NumPy's linear algebra functions, without relying on sklearn's PCA class. The steps are explicit: center the data by subtracting the mean of each feature, compute the covariance matrix using the formula (1/n) * X^T * X, perform eigenvalue decomposition with np.linalg.eigh to obtain eigenvalues and eigenvectors, sort them in descending order of eigenvalue magnitude, and project the data onto the top d eigenvectors by computing X_reduced = X_centered @ V[:, :d]. Each step is verified against sklearn's PCA output to ensure correctness.\n\nThe explained variance analysis is applied to several datasets. For the Iris dataset (4 features), PCA reveals that the first two principal components capture approximately 97% of the total variance, meaning the original 4D data can be faithfully represented in just 2 dimensions. The 2D projection is visualized with points colored by species, showing clear cluster separation that mirrors the original high-dimensional structure. For higher-dimensional datasets, the cumulative explained variance curve is plotted to determine the optimal number of components, demonstrating how PCA can reduce a 10-feature dataset to 3-4 components with minimal information loss.\n\nFeature selection experiments use the Diabetes dataset (10 features) to compare filter and wrapper methods. The variance threshold method removes features with near-zero variance (none in this standardized dataset). Correlation analysis identifies highly correlated feature pairs, and one from each pair is removed to reduce multicollinearity. Forward selection iteratively adds the feature that most improves a linear regression model's cross-validated R^2 score, building the optimal subset one feature at a time. The final comparison shows the tradeoff: PCA achieves better performance with fewer dimensions (because it can combine feature information), while feature selection preserves interpretability (the selected features retain their original meaning, important for domains like healthcare where understanding which features matter is critical).",
            type: "practice",
          },
        ],
      },
      {
        week: 10,
        title: "Deep Learning — CNNs, Transfer Learning & Autoencoders",
        summary:
          "Deep learning architectures and modern training techniques: Convolutional Neural Networks (CNNs) for image classification using ResNet18 on CIFAR-10, transfer learning by fine-tuning pretrained ImageNet models, and unsupervised representation learning with autoencoders. Covers the practical aspects of deep learning: GPU utilization, data augmentation, learning rate scheduling, early stopping, and comparing training from scratch vs. leveraging pretrained weights. Demonstrates how transfer learning dramatically reduces training time and improves accuracy.",
        resources: [
          {
            title: "Deep Learning & CNNs",
            slug: "deep-learning-theory",
            description: "Convolutional neural networks, pooling, ResNet architecture, transfer learning, fine-tuning, and autoencoders for unsupervised learning.",
            content: "Convolutional Neural Networks (CNNs) are the dominant architecture for image understanding tasks. Unlike fully-connected networks that treat images as flat vectors, CNNs exploit spatial structure through three key operations: convolution (applying learned filters across the image to detect local patterns like edges, textures, and shapes), pooling (reducing spatial dimensions by summarizing local regions, typically using max pooling), and hierarchical feature learning (early layers detect simple features like edges, middle layers combine them into textures and parts, deep layers recognize high-level semantic concepts). The weight-sharing property of convolutions — the same filter is applied at every spatial position — dramatically reduces the number of parameters compared to fully-connected networks and builds in translation invariance.\n\nResNet (Residual Network) introduced skip connections that allow gradients to flow directly through shortcut paths, enabling the training of networks with hundreds or even thousands of layers. The core idea is that instead of learning the direct mapping H(x), a residual block learns the residual F(x) = H(x) - x, and the output is F(x) + x. This makes it easy for the network to learn identity mappings when needed, preventing the degradation problem where deeper networks perform worse than shallower ones. ResNet18, with 18 layers organized into 4 groups of residual blocks, provides an excellent balance of depth and computational efficiency for medium-scale image classification tasks.\n\nTransfer learning leverages features learned from large datasets (like ImageNet's 1.2 million images across 1000 classes) and applies them to new, often much smaller datasets. The process involves loading a pretrained model, replacing the final classification layer to match the new number of classes, and fine-tuning the weights. Feature extraction (freezing all layers except the new classifier) works when the new task is similar to the original, while full fine-tuning (training all layers with a small learning rate) adapts the features more thoroughly. Autoencoders are unsupervised neural networks that learn compressed representations by training to reconstruct their input through a bottleneck: the encoder compresses the input to a low-dimensional latent space, and the decoder reconstructs the original from this compressed representation. The learned latent space captures the most salient features of the data.",
            type: "theory",
          },
          {
            title: "Deep Learning Practice (CIFAR-10)",
            slug: "deep-learning-practice",
            description: "Training ResNet18 from scratch vs. transfer learning on CIFAR-10, fine-tuning pretrained models, and building autoencoders.",
            content: "This practical implementation tackles CIFAR-10 image classification (60,000 32x32 color images across 10 classes: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck) using three approaches that progressively leverage more sophisticated deep learning techniques. The first approach trains a ResNet18 from scratch — initializing all weights randomly and training on CIFAR-10 alone. Data augmentation (random horizontal flips, random crops with padding, color jitter) is applied to the training set to reduce overfitting, while the test set uses only normalization. Training uses SGD with momentum, a cosine annealing learning rate scheduler, and runs for 50-100 epochs on GPU.\n\nThe transfer learning approach loads a ResNet18 pretrained on ImageNet (1000 classes) and adapts it for CIFAR-10 (10 classes). Two variants are compared: feature extraction (freezing all convolutional layers and only training the new final linear layer) and full fine-tuning (training all layers with a reduced learning rate of 0.001 compared to 0.01 for training from scratch). The results are striking: feature extraction achieves reasonable accuracy with minimal training time (only the classifier weights need updating), and full fine-tuning reaches significantly higher accuracy than training from scratch, despite CIFAR-10's small image size being quite different from ImageNet's 224x224 images. This demonstrates that low-level features like edge detectors and texture patterns transfer well across image domains.\n\nThe autoencoder section builds an unsupervised representation learning system. The encoder uses convolutional layers to compress 32x32x3 images down to a compact latent vector (e.g., 128 dimensions), and the decoder uses transposed convolutions to reconstruct the original image. Training minimizes MSE between input and output images. After training, the quality of learned representations is evaluated in two ways: visually (comparing input images with their reconstructions to assess what information is preserved) and quantitatively (using the encoder's latent representations as features for a simple classifier, showing that the autoencoder learns semantically meaningful features without any labels). The latent space is also explored by interpolating between encodings of different images, revealing smooth transitions that indicate well-structured representations.",
            type: "practice",
          },
        ],
      },
    ],
    tags: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Regression",
      "Classification",
      "Clustering",
      "Neural Networks",
      "Deep Learning",
      "PyTorch",
      "Scikit-learn",
      "PCA",
      "Density Estimation",
    ],
  },
  {
    slug: "ai",
    title: "Artificial Intelligence",
    shortTitle: "AI",
    description:
      "Broad AI concepts: search algorithms, knowledge representation, planning, reasoning, and the landscape of modern AI systems.",
    overview:
      "From classical AI (search, logic, planning) to modern deep learning and LLM-based systems. This section maps the evolution of AI and where different techniques fit in the bigger picture.",
    category: "topic",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    resources: [],
    tags: ["Search Algorithms", "Knowledge Representation", "Planning", "LLMs", "Agent Systems"],
  },
  {
    slug: "nlp",
    title: "Natural Language Processing",
    shortTitle: "NLP",
    description:
      "Text processing, language models, sentiment analysis, named entity recognition, and modern transformer-based NLP.",
    overview:
      "NLP is where language meets computation. This section covers text preprocessing, classical NLP (TF-IDF, n-grams), word embeddings, and modern transformer architectures. Includes practical work with spaCy, NLTK, and Hugging Face.",
    category: "topic",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    resources: [],
    tags: ["Tokenization", "Embeddings", "Transformers", "BERT", "Sentiment Analysis", "NER"],
  },
  {
    slug: "sprl",
    title: "Statistical Planning and Reinforcement Learning",
    shortTitle: "SPRL",
    description:
      "Planning under uncertainty, Markov decision processes, reinforcement learning algorithms, policy optimization, and multi-agent systems.",
    overview:
      "How agents learn to make sequential decisions. Covers MDPs, dynamic programming, Monte Carlo methods, temporal-difference learning (Q-learning, SARSA), policy gradient methods, and deep reinforcement learning.",
    category: "topic",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    resources: [],
    tags: ["MDP", "Q-Learning", "Policy Gradient", "Reinforcement Learning", "Planning"],
  },

  // --- Advanced Topics ---
  {
    slug: "nn-nlp",
    title: "Neural Networks and NLP",
    shortTitle: "NN & NLP",
    description:
      "Deep learning for NLP: neural network architectures, RNNs, LSTMs, attention mechanisms, transformers, and sequence-to-sequence models.",
    overview:
      "The intersection of deep learning and natural language processing. From basic neural networks to attention mechanisms and transformers, with hands-on implementations of key architectures.",
    category: "topic",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    resources: [
      { title: "Neural Network Basics", slug: "nn-basics", content: "", description: "Feed-forward networks, backpropagation", type: "practice" },
      { title: "Word Embeddings", slug: "word-embeddings", content: "", description: "Word2Vec, GloVe implementations", type: "practice" },
      { title: "RNNs and LSTMs", slug: "rnns-lstms", content: "", description: "Sequence modeling for text", type: "practice" },
      { title: "Attention & Transformers", slug: "attention-transformers", content: "", description: "Self-attention, multi-head attention", type: "practice" },
    ],
    tags: ["RNN", "LSTM", "Attention", "Transformers", "BERT", "NMT", "NLG"],
  },
  {
    slug: "conversational",
    title: "Conversational Agents and Dialogue Systems",
    shortTitle: "Conversational Agents",
    description:
      "Dialogue systems, chatbot architectures, dialogue act tagging, slot filling, and seq2seq models for conversation.",
    overview:
      "Building systems that can hold meaningful conversations. Covers rule-based and neural dialogue systems, dialogue act classification, intent detection, slot filling, and end-to-end neural approaches.",
    category: "topic",
    icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
    resources: [
      { title: "Dialogue Act Tagging", slug: "dialogue-act-tagging", content: "", description: "Classifying utterance types in conversation", type: "practice" },
      { title: "Seq2Seq for Dialogue", slug: "seq2seq-dialogue", content: "", description: "Encoder-decoder models for response generation", type: "theory" },
    ],
    tags: ["Dialogue Systems", "Chatbots", "Seq2Seq", "Slot Filling", "Intent Detection"],
  },
  {
    slug: "ir",
    title: "Information Retrieval",
    shortTitle: "Information Retrieval",
    description:
      "Search engines and retrieval: Boolean retrieval, TF-IDF, BM25, vector space models, language models, and evaluation metrics.",
    overview:
      "How search engines find relevant documents. Covers indexing, ranking algorithms, query processing, relevance feedback, and evaluation. Directly relevant to RAG pipelines and semantic search in AI applications.",
    category: "topic",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    resources: [
      { title: "Boolean & VSM Retrieval", slug: "boolean-vsm", content: "", description: "Boolean queries, TF-IDF, vector space model", type: "theory" },
      { title: "BM25 & Language Models", slug: "bm25-lm", content: "", description: "Probabilistic retrieval and language modeling", type: "theory" },
      { title: "Search Engine Project", slug: "search-engine", content: "", description: "Building a search engine from scratch", type: "project" },
    ],
    tags: ["TF-IDF", "BM25", "Vector Space", "Language Models", "Search Engines", "RAG"],
  },

  // --- Tools & Frameworks ---
  {
    slug: "pytorch",
    title: "PyTorch",
    shortTitle: "PyTorch",
    description:
      "Deep learning with PyTorch: tensors, autograd, neural networks, training loops, and GPU acceleration.",
    overview:
      "PyTorch is the go-to framework for deep learning research and production. This section covers tensor operations, automatic differentiation, building custom models, and training workflows.",
    category: "tool",
    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
    resources: [],
    tags: ["Tensors", "Autograd", "CNN", "RNN", "GPU", "Deep Learning"],
  },
  {
    slug: "sklearn",
    title: "Scikit-learn",
    shortTitle: "Scikit-learn",
    description:
      "Classical ML with Scikit-learn: preprocessing, model selection, pipelines, cross-validation, and hyperparameter tuning.",
    overview:
      "Scikit-learn is the standard library for classical machine learning in Python. Covers practical workflows from data preprocessing to model deployment.",
    category: "tool",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    resources: [],
    tags: ["Classification", "Regression", "Clustering", "Pipelines", "Cross-Validation"],
  },
  {
    slug: "pandas-numpy",
    title: "Pandas & NumPy",
    shortTitle: "Pandas & NumPy",
    description:
      "Data manipulation and numerical computing: DataFrames, array operations, data cleaning, and analysis workflows.",
    overview:
      "The foundation of Python data science. Pandas for structured data manipulation and NumPy for numerical computing. Essential for any ML/AI workflow.",
    category: "tool",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    resources: [],
    tags: ["DataFrames", "Arrays", "Data Cleaning", "Vectorization", "Analysis"],
  },
  {
    slug: "huggingface",
    title: "Hugging Face",
    shortTitle: "Hugging Face",
    description:
      "Transformers library, model hub, tokenizers, fine-tuning pretrained models, and building NLP pipelines.",
    overview:
      "Hugging Face has become the central hub for NLP and LLM development. Covers the Transformers library, pretrained model usage, fine-tuning, and building production NLP pipelines.",
    category: "tool",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    resources: [],
    tags: ["Transformers", "Fine-tuning", "Tokenizers", "Model Hub", "Pipelines"],
  },
  {
    slug: "spacy",
    title: "spaCy",
    shortTitle: "spaCy",
    description:
      "Industrial-strength NLP: tokenization, NER, POS tagging, dependency parsing, and custom pipeline components.",
    overview:
      "spaCy is designed for production NLP. Covers linguistic features, entity recognition, custom pipelines, and integration with deep learning frameworks. Used extensively in the ai-test-gen project.",
    category: "tool",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    resources: [],
    tags: ["NER", "POS Tagging", "Dependency Parsing", "Pipelines", "Tokenization"],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicsByCategory(category: "topic" | "tool"): Topic[] {
  return topics.filter((t) => t.category === category);
}

export function getMLSection(week: number): TopicSection | undefined {
  const ml = topics.find((t) => t.slug === "ml");
  return ml?.sections?.find((s) => s.week === week);
}

export function getMLResource(week: number, resourceSlug: string): TopicResource | undefined {
  const section = getMLSection(week);
  return section?.resources.find((r) => r.slug === resourceSlug);
}
