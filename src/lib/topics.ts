export interface TopicResource {
  title: string;
  description: string;
  type: "notebook" | "tutorial" | "lab" | "lecture" | "post" | "project";
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
      "A comprehensive journey through core machine learning concepts — from probability theory and linear models to neural networks and deep learning. Each week builds on the previous, combining mathematical foundations with hands-on Python implementations. Topics include regression, classification, clustering, density estimation, dimensionality reduction, and deep learning, all implemented from scratch and using industry-standard libraries like PyTorch and Scikit-learn.",
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
          { title: "Introduction to Machine Learning", description: "Overview of ML paradigms: supervised vs. unsupervised learning, model types, and the ML workflow from data to prediction.", type: "lecture" },
          { title: "Python Fundamentals", description: "Core Python concepts: variables, data types (lists, tuples, dicts, sets), operators, control flow, input/output, and modules.", type: "lab" },
          { title: "PyTorch Basics I — Tensors & Operations", description: "Tensor creation, matrix multiplication (torch.matmul), element-wise operations (Hadamard product), broadcasting rules, transposing, reshaping, and in-place operations.", type: "notebook" },
          { title: "PyTorch Basics II — Training Pipelines", description: "Building complete ML pipelines: Dataset/DataLoader, train/val/test splits, SimpleMLP with nn.Module, loss functions (BCE, CrossEntropy, MSE), Adam optimizer, and training loops.", type: "notebook" },
        ],
      },
      {
        week: 2,
        title: "Probability Theory for Machine Learning",
        summary:
          "Foundational probability concepts essential for ML: Bayes' rule and its applications (loan approval systems, the prosecutor's fallacy), Gaussian distributions and their parameters, covariance and Pearson's correlation coefficient, joint and conditional probability distributions, and marginal probabilities. The lab involves implementing Bayes' rule calculations, plotting Gaussian PDFs with varying parameters, computing covariance/PCC for real data (exploring correlation vs. causation), and analyzing the Iris dataset's feature relationships through 2D histograms and probability matrices.",
        resources: [
          { title: "Probability Foundations", description: "Bayes' rule, prior/posterior/likelihood, Gaussian distribution, random variables, covariance, and Pearson's correlation coefficient.", type: "lecture" },
          { title: "Probability Lab", description: "Implementing Bayes' rule for real scenarios, plotting Gaussian PDFs, computing covariance and PCC, analyzing Iris dataset joint/conditional/marginal probabilities.", type: "lab" },
        ],
      },
      {
        week: 3,
        title: "Linear Regression",
        summary:
          "Linear regression theory and implementation from scratch using PyTorch. Covers the hypothesis function y = w^T x, mean squared error (MSE) cost function, gradient descent optimization, and feature normalization (z-score standardization). The lab uses the Diabetes dataset to predict disease progression, implementing custom LinearRegression layers, gradient descent steps, and exploring the effect of learning rate on convergence. Extends to polynomial regression with L2 regularization to handle overfitting — fitting a 5th-order polynomial while penalizing large weights to control model complexity.",
        resources: [
          { title: "Linear Regression Theory", description: "Hypothesis function, MSE cost, gradient descent derivation, feature normalization, overfitting/underfitting, and L2 regularization.", type: "lecture" },
          { title: "Regression Lab (PyTorch)", description: "Building linear regression from scratch: custom nn.Module layer, MSE implementation, gradient descent, Diabetes dataset prediction, learning rate analysis.", type: "lab" },
          { title: "Regularized Polynomial Regression", description: "5th-order polynomial fitting with L2 regularization. Exploring how lambda controls model complexity and prevents overfitting on small datasets.", type: "notebook" },
          { title: "Regression Analysis Report", description: "Analysis of weight interpretation (BMI and sex effects on diabetes), learning rate impact on convergence, and regularization strength trade-offs.", type: "project" },
        ],
      },
      {
        week: 4,
        title: "Linear Classification & Logistic Regression",
        summary:
          "Moving from regression to classification: the sigmoid function as a decision boundary, logistic regression for binary classification, and the cross-entropy (BCE) loss function. Implementation includes building a custom LogisticRegression class in PyTorch, deriving and coding gradient descent for BCE loss, visualizing decision boundaries, and extending to multi-class classification using the one-vs-all strategy with built-in PyTorch methods (nn.Sequential, nn.Sigmoid, optim.SGD). Analysis of the XOR problem reveals the fundamental limitations of linear classifiers.",
        resources: [
          { title: "Classification & Logistic Regression", description: "Sigmoid function, decision boundaries, binary cross-entropy loss, gradient descent for classification, and multi-class one-vs-all strategy.", type: "lecture" },
          { title: "Classification Lab (PyTorch)", description: "Implementing sigmoid, LogisticRegression class, BCE loss, decision boundary visualization on Iris dataset, multi-class 1-vs-all with softmax.", type: "lab" },
          { title: "Classification Report", description: "Decision boundary analysis, multi-class prediction accuracy, and discussion of XOR as a non-linearly separable problem.", type: "project" },
        ],
      },
      {
        week: 5,
        title: "Advanced Classification — Decision Trees & Naive Bayes",
        summary:
          "Beyond logistic regression: multinomial logistic regression (softmax), decision trees using entropy-based information gain, and Gaussian Naive Bayes. Applied to both the Iris dataset and the much larger Forest Covertype dataset (580K samples, 54 features, 7 classes). Introduces critical ML concepts: confusion matrix analysis, handling class imbalance with weighted loss and SMOTE (Synthetic Minority Over-sampling Technique), and comparing classifier performance across algorithms. Scikit-learn becomes the primary framework here.",
        resources: [
          { title: "Classification II — Trees & Bayes", description: "Multinomial logistic regression, decision trees (entropy, information gain), Gaussian Naive Bayes, and probabilistic classification.", type: "lecture" },
          { title: "Advanced Classification Lab", description: "Comparing LogisticRegression, DecisionTreeClassifier, and GaussianNB on Forest Covertype. Confusion matrices, class imbalance handling with SMOTE.", type: "lab" },
        ],
      },
      {
        week: 6,
        title: "Neural Networks",
        summary:
          "Introduction to neural networks: multi-layer perceptrons (MLPs), activation functions (ReLU, sigmoid, softmax), the universal approximation theorem, and backpropagation. The lab first revisits the XOR problem — demonstrating that a 2-layer neural network can solve what linear classifiers cannot. Then builds a complete MLP classifier for the Iris dataset using PyTorch's nn.Module with customizable architecture (hidden layers, neurons, activation functions), proper training/validation loops, and performance evaluation.",
        resources: [
          { title: "Neural Networks Fundamentals", description: "MLP architecture, activation functions, universal approximation theorem, backpropagation algorithm, and weight initialization.", type: "lecture" },
          { title: "Neural Networks Lab (PyTorch)", description: "Solving XOR with a 2-layer MLP, building configurable neural networks for Iris classification, training loops with validation.", type: "lab" },
          { title: "Neural Network Report", description: "Architecture design choices, XOR solution analysis, comparison of NN vs. logistic regression accuracy, and training dynamics.", type: "project" },
        ],
      },
      {
        week: 7,
        title: "Clustering — K-Means & Hierarchical Methods",
        summary:
          "Unsupervised learning begins with clustering: the K-means algorithm (initialization, assignment, update steps), selecting optimal K using the elbow method (inertia plot), and hierarchical agglomerative clustering with dendrograms. Applied to the Iris dataset for comparison with known labels, then to a real-world customer segmentation task using the iFood marketing dataset (2206 customers, features like income, spending, demographics). Explores how clustering reveals natural groupings without supervision.",
        resources: [
          { title: "Clustering Algorithms", description: "K-means algorithm, convergence properties, initialization strategies, elbow method, hierarchical/agglomerative clustering, and dendrograms.", type: "lecture" },
          { title: "Clustering Lab", description: "K-means on Iris dataset, elbow curve analysis, hierarchical clustering with dendrograms, customer segmentation on iFood marketing data.", type: "lab" },
        ],
      },
      {
        week: 8,
        title: "Density Estimation — Mixture of Gaussians & EM",
        summary:
          "Parametric density estimation using Mixture of Gaussians (MoG) trained with the Expectation-Maximization (EM) algorithm. Covers the mathematical formulation of Gaussian mixtures (mixing coefficients, means, covariances), the E-step (responsibility calculation) and M-step (parameter updates), and convergence via log-likelihood monitoring. Applied to vowel phoneme classification using formant frequencies (F1, F2), building a Bayesian classifier from two class-conditional MoGs. Explores the singularity problem in EM and strategies to overcome it.",
        resources: [
          { title: "Density Estimation & EM Algorithm", description: "Mixture of Gaussians model, EM algorithm (E-step, M-step), log-likelihood convergence, and Bayesian classification from density models.", type: "lecture" },
          { title: "Density Estimation Lab", description: "Implementing MoG with EM for vowel phoneme data, building classifiers from density estimates, exploring K values and singularity handling.", type: "lab" },
          { title: "Density Estimation Report", description: "MoG parameter analysis, classification accuracy comparison for K=3 vs K=6, decision boundary visualization, and singularity problem solutions.", type: "project" },
        ],
      },
      {
        week: 9,
        title: "Feature Selection & Dimensionality Reduction",
        summary:
          "Techniques for handling high-dimensional data: Principal Component Analysis (PCA) from scratch — computing covariance matrices, eigenvalue decomposition, selecting principal components, and reconstructing data. Quantitative evaluation through explained variance ratios and qualitative evaluation through 2D/3D visualization. Practical PCA applications using sklearn on real datasets. Feature selection methods including filter methods (variance threshold, correlation) and wrapper methods (forward/backward selection) applied to the Diabetes dataset.",
        resources: [
          { title: "PCA & Feature Selection", description: "Dimensionality reduction motivation, PCA derivation (covariance, eigenvalues, projection), explained variance, and feature selection methods.", type: "lecture" },
          { title: "Dimensionality Reduction Lab", description: "PCA from scratch with eigenvectors, explained variance analysis, 2D visualization of high-dimensional data, feature selection on Diabetes dataset.", type: "lab" },
        ],
      },
      {
        week: 10,
        title: "Deep Learning — CNNs, Transfer Learning & Autoencoders",
        summary:
          "Deep learning architectures and modern training techniques: Convolutional Neural Networks (CNNs) for image classification using ResNet18 on CIFAR-10, transfer learning by fine-tuning pretrained ImageNet models, and unsupervised representation learning with autoencoders. Covers the practical aspects of deep learning: GPU utilization, data augmentation, learning rate scheduling, early stopping, and comparing training from scratch vs. leveraging pretrained weights. Demonstrates how transfer learning dramatically reduces training time and improves accuracy.",
        resources: [
          { title: "Deep Learning & CNNs", description: "Convolutional neural networks, pooling, ResNet architecture, transfer learning, fine-tuning, and autoencoders for unsupervised learning.", type: "lecture" },
          { title: "Deep Learning Lab (CIFAR-10)", description: "Training ResNet18 from scratch vs. transfer learning on CIFAR-10, fine-tuning pretrained models, and building autoencoders.", type: "lab" },
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
      { title: "Lab 1: Neural Network Basics", description: "Feed-forward networks, backpropagation", type: "lab" },
      { title: "Lab 2: Word Embeddings", description: "Word2Vec, GloVe implementations", type: "lab" },
      { title: "Lab 3: RNNs and LSTMs", description: "Sequence modeling for text", type: "lab" },
      { title: "Lab 4: Attention & Transformers", description: "Self-attention, multi-head attention", type: "lab" },
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
      { title: "Dialogue Act Tagging", description: "Classifying utterance types in conversation", type: "lab" },
      { title: "Seq2Seq for Dialogue", description: "Encoder-decoder models for response generation", type: "lecture" },
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
      { title: "Boolean & VSM Retrieval", description: "Boolean queries, TF-IDF, vector space model", type: "lecture" },
      { title: "BM25 & Language Models", description: "Probabilistic retrieval and language modeling", type: "lecture" },
      { title: "Coursework: Search Engine", description: "Building a search engine from scratch", type: "project" },
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
