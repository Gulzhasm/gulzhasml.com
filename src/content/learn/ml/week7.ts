import type { StructuredContent } from "@/lib/structured-content";

export const week7Content: Record<string, StructuredContent> = {
  "clustering-theory": {
    overview:
      "Clustering discovers structure in unlabeled data. This chapter develops K-means from first principles, discusses how to choose K, and introduces hierarchical clustering and dendrograms for multi-scale analysis.",
    youWillLearn: [
      "The K-means objective and its alternating minimisation algorithm",
      "The E-step and M-step in K-means and why they decrease the objective",
      "The Elbow method for choosing the number of clusters",
      "Agglomerative hierarchical clustering and linkage criteria",
      "How to interpret dendrograms and choose clusterings at different scales",
    ],
    mainContent: [
      {
        heading: "The K-means Objective",
        body:
          "Given data points {x₁, …, x_n}, K-means seeks K centroids μ₁, …, μ_K and assignments z_i ∈ {1, …, K} that minimise the within-cluster sum of squares J = Σ_i ‖x_i − μ_{z_i}‖². Intuitively, each point is assigned to the nearest centroid, and centroids are set to the mean of their assigned points. This objective prefers compact, spherical clusters in Euclidean space.",
      },
      {
        heading: "E-step and M-step in K-means",
        body:
          "K-means iterates two steps: (E-step) assign each point to the nearest centroid by Euclidean distance; (M-step) recompute each centroid as the mean of its assigned points. Each step does not increase J; the E-step minimises J over assignments with centroids fixed, and the M-step minimises J over centroids with assignments fixed. Because there are finitely many possible assignments, the algorithm converges to a local minimum.",
      },
      {
        heading: "Choosing K with the Elbow Method",
        body:
          "The number of clusters K must be specified a priori. The Elbow method runs K-means for K = 1, 2, …, K_max and records the inertia (final value of J). As K increases, J decreases monotonically, but the marginal gain diminishes. Plotting J vs K produces a curve with a noticeable 'elbow' where additional clusters yield only small improvements. This elbow suggests a reasonable K, though it is not always clear-cut and domain knowledge is often required.",
      },
      {
        heading: "Agglomerative Hierarchical Clustering",
        body:
          "Hierarchical clustering does not fix K in advance. Agglomerative methods start with each point as its own cluster and repeatedly merge the two closest clusters according to a linkage criterion (single, complete, average, Ward). This produces a dendrogram that visualises the nested grouping structure. Cutting the dendrogram at different heights yields different numbers of clusters; examining these cuts gives insight into multi-scale structure in the data.",
      },
      {
        heading: "Linkage Criteria and Their Effects",
        body:
          "Single linkage defines inter-cluster distance as the minimum distance between any pair of points across clusters, often producing 'chained' clusters. Complete linkage uses the maximum distance and tends to produce compact, spherical groups. Average linkage averages all pairwise distances. Ward’s method merges clusters that minimally increase total within-cluster variance and often yields the most balanced, interpretable trees for numeric data.",
      },
    ],
    examples: [
      {
        title: "K-means Alternating Minimisation Sketch",
        description: "Pseudo-code for one iteration of K-means.",
        code:
          "def kmeans_step(X, centroids):\n    # E-step: assign labels\n    dists = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)\n    labels = dists.argmin(axis=1)\n\n    # M-step: recompute centroids\n    new_centroids = np.vstack([\n        X[labels == k].mean(axis=0) for k in range(centroids.shape[0])\n    ])\n    return labels, new_centroids",
      },
    ],
    commonMistakes: [
      {
        mistake: "Interpreting K-means clusters as always meaningful",
        why:
          "K-means can force arbitrary partitions even when data has no real cluster structure.",
        fix:
          "Validate clusters with domain knowledge, visualisation and stability analyses; do not over-interpret arbitrary groupings.",
      },
      {
        mistake: "Using K-means with non-spherical or categorical data",
        why:
          "K-means assumes Euclidean geometry and is biased toward spherical, equal-variance clusters.",
        fix:
          "Consider alternative methods (e.g., Gaussian mixtures, density-based clustering, k-modes) when data violate K-means assumptions.",
      },
    ],
    exercises: [
      {
        question:
          "Prove that the M-step update in K-means (setting μ_k to the mean of assigned points) minimises the squared error within cluster k.",
        answer:
          "For fixed assignments, J_k = Σ_{i:z_i=k} ‖x_i − μ_k‖² is minimised by differentiating w.r.t μ_k, setting derivative to zero, and solving, which yields μ_k = (1 / N_k) Σ_{i:z_i=k} x_i.",
      },
      {
        question:
          "On a 2D dataset with obvious non-spherical clusters (e.g., two moons), what happens when you apply K-means? Why?",
        answer:
          "K-means tends to cut the moons into pie-shaped regions that do not correspond to intuitive clusters because it can only form Voronoi partitions around centroids, not follow curved manifolds.",
      },
    ],
    furtherReading: [
      {
        title: "Clustering Notebook — K-Means from Scratch & Customer Segmentation",
        href: "/learn/ml/7/clustering-notebook",
        type: "internal",
      },
      {
        title: "scikit-learn: Clustering",
        href: "https://scikit-learn.org/stable/modules/clustering.html",
        type: "external",
      },
    ],
  },

  "clustering-notebook": {
    overview:
      "This chapter implements K-means from scratch, applies the Elbow method, explores hierarchical clustering with dendrograms, and performs real customer segmentation on the iFood marketing dataset.",
    youWillLearn: [
      "Writing K-means in NumPy with explicit E- and M-steps",
      "Using the Elbow method to choose K in practice",
      "Constructing dendrograms and interpreting them",
      "Performing and interpreting customer segmentation on real data",
    ],
    mainContent: [
      {
        heading: "Implementing K-means from Scratch",
        body:
          "You implement functions to (1) initialise centroids, (2) assign points to nearest centroids, and (3) recompute centroids. Running this implementation on Iris confirms that it quickly converges and recovers setosa almost perfectly, with some mixing between versicolor and virginica where their petal features overlap.",
      },
      {
        heading: "Choosing K via the Elbow Method",
        body:
          "By running K-means for K = 1…10 and plotting inertia as a function of K, you learn to visually detect elbows. On Iris, K = 3 is usually an obvious elbow. On more complex data the elbow may be subtle, which is a useful reminder that model selection often involves imperfect but pragmatic heuristics.",
      },
      {
        heading: "Hierarchical Clustering and Dendrograms",
        body:
          "Using scipy’s linkage and dendrogram functions, you perform agglomerative clustering on Iris and visualise the hierarchy. Cutting the dendrogram at different heights produces varying clusterings that correspond to coarse and fine-grained groupings. Comparing these to K-means cluster assignments shows where methods agree and differ.",
      },
      {
        heading: "Customer Segmentation on iFood",
        body:
          "On the iFood marketing dataset, you standardise numeric features, select relevant subsets (e.g., spending by category, channel usage, demographics), and apply K-means with a K chosen via the Elbow method and domain sense. Profiling each cluster by its centroid yields interpretable customer personas (e.g., high-income wine enthusiasts, deal-seeking families), illustrating the practical value of unsupervised learning.",
      },
    ],
    examples: [
      {
        title: "Running K-means on Iris",
        description:
          "Use scikit-learn’s KMeans to confirm your implementation.",
        code:
          "from sklearn.datasets import load_iris\nfrom sklearn.cluster import KMeans\n\nX, y = load_iris(return_X_y=True)\nkm = KMeans(n_clusters=3, random_state=42)\nlabels = km.fit_predict(X)\nprint(\"Cluster centers:\\n\", km.cluster_centers_)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Omitting feature scaling before clustering",
        why:
          "Unscaled features with different units dominate distance computations, biasing clusters.",
        fix:
          "Standardise or normalise features before applying distance-based clustering methods.",
      },
      {
        mistake:
          "Assuming clusters discovered in customer data are static over time",
        why:
          "Customer behaviour shifts; segments may drift or split.",
        fix:
          "Re-segment periodically and track stability of cluster assignments over time.",
      },
    ],
    exercises: [
      {
        question:
          "On the iFood dataset, build at least three different K-means segmentations using different feature subsets. How do the inferred personas change?",
        answer:
          "Using only spending features emphasises monetary value segments; including channel usage highlights online vs offline preferences; adding demographics yields age- or family-structured segments. Comparing these reveals how feature choice shapes business narratives.",
      },
      {
        question:
          "Compare K-means and hierarchical clustering on the same subset of customers. Where do they agree and disagree?",
        answer:
          "They typically agree on well-separated groups but differ on ambiguous or transitional customers. Dendrogram cuts may reveal subclusters that K-means collapses, or vice versa, highlighting that clustering is exploratory and not uniquely defined.",
      },
    ],
    furtherReading: [
      {
        title: "Clustering — Finding Structure Without Labels",
        href: "/learn/ml/7/clustering-theory",
        type: "internal",
      },
      {
        title: "scipy.cluster.hierarchy Documentation",
        href: "https://docs.scipy.org/doc/scipy/reference/cluster.hierarchy.html",
        type: "external",
      },
    ],
  },
};

