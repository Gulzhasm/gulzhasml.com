import type { StructuredContent } from "@/lib/structured-content";

export const week5Content: Record<string, StructuredContent> = {
  "trees-bayes-theory": {
    overview:
      "This chapter extends classification beyond linear models to decision trees, Gaussian Naive Bayes, and the challenges of class imbalance. You will understand entropy-based splitting, the Naive Bayes assumption, and diagnostic tools such as confusion matrices.",
    youWillLearn: [
      "How decision trees grow by greedy entropy-based splits",
      "Information gain and the role of impurity measures",
      "The Naive Bayes assumption and why it often still works",
      "Confusion matrices, precision, recall and F1-score",
      "The impact of class imbalance and strategies to mitigate it",
    ],
    mainContent: [
      {
        heading: "Decision Trees and Entropy",
        body:
          "A decision tree recursively partitions feature space into axis-aligned regions by asking questions of the form x_j ≤ t. At each node it chooses the feature and threshold that maximise a purity gain. Purity is measured via entropy H(S) = −Σ_k p_k log₂ p_k, where p_k is the proportion of class k in node S. A pure node (all same class) has entropy 0; a maximally mixed node has high entropy. Information gain is IG = H(parent) − Σ_child (|child|/|parent|) H(child). Greedy splitting on the highest IG approximates a complex decision surface by a hierarchy of simple rules.",
      },
      {
        heading: "Overfitting in Trees",
        body:
          "An unconstrained tree grown to purity will memorise the training data, achieving near-zero training error but often poor test performance. This is overfitting. Controlling tree depth, minimum samples per leaf, and minimum impurity decrease are common regularisation strategies. Ensemble methods such as random forests and gradient-boosted trees combat overfitting by averaging or boosting many weakly correlated trees.",
      },
      {
        heading: "Gaussian Naive Bayes",
        body:
          "Naive Bayes models p(x | y) as a product of per-feature class-conditional densities: p(x | y) = Π_j p(x_j | y). The 'naive' assumption is that features are conditionally independent given the class. In Gaussian Naive Bayes, each p(x_j | y=k) is modelled as a univariate Gaussian with class-specific mean μ_{jk} and variance σ²_{jk}. Training is trivial: for each class and feature, compute μ and σ². Prediction uses Bayes’ rule: p(y | x) ∝ p(y) Π_j p(x_j | y). Despite the unrealistic independence assumption, Naive Bayes can perform surprisingly well and is extremely fast.",
      },
      {
        heading: "Confusion Matrices and Class Imbalance",
        body:
          "Accuracy alone obscures where a classifier fails, especially in imbalanced settings. A confusion matrix counts true vs predicted labels for each class, exposing which classes are often confused. From it you derive precision (TP/(TP+FP)), recall (TP/(TP+FN)), and F1-score. In heavily imbalanced datasets it is common to see high accuracy but terrible recall on minority classes, which may be exactly the classes you care about (fraud, rare diseases).",
      },
      {
        heading: "Handling Imbalanced Data",
        body:
          "Two broad strategies address imbalance: modifying the loss and modifying the data. Class-weighted losses penalise mistakes on minority classes more heavily, e.g., via class_weight='balanced' in scikit-learn. Data-level methods oversample minority classes (possibly with synthetic samples as in SMOTE) or undersample majority classes. Evaluating with per-class metrics and inspecting confusion matrices is essential after applying these techniques.",
      },
    ],
    examples: [
      {
        title: "Entropy and Information Gain Example",
        description:
          "Compute entropy and information gain for a simple binary split.",
        code:
          "import numpy as np\n\ndef entropy(counts):\n    probs = counts / counts.sum()\n    probs = probs[probs > 0]\n    return -(probs * np.log2(probs)).sum()\n\nparent = np.array([9, 5])  # e.g., 9 positives, 5 negatives\nleft = np.array([8, 2])\nright = np.array([1, 3])\n\nH_parent = entropy(parent)\nH_left = entropy(left)\nH_right = entropy(right)\n\nn = parent.sum()\nIG = H_parent - (left.sum()/n)*H_left - (right.sum()/n)*H_right\nprint(\"Information gain:\", IG)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Allowing trees to grow without constraints",
        why:
          "Unpruned trees can perfectly memorise the training set and generalise poorly.",
        fix:
          "Limit depth, require minimum samples per leaf, or use ensembles with built-in regularisation.",
      },
      {
        mistake: "Using accuracy as the sole metric in imbalanced datasets",
        why:
          "High accuracy can coincide with near-zero recall on the minority class.",
        fix:
          "Inspect confusion matrices and report precision, recall and F1 for each class; consider AUROC/PR curves.",
      },
    ],
    exercises: [
      {
        question:
          "Explain how SMOTE generates synthetic examples for a minority class.",
        answer:
          "SMOTE selects a minority-class example, finds one of its k nearest minority neighbours, and interpolates a new sample on the line segment between them. Repeating this creates synthetic points that populate sparse regions of the minority manifold.",
      },
      {
        question:
          "Why might a shallow tree underfit while a very deep tree overfits?",
        answer:
          "A shallow tree has insufficient capacity to model complex decision boundaries (high bias), while a deep tree can model noise and idiosyncrasies of the training data (high variance).",
      },
    ],
    furtherReading: [
      {
        title: "Classifiers in Action — Iris, Forest Covertype & SMOTE",
        href: "/learn/ml/5/advanced-classification",
        type: "internal",
      },
      {
        title: "scikit-learn: Decision Trees",
        href: "https://scikit-learn.org/stable/modules/tree.html",
        type: "external",
      },
      {
        title: "Imbalanced-learn Documentation",
        href: "https://imbalanced-learn.org/stable/",
        type: "external",
      },
    ],
  },

  "advanced-classification": {
    overview:
      "This chapter puts logistic regression, decision trees and Gaussian Naive Bayes into practice on Iris and the imbalanced Forest Covertype dataset, emphasising evaluation via confusion matrices and strategies for dealing with imbalance.",
    youWillLearn: [
      "Training and comparing multiple classifiers with scikit-learn",
      "Constructing and interpreting confusion matrices",
      "Computing per-class precision, recall and F1-score",
      "Handling class imbalance with class weights and SMOTE",
    ],
    mainContent: [
      {
        heading: "Iris as a Controlled Benchmark",
        body:
          "The Iris dataset, with three balanced classes and four features, serves as a clean playground. Training logistic regression, decision tree and GaussianNB side by side reveals different strengths: logistic regression yields smooth linear boundaries, trees can carve complex piecewise-constant regions, and Naive Bayes is extremely fast but can be miscalibrated when independence is violated.",
      },
      {
        heading: "Confusion Matrices and Per-Class Metrics",
        body:
          "For each classifier you compute a confusion matrix and derive per-class precision, recall and F1. On Iris, all models often achieve high overall accuracy, but the confusion matrices expose which classes they confuse (usually versicolor vs virginica). This trains you to go beyond a single scalar score and inspect model behaviour class-by-class.",
      },
      {
        heading: "Forest Covertype: Large-Scale and Imbalanced",
        body:
          "Forest Covertype has hundreds of thousands of instances, dozens of features, and seven classes with highly skewed frequencies. Training the same classifiers naively yields misleadingly high accuracy dominated by majority classes. Confusion matrices reveal that some rare classes have near-zero recall. This is a realistic scenario where default settings fail silently.",
      },
      {
        heading: "Balancing with Class Weights and SMOTE",
        body:
          "By enabling class_weight='balanced' in logistic regression and decision trees, the learning algorithm upweights minority-class errors and downweights majority-class errors. Applying SMOTE to oversample minority classes before training further equalises class frequencies. Comparing confusion matrices before and after these interventions shows significant recall improvements on rare classes, often at an acceptable cost to precision.",
      },
    ],
    examples: [
      {
        title: "Training Multiple Classifiers on Iris",
        description:
          "Logistic regression, decision tree and Gaussian Naive Bayes with scikit-learn.",
        code:
          "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.naive_bayes import GaussianNB\nfrom sklearn.metrics import classification_report\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y\n)\n\nmodels = {\n    \"logreg\": LogisticRegression(max_iter=1000),\n    \"tree\": DecisionTreeClassifier(max_depth=4),\n    \"gnb\": GaussianNB(),\n}\n\nfor name, model in models.items():\n    model.fit(X_train, y_train)\n    y_pred = model.predict(X_test)\n    print(name)\n    print(classification_report(y_test, y_pred))",
      },
    ],
    commonMistakes: [
      {
        mistake: "Failing to stratify train/test splits on imbalanced data",
        why:
          "Random splits can produce even more skewed class distributions in train and test, making evaluation unstable.",
        fix:
          "Use stratified splitting so that each partition retains the overall class proportions.",
      },
      {
        mistake: "Applying SMOTE to both training and test sets",
        why:
          "Synthetic samples in the test set break the evaluation by leaking generated patterns.",
        fix:
          "Apply SMOTE only on the training set; keep validation and test sets strictly real data.",
      },
    ],
    exercises: [
      {
        question:
          "On a subset of Forest Covertype, compare the confusion matrix of a decision tree trained with and without class_weight='balanced'. What changes do you observe for minority classes?",
        answer:
          "With class_weight='balanced', minority classes typically gain recall (more true positives), but may incur additional false positives. The confusion matrix shows more spread predictions for rare labels instead of nearly all mass on majority labels.",
      },
      {
        question:
          "Explain why Naive Bayes can perform well even when its independence assumptions are violated.",
        answer:
          "Although the joint likelihood is misspecified, the decision rule often depends only on the relative ordering of class posteriors. As long as the model ranks the true class highest, it can achieve good accuracy despite poor probability calibration.",
      },
    ],
    furtherReading: [
      {
        title: "Decision Trees, Naive Bayes & the Class Imbalance Problem",
        href: "/learn/ml/5/trees-bayes-theory",
        type: "internal",
      },
      {
        title: "scikit-learn: Imbalanced Data Tips",
        href: "https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics",
        type: "external",
      },
    ],
  },
};

