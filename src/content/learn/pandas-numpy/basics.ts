import type { StructuredContent } from "@/lib/structured-content";

export const pandasNumpyBasicsContent: StructuredContent = {
  overview:
    "NumPy and pandas are the foundation of the Python data stack. NumPy gives you fast n-dimensional arrays; pandas builds on top of that to provide labelled, relational-style data structures. This chapter focuses on the mental models you need to clean, join, aggregate, and vectorise data for machine learning.",

  youWillLearn: [
    "How NumPy arrays differ from Python lists and why vectorisation matters",
    "How to reason about shapes, broadcasting, and axis semantics",
    "How to use pandas Series and DataFrames for tabular data",
    "How to index, filter, join, and group data without creating subtle bugs",
    "How to design tidy data layouts that play nicely with sklearn and PyTorch",
    "How to avoid common pitfalls like chained assignment and copy-vs-view confusion",
  ],

  mainContent: [
    {
      heading: "NumPy Arrays and Vectorised Thinking",
      body:
        "A NumPy array is a fixed-type, n-dimensional block of memory. Unlike Python lists, arrays store values contiguously and apply operations to whole chunks at once in compiled C code. This is why `x * 2` on a NumPy array multiplies every element and is far faster than looping in Python. The shape `(n_samples, n_features)` matters as much as the values: most ML code assumes rows are examples and columns are features. Broadcasting lets you apply operations between arrays of different but compatible shapes (e.g. subtracting a mean vector of shape `(n_features,)` from a matrix of shape `(n_samples, n_features)`), but you must always check that the alignment matches your intent.",
    },
    {
      heading: "Pandas Series and DataFrames: Labeled Data",
      body:
        "Pandas introduces labels on top of NumPy arrays. A `Series` is a one-dimensional array with an index; a `DataFrame` is a two-dimensional table with labeled rows and columns. You can select columns with `df['col']`, multiple columns with `df[['a', 'b']]`, and rows by label or integer position using `.loc` and `.iloc`. The key advantage over raw arrays is that operations become self-documenting: `df['bmi'] / df['height_m']**2` is much easier to read and debug than manual indexing. For ML, you usually keep raw data as DataFrames as long as possible, only converting to NumPy when passing into sklearn or PyTorch.",
    },
    {
      heading: "Indexing, Filtering, and Chained Assignment",
      body:
        "Indexing in pandas is powerful but easy to misuse. The core rule is: use `.loc[row_selector, col_selector]` when selecting by labels and `.iloc` when selecting by integer position. Expressions like `df[df['age'] > 30]['bmi'] = ...` create a temporary view or copy and often lead to the infamous `SettingWithCopyWarning`. The safe pattern is to filter rows, get an index, and then assign through `.loc`, for example: `mask = df['age'] > 30; df.loc[mask, 'bmi'] = df.loc[mask, 'bmi'].fillna(df['bmi'].median())`. Being explicit about what you are selecting and modifying avoids subtle bugs where your code appears to run but silently fails to change the underlying data.",
    },
    {
      heading: "Joins, Merges, and the Shape of Your Data",
      body:
        "Real ML projects almost always require combining multiple tables: customers with transactions, patients with lab results, events with metadata. Pandas provides `merge` (SQL-style joins) and `concat` (stacking). `merge(left, right, on='key', how='inner')` keeps only matching keys; `how='left'` keeps all rows from the left and fills missing values for unmatched rights; `how='outer'` keeps everything. It is critical to check the size of your DataFrame before and after joins — unexpected row counts often indicate duplicate keys or one-to-many relationships you did not intend. A good practice is to run `df.groupby('key').size().describe()` first to see the key cardinality before merging.",
    },
    {
      heading: "GroupBy, Aggregations, and Tidy Data",
      body:
        "The `groupby` operation lets you split data into groups, apply an operation to each group, and then combine the results. The pattern is `df.groupby('col')['value'].agg(['mean', 'std'])`, which produces per-group means and standard deviations. Tidy data means each column is a variable, each row is an observation, and each table is a single observational unit. When your data is tidy, groupby and aggregations become simple and predictable. Many ML feature engineering tasks — like computing per-user statistics or rolling window features — boil down to carefully designed groupby operations.",
    },
    {
      heading: "From DataFrame to Model-Ready Arrays",
      body:
        "Before feeding data into sklearn or PyTorch, you usually perform three steps: select feature columns, handle missing values, and encode categoricals. With pandas you might start by defining `feature_cols` and `target_col`, then doing `X = df[feature_cols]; y = df[target_col]`. Numeric imputation (fillna with mean/median) and categoricals (get_dummies or sklearn encoders) can be done in pandas, but in production code it is often better to delegate these to sklearn Pipelines. The key is to end with a clean `(n_samples, n_features)` array and a well-documented mapping from columns to semantic meaning so you can debug models later.",
    },
  ],

  examples: [
    {
      title: "Vectorised Z-Score Normalisation with NumPy",
      description:
        "Standardising features in one shot, using broadcasting instead of loops.",
      code: `import numpy as np

X = np.array([[170, 65],
              [180, 80],
              [160, 54]], dtype=float)  # height, weight

means = X.mean(axis=0)   # shape (2,)
stds = X.std(axis=0)     # shape (2,)

X_normalised = (X - means) / stds`,
    },
    {
      title: "Safe Assignment in Pandas with loc",
      description:
        "Filling missing BMI values for adults only, without triggering SettingWithCopy.",
      code: `import pandas as pd

df = pd.DataFrame({
    "age": [25, 40, 15, 52],
    "bmi": [22.5, None, 18.2, None],
})

adult_mask = df["age"] >= 18
adult_bmi_median = df.loc[adult_mask, "bmi"].median()

df.loc[adult_mask, "bmi"] = df.loc[adult_mask, "bmi"].fillna(adult_bmi_median)`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Relying on chained assignment in pandas",
      why:
        "Patterns like `df[df['age'] > 30]['bmi'] = ...` may operate on a temporary copy, so the original DataFrame is not modified, even though the code runs without error.",
      fix:
        "Always assign through `.loc` or `.iloc` with explicit row and column selectors. If you see `SettingWithCopyWarning`, refactor to a single `.loc` call.",
    },
    {
      mistake: "Ignoring dtypes and mixed types in columns",
      why:
        "Columns with mixed types (numbers and strings) are stored as `object`, which breaks numeric operations and slows everything down.",
      fix:
        "Inspect `df.dtypes` and coerce columns to sensible types with `astype`, `to_numeric`, or `to_datetime`. Clean bad values before modelling.",
    },
    {
      mistake: "Using Python loops instead of vectorised operations",
      why:
        "For large datasets, per-row Python loops are orders of magnitude slower than NumPy or pandas vectorised operations, and they make code harder to reason about.",
      fix:
        "Learn common vectorised patterns (boolean masks, arithmetic on whole columns, `where` and `clip`, `groupby` + `transform`). Reach for `.apply` only when absolutely necessary.",
    },
  ],

  exercises: [
    {
      question:
        "You receive a CSV with columns: user_id, event_time, country, device_type, and revenue. Describe how you would use pandas to compute, for each user, the total revenue, number of sessions, and first/last activity dates, returning a user-level DataFrame ready for modelling.",
      answer:
        "Parse event_time with `pd.to_datetime`, then group by user_id: `g = df.groupby('user_id')`. Compute aggregations with `agg`, e.g. `g['revenue'].sum()` for total revenue, `g['event_time'].agg(['min', 'max'])` for first/last activity, and either count distinct sessions (if you have a session_id column) or use heuristics. Combine into a single DataFrame with multi-column aggregation, reset_index, and ensure each row is one user with feature columns.",
    },
    {
      question:
        "You merge a transactions table with a customers table and notice the resulting DataFrame has far more rows than the transactions table. What might be happening, and how do you debug it?",
      answer:
        "A many-to-many merge is likely: at least one of the keys (customer_id) is duplicated in both tables. Debug by running `transactions.groupby('customer_id').size().describe()` and the same for customers, inspect keys with high counts, and consider whether you meant a one-to-many or many-to-one join. You may need to aggregate one side before merging or change the join keys.",
    },
  ],

  furtherReading: [
    {
      title: "Python Fundamentals for ML (Notebook)",
      href: "/learn/ml/1/python-fundamentals",
      type: "internal",
    },
    {
      title: "Pandas User Guide",
      href: "https://pandas.pydata.org/docs/user_guide/index.html",
      type: "external",
    },
    {
      title: "NumPy Quickstart Tutorial",
      href: "https://numpy.org/doc/stable/user/quickstart.html",
      type: "external",
    },
  ],
};

