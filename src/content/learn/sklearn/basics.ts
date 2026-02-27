import type { StructuredContent } from "@/lib/structured-content";

export const sklearnBasicsContent: StructuredContent = {
  overview:
    "Scikit-learn is the standard library for classical machine learning in Python. It gives you a consistent API for preprocessing, model training, evaluation, and hyperparameter tuning. This chapter focuses on building robust end-to-end workflows rather than memorising individual classifiers.",

  youWillLearn: [
    "The core estimator API: fit, predict, transform, and fit_transform",
    "How to split data into train/validation/test sets without leaking information",
    "How to use scalers, encoders, and imputers correctly inside Pipelines",
    "How to run cross-validation and hyperparameter search with GridSearchCV / RandomizedSearchCV",
    "How to choose and interpret common metrics for classification and regression",
    "How to structure sklearn code so it is reproducible and deployment-friendly",
  ],

  mainContent: [
    {
      heading: "The Estimator Mental Model",
      body:
        "Every object in scikit-learn follows the same estimator pattern. Transformers (like StandardScaler, OneHotEncoder, SimpleImputer) implement `fit(X, y=None)` and `transform(X)`; estimators (like LogisticRegression, RandomForestClassifier, KMeans) implement `fit(X, y)` and `predict(X)`. Many transformers also expose a convenience `fit_transform(X, y=None)` that combines both steps. This uniform API lets you combine components freely. If you remember only one thing, remember this: in sklearn you rarely manipulate arrays by hand — you compose small, well-tested building blocks into a pipeline.",
    },
    {
      heading: "Datasets, Features, and Labels",
      body:
        "Scikit-learn expects input features `X` as a 2D array of shape `(n_samples, n_features)` and targets `y` as a 1D array of length `n_samples`. `X` can be a NumPy array, SciPy sparse matrix, or a pandas DataFrame, but under the hood sklearn works with arrays. A typical workflow starts by loading a CSV with pandas, selecting numeric and categorical columns, and then passing `X.values` (or the DataFrame itself) to sklearn. For supervised learning you always have both `X` and `y`; for clustering and dimensionality reduction you usually only have `X`.",
    },
    {
      heading: "Train/Validation/Test Splits and Cross-Validation",
      body:
        "Good performance estimates require honest separation between training and evaluation data. The basic tool is `train_test_split`, which randomly splits your data into train and test sets, often with an 80/20 or 70/30 ratio. For classification tasks with class imbalance you should set `stratify=y` to preserve label proportions. Beyond a single split, cross-validation (e.g. `cross_val_score`) repeatedly splits the data into folds, trains on `k-1` folds, and evaluates on the remaining fold. The average score across all folds is a much more stable estimate of generalisation performance than a single split, especially for small datasets.",
    },
    {
      heading: "Preprocessing with Pipelines and ColumnTransformers",
      body:
        "The most important abstraction in sklearn is the `Pipeline`. A Pipeline chains transformers and an estimator so that calling `fit` and `predict` on the pipeline automatically applies all preprocessing steps in the right order. A typical pattern is `Pipeline([('scale', StandardScaler()), ('clf', LogisticRegression())])`. For mixed data types you combine `ColumnTransformer` with a Pipeline: numeric columns go through an imputer and scaler, categorical columns go through an imputer and one-hot encoder, and the outputs are concatenated before feeding a classifier. Keeping all preprocessing inside the pipeline is what prevents data leakage, because the transforms are fit only on the training folds during cross-validation, never on the full dataset.",
    },
    {
      heading: "Hyperparameter Tuning with GridSearchCV and RandomizedSearchCV",
      body:
        "Hyperparameters control model capacity and regularisation — for example, `C` in LogisticRegression, `max_depth` in DecisionTreeClassifier, or `n_estimators` in RandomForestClassifier. Instead of guessing them manually, you wrap your pipeline in `GridSearchCV` (or `RandomizedSearchCV`) and provide a parameter grid. The search object runs cross-validation for each hyperparameter combination, tracks the scores, and exposes the best estimator via `.best_estimator_`. Importantly, the grid should tune the entire pipeline, not just the final model. Parameters are addressed with double-underscore syntax, e.g. `clf__C` or `scale__with_mean`, so that the search understands which step they belong to.",
    },
    {
      heading: "Evaluating Models: Metrics that Match the Business Question",
      body:
        "Accuracy alone is almost never enough. Scikit-learn provides a rich set of metrics that answer different questions. For classification you have precision, recall, F1-score, ROC AUC, average precision, and confusion matrices. Precision answers 'of all predicted positives, how many were correct?' — important when false positives are expensive. Recall answers 'of all actual positives, how many did we find?' — critical when missing a positive is costly (e.g. fraud, disease). For regression you track mean squared error, mean absolute error, and R². The key habit is to choose metrics that match the real-world cost structure and always look at per-class performance, not just overall aggregates.",
    },
  ],

  examples: [
    {
      title: "Binary Classification Pipeline with Scaling and Logistic Regression",
      description:
        "A minimal but production-grade pattern: scale features, train a classifier, evaluate with ROC AUC.",
      code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000))
])

pipe.fit(X_train, y_train)
probs = pipe.predict_proba(X_test)[:, 1]
print("ROC AUC:", roc_auc_score(y_test, probs))`,
    },
    {
      title: "Mixed-Type Features with ColumnTransformer and RandomForestRegressor",
      description:
        "Handling numeric and categorical columns cleanly in a single pipeline.",
      code: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline

numeric_features = ["age", "bmi", "income"]
categorical_features = ["city", "segment"]

numeric_pipeline = Pipeline([
    ("impute", SimpleImputer(strategy="median")),
    ("scale", StandardScaler()),
])

categorical_pipeline = Pipeline([
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore")),
])

preprocess = ColumnTransformer([
    ("num", numeric_pipeline, numeric_features),
    ("cat", categorical_pipeline, categorical_features),
])

model = Pipeline([
    ("prep", preprocess),
    ("rf", RandomForestRegressor(n_estimators=200, random_state=42)),
])

model.fit(df[numeric_features + categorical_features], y)`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Fitting preprocessors on the full dataset instead of only the training data",
      why:
        "Calling `scaler.fit_transform(X)` before splitting causes data leakage: information from the test set influences scaling parameters, leading to overly optimistic scores.",
      fix:
        "Always include preprocessing steps inside a `Pipeline` (and optionally `ColumnTransformer`) and run cross-validation or `train_test_split` on the raw data. The pipeline ensures that `fit` is called only on training folds.",
    },
    {
      mistake: "Using accuracy on heavily imbalanced classification problems",
      why:
        "A classifier that always predicts the majority class can achieve high accuracy while completely failing to detect minority classes that matter.",
      fix:
        "Use metrics like precision, recall, F1-score, ROC AUC, and confusion matrices. Consider `class_weight='balanced'` or resampling techniques for imbalanced data.",
    },
    {
      mistake: "Running GridSearchCV on raw arrays without a pipeline",
      why:
        "If scaling or encoding is not part of the grid search object, cross-validation folds may see differently scaled data, and you risk subtle leakage between preprocessing and model training.",
      fix:
        "Wrap the full workflow in a single `Pipeline` and pass that pipeline into `GridSearchCV`. Tune all hyperparameters (including preprocessing) through the grid's parameter grid.",
    },
  ],

  exercises: [
    {
      question:
        "You have a churn dataset with numeric and categorical features. Describe how you would build a single sklearn object that handles missing values, scales numeric features, one-hot encodes categoricals, and trains a gradient boosting classifier — all while being safe to use with cross-validation.",
      answer:
        "Create separate numeric and categorical Pipelines (with SimpleImputer + StandardScaler for numeric, SimpleImputer + OneHotEncoder for categoricals), combine them with a ColumnTransformer, then wrap that in a final Pipeline with GradientBoostingClassifier. You then pass this whole Pipeline into cross_val_score or GridSearchCV, ensuring that all preprocessing is fit only on the training folds.",
    },
    {
      question:
        "You run GridSearchCV on a RandomForestClassifier and see that training scores are very high but cross-validation scores are much lower. What does this suggest, and which hyperparameters would you try adjusting first?",
      answer:
        "This pattern suggests overfitting: the forest memorises training data but does not generalise. First reduce model complexity by lowering max_depth, increasing min_samples_leaf, reducing max_features, or lowering n_estimators. You can also enable class_weight='balanced' in imbalanced settings to avoid overfitting to the majority class.",
    },
  ],

  furtherReading: [
    {
      title: "Classifiers in Action — Iris, Forest Covertype & SMOTE",
      href: "/learn/ml/5/advanced-classification",
      type: "internal",
    },
    {
      title: "Clustering Notebook — K-Means from Scratch & Customer Segmentation",
      href: "/learn/ml/7/clustering-notebook",
      type: "internal",
    },
    {
      title: "Scikit-learn User Guide",
      href: "https://scikit-learn.org/stable/user_guide.html",
      type: "external",
    },
    {
      title: "Pipelines and Composite Estimators",
      href: "https://scikit-learn.org/stable/modules/compose.html",
      type: "external",
    },
  ],
};

