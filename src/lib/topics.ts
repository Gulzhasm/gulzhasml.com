export interface TopicResource {
  title: string;
  slug: string;
  description: string;
  content: string;
  type: "notebook" | "tutorial" | "theory" | "practice" | "post" | "project";
  link?: string;
  notebookUrl?: string;
}

export interface TopicSection {
  week: number;
  title: string;
  summary: string;
  resources: TopicResource[];
  /** Optional lecture PDF for this section (e.g. course slides). Served from public/materials/ or external URL. */
  lecturePdfUrl?: string;
  lectureTitle?: string;
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
        title: "Week 1: Intro + Setup",
        summary:
          "An introduction to the ML landscape: what machine learning is, the difference between supervised and unsupervised learning, and the types of problems ML can solve (regression, classification, clustering). The practical component covers Python fundamentals (variables, data types, control flow, functions) and PyTorch basics — tensor operations, matrix multiplication, broadcasting, reshaping, nn.Module, autograd, and building simple MLP pipelines for binary classification, multi-class classification, multi-label classification, and regression tasks.",
        resources: [
          {
            title: "What Is Machine Learning, Really?",
            slug: "intro-to-ml",
            description:
              "A plain-English tour of ML paradigms — supervised vs. unsupervised learning, common problem types, and the end-to-end workflow from raw data to predictions.",
            content:
              "Imagine you want to predict the price of a house. You could sit down and write a gigantic if-else tree: if the house is in Brooklyn and has three bedrooms and was built after 2005, then... but you would never finish. Machine learning flips the script. Instead of hand-coding rules, you give a learning algorithm thousands of past sales — each with features like square footage, neighbourhood, and number of bathrooms, plus the actual sale price — and the algorithm figures out the rules on its own. That core idea, learning patterns from data instead of programming them manually, is what separates ML from traditional software.\n\nML splits into two big families. In supervised learning you have labelled examples: every input comes with the correct answer, and the model tries to reproduce those answers on new, unseen inputs. Regression is the flavour where the answer is a number (house price, temperature tomorrow, stock return), while classification is the flavour where the answer is a category (spam vs. not-spam, which digit is in a photo, which disease a scan shows). In unsupervised learning there are no labels at all — the algorithm's job is to discover hidden structure, like grouping customers with similar shopping habits (clustering) or reducing a 100-feature dataset down to three dimensions you can plot (dimensionality reduction).\n\nEvery ML project follows the same pipeline regardless of algorithm: collect data, clean and preprocess it, split it into train/validation/test sets, pick a model, train (optimise) the model on the training set, evaluate on the validation set, tune hyperparameters, and finally report honest performance on the held-out test set. The train/validation/test split exists to keep you honest — if you evaluate on the same data you trained on, the model can just memorise the answers, a problem called overfitting. This pipeline, along with the core notation you will meet everywhere — feature vectors (x), weight vectors (w), a hypothesis function h(x), and a loss function L that measures how wrong the model is — forms the foundation for everything that follows, from simple linear regression all the way to deep learning.",
            type: "theory",
          },
          {
            title: "Python Fundamentals for ML",
            slug: "python-fundamentals",
            description:
              "Hands-on Python from zero: variables, data types, lists, tuples, dicts, sets, operators, control flow, I/O, and modules — with exercises you actually run.",
            content:
              "Python is the lingua franca of machine learning, and this notebook makes sure you are fluent before touching any math. It starts with the building blocks every program uses: variables and basic types. An integer like num_epochs = 50 stores a whole number, a float like learning_rate = 0.001 stores a decimal, a string like name = 'Adam' stores text, and a boolean like is_training = True stores a yes/no flag. These four types show up constantly in ML code — learning rates are floats, epoch counters are ints, model names are strings, and flags toggle training versus evaluation mode.\n\nPython's collection types are where things get powerful. A list is an ordered, mutable sequence — think of it as a column of a spreadsheet you can change at will. A tuple is like a list that cannot be changed after creation, which makes it perfect for things that should stay fixed, like the shape of a tensor (28, 28, 1). A dictionary maps keys to values: config = {'lr': 0.01, 'epochs': 100, 'batch_size': 32} is a pattern you will use in every ML project to bundle hyperparameters. A set is an unordered collection of unique elements — useful when you need to find distinct class labels quickly. The notebook walks you through creating, indexing, slicing, and modifying each of these, then throws in operators (arithmetic, comparison, logical) and control flow (if/elif/else, for loops, while loops, list comprehensions) so you can build actual logic.\n\nThe exercises are the part that matters most. You will write functions that take parameters and return results, handle edge cases with conditionals, iterate through data structures with loops, and import modules like math and random. One exercise asks you to compute basic statistics (mean, variance) from a list of numbers using nothing but a loop and arithmetic — the same calculation you will later implement with NumPy in a single line and then with PyTorch tensors on a GPU. Another asks you to build a simple data-cleaning function that filters out invalid entries from a list of dictionaries. These are not toy problems; they are miniature versions of the exact data-wrangling code you will write in every ML pipeline.",
            type: "practice",
            notebookUrl: "/notebooks/ml/wk1-python-fundamentals.ipynb",
          },
          {
            title: "PyTorch I — Tensors, Matmul & Broadcasting",
            slug: "pytorch-tensors",
            description:
              "Tensor creation, matrix multiplication with torch.matmul, element-wise ops, broadcasting rules, reshape/transpose, in-place operations, and mean aggregations.",
            content:
              "If NumPy arrays are the spreadsheet of scientific Python, PyTorch tensors are the spreadsheet that also runs on a GPU and automatically computes gradients. This notebook gets you comfortable with tensors from the ground up. You will create them from Python lists, from NumPy arrays, and from handy factory functions like torch.zeros, torch.ones, torch.randn (random normal), and torch.arange. Every tensor has a shape (its dimensions), a dtype (float32, int64, etc.), and a device (CPU or CUDA). Shape mismatches are probably the single most common source of bugs in deep learning code, so the notebook drills you on checking .shape constantly.\n\nThe most important operation in all of ML is matrix multiplication, and here you will learn to use torch.matmul for it. When you write output = torch.matmul(X, W), you are doing exactly what a linear layer in a neural network does — transforming input features into a new representation. The notebook carefully distinguishes matmul from element-wise multiplication (the * operator, also called the Hadamard product, which just multiplies corresponding elements) and from dot products. Then comes broadcasting, PyTorch's rule system for making operations work between tensors of different shapes. The basic rule: dimensions are compared from right to left; they are compatible if they are equal or if one of them is 1. Broadcasting is incredibly convenient — you can subtract a mean vector from an entire batch of data in one line — but it can also silently produce wrong results if you are not careful, so the exercises specifically train you to spot broadcasting traps.\n\nFinally, the notebook covers reshaping operations that you will use every single day. view and reshape change the shape without moving data in memory (as long as the tensor is contiguous). squeeze removes dimensions of size 1, unsqueeze adds them. transpose and permute rearrange axes — critical when, say, you need to go from (batch, height, width, channels) to (batch, channels, height, width) for a convolutional layer. In-place operations like add_ and mul_ (note the trailing underscore) modify a tensor without allocating new memory, which can save RAM but can also break autograd if you are not careful. The exercises have you chain these operations together on realistic tensor shapes so that reshaping becomes second nature.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk1-pytorch-tensors.ipynb",
          },
          {
            title: "PyTorch II — Building Complete Training Pipelines",
            slug: "pytorch-pipelines",
            description:
              "Custom Dataset/DataLoader, a SimpleMLP with nn.Module, four loss functions (BCE, CrossEntropy, MSE, BCE with logits), Adam optimizer, and train/val/test loops.",
            content:
              "Knowing how tensors work is step one; actually training a model is a whole different game. This notebook walks you through every piece of the PyTorch training pipeline, end to end. It starts with data loading: you will build a custom Dataset class by implementing two methods — __len__ (how many samples?) and __getitem__ (give me sample number i) — then wrap it in a DataLoader that handles batching, shuffling, and parallel loading automatically. The DataLoader is what lets you iterate over mini-batches in a for loop, which is how every modern training run works.\n\nNext comes the model itself. You will build a SimpleMLP (multi-layer perceptron) by subclassing nn.Module, the base class for everything in PyTorch. In __init__ you define the layers (nn.Linear, nn.ReLU, nn.Sigmoid), and in forward you wire them together. The notebook then configures this same architecture for four different task types: binary classification with a single sigmoid output and BCE loss, multi-class classification with a softmax output and CrossEntropy loss, multi-label classification with independent sigmoid outputs and BCE loss (because each label is an independent binary decision), and regression with a plain linear output and MSE loss. Understanding how the final activation and the loss function must match the task type is one of the most practical things you can learn early.\n\nThe training loop itself follows a strict recipe you will repeat hundreds of times: (1) fetch a batch from the DataLoader, (2) run the forward pass to get predictions, (3) compute the loss, (4) call loss.backward() to compute gradients, (5) call optimizer.step() to update weights (using Adam here), and (6) call optimizer.zero_grad() to reset gradients for the next batch. After each epoch, you run the same forward pass over the validation set inside a torch.no_grad() block — no gradients needed, just evaluation. The notebook tracks training loss and validation loss at every epoch and plots them, teaching you to read the two key signals: convergence (both curves going down) and overfitting (training curve still dropping but validation curve turning upward). This exact loop structure is the template for every model you will build going forward.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk1-pytorch-pipelines.ipynb",
          },
        ],
      },
      {
        week: 2,
        title: "Probability & Statistics for Machine Learning",
        summary:
          "Foundational probability concepts essential for ML: Bayes' theorem with real worked examples, Gaussian distributions and their parameters, covariance and Pearson correlation from scratch, and joint/conditional/marginal probabilities. Hands-on work involves computing Bayes' rule for practical scenarios, plotting Gaussians, analysing the Iris dataset with 2D histograms and probability matrices, and building an intuition for why probability is the language every ML algorithm speaks.",
        resources: [
          {
            title: "Probability Theory — The Language of Uncertainty",
            slug: "probability-foundations",
            description:
              "Bayes' theorem, Gaussian distributions, covariance, Pearson correlation, and why every ML model is secretly a probability machine.",
            content:
              "Every machine learning model deals with uncertainty. A classifier does not say 'this email IS spam'; it says 'there is a 97% probability this email is spam.' Probability theory gives us the precise language and rules for reasoning about that uncertainty, and Bayes' theorem is its crown jewel. The formula P(A|B) = P(B|A) * P(A) / P(B) tells you how to update a belief when you see new evidence. Think of it in three pieces: P(A) is your prior belief before seeing any evidence, P(B|A) is the likelihood — how probable the evidence is if your belief is true, and P(A|B) is the posterior — your updated belief after considering the evidence. A concrete example: if 1% of loan applicants default (prior = 0.01) and a certain credit-score pattern appears in 80% of defaulters (likelihood = 0.80) but only in 10% of non-defaulters, Bayes' theorem lets you compute the exact probability that a new applicant with that pattern will default. This is not abstract — it is literally how spam filters, medical diagnostics, and fraud detection systems work.\n\nThe Gaussian (normal) distribution is the single most important distribution in ML. Its probability density function is f(x) = (1 / sqrt(2 * pi * sigma^2)) * exp(-(x - mu)^2 / (2 * sigma^2)), where mu (the mean) sets the centre of the bell curve and sigma^2 (the variance) controls how wide or narrow the bell is. A small variance gives a tall, narrow peak — the data clusters tightly around the mean. A large variance gives a short, wide hump — data is spread out. Why does this matter for ML? Because many algorithms assume features follow Gaussian distributions (Gaussian Naive Bayes, Gaussian Mixture Models, linear discriminant analysis), and even when they do not, the Central Limit Theorem guarantees that averages of enough random samples will be approximately Gaussian. Understanding what mu and sigma do, visually and mathematically, is essential.\n\nCovariance and the Pearson correlation coefficient (PCC) measure how two variables move together. Covariance is defined as cov(X, Y) = (1/n) * sum((x_i - mean_x) * (y_i - mean_y)). If X goes up when Y goes up, the covariance is positive; if they move in opposite directions, it is negative; if they are unrelated, it hovers near zero. The problem with raw covariance is that its magnitude depends on the scale of the variables — height in centimetres vs. metres gives completely different numbers. PCC fixes this by normalizing: PCC = cov(X, Y) / (std_X * std_Y), squeezing the result into the range [-1, 1]. A PCC of +1 means perfect positive linear relationship, -1 means perfect negative, and 0 means no linear relationship. The critical caveat: correlation does not imply causation. Ice cream sales and drowning rates are positively correlated, but eating ice cream does not cause drowning — both are driven by a hidden variable (summer heat). Joint, conditional, and marginal distributions extend these ideas to full probability tables, letting you ask questions like 'given that a flower's petal length is above 5 cm, what is the probability it is an Iris virginica?' — exactly the kind of question a classifier needs to answer.",
            type: "theory",
          },
          {
            title: "Probability in Practice — Bayes, Gaussians & the Iris Dataset",
            slug: "probability-exercises",
            description:
              "Implement Bayes' theorem from scratch, plot Gaussian PDFs, compute covariance and PCC by hand and with NumPy, and explore feature distributions on the Iris dataset.",
            content:
              "This notebook turns the theory into code you can run and experiment with. The first set of exercises implements Bayes' theorem step by step for a realistic scenario: given base rates and likelihoods for a loan default problem, you compute the posterior probability by plugging numbers into the formula. The eye-opening moment is seeing how sensitive the posterior is to the prior. If only 1 in 1000 applicants default, even a test that is 99% accurate will produce mostly false positives — a phenomenon known as the base rate fallacy. The exercises walk you through the arithmetic so this becomes intuitive rather than surprising.\n\nNext, you plot Gaussian PDFs using matplotlib and NumPy. The exercise asks you to overlay several Gaussians with the same mean but different variances on a single plot, then several with the same variance but different means. Visually seeing the bell curve flatten as variance grows, and slide left or right as the mean changes, cements the relationship between the parameters and the shape. You also compute the area under slices of the curve to verify that roughly 68% of values fall within one standard deviation of the mean, and 95% within two — the famous 68-95-99.7 rule. These are not just statistics trivia; they come up when you set confidence intervals on predictions or detect outliers.\n\nThe crown jewel is the Iris dataset analysis. You load all 150 samples (4 features: sepal length, sepal width, petal length, petal width; 3 species), then compute the full 4x4 covariance matrix and Pearson correlation matrix from scratch using loops and basic arithmetic — no np.cov shortcut allowed yet. You will find that petal length and petal width have a PCC above 0.96, meaning they carry almost the same information, while sepal width is weakly correlated with the other features. Then you build 2D histograms to approximate the joint distribution of pairs of features and condition on species to compute conditional probabilities: P(petal_length > 5 | species = virginica). These conditional distributions look very different for each species, which is exactly why a classifier can distinguish them. The exercises finish by computing marginal distributions by summing out one variable from the joint, tying everything back to the theory.",
            type: "practice",
            notebookUrl: "/notebooks/ml/wk2-probability.ipynb",
          },
        ],
      },
      {
        week: 3,
        title: "Linear Regression",
        summary:
          "Linear regression from theory to complete PyTorch implementation: the hypothesis function y = wTx + b, mean squared error loss, gradient descent optimisation, z-score feature normalisation, learning rate experiments, weight interpretation on the Diabetes dataset, and extending to 5th-order polynomial regression with L2 (Ridge) regularisation to control overfitting.",
        resources: [
          {
            title: "Linear Regression — Predicting Numbers with Lines",
            slug: "linear-regression-theory",
            description:
              "The hypothesis function, MSE loss, gradient descent from first principles, feature normalisation, the bias-variance tradeoff, and L2 regularisation.",
            content:
              "Linear regression is the 'hello world' of machine learning and one of the most useful algorithms you will ever learn. The idea is disarmingly simple: given some input features (square footage, number of rooms, age of a house), predict a continuous output (price). The model draws the best-fitting line through the data, where 'best' is defined mathematically. The hypothesis function is y_pred = w1*x1 + w2*x2 + ... + wn*xn + b. Each weight wi tells you how much feature xi contributes to the prediction, and the bias b is the prediction you would make if all features were zero. If w_sqft = 200, that means each additional square foot adds 200 dollars to the predicted price. This direct interpretability is one of linear regression's greatest strengths.\n\nBut how do we find the right weights? We need to define what 'right' means, and that is where the loss function comes in. Mean Squared Error (MSE) is the standard choice: J(w) = (1/n) * sum((y_pred_i - y_true_i)^2). It computes the average of the squared gaps between predictions and actual values. Squaring serves two purposes — it makes all errors positive (an over-prediction of 10 is just as bad as an under-prediction of 10), and it punishes large errors disproportionately (an error of 20 is four times worse than an error of 10, not just twice). Gradient descent then minimises this loss by repeatedly nudging the weights in the direction that reduces the error most steeply. The update rule is w := w - alpha * dJ/dw, where alpha is the learning rate. The gradient works out to dJ/dw = (2/n) * X^T * (X*w - y) — a matrix expression you will implement line by line. The learning rate controls step size: too big and you overshoot the minimum (the loss explodes), too small and training takes forever. Feature normalisation via z-score standardisation, x_normalised = (x - mean) / std, puts every feature on the same scale so that gradient descent does not zig-zag slowly along features with different magnitudes.\n\nOnce your model works on training data, the next question is whether it will work on new data. This is the bias-variance tradeoff. A model that is too simple (too few features, or weights constrained too tightly) underfits — it has high bias and misses real patterns. A model that is too complex (too many features, polynomial terms, or unconstrained weights) overfits — it memorises noise in the training data and fails on new inputs. L2 regularisation, also called Ridge regression, fights overfitting by adding a penalty term to the loss: J_regularised = MSE + lambda * sum(w_i^2). The lambda parameter controls how aggressive the penalty is. When lambda is large, the model is forced to keep weights small, which produces smoother, simpler predictions. When lambda is zero, you get plain linear regression with no penalty at all. Finding the right lambda is a matter of experimentation — you try several values and pick the one that gives the lowest loss on a validation set. This same regularisation idea shows up in virtually every ML model, from logistic regression to neural networks (where it is called weight decay).",
            type: "theory",
          },
          {
            title: "Building Linear Regression from Scratch in PyTorch",
            slug: "regression-implementation",
            description:
              "Custom LinearRegression as nn.Module, manual MSE and gradient descent, z-score normalisation, the Diabetes dataset, learning rate experiments, and weight interpretation.",
            content:
              "This notebook is where you actually build a linear regression model from the ground up using PyTorch — no sklearn shortcuts, no magic functions, just tensors and gradients. You start by creating a LinearRegression class that extends nn.Module. Inside __init__ you declare the weight vector and bias as nn.Parameter, which tells PyTorch 'these are the things I want to learn.' The forward method is a single line: return X @ self.weight + self.bias. That is the entire model. You also implement MSE loss by hand — (1/n) * ((y_pred - y_true) ** 2).mean() — because understanding the loss computation is essential before you trust a library to do it for you.\n\nThe dataset is sklearn's Diabetes dataset: 442 patients described by 10 features (age, sex, BMI, blood pressure, and six blood serum measurements), with the target being a quantitative measure of disease progression one year later. Before training, you apply z-score normalisation to the features using the training set's mean and standard deviation — critically, NOT the test set's, because in production you will not have access to future data's statistics (this is called data leakage, and it is one of the most common beginner mistakes). The training loop runs for several hundred epochs: forward pass, compute loss, call loss.backward() to compute gradients, update weights with w -= lr * w.grad using torch.no_grad(), then zero the gradients. You plot the training and validation loss curves at the end and see a smooth descent to a plateau — the hallmark of a well-behaved optimisation.\n\nThe most instructive part comes after training: interpreting the learned weights. You will find that BMI has the largest positive weight, meaning it is the strongest predictor of disease progression in this dataset. Some blood serum features also have large weights (positive or negative), while others are close to zero, meaning the model effectively ignores them. The notebook then runs learning rate experiments — training the same model with rates of 0.0001, 0.001, 0.01, and 0.1 — and plots the loss curves side by side. You will viscerally see divergence (loss shooting to infinity), sluggish convergence (loss barely budging after hundreds of epochs), and the sweet spot in between. Finally, the notebook extends to polynomial regression by creating polynomial features [x, x^2, x^3, x^4, x^5] from a single input and fitting a 5th-order curve. Without regularisation the curve goes wild between data points (overfitting), and with L2 regularisation (adding lambda * (w**2).sum() to the loss) it smooths out beautifully. You sweep lambda from 0 to 100 and see the progression from overfit to underfit, building a lasting intuition for the bias-variance tradeoff.",
            type: "practice",
            notebookUrl: "/notebooks/ml/wk3-regression.ipynb",
          },
        ],
      },
      {
        week: 4,
        title: "Classification I — Logistic Regression",
        summary:
          "From predicting numbers to predicting categories: the sigmoid function as a probability gate, binary cross-entropy loss, gradient descent for classification, decision boundary visualisation, one-vs-all multiclass classification on the Iris dataset, and the XOR problem — which reveals the fundamental limits of linear classifiers and motivates neural networks.",
        resources: [
          {
            title: "Logistic Regression — Drawing Lines Between Classes",
            slug: "classification-theory",
            description:
              "The sigmoid function, decision boundaries, binary cross-entropy loss, gradient descent for classification, one-vs-all multiclass, and why linear classifiers break on XOR.",
            content:
              "Classification is the task of sorting inputs into categories — spam or not spam, cat or dog or bird, benign or malignant. Logistic regression is the simplest and often the first classification algorithm you should try, and despite the confusing name, it is a classifier, not a regression model. The key insight is the sigmoid function: sigma(z) = 1 / (1 + exp(-z)). No matter what real number z you feed in — whether it is -1000 or +1000 — the sigmoid squishes the output into the range (0, 1). That output is interpreted as a probability: 'I am 0.92 confident this email is spam.' The input z is the familiar linear combination w^T * x + b, so the full model is P(class=1|x) = sigmoid(w^T * x + b). The decision boundary is the set of points where this probability equals exactly 0.5, which happens when w^T * x + b = 0 — a straight line in 2D, a plane in 3D, a hyperplane in higher dimensions.\n\nThe loss function for binary classification is binary cross-entropy (BCE): L = -(1/n) * sum(y * log(p) + (1-y) * log(1-p)). To understand why this works better than MSE for classification, think about what the log does. If the true label is y=1 and the model predicts p=0.99, then -log(0.99) is a tiny penalty (about 0.01). But if the model predicts p=0.01, then -log(0.01) is a massive penalty (about 4.6). The logarithm creates an asymmetric punishment that gets infinitely harsh as the model becomes confidently wrong. This is exactly the behaviour you want: being confidently wrong should be catastrophically expensive. The gradient of BCE with respect to the weights turns out to be (1/n) * X^T * (p - y), which looks almost identical to the MSE gradient for linear regression — a beautiful mathematical coincidence that makes the update rule simple to implement.\n\nFor problems with more than two classes, the simplest strategy is one-vs-all (OvA). For K classes, you train K separate binary classifiers: classifier 1 learns to distinguish class 1 from everything else, classifier 2 distinguishes class 2 from everything else, and so on. At prediction time, you run all K classifiers and pick the class with the highest predicted probability. An alternative is softmax regression, which directly models the distribution over all K classes using the softmax function: P(class_k|x) = exp(w_k^T * x) / sum_j(exp(w_j^T * x)). Softmax is what modern neural networks use for their final layer. But here is the critical limitation of all linear classifiers: they can only draw straight decision boundaries. The XOR problem makes this painfully clear. Four points — (0,0)=0, (0,1)=1, (1,0)=1, (1,1)=0 — cannot be separated by any single straight line, no matter how long you train. Logistic regression on XOR will converge to about 50% accuracy and stay stuck there forever. This fundamental limitation is exactly why we need neural networks, which can learn curved decision boundaries by stacking multiple layers of nonlinear transformations.",
            type: "theory",
          },
          {
            title: "Logistic Regression from Scratch in PyTorch",
            slug: "classification-implementation",
            description:
              "Implement sigmoid, build a custom LogisticRegression layer, code BCE loss, visualise decision boundaries on Iris, extend to one-vs-all multiclass, and watch logistic regression fail on XOR.",
            content:
              "This notebook builds logistic regression entirely by hand in PyTorch so that every moving part is visible. You start by implementing the sigmoid function as a standalone operation — sigma = 1 / (1 + torch.exp(-z)) — and plotting it to see the S-curve that maps any real number to (0, 1). Then you create a LogisticRegression class as an nn.Module: it has one nn.Linear layer (which computes w^T * x + b) followed by your sigmoid. BCE loss is also coded manually: loss = -(y * torch.log(p + eps) + (1 - y) * torch.log(1 - p + eps)).mean(), where eps = 1e-7 prevents the log of zero, which would produce NaN. Coding the loss yourself, rather than calling nn.BCELoss, means you truly understand what the number on your screen represents.\n\nThe Iris dataset is the testbed. You start with binary classification using just two of the three species and two of the four features (so you can plot everything in 2D). After training with gradient descent, the notebook generates a decision boundary visualisation: it creates a dense grid of points covering the feature space, runs each through the model, and colours the grid by predicted class. The result is a crisp straight line cutting the plane in two, with training points overlaid. You can see exactly which points the model gets right, which it gets wrong, and how the boundary shifts as you change the learning rate or number of epochs. Then you extend to all three Iris species using the one-vs-all approach: three separate logistic regression models, each trained to say 'yes/no' for one species. At prediction time, the species whose model is most confident wins.\n\nThe final and most illuminating exercise is the XOR problem. You create four data points — (0,0) labelled 0, (0,1) labelled 1, (1,0) labelled 1, (1,1) labelled 0 — and train logistic regression on them for thousands of epochs. The loss barely decreases. The decision boundary plot shows a diagonal line that can at best correctly classify two of the four points. No matter how much you train, accuracy hovers around 50%. This is not a bug — it is a fundamental mathematical limitation. A single linear boundary cannot separate the XOR pattern because the positive and negative examples are interleaved diagonally. This failure is the most compelling motivation for neural networks: by adding a hidden layer with nonlinear activations, you can bend and curve the decision boundary to solve XOR perfectly, which is exactly what you will do in a later week.",
            type: "practice",
            notebookUrl: "/notebooks/ml/wk4-classification.ipynb",
          },
        ],
      },
      {
        week: 5,
        title: "Classification II — Trees, Bayes & Ensemble Methods",
        summary:
          "Beyond logistic regression: multinomial logistic regression with sklearn, Decision Trees that split on entropy, Gaussian Naive Bayes for fast probabilistic classification, and practical tools for the real world — confusion matrices, handling class imbalance with class_weight='balanced' and SMOTE, all applied to Iris and the large-scale Forest Covertype dataset.",
        resources: [
          {
            title: "Decision Trees, Naive Bayes & the Class Imbalance Problem",
            slug: "trees-bayes-theory",
            description:
              "How decision trees split on entropy, why Naive Bayes is 'naive' yet powerful, multinomial logistic regression, confusion matrices, and strategies for imbalanced datasets.",
            content:
              "Logistic regression draws a single straight line (or hyperplane) to separate classes. Decision trees take a completely different approach: they ask a sequence of yes/no questions about individual features and split the data at each step. Imagine sorting animals: 'Does it have feathers? If yes, probably a bird. If no, does it have four legs? If yes, probably a mammal.' A decision tree formalises this by choosing the question (feature and threshold) that produces the 'purest' child groups at each node. Purity is measured by entropy: H = -sum(p_k * log2(p_k)), where p_k is the proportion of class k in the group. A group that is all one class has entropy 0 (completely pure); a group that is evenly split between classes has maximum entropy (maximum disorder). At each node, the algorithm tries every feature and every threshold, picks the one that reduces entropy the most (highest information gain = parent entropy minus weighted average of children's entropy), and splits. It repeats recursively until a stopping condition is met — maximum depth, minimum samples per leaf, or zero entropy. Decision trees are wonderfully interpretable (you can literally print the rules), but they are prone to overfitting: a deep tree can memorise the training data perfectly and generalise terribly.\n\nGaussian Naive Bayes comes at classification from the probability angle. It uses Bayes' theorem to compute P(class|features) = P(features|class) * P(class) / P(features), then picks the class with the highest posterior probability. The 'naive' part is the assumption that features are conditionally independent given the class: P(x1, x2, ..., xn | class) = P(x1|class) * P(x2|class) * ... * P(xn|class). This is almost never true in practice — petal length and petal width in Iris are highly correlated — but the algorithm works surprisingly well anyway because it only needs the ranking of posteriors to be correct, not the actual probability values. Each P(xi|class) is modelled as a Gaussian with class-specific mean and variance, so the entire model is just a lookup table of means and variances. Training is instant: just compute the mean and variance of each feature for each class. Prediction is fast: just multiply Gaussians and pick the winner. For large datasets with many features, Naive Bayes is often the best first baseline because of its speed and simplicity.\n\nIn the real world, datasets are rarely balanced. The Forest Covertype dataset has seven classes, but two of them account for over 85% of the samples while others make up less than 1%. If you train a classifier on imbalanced data and measure accuracy, you get misleading results — a model that just predicts the majority class for everything will score 85% accuracy while being completely useless for the minority classes. The confusion matrix is the antidote: it shows exactly how many samples of each true class were predicted as each class, exposing where the model fails. From the confusion matrix you compute per-class precision (of everything predicted as class k, what fraction is actually class k?) and recall (of all actual class-k samples, what fraction did the model find?). Two strategies for fixing imbalance are class_weight='balanced' (which tells the loss function to penalise mistakes on minority classes more heavily, in proportion to how rare they are) and SMOTE (Synthetic Minority Over-sampling Technique, which generates new synthetic training examples for minority classes by interpolating between existing minority samples and their nearest neighbours). Both approaches can dramatically improve recall on rare classes, often at a modest cost to majority-class precision.",
            type: "theory",
          },
          {
            title: "Classifiers in Action — Iris, Forest Covertype & SMOTE",
            slug: "advanced-classification",
            description:
              "Train multinomial logistic regression, decision trees, and Gaussian Naive Bayes with sklearn; build confusion matrices; tackle class imbalance with balanced weights and SMOTE on a 580K-sample dataset.",
            content:
              "This notebook puts three fundamentally different classifiers head-to-head on real data using scikit-learn. You start with the Iris dataset as a warm-up, training sklearn's LogisticRegression (which uses softmax internally for multiclass), DecisionTreeClassifier, and GaussianNB on the standard train/test split. For each model you compute accuracy, print the confusion matrix, and examine per-class precision, recall, and F1-score. On Iris, all three classifiers perform well (>90% accuracy), but the interesting details are in the confusion matrix: Naive Bayes and logistic regression occasionally confuse versicolor and virginica, while a deep decision tree can memorise the training set perfectly but may overfit.\n\nThen the real challenge begins: the Forest Covertype dataset from the UCI repository — 580,000 samples, 54 features, 7 forest cover types. This dataset is big enough to stress the algorithms and, crucially, it is heavily imbalanced. You split the data with stratification to maintain class proportions, standardise features for logistic regression (tree-based models do not need it), and train all three classifiers. The confusion matrices reveal the damage imbalance causes: the models are good at predicting the two majority cover types but essentially ignore the five rare types, sometimes achieving 0% recall on the rarest class. Overall accuracy looks decent (70-80%), but that number is a mirage — the model has learned to always guess the common classes.\n\nThe fix comes in two forms. First, you retrain logistic regression and the decision tree with class_weight='balanced', which automatically upweights the loss contribution of minority-class samples in inverse proportion to their frequency. This simple flag often produces a significant jump in minority-class recall. Second, you apply SMOTE from the imbalanced-learn library, which generates synthetic minority samples by picking a random minority point, finding its k nearest minority neighbours, and creating a new point along the line between them. After SMOTE, the training set is balanced (all classes have roughly equal counts), and you retrain. The before-and-after confusion matrices tell a dramatic story: minority-class recall jumps from near-zero to 40-60%, while majority-class precision drops only slightly. The exercises ask you to compare all configurations in a summary table and reflect on when each strategy is most appropriate — a skill that matters enormously in production ML where class imbalance is the rule, not the exception.",
            type: "practice",
            notebookUrl: "/notebooks/ml/wk5-classification-ii.ipynb",
          },
        ],
      },
      {
        week: 6,
        title: "Neural Networks — Perceptrons, Backpropagation & MLPs",
        summary:
          "From single perceptrons to multi-layer networks: understanding how neurons compute (weights, input functions, sigmoid activation), why random weight initialization matters, and how backpropagation actually works through a manual 4-step process. Builds a feedforward neural network from scratch to solve XOR — the classic problem that single-layer networks cannot handle — then scales up to an MLP classifier on the Iris dataset, systematically varying hidden neuron counts (1, 2, 4, 8, 16, 32) to see exactly how capacity affects learning.",
        resources: [
          {
            title: "Neural Networks from First Principles",
            slug: "neural-networks-theory",
            description: "How perceptrons compute, why activation functions matter, and the step-by-step mechanics of backpropagation that make neural networks learn.",
            content: "Think of a single neuron as a tiny decision-maker. It receives several input values, multiplies each one by a weight (which represents how important that input is), adds them all up, and then passes the result through an activation function to produce its output. The formula is straightforward: output = sigmoid(w1*x1 + w2*x2 + ... + wn*xn + bias), where the sigmoid function sigma(z) = 1 / (1 + exp(-z)) squashes any value into the range (0, 1). This is the perceptron — and despite its simplicity, it is the fundamental building block of every neural network, from the smallest MLP to the largest language model. The weights determine what the neuron responds to, and the bias shifts the decision threshold. A single perceptron can solve any linearly separable problem, drawing a straight line (or hyperplane in higher dimensions) to separate two classes.\n\nBut here is the catch: a single perceptron cannot solve XOR. XOR outputs 1 when exactly one of its two inputs is 1, and 0 otherwise. If you plot these four points, no single straight line can separate the 1s from the 0s. This was famously pointed out by Minsky and Papert in 1969, and it nearly killed neural network research for a decade. The solution is to stack neurons into layers — a hidden layer of neurons first transforms the inputs into a new representation, and then an output neuron makes the final decision in that transformed space. With just two hidden neurons using sigmoid activation, the network can learn to \"bend\" the input space so that XOR becomes linearly separable. This is the key insight of multi-layer networks: each layer learns a new representation of the data that makes the next layer's job easier.\n\nSo how does the network actually learn the right weights? That is where backpropagation comes in, and it is simpler than most textbooks make it seem. It is a 4-step process. Step 1: compute the output delta — the difference between what the network predicted and the true answer, multiplied by the derivative of the activation function at the output (for sigmoid, this derivative is conveniently output * (1 - output)). Step 2: propagate this error backward to the hidden layer — each hidden neuron's error is the sum of (output delta * weight connecting that hidden neuron to the output), multiplied by the hidden neuron's own activation derivative. Step 3: update the output layer weights using the rule w_new = w_old + learning_rate * output_delta * hidden_output. Step 4: update the hidden layer weights using w_new = w_old + learning_rate * hidden_delta * input_value. That is it — four steps, repeated for every training example, and the network gradually finds weights that minimize the error. The beauty of backpropagation is that it uses the chain rule from calculus to efficiently compute how much each weight contributed to the final error, no matter how many layers deep.\n\nWhy does weight initialization matter so much? If you set all weights to zero, every neuron in a layer computes the exact same thing, receives the exact same gradient, and updates identically — the network is stuck in a symmetric state and can never learn different features. Random initialization breaks this symmetry: each neuron starts with different weights, computes different outputs, and receives different gradients, allowing them to specialize during training. The scale of the random initialization also matters — too large and the sigmoid activations saturate (outputting values near 0 or 1 where the gradient is nearly zero), too small and the signals shrink to nothing as they pass through layers. Practical experience shows that initializing weights from a distribution with standard deviation around 1/sqrt(number_of_inputs) works well for sigmoid networks.\n\nThe MLP classifier experiment on Iris brings all these ideas together. By varying the number of hidden neurons from 1 to 32, you can directly observe how network capacity affects learning. With just 1 hidden neuron, the network is too constrained — it can only learn a single nonlinear feature, which is not enough to separate three Iris species. With 2 hidden neurons, it starts to find useful structure but still misclassifies some borderline examples. At 4-8 neurons, performance plateaus near the optimum — the network has enough capacity to capture the relevant patterns without overfitting. At 16-32 neurons, the network has far more parameters than it needs, and while training accuracy might hit 100%, the extra capacity does not help (and could hurt on new data). This experiment teaches a crucial lesson: bigger is not always better, and finding the right model size for your data is one of the core challenges in machine learning.",
            type: "theory",
          },
          {
            title: "Neural Networks Notebook — XOR & Iris MLP",
            slug: "neural-networks-notebook",
            description: "Build a feedforward neural network from scratch with manual backpropagation to solve XOR, then train MLPs on Iris with varying architectures.",
            content: "In this notebook, you will build a neural network entirely from scratch — no PyTorch, no TensorFlow, just NumPy and your understanding of how neurons compute. The first challenge is the XOR problem. You will create a network with 2 input neurons, a hidden layer, and 1 output neuron, all using sigmoid activation. You will initialize the weights randomly, implement the forward pass (computing the input function and activation for each neuron layer by layer), and then implement backpropagation by hand following the 4-step process: compute the output delta, propagate error to the hidden layer, update output weights, update hidden weights. Watching the loss decrease over hundreds of iterations as the network gradually finds the right weights to solve XOR is deeply satisfying — it makes the abstract math feel concrete.\n\nThe second major exercise scales up to the Iris dataset using scikit-learn's MLPClassifier. Here you will systematically train networks with different numbers of hidden neurons — specifically 1, 2, 4, 8, 16, and 32 — and compare their training and test accuracy. For each configuration, you will plot the learning curves (loss vs. iteration) to see how quickly the network converges and whether it shows signs of overfitting. You will discover that the relationship between capacity and performance is not linear: there is a sweet spot where the network is large enough to capture the underlying patterns but not so large that it memorizes noise. The notebook also explores what happens when you change the random seed for weight initialization — sometimes the same architecture converges to different solutions, illustrating how the random starting point affects the local minimum that gradient descent finds.\n\nThe notebook ties everything together by visualizing the decision boundaries learned by networks of different sizes. For the 2D projections of Iris features, you will create a grid of points, pass them through each trained network, and color the regions by predicted class. With 1 hidden neuron, the boundary is a simple curve. With 4 neurons, it becomes more complex and better fits the data. With 32 neurons, the boundary can become very wiggly, fitting the training data perfectly but potentially generalizing poorly. This visual progression from underfitting to appropriate fitting to potential overfitting is one of the most important things to internalize about neural networks.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk6-neural-networks.ipynb",
          },
        ],
      },
      {
        week: 7,
        title: "Clustering — K-Means, Hierarchical Methods & Customer Segmentation",
        summary:
          "Unsupervised learning through clustering: building the K-means algorithm from scratch (distance computation, E-step centroid assignment, M-step mean recomputation), determining the right number of clusters with the Elbow method, agglomerative hierarchical clustering with dendrograms for multi-scale analysis, and a real-world customer segmentation project on the iFood marketing dataset (2,206 customers). Starts with Iris as a controlled testbed, then tackles messy real data.",
        resources: [
          {
            title: "Clustering — Finding Structure Without Labels",
            slug: "clustering-theory",
            description: "How K-means discovers groups through iterative refinement, how to pick K, and how hierarchical clustering reveals structure at every scale.",
            content: "Imagine you are handed a pile of 1,000 unlabeled photographs and asked to organize them into groups. You would probably start by picking a few photos that look different from each other as representatives, then sort the rest by similarity to those representatives, then look at each pile and adjust your idea of what the \"typical\" photo in each group looks like, and repeat. That is essentially what K-means does. Formally, it works through two alternating steps. The E-step (assignment step) computes the Euclidean distance from every data point to every centroid and assigns each point to its nearest centroid: assignment_n = argmin_k ||x_n - mu_k||^2. The M-step (update step) recomputes each centroid as the mean of all points currently assigned to it: mu_k = (1/N_k) * sum(x_n for all n assigned to cluster k). These two steps repeat until the assignments stop changing, which is guaranteed to happen because each step can only decrease (or maintain) the total within-cluster sum of squared distances.\n\nThe biggest practical question with K-means is: how many clusters should you use? The Elbow method gives you a principled heuristic. You run K-means for K = 1, 2, 3, ..., up to some reasonable maximum, and for each K you record the total inertia (within-cluster sum of squares). Plot inertia versus K, and you will see a curve that drops steeply at first and then levels off. The \"elbow\" — the point where the curve bends from steep to flat — suggests a good number of clusters. The intuition is that adding more clusters beyond this point gives diminishing returns: you are splitting apart groups that are already reasonably cohesive. On the Iris dataset, for example, the elbow clearly appears at K=3, which matches the three known species. But be warned — in real data, the elbow is not always sharp, and sometimes multiple values of K are defensible. Domain knowledge matters enormously.\n\nHierarchical agglomerative clustering takes a completely different approach. Instead of deciding K upfront, it builds a tree of merges from the bottom up. Every data point starts as its own cluster. At each step, the two closest clusters are merged into one, and this continues until everything is in a single cluster. The result is a dendrogram — a tree diagram where the height of each merge represents the distance at which those clusters were combined. You can \"cut\" the dendrogram at any height to get a different number of clusters, which gives you a multi-resolution view of the data's structure. The choice of linkage criterion — how you define the distance between two clusters — dramatically affects the results. Single linkage (minimum distance between any two points in the clusters) tends to produce long, chain-like clusters. Complete linkage (maximum distance) produces compact, spherical clusters. Ward's method (minimizing the increase in total variance) generally produces the most balanced, intuitive clusters and is the most commonly used in practice.\n\nWhat makes clustering genuinely useful is its application to real problems where labels do not exist. In customer segmentation, for example, you do not have a \"ground truth\" label telling you which segment each customer belongs to — the whole point is to discover those segments from the data. The iFood marketing dataset provides a perfect example: 2,206 customers described by features like annual income, spending on wine, meat, fish, and sweets, number of purchases through web, catalog, and store channels, number of children, and more. After standardizing all features to have zero mean and unit variance (critical because K-means uses Euclidean distance, which is sensitive to scale), clustering reveals natural customer personas that no one explicitly defined but that are immediately recognizable to a marketing team.",
            type: "theory",
          },
          {
            title: "Clustering Notebook — K-Means from Scratch & Customer Segmentation",
            slug: "clustering-notebook",
            description: "Implement K-means from scratch, apply the Elbow method, build dendrograms, and segment 2,206 real customers from the iFood dataset.",
            content: "This notebook starts by building K-means completely from scratch. You will write three functions: a distance function that computes Euclidean distance between points and centroids, an E-step function that assigns each point to its nearest centroid, and an M-step function that recomputes centroids as cluster means. Then you will wire them together in a loop that alternates E and M steps until convergence. Running your implementation on the Iris dataset, you will see the centroids shift from their random starting positions and stabilize within 5-15 iterations. Comparing your cluster assignments to the true Iris species labels reveals how well unsupervised learning can recover known structure — typically perfect separation of setosa, with some confusion between versicolor and virginica where their petal measurements overlap.\n\nNext, you will implement the Elbow method by running your K-means for K values from 1 to 10, computing the inertia for each, and plotting the curve. The notebook then moves to hierarchical clustering using scipy's linkage and dendrogram functions. You will build dendrograms with different linkage methods (Ward, complete, average) and observe how they produce different tree structures from the same data. Cutting the Ward dendrogram at a height that yields 3 clusters and comparing to K-means assignments shows that both methods find similar structure, but the dendrogram reveals additional information — for instance, how much more distinct the setosa cluster is compared to the versicolor-virginica split.\n\nThe final section tackles real customer segmentation on the iFood marketing dataset (ifood_df.csv). With 2,206 customers and features spanning income, spending categories, purchase channels, demographics, and campaign responses, this is a genuinely messy real-world problem. You will preprocess the data (handling missing values, standardizing features), apply K-means with the Elbow method to choose K, and then profile each resulting segment by examining the cluster centroids and computing summary statistics. The most rewarding part is interpreting the clusters: you might find a \"premium loyalists\" segment with high income and high wine spending, a \"budget families\" segment with more children and deal-seeking behavior, and a \"disengaged\" segment with low spending across the board. These are actionable insights that a marketing team could immediately use to tailor campaigns, pricing, and product recommendations.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk7-clustering.ipynb",
          },
        ],
      },
      {
        week: 8,
        title: "Density Estimation — Gaussian Mixtures, EM & Vowel Classification",
        summary:
          "Modeling probability distributions with Mixture of Gaussians (MoG) trained via the Expectation-Maximization algorithm. Covers the full EM loop — E-step soft responsibility assignments, M-step parameter updates for means, covariances, and mixing weights — applied to the Peterson & Barney vowel formant dataset (F1, F2 frequencies). Builds a Maximum Likelihood classifier from two class-conditional GMMs, visualizes decision boundaries on a meshgrid, confronts the singularity problem with linearly dependent features, and solves it with regularization. Achieves 95.07% accuracy with K=3 and 95.72% with K=6.",
        resources: [
          {
            title: "Density Estimation & the EM Algorithm",
            slug: "density-estimation-theory",
            description: "How Gaussian mixtures model complex distributions, why EM works through soft assignments, and how density models become classifiers.",
            content: "Most real-world data does not follow a single neat bell curve. Think about the heights of all adults — you would see two overlapping bumps (one centered around the male average, one around the female average) rather than one smooth Gaussian. A Mixture of Gaussians (MoG) captures exactly this kind of structure by representing the overall distribution as a weighted sum of K Gaussian components: p(x) = pi_1 * N(x; mu_1, Sigma_1) + pi_2 * N(x; mu_2, Sigma_2) + ... + pi_K * N(x; mu_K, Sigma_K). Each component has its own mean (mu_k, the center), covariance matrix (Sigma_k, which controls the shape and spread), and mixing coefficient (pi_k, which controls how much of the total data that component explains). The mixing coefficients must be positive and sum to 1 — they represent the probability that a randomly chosen data point came from each component. This is a remarkably powerful model: with enough components, you can approximate any continuous distribution to any desired accuracy.\n\nThe challenge is fitting this model to data when you do not know which component generated which data point. That is where the Expectation-Maximization (EM) algorithm comes in, and it is best understood through an analogy. Imagine you are in a room with K musicians playing simultaneously, and you are trying to figure out each musician's playing style and volume level from the mixed audio. If you knew which musician played each note, you could easily estimate their styles. If you knew the styles, you could figure out which musician likely played each note. EM breaks this chicken-and-egg problem by alternating. The E-step computes \"responsibilities\" — the probability that each data point belongs to each component: r_nk = pi_k * N(x_n; mu_k, Sigma_k) / sum_j(pi_j * N(x_n; mu_j, Sigma_j)). These are soft assignments — a point might be 70% likely from component 1 and 30% from component 2. The M-step uses these soft assignments as weights to update the parameters: new means are responsibility-weighted averages, new covariances are responsibility-weighted scatter matrices, and new mixing coefficients are the average responsibilities across all data points.\n\nWhat makes this particularly powerful is the bridge from density estimation to classification. If you have labeled data for two classes (say, two different vowel sounds), you can fit a separate MoG to each class's data, giving you p(x | class 1) and p(x | class 2). To classify a new point, you use Bayes' rule: P(class 1 | x) = p(x | class 1) * P(class 1) / p(x). Whichever class has the higher posterior probability wins. This is called a Maximum Likelihood classifier, and it is elegant because the decision boundary naturally adapts to the shape of each class's distribution — it can be curved, multi-modal, or asymmetric, unlike the straight lines of logistic regression.\n\nThere is one dangerous pitfall with EM that you need to know about: the singularity problem. If a Gaussian component happens to center exactly on a single data point, its variance shrinks toward zero, and the likelihood of that point under that component goes to infinity — making the overall log-likelihood shoot up without bound. This is not learning; it is the model cheating by memorizing a single point. The problem is especially likely when K is large relative to the data size, or when features are linearly dependent (meaning some features are exact linear combinations of others, making the covariance matrix singular). The practical solution is regularization: add a small value (often called \"jitter,\" something like 1e-6) to the diagonal of every covariance matrix after each M-step. This prevents any component from collapsing to zero variance while barely affecting the overall model. It is a simple fix that makes the difference between EM that crashes and EM that converges reliably.",
            type: "theory",
          },
          {
            title: "Density Estimation Notebook — Vowel Classification with GMMs",
            slug: "density-estimation-notebook",
            description: "Implement EM for Gaussian mixtures, build a Maximum Likelihood vowel classifier from formant data, and solve the singularity problem.",
            content: "This notebook implements the full Mixture of Gaussians pipeline on the Peterson & Barney vowel formant dataset — a classic dataset where each vowel sound is characterized by its first two formant frequencies (F1 and F2), which are resonant frequencies of the vocal tract. Different vowels cluster in different regions of the F1-F2 space, but with significant overlap between speakers, making this a perfect testbed for density-based classification. You will implement EM from scratch, starting with random initialization of means, identity covariance matrices, and uniform mixing coefficients, then iterating E-step and M-step until the log-likelihood converges.\n\nThe classification pipeline works as follows: you train separate GMM models on each vowel class's training data, then classify test points by evaluating both models' densities and picking the class with higher probability. The notebook walks you through experimenting with different numbers of components — K=3 gives 95.07% accuracy, which is already strong, but K=6 pushes it to 95.72% by capturing finer structure within each vowel's distribution. You will visualize the decision boundary by creating a meshgrid over the F1-F2 plane, classifying every point on the grid, and plotting the resulting regions. The boundaries are smooth, curved lines that follow the natural contours of the data — far more sophisticated than the straight lines a linear classifier would produce.\n\nThe most instructive part of the notebook is encountering and solving the singularity problem firsthand. When you include features that are linearly dependent (for example, a feature that is the sum of two other features), the covariance matrix becomes singular — its determinant hits zero, and you cannot compute the Gaussian density. The notebook demonstrates this failure mode explicitly, shows you how to detect it (monitor the covariance matrix determinant or catch numerical exceptions), and then implements the fix: adding a small jitter term (epsilon * I, where I is the identity matrix and epsilon is something like 1e-6) to the covariance after each M-step. With this regularization in place, EM converges cleanly even with problematic features, and you will see the log-likelihood curve rise smoothly and plateau — exactly the behavior of a healthy EM run.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk8-density-estimation.ipynb",
          },
        ],
      },
      {
        week: 9,
        title: "Dimensionality Reduction — PCA, MNIST & Feature Selection",
        summary:
          "Tackling high-dimensional data with Principal Component Analysis: IncrementalPCA on the full MNIST dataset (70,000 digit images with 784 pixels each), explained variance analysis to choose how many components to keep, low-rank PCA via torch.pca_lowrank() for efficient computation, reconstructing digit images from principal components, and comparing MLP classification accuracy on raw pixels versus PCA-reduced features. Also covers feature selection using correlation coefficients and chi-squared tests on the Diabetes dataset.",
        resources: [
          {
            title: "PCA & Dimensionality Reduction — Making Sense of High Dimensions",
            slug: "pca-theory",
            description: "Why high-dimensional data is deceptively tricky, how PCA finds the most informative directions, and when to select features instead.",
            content: "Here is a counterintuitive fact: a 28x28 grayscale image of a handwritten digit technically lives in a 784-dimensional space (one dimension per pixel). But the actual digits do not fill up that entire space — they live on a much lower-dimensional surface within it. Most possible 784-pixel images look like random static, not digits. The real structure of handwritten digits can be captured by far fewer numbers than 784. That is the core motivation for dimensionality reduction: high-dimensional data almost always has lower-dimensional structure, and finding that structure makes everything downstream (visualization, classification, storage, computation) dramatically easier.\n\nPrincipal Component Analysis (PCA) finds this lower-dimensional structure by asking: along which directions does the data vary the most? The first principal component is the direction of maximum variance — if you projected all data points onto a single line, this is the line that would spread them out the most. The second principal component is the direction of maximum remaining variance, orthogonal to the first. And so on. Mathematically, these directions come from the eigenvalue decomposition of the data's covariance matrix: center the data by subtracting the mean, compute the covariance matrix C = (1/n) * X^T * X, and find its eigenvectors and eigenvalues. The eigenvectors are the principal component directions, and the eigenvalues tell you how much variance each direction captures. If the first 50 eigenvalues account for 95% of the total variance, you can project your 784-dimensional data down to 50 dimensions while retaining 95% of the information.\n\nFor massive datasets like MNIST (70,000 images), computing the full 784x784 covariance matrix and its eigen-decomposition is feasible but memory-intensive. IncrementalPCA from scikit-learn processes the data in batches, never loading the entire dataset into memory at once — essential for production systems where data may not fit in RAM. An even more efficient approach is low-rank PCA via PyTorch's torch.pca_lowrank(), which uses randomized algorithms to find only the top-k principal components directly, without ever computing the full covariance matrix. When you only need 50 components out of 784, this is dramatically faster. The tradeoff is that you get an approximation rather than exact PCA, but for practical purposes, the approximation is excellent.\n\nThe explained variance ratio for each component (its eigenvalue divided by the sum of all eigenvalues) tells you the fraction of total information that component carries. Plotting the cumulative explained variance versus number of components gives you a curve that rises steeply at first and then flattens. The \"knee\" of this curve tells you where you hit diminishing returns — adding more components captures less and less additional variance. For MNIST digits, the first ~50 components typically capture around 85% of the variance, and ~150 components capture over 95%. This means you can throw away 80% of the dimensions and keep 95% of the information.\n\nFeature selection is the alternative to PCA when you want to keep the original features rather than creating new linear combinations. The correlation coefficient measures the linear relationship between each feature and the target variable — features with high absolute correlation are more informative for prediction. The chi-squared test evaluates whether a feature's distribution differs significantly across classes, making it suitable for categorical or discretized features. On the Diabetes dataset, comparing PCA (which creates new composite features) with correlation-based feature selection (which picks original features) reveals the fundamental tradeoff: PCA often achieves better predictive performance in fewer dimensions because it can combine information from multiple features, while feature selection preserves interpretability — a doctor can understand \"blood sugar level\" but not \"principal component 7.\"",
            type: "theory",
          },
          {
            title: "Dimensionality Reduction Notebook — PCA on MNIST & Feature Selection",
            slug: "dimensionality-reduction-notebook",
            description: "Apply IncrementalPCA and low-rank PCA to 70k MNIST digits, reconstruct images, compare classification on raw vs reduced features, and run feature selection on Diabetes data.",
            content: "This notebook puts PCA to work on MNIST — the classic benchmark of 70,000 handwritten digit images (60,000 training, 10,000 test), each a 28x28 grayscale image flattened into a 784-dimensional vector. You will start with sklearn's IncrementalPCA, which processes the data in configurable batch sizes, and compute the explained variance for all 784 components. Plotting the cumulative explained variance curve reveals that MNIST digits have massive redundancy: the first 100-150 components capture the vast majority of the information. You will then use torch.pca_lowrank() to compute only the top components efficiently and compare the results to IncrementalPCA — the two methods agree closely, but the PyTorch version is significantly faster.\n\nThe most visually striking part of the notebook is image reconstruction from principal components. You will project digit images down to different numbers of components (10, 50, 100, 200) and then reconstruct them by projecting back to the original 784 dimensions. With just 10 components, you get blurry blobs that are barely recognizable. With 50, the digit shape is clear but details are soft. At 100 components, the reconstructions are nearly indistinguishable from the originals. This gives you a tangible, visual understanding of what \"explained variance\" actually means — each additional component adds a bit more detail back to the image.\n\nThe notebook then runs a practical experiment: training MLP classifiers on both the raw 784-dimensional data and on PCA-reduced versions (50, 100, 150, 200 components). You will track both accuracy and training time for each. The results are revealing — PCA reduction to 100-150 dimensions often produces classification accuracy very close to using all 784 dimensions, but training is significantly faster because the MLP has far fewer input weights to optimize. This is PCA's practical payoff: faster training, less memory, and comparable accuracy.\n\nThe final section covers feature selection on the Diabetes dataset using two approaches. Correlation coefficient analysis computes the Pearson correlation between each of the 10 features and the target variable, ranking features by predictive relevance. The chi-squared test provides a complementary statistical assessment. You will compare the features selected by each method, noting where they agree and disagree, and evaluate the prediction accuracy of models trained on the selected subsets versus the full feature set versus PCA-reduced features.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk9-dimensionality-reduction.ipynb",
          },
        ],
      },
      {
        week: 10,
        title: "Deep Learning — ResNet, Transfer Learning & Contrastive Learning",
        summary:
          "Modern deep learning on CIFAR-10 (60,000 32x32 color images, 10 classes): training ResNet18 from scratch versus transfer learning with pretrained ImageNet weights (freezing convolutional layers and replacing the final fully-connected layer), data augmentation with random cropping and horizontal flips, SGD with learning rate scheduling, Supervised Contrastive Learning (SupCon loss from Khosla et al., NeurIPS 2020) for learning representations where same-class images cluster together, and evaluation via confusion matrices.",
        resources: [
          {
            title: "Deep Learning — CNNs, Transfer Learning & Contrastive Learning",
            slug: "deep-learning-theory",
            description: "How CNNs see images, why pretrained features transfer across tasks, and how contrastive learning teaches networks to organize representations.",
            content: "A Convolutional Neural Network sees an image very differently than a fully-connected network would. Instead of treating a 32x32x3 image as a flat vector of 3,072 numbers (losing all spatial information), a CNN slides small learned filters (say, 3x3) across the image, computing a dot product at each position. Each filter detects a specific local pattern — an edge at a particular angle, a color gradient, a texture element. The output of one filter applied across the entire image produces a \"feature map\" showing where that pattern occurs. Stack many filters and you get many feature maps, each highlighting a different pattern. Pooling layers then shrink these maps (usually by taking the maximum in each 2x2 region), reducing spatial size while keeping the strongest activations. Layer after layer, the network builds up from simple edge detectors to complex shape recognizers to semantic concept detectors. ResNet18 organizes this hierarchy into four groups of \"residual blocks,\" where each block adds a skip connection: the output is F(x) + x rather than just F(x). These skip connections solve the gradient degradation problem that plagued earlier deep networks, because gradients can flow directly through the shortcuts during backpropagation.\n\nTransfer learning is one of the most practically important techniques in deep learning. The key insight is that the low-level and mid-level features learned by a CNN on one large dataset (like ImageNet, with 1.2 million images across 1,000 classes) are remarkably universal — edge detectors, texture recognizers, and shape patterns are useful for almost any image task. Instead of training from scratch on your own (possibly small) dataset, you load a pretrained ResNet18, freeze all the convolutional layers (setting requires_grad = False so their weights do not update during training), and replace only the final fully-connected classification layer to match your number of classes (10 for CIFAR-10 instead of 1,000 for ImageNet). This way, you leverage millions of dollars worth of compute and data that went into the original training, and only need to learn the final mapping from universal features to your specific classes. Fine-tuning goes one step further: after training the new classifier head, you unfreeze some or all convolutional layers and continue training with a very small learning rate, allowing the pretrained features to adapt slightly to your domain.\n\nData augmentation is the deep learning practitioner's secret weapon against overfitting. The idea is simple: create slightly modified versions of your training images to artificially expand the dataset. For CIFAR-10, standard augmentations include random horizontal flips (a flipped cat is still a cat), random crops with padding (pad the image by 4 pixels on each side, then randomly crop back to 32x32, effectively shifting the image slightly), and normalization to match the statistics of the pretrained model's training data. These transformations teach the network to be invariant to small spatial shifts and reflections, dramatically improving generalization. Training uses SGD (Stochastic Gradient Descent) with momentum, which accumulates a running average of past gradients to smooth out noisy updates and accelerate convergence. A learning rate scheduler (like cosine annealing or step decay) starts with a higher learning rate for fast initial progress and gradually reduces it for fine-grained optimization near convergence.\n\nSupervised Contrastive Learning (SupCon), introduced by Khosla et al. at NeurIPS 2020, takes a fundamentally different approach to learning representations. Instead of training the network to directly predict class labels, SupCon trains it to produce embeddings where images of the same class cluster tightly together and images of different classes are pushed far apart. The SupCon loss for an anchor image considers all other images in the batch that share the same label as positives and all images with different labels as negatives: L = -sum over positives of log(exp(sim(anchor, positive) / tau) / sum over all non-anchor of exp(sim(anchor, other) / tau)), where sim is the cosine similarity and tau is a temperature parameter that controls how sharply the model distinguishes between similar and dissimilar pairs. After SupCon training produces good representations, a simple linear classifier is trained on top of the frozen representations. This two-stage approach often produces representations that are more robust and transfer better than those learned through standard cross-entropy training, because the network is forced to discover the deep structural similarities within each class rather than just finding the easiest shortcut to predict labels.",
            type: "theory",
          },
          {
            title: "Deep Learning Notebook — CIFAR-10 with ResNet, Transfer Learning & SupCon",
            slug: "deep-learning-notebook",
            description: "Train ResNet18 from scratch on CIFAR-10, apply transfer learning with frozen ImageNet weights, implement Supervised Contrastive Learning, and analyze with confusion matrices.",
            content: "This notebook tackles CIFAR-10 — 60,000 32x32 color images across 10 classes (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck) — using progressively more sophisticated approaches. You will start by training a ResNet18 completely from scratch with random weight initialization. The training pipeline includes data augmentation (RandomCrop with 4-pixel padding and RandomHorizontalFlip for training, only normalization for testing), SGD optimizer with momentum of 0.9, and a learning rate scheduler that decays the rate at strategic points during training. You will monitor both training and test accuracy across epochs and see the characteristic pattern: training accuracy climbs steadily, test accuracy follows but with a gap that represents the degree of overfitting.\n\nThe transfer learning section provides a dramatic contrast. You will load a ResNet18 pretrained on ImageNet, freeze all convolutional layers (a single loop setting param.requires_grad = False), and replace the final fully-connected layer from nn.Linear(512, 1000) to nn.Linear(512, 10). Training only this new layer is remarkably fast — there are only 5,130 parameters to optimize instead of 11 million — and it already achieves respectable accuracy because the pretrained convolutional features are broadly useful. The notebook then compares this feature-extraction approach with full fine-tuning (unfreezing all layers and training with a reduced learning rate), showing how much additional accuracy you can squeeze out by allowing the pretrained features to adapt. The confusion matrices for all three approaches (from scratch, feature extraction, fine-tuning) reveal interesting patterns: some class pairs (like cat vs. dog, or automobile vs. truck) are consistently confused regardless of approach, while others improve dramatically with better representations.\n\nThe Supervised Contrastive Learning section implements the SupCon framework from the Khosla et al. paper. You will modify the ResNet18 to output a 128-dimensional embedding instead of class logits, implement the SupCon loss function that pulls same-class embeddings together and pushes different-class embeddings apart, and train the network on CIFAR-10 with this contrastive objective. After the representation learning phase, you will freeze the encoder and train a simple linear classifier on the learned embeddings. The notebook visualizes the learned embedding space using t-SNE, showing how SupCon produces tight, well-separated clusters for each class — a qualitatively different representation from what standard cross-entropy training produces. The final comparison across all methods (from scratch, transfer learning, SupCon) using confusion matrices, per-class accuracy, and overall accuracy gives you a comprehensive understanding of when and why each approach shines.",
            type: "notebook",
            notebookUrl: "/notebooks/ml/wk10-deep-learning.ipynb",
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
      "Dialogue systems, chatbot architectures, dialogue act tagging, slot filling, seq2seq models, RAG for dialogue, and task-oriented agents.",
    overview:
      "Building systems that hold meaningful conversations. From foundations and dialogue act tagging through seq2seq response generation, retrieval-augmented generation (RAG) for factual dialogue, and task-oriented agents (e.g. restaurant booking with Ollama + Llama).",
    category: "topic",
    icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
    resources: [],
    sections: [
      {
        week: 1,
        title: "Week 1: Foundations of Dialogue Systems",
        summary:
          "Introduction to dialogue systems: types (chitchat vs task-oriented, retrieval vs generative), dialogue acts, pipelines (NLU, dialogue state, NLG), and evaluation. Sets the stage for the labs that follow.",
        lecturePdfUrl: "/materials/conversational/week1-foundations.pdf",
        lectureTitle: "Lecture 1: Foundations of Dialogue Systems",
        resources: [
          {
            title: "Foundations of Dialogue Systems",
            slug: "foundations",
            description: "Types of dialogue systems, dialogue acts, and the standard pipeline from utterance to response.",
            content:
              "Dialogue systems let users interact in natural language to get information, complete tasks, or have open-ended conversation. They fall into broad categories: chitchat (social, open-domain) versus task-oriented (booking, support, form-filling); retrieval-based (pick a predefined response) versus generative (produce new text, e.g. with seq2seq or LLMs).\n\nDialogue act (DA) tagging classifies each utterance by its function — question, statement, acknowledgment, request — and is a core step in many pipelines. A typical pipeline has NLU (understand intent and slots), dialogue state tracking (what the user has asked for so far), policy (what to do next), and NLG (surface a response).\n\nIn the following weeks you will implement dialogue act tagging on the Switchboard corpus, build a seq2seq generative model for open dialogue, add retrieval-augmented generation (RAG) to ground responses in external knowledge, and finally build a task-oriented restaurant-booking agent with local LLMs (Ollama + Llama) and simple function calling.",
            type: "theory",
          },
        ],
      },
      {
        week: 2,
        title: "Week 2: Dialogue Act Tagging",
        summary:
          "Supervised dialogue act classification using the Switchboard Dialog Act Corpus. Train and compare DA tagging models as a foundation for intent-aware dialogue systems.",
        lecturePdfUrl: "/materials/conversational/week2-dialogue-act-tagging.pdf",
        lectureTitle: "Lecture 2: Dialogue Act Tagging",
        resources: [
          {
            title: "Dialogue Act Tagging (Lab)",
            slug: "dialogue-act-tagging",
            description: "DA tagging with the Switchboard corpus; training and evaluating classification models.",
            content:
              "Dialogue act (DA) tagging is the task of labelling each utterance with its communicative function (e.g. statement, question, backchannel, agreement). It is usually solved with supervised learning on manually labelled data such as the Switchboard Dialog Act Corpus.\n\nIn this lab you work with the Switchboard data: loading and preprocessing the corpus, then training two different DA classification models. You will use PyTorch (or similar) for the models, and standard metrics (accuracy, per-class precision/recall) to compare them. The skills here — handling dialogue corpora, dealing with class imbalance, and interpreting confusion matrices — transfer directly to intent classification and slot tagging in task-oriented systems.\n\nThe lab notebook is available in the course materials (Lab2). Run the data download and preprocessing steps, then complete the model training and evaluation sections.",
            type: "notebook",
            notebookUrl: "/notebooks/conversational/lab2-dialogue-act-tagging.ipynb",
          },
        ],
      },
      {
        week: 3,
        title: "Week 3: Seq2Seq for Dialogue",
        summary:
          "End-to-end generative dialogue with sequence-to-sequence models. Build a seq2seq model for open-domain conversation and compare with retrieval-based baselines.",
        lecturePdfUrl: "/materials/conversational/week3-seq2seq-dialogue.pdf",
        lectureTitle: "Lecture 3: Seq2Seq for Dialogue",
        resources: [
          {
            title: "Seq2Seq Dialogue Model (Lab)",
            slug: "seq2seq-dialogue",
            description: "Building a generative seq2seq model for general conversation and testing on factual QA.",
            content:
              "Retrieval-based dialogue systems choose from a fixed set of responses; generative models produce new replies. Sequence-to-sequence (seq2seq) models — encoder-decoder networks that map a source sequence (the user turn) to a target sequence (the system reply) — are a classic approach to generative dialogue.\n\nIn this lab you build an end-to-end seq2seq dialogue system: you will use the provided conversation data, implement or use an encoder-decoder architecture (e.g. LSTM or transformer), train it to generate responses, and test it on general chat and on a more factual question-answering domain. You will see how generative models can produce more varied, context-sensitive replies than retrieval, at the cost of possible incoherence or hallucination — which motivates the RAG lab in Week 4.\n\nThe lab notebook (Lab3) walks through data loading, model definition, training loop, and inference. Complete the exercises to compare different architectures or decoding strategies.",
            type: "notebook",
            notebookUrl: "/notebooks/conversational/lab3-seq2seq-dialogue.ipynb",
          },
        ],
      },
      {
        week: 4,
        title: "Week 4: RAG for Dialogue",
        summary:
          "Retrieval-augmented generation for information-seeking dialogue. Use Contriever to retrieve evidence and condition LLM responses on it to reduce hallucinations.",
        lecturePdfUrl: "/materials/conversational/week4-rag-dialogue.pdf",
        lectureTitle: "Lecture 4: RAG for Dialogue",
        resources: [
          {
            title: "RAG for Dialogue (Lab)",
            slug: "rag-dialogue",
            description: "Building a RAG pipeline for dialogue with Contriever and HybriDialogue; comparing with and without retrieval.",
            content:
              "Large language models can produce fluent but factually wrong or unsupported answers — a failure mode known as hallucination. Retrieval-augmented generation (RAG) mitigates this by retrieving relevant evidence from an external knowledge source and conditioning the model's response on that evidence.\n\nIn this lab you build a RAG pipeline for information-seeking dialogue. You use the HybriDialogue dataset (open-domain, information-seeking) and Contriever as the dense retriever to fetch candidate passages. You then inject the retrieved text into the prompt and generate responses with and without retrieval, comparing factual accuracy and relevance. By the end you will have a minimal RAG-for-dialogue pipeline and an appreciation of how retrieval improves grounding.\n\nThe lab (Lab4) requires a GPU and sufficient disk space for the Wikipedia dump. Follow the notebook to set up dependencies, build the retriever index, and run the dialogue evaluation.",
            type: "notebook",
            notebookUrl: "/notebooks/conversational/lab4-rag-dialogue.ipynb",
          },
        ],
      },
      {
        week: 5,
        title: "Week 5: Task-Oriented Agent (Restaurant Booking)",
        summary:
          "Build a prompt-based restaurant booking agent with Ollama and Llama 3.1. Use prompts and simple APIs to guide the model to call the right functions and complete bookings.",
        lecturePdfUrl: "/materials/conversational/week5-task-oriented-agent.pdf",
        lectureTitle: "Lecture 5: Task-Oriented Agent",
        resources: [
          {
            title: "Restaurant Booking Agent (Lab)",
            slug: "restaurant-agent",
            description: "Task-oriented agent with Ollama + Llama 3.1; prompt design and function calling for restaurant recommendations and booking.",
            content:
              "Task-oriented dialogue agents help users achieve a goal — here, recommending and booking restaurants from a dataset based on user constraints (cuisine, area, price). This lab uses a local, open-source model (Llama 3.1 8B via Ollama) to avoid paid APIs and keep the setup reproducible.\n\nYou implement a small set of APIs (e.g. search restaurants, check availability, confirm booking) and design prompts so that the model calls the appropriate API at the right time. Because prompt-based control has limits, the lab introduces simple mechanisms to refine the model's function-calling behaviour and avoid infinite loops or off-track replies. You run the agent locally (Ollama typically on localhost:11434), so use a local Jupyter or VSCode notebook rather than Colab.\n\nThe lab notebook (Lab5) covers Ollama setup, prompt design, and the restaurant dataset. Work through the steps to get a working booking agent and reflect on where prompt engineering succeeds and where stronger control (e.g. explicit state machines or learned policy) might be needed.",
            type: "notebook",
            notebookUrl: "/notebooks/conversational/lab5-restaurant-agent.ipynb",
          },
        ],
      },
    ],
    tags: ["Dialogue Systems", "Chatbots", "Seq2Seq", "RAG", "Task-Oriented", "Intent Detection"],
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

  {
    slug: "aws-ml",
    title: "AWS ML Specialty Prep",
    shortTitle: "AWS ML",
    description:
      "Preparing for the AWS Certified Machine Learning – Specialty exam with end-to-end AWS architectures and ML best practices.",
    overview:
      "A focused track for the AWS Certified Machine Learning – Specialty exam. Covers the four domains (data engineering, EDA, modelling, and ML operations) with an emphasis on how core AWS services fit together into robust, cost-effective ML solutions.",
    category: "topic",
    icon: "M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-9 4v6",
    resources: [],
    tags: ["AWS", "SageMaker", "Data Engineering", "MLOps", "Certification", "Architecture"],
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

export function getConversationalSection(week: number): TopicSection | undefined {
  const conversational = topics.find((t) => t.slug === "conversational");
  return conversational?.sections?.find((s) => s.week === week);
}

export function getConversationalResource(week: number, resourceSlug: string): TopicResource | undefined {
  const section = getConversationalSection(week);
  return section?.resources.find((r) => r.slug === resourceSlug);
}
