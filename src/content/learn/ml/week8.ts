import type { StructuredContent } from "@/lib/structured-content";

export const week8Content: Record<string, StructuredContent> = {
  "density-estimation-theory": {
    overview:
      "Density estimation aims to model the full probability distribution p(x) rather than only conditional probabilities. This chapter introduces Gaussian Mixture Models (GMMs), the Expectation–Maximization (EM) algorithm, and shows how density models become classifiers.",
    youWillLearn: [
      "Why single Gaussians are often insufficient to model real data",
      "How Gaussian mixtures approximate complex distributions",
      "The EM algorithm: E-step responsibilities and M-step parameter updates",
      "How to use class-conditional densities for classification",
      "The singularity problem in maximum likelihood and how to regularise covariances",
    ],
    mainContent: [
      {
        heading: "From Single Gaussians to Mixtures",
        body:
          "Real-world data often exhibit multi-modal structure: heights of a population, formant frequencies of vowels, or pixel intensities in images. A single Gaussian with one mean and covariance cannot capture multiple distinct modes. Gaussian Mixture Models address this by representing p(x) as a weighted sum of K Gaussians with distinct means and covariances: p(x) = Σ_k π_k 𝓝(x; μ_k, Σ_k). With enough components, a GMM can approximate virtually any smooth density.",
      },
      {
        heading: "Latent Variable Viewpoint",
        body:
          "GMMs can be viewed as introducing a latent discrete variable Z taking values 1…K indicating which component generated a sample. The generative process is: sample Z ∼ Categorical(π), then sample X ∼ 𝓝(μ_Z, Σ_Z). The joint density factorises as p(x, z) = π_z 𝓝(x; μ_z, Σ_z). Learning a GMM from data thus amounts to estimating π_k, μ_k, Σ_k from unlabeled samples.",
      },
      {
        heading: "Expectation–Maximization Algorithm",
        body:
          "EM alternates between assigning soft cluster memberships and re-estimating parameters. In the E-step, responsibilities γ_{nk} = p(z_k | x_n) are computed using the current parameters via Bayes’ rule: γ_{nk} ∝ π_k 𝓝(x_n; μ_k, Σ_k). In the M-step, parameters are updated using these responsibilities as fractional counts: μ_k = Σ_n γ_{nk} x_n / Σ_n γ_{nk}, Σ_k = Σ_n γ_{nk} (x_n−μ_k)(x_n−μ_k)ᵀ / Σ_n γ_{nk}, and π_k = (1/N) Σ_n γ_{nk}. Each EM iteration is guaranteed not to decrease the log-likelihood; it climbs a hill in parameter space until convergence to a local optimum.",
      },
      {
        heading: "Density Models as Classifiers",
        body:
          "If you fit separate GMMs p(x | y = k) for each class k and know or estimate class priors p(y = k), you can classify new samples via Bayes’ rule: p(y = k | x) ∝ p(x | y = k) p(y = k). The decision boundary is where two such posteriors are equal. Unlike linear classifiers, these boundaries can be highly nonlinear and reflect multi-modal structure in class-conditional densities.",
      },
      {
        heading: "Singularities and Regularisation",
        body:
          "Maximum likelihood estimation of GMMs is susceptible to singularities: a component’s covariance can collapse toward zero around a single data point, sending its likelihood to infinity and making the overall log-likelihood unbounded above. Numerically this manifests as nearly singular covariance matrices and exploding responsibilities. A practical remedy is to regularise the covariance by adding a small multiple of the identity (εI) after each M-step. This prevents collapse while minimally perturbing well-behaved covariances.",
      },
    ],
    examples: [
      {
        title: "Responsibilities in a 1D GMM",
        description:
          "Compute posteriors γ_{nk} for a toy 1D mixture of two Gaussians.",
        code:
          "import numpy as np\n\npi = np.array([0.4, 0.6])\nmu = np.array([-1.0, 2.0])\nsigma = np.array([0.5, 1.0])\n\nx = np.linspace(-4, 5, 100)\n\ndef normal_pdf(x, m, s):\n    return 1.0 / (np.sqrt(2 * np.pi) * s) * np.exp(-0.5 * ((x - m) / s) ** 2)\n\nnum = np.vstack([pi[k] * normal_pdf(x, mu[k], sigma[k]) for k in range(2)])\nden = num.sum(axis=0, keepdims=True)\nresp = num / den  # shape (2, 100)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming EM finds the global optimum",
        why:
          "EM is a local optimisation method and can converge to different solutions depending on initialisation.",
        fix:
          "Use multiple random restarts or informed initialisation (e.g., K-means centroids) and compare final log-likelihoods.",
      },
      {
        mistake:
          "Ignoring degeneracy warnings or nearly singular covariance matrices",
        why:
          "These signal singularities that invalidate the learned model.",
        fix:
          "Inspect eigenvalues of covariances and apply diagonal regularisation or constrain minimum variance.",
      },
    ],
    exercises: [
      {
        question:
          "Explain why GMMs can approximate any continuous density on a compact set given enough components.",
        answer:
          "Gaussians form a universal approximating family under convolution and linear combination; by placing many narrow Gaussians under a target density and tuning their weights and means, one can approximate the density arbitrarily well (a consequence of results such as the Weierstrass approximation theorem applied to kernels).",
      },
      {
        question:
          "For a 2-component GMM in 1D, derive the E-step responsibility formula explicitly.",
        answer:
          "For components k ∈ {1,2}, γ_{nk} = p(z=k | x_n) = π_k 𝓝(x_n; μ_k, σ²_k) / [π_1 𝓝(x_n; μ_1, σ²_1) + π_2 𝓝(x_n; μ_2, σ²_2)].",
      },
    ],
    furtherReading: [
      {
        title: "Density Estimation Notebook — Vowel Classification with GMMs",
        href: "/learn/ml/8/density-estimation-notebook",
        type: "internal",
      },
      {
        title: "scikit-learn: GaussianMixture",
        href: "https://scikit-learn.org/stable/modules/mixture.html",
        type: "external",
      },
    ],
  },

  "density-estimation-notebook": {
    overview:
      "This chapter implements EM for Gaussian mixtures on the Peterson & Barney vowel dataset, builds a Maximum Likelihood classifier and deals with numerical issues such as singular covariances via regularisation.",
    youWillLearn: [
      "Implementing EM in code for full-covariance GMMs",
      "Training class-conditional GMMs and using them for classification",
      "Visualising decision boundaries of density-based classifiers",
      "Detecting and fixing covariance singularities with diagonal jitter",
    ],
    mainContent: [
      {
        heading: "EM Implementation for 2D GMMs",
        body:
          "You implement EM for 2D GMMs, carefully managing matrix operations for covariance updates and log-likelihood computation. Monitoring log-likelihood across iterations provides a sanity check that each EM step improves or maintains the objective.",
      },
      {
        heading: "Vowel Classification via GMMs",
        body:
          "By fitting separate GMMs to different vowel classes in F1–F2 space, you construct a density-based classifier. Visualising the resulting decision regions over a meshgrid shows curved, overlapping boundaries that correspond to the natural acoustical variability of speech, contrasting with the straight boundaries of linear classifiers.",
      },
      {
        heading: "Handling Singularities",
        body:
          "When features are redundant or when too many components are used, EM can produce covariance matrices with extremely small eigenvalues. You detect this via determinants or eigenvalue checks and stabilise training by adding εI to each covariance after updates. This regularisation step is critical in high-dimensional settings and mirrors practices in deep learning (e.g., adding ε in batch normalisation).",
      },
    ],
    examples: [
      {
        title: "Covariance Regularisation Snippet",
        description: "Adding diagonal jitter to covariance matrices.",
        code:
          "eps = 1e-6\nfor k in range(K):\n    # Sigma_k is a 2x2 or dxd covariance\n    eigvals, eigvecs = np.linalg.eigh(Sigma_k)\n    eigvals_clamped = np.clip(eigvals, eps, None)\n    Sigma_k = eigvecs @ np.diag(eigvals_clamped) @ eigvecs.T",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using naïve Gaussian PDFs that underflow in high dimensions",
        why:
          "Multiplying many small densities can underflow to zero in floating point.",
        fix:
          "Work in log-space when computing responsibilities: use log-sum-exp tricks rather than directly multiplying densities.",
      },
      {
        mistake:
          "Stopping EM based only on parameter changes without monitoring log-likelihood",
        why:
          "Parameters may change little but the log-likelihood may still improve (or vice versa).",
        fix:
          "Track both and define a stopping criterion based on relative log-likelihood improvements and a maximum number of iterations.",
      },
    ],
    exercises: [
      {
        question:
          "Run EM with different numbers of components K on the vowel data (e.g., 1, 2, 3, 6) and compare classification accuracy and decision boundaries.",
        answer:
          "With K=1 per class the model resembles a single Gaussian per class and may underfit multi-modal structure. Increasing K improves flexibility and typically accuracy up to a point (e.g., K=3 or 6), after which overfitting or numerical issues may arise. Decision boundaries become more intricate as K increases.",
      },
    ],
    furtherReading: [
      {
        title: "Density Estimation & the EM Algorithm",
        href: "/learn/ml/8/density-estimation-theory",
        type: "internal",
      },
      {
        title: "Pattern Recognition and Machine Learning — Chapter on Mixture Models",
        href: "https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/",
        type: "external",
      },
    ],
  },
};

