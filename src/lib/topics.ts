export interface TopicResource {
  title: string;
  description: string;
  type: "notebook" | "tutorial" | "lab" | "lecture" | "post" | "project";
  link?: string;
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
  tags: string[];
}

export const topics: Topic[] = [
  // --- Core Topics ---
  {
    slug: "ml",
    title: "Machine Learning",
    shortTitle: "ML",
    description:
      "Foundations of machine learning: supervised & unsupervised learning, model evaluation, feature engineering, and practical implementations.",
    overview:
      "Machine learning is the backbone of modern AI systems. This section covers core ML algorithms, mathematical foundations, model selection, and hands-on implementations using Python and Scikit-learn. Content will grow as I progress through coursework and personal projects.",
    category: "topic",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    resources: [],
    tags: ["Supervised Learning", "Unsupervised Learning", "Regression", "Classification", "Clustering"],
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
