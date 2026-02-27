import type { StructuredContent } from "@/lib/structured-content";

export const week9Content: Record<string, StructuredContent> = {
  "pca-theory": {
    overview:
      "Principal Component Analysis (PCA) is a cornerstone technique for understanding and compressing high-dimensional data. This chapter explains its geometric intuition, eigen-decomposition, variance explanation and trade-offs with feature selection.",
    youWillLearn: [
      "Why high-dimensional data often lives near a lower-dimensional subspace",
      "How PCA finds principal directions via covariance eigenvectors",
      "Interpreting explained variance ratios and choosing the number of components",
      "Limitations of PCA (linearity, variance vs task relevance)",
      "When to use PCA vs feature selection based on correlation or chi-squared tests",
    ],
    mainContent: [
      {
        heading: "The Curse and Blessing of Dimensionality",
        body:
          "In high-dimensional spaces, distances can become less informative, and data tends to be sparse. However, many real datasets (images, speech, text embeddings) lie near low-dimensional manifolds embedded in high-dimensional ambient spaces. PCA exploits this by finding directions along which the data varies most, revealing intrinsic structure and enabling dimensionality reduction without severe information loss.",
      },
      {
        heading: "Covariance and Eigen-Decomposition",
        body:
          "Given mean-centered data matrix X ∈ ℝ^{n×d}, the empirical covariance matrix is C = (1/n) XᵀX. PCA finds eigenvalues λ₁ ≥ λ₂ ≥ … ≥ λ_d and corresponding eigenvectors v₁, …, v_d of C. Each v_k defines a principal direction, and λ_k gives the variance along that direction. Projecting data onto the first m eigenvectors yields an m-dimensional representation that captures the largest possible variance among all rank-m linear projections.",
      },
      {
        heading: "Explained Variance and Component Selection",
        body:
          "The proportion of total variance explained by the k-th component is λ_k / Σ_j λ_j. Cumulative explained variance curves show how many components are needed to capture, say, 90% or 95% of the variance. For MNIST digits, a few hundred components often retain most of the information out of 784 dimensions. Component selection trades compression and speed against potential performance loss on downstream tasks.",
      },
      {
        heading: "PCA vs Feature Selection",
        body:
          "PCA creates new orthogonal features (principal components) as linear combinations of original features. This often yields better compression but sacrifices direct interpretability: 'principal component 7' is harder to explain than 'blood pressure.' Feature selection, in contrast, chooses a subset of original features based on criteria such as correlation with the target or chi-squared scores. It preserves semantics but may be less compact or efficient. In practice, you often use PCA for representation learning and selection methods when interpretability is paramount.",
      },
    ],
    examples: [
      {
        title: "Eigen-Decomposition with NumPy",
        description:
          "Compute PCA directions for a small dataset using eigen-decomposition of the covariance matrix.",
        code:
          "import numpy as np\n\nX = np.array([[2.5, 2.4],\n              [0.5, 0.7],\n              [2.2, 2.9],\n              [1.9, 2.2],\n              [3.1, 3.0]])\nX_centered = X - X.mean(axis=0, keepdims=True)\nC = (X_centered.T @ X_centered) / X_centered.shape[0]\n\nvals, vecs = np.linalg.eigh(C)\norder = np.argsort(vals)[::-1]\nvals, vecs = vals[order], vecs[:, order]\nprint(\"Eigenvalues:\", vals)\nprint(\"First principal direction:\", vecs[:, 0])",
      },
    ],
    commonMistakes: [
      {
        mistake: "Applying PCA on unscaled features in heterogeneous units",
        why:
          "Features with large variance purely due to units dominate the principal components.",
        fix:
          "Standardise features (zero mean, unit variance) before PCA when units differ.",
      },
      {
        mistake: "Interpreting PCA components as directly causal or semantically pure",
        why:
          "Components are linear combinations of features and may mix multiple underlying factors.",
        fix:
          "Use PCA primarily as a mathematical tool for compression and visualisation; be cautious with causal narratives.",
      },
    ],
    exercises: [
      {
        question:
          "Derive the PCA optimisation objective and show that its solution is given by the top eigenvectors of the covariance matrix.",
        answer:
          "PCA seeks a projection matrix W ∈ ℝ^{d×m} that maximises trace(Wᵀ C W) subject to WᵀW = I. Using Lagrange multipliers and properties of symmetric matrices, the solution is that columns of W are eigenvectors associated with the top m eigenvalues of C.",
      },
      {
        question:
          "Explain why the sum of all eigenvalues of C equals the total variance of the dataset.",
        answer:
          "The trace of C equals the sum of its diagonal elements, each of which is the variance of a feature. Since the trace of a matrix equals the sum of its eigenvalues, Σ_j λ_j = trace(C) = total variance.",
      },
    ],
    furtherReading: [
      {
        title: "Dimensionality Reduction Notebook — PCA on MNIST & Feature Selection",
        href: "/learn/ml/9/dimensionality-reduction-notebook",
        type: "internal",
      },
      {
        title: "scikit-learn: PCA and IncrementalPCA",
        href: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
        type: "external",
      },
    ],
  },

  "dimensionality-reduction-notebook": {
    overview:
      "This chapter applies PCA to MNIST for compression and visualisation, compares classification performance on raw vs PCA-reduced features, and explores feature selection on the Diabetes dataset.",
    youWillLearn: [
      "Using IncrementalPCA and low-rank PCA on large datasets",
      "Visualising reconstruction quality as more components are added",
      "Training MLPs on raw and PCA-transformed MNIST features",
      "Computing correlation and chi-squared scores for feature selection",
    ],
    mainContent: [
      {
        heading: "Incremental PCA on MNIST",
        body:
          "You apply IncrementalPCA to 70,000 MNIST images, processing data in batches to avoid memory issues. Inspecting explained variance ratios reveals that relatively few components suffice to capture most of the variability in handwritten digits, enabling substantial dimensionality reduction.",
      },
      {
        heading: "Reconstruction Experiments",
        body:
          "By projecting images to m components and back, you qualitatively assess how much information each additional component provides. Reconstructions with 10 components are blurry but recognisable; with 100–150 components they become nearly indistinguishable from originals. This visually ties explained variance ratios to perceptual quality.",
      },
      {
        heading: "MLP Classification on Raw vs PCA Features",
        body:
          "You train identical MLP architectures on raw 784-dimensional inputs and on PCA-reduced inputs of various dimensionalities. Measuring accuracy and training time demonstrates the trade-off: PCA typically preserves accuracy while reducing training time and risk of overfitting, especially when the classifier has many parameters in the first layer.",
      },
      {
        heading: "Feature Selection on the Diabetes Dataset",
        body:
          "For the Diabetes dataset, you compute Pearson correlation between each feature and the target, as well as chi-squared scores for discretised features. Ranking features by these scores highlights the most predictive variables. Comparing models trained on the full feature set, on PCA components, and on selected features reveals how different dimensionality reduction strategies impact interpretability and performance.",
      },
    ],
    examples: [
      {
        title: "IncrementalPCA Usage Sketch",
        description: "Applying IncrementalPCA with batching on MNIST.",
        code:
          "from sklearn.decomposition import IncrementalPCA\n\nipca = IncrementalPCA(n_components=100)\nfor X_batch in iterate_mnist_batches():\n    ipca.partial_fit(X_batch)\n\nX_reduced = ipca.transform(X_full)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Projecting validation/test data using PCA fitted on the full dataset",
        why:
          "Fitting PCA on all data leaks information from validation/test into the projection, compromising evaluation.",
        fix:
          "Fit PCA on the training set only, then apply the learned transform to validation and test sets.",
      },
      {
        mistake: "Choosing number of components solely by variance explained without considering downstream task performance",
        why:
          "Some components capturing small variance may still be crucial for prediction.",
        fix:
          "Combine explained variance analysis with cross-validated performance of downstream models.",
      },
    ],
    exercises: [
      {
        question:
          "Train an MLP on MNIST using raw pixels, 50-component PCA, 100-component PCA and 200-component PCA. Compare accuracy and training time.",
        answer:
          "You typically observe that 100–200 components retain accuracy close to raw pixels while significantly reducing training time. With only 50 components, performance may drop slightly due to loss of fine-grained information.",
      },
      {
        question:
          "On the Diabetes dataset, compare feature subsets chosen by correlation and chi-squared score. Where do they agree and differ?",
        answer:
          "Both methods tend to highlight features strongly associated with the target, but they may disagree on features whose relationship is non-linear or depends on discretisation. This comparison underscores that selection criteria embody different assumptions.",
      },
    ],
    furtherReading: [
      {
        title: "PCA & Dimensionality Reduction — Making Sense of High Dimensions",
        href: "/learn/ml/9/pca-theory",
        type: "internal",
      },
      {
        title: "scikit-learn: Feature Selection",
        href: "https://scikit-learn.org/stable/modules/feature_selection.html",
        type: "external",
      },
    ],
  },
};

