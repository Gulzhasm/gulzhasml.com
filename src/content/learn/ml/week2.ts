import type { StructuredContent } from "@/lib/structured-content";

export const week2Content: Record<string, StructuredContent> = {
  "probability-foundations": {
    overview:
      "Probability is the language of uncertainty. This chapter builds a rigorous intuition for random variables, events, and Bayes’ theorem, then connects Gaussians, covariance, and correlation directly to how ML models reason about data.",
    youWillLearn: [
      "Core probability concepts: events, conditional probability, independence",
      "Bayes’ theorem and posterior reasoning on realistic examples",
      "Gaussian distributions: parameters, geometry, and why they dominate ML",
      "Covariance and Pearson correlation as measures of linear dependence",
      "Joint, marginal, and conditional distributions and how they relate",
    ],
    mainContent: [
      {
        heading: "Events, Random Variables and Probability",
        body:
          "A random variable X is a quantity whose value is uncertain before we observe it: tomorrow’s temperature, a customer’s spending, the label of an image. An event is a statement about that variable, such as X > 30 or 'this email is spam.' The probability P(A) quantifies how often we expect event A to occur in repeated trials. For ML, we rarely work with only one event: we care about questions like 'what is the probability this email is spam given that it contains the word lottery?' which is precisely a conditional probability.",
      },
      {
        heading: "Bayes’ Theorem: Updating Beliefs",
        body:
          "Bayes’ theorem lets us update prior beliefs in light of new evidence. For events A and B with P(B) > 0, it states P(A | B) = P(B | A) P(A) / P(B). Here P(A) is the prior, P(B | A) is the likelihood, and P(A | B) is the posterior. In a loan-default setting, A might be 'customer will default' and B might be 'customer has a certain credit pattern.' Even if the pattern is highly indicative of default (large P(B | A)), the posterior can still be small if defaults are rare overall (small P(A)). This is the base-rate effect, and misunderstanding it leads many people to overinterpret diagnostic tests and model outputs. In ML terms, most classification models are trying to approximate P(y | x) for some label y and features x; Bayes’ rule links this posterior to class-conditional densities P(x | y).",
      },
      {
        heading: "Gaussian Distributions and Parameters",
        body:
          "The univariate Gaussian (normal) distribution with mean μ and variance σ² has density p(x) = (1 / √(2πσ²)) exp(−(x − μ)² / (2σ²)). Geometrically, μ sets the centre of the bell curve, while σ² controls its spread. In higher dimensions, a Gaussian is specified by a mean vector μ ∈ ℝᵈ and a covariance matrix Σ ∈ ℝ^{d×d}. Contours of constant density are ellipses (or ellipsoids) whose shape is determined by Σ. Many ML algorithms either explicitly assume Gaussian structure (Gaussian Naive Bayes, Gaussian mixture models, LDA) or behave as if the data were locally Gaussian due to the Central Limit Theorem. Understanding how μ and Σ affect the geometry of the distribution is crucial when interpreting learned parameters and diagnostic plots.",
      },
      {
        heading: "Covariance and Pearson Correlation",
        body:
          "Given two scalar random variables X and Y with means μ_X and μ_Y, the covariance is defined as cov(X, Y) = E[(X − μ_X)(Y − μ_Y)]. Empirically we estimate it with (1/n) Σ_i (x_i − x̄)(y_i − ȳ). If X tends to be above its mean when Y is above its mean, the covariance is positive; if X is above its mean when Y is below, it is negative. The issue with raw covariance is its dependence on the units of measurement. Pearson’s correlation coefficient fixes this by normalising with the standard deviations: ρ = cov(X, Y) / (σ_X σ_Y). This yields a dimensionless value in [−1, 1] that measures linear dependence. In ML, correlation analysis is used to detect redundant features and to sanity-check data: very high |ρ| between features may indicate multicollinearity that can destabilise linear models.",
      },
      {
        heading: "Joint, Marginal and Conditional Distributions",
        body:
          "The joint distribution p(x, y) tells you how likely specific pairs (x, y) are. From the joint you can recover marginals and conditionals. The marginal p(x) is obtained by summing or integrating out Y: p(x) = Σ_y p(x, y). The conditional p(y | x) = p(x, y) / p(x) describes how Y behaves when X is fixed. In practice, we often estimate these quantities via histograms or kernel density estimators. For example, in the Iris dataset, the joint over petal length and petal width differs drastically between species, which is why a classifier can separate them. Understanding these relationships at the probability level makes it clear why feature engineering and distribution shifts matter so much.",
      },
    ],
    examples: [
      {
        title: "Loan Default Example with Bayes’ Theorem",
        description:
          "Computing the posterior probability of default given an observed credit pattern.",
        code:
          "prior_default = 0.01\nlikelihood_pattern_given_default = 0.80\nlikelihood_pattern_given_safe = 0.10\n\np_pattern = (\n    likelihood_pattern_given_default * prior_default\n    + likelihood_pattern_given_safe * (1 - prior_default)\n)\nposterior_default = (\n    likelihood_pattern_given_default * prior_default / p_pattern\n)\nprint(f\"P(default | pattern) = {posterior_default:.4f}\")",
      },
      {
        title: "Estimating Covariance and Correlation in NumPy",
        description:
          "Compute empirical covariance and Pearson correlation between two features.",
        code:
          "import numpy as np\n\nx = np.array([1.0, 2.0, 3.0, 4.0])\ny = np.array([1.1, 1.9, 3.2, 3.9])\n\nx_mean, y_mean = x.mean(), y.mean()\n\ncov_xy = np.mean((x - x_mean) * (y - y_mean))\ncor_xy = cov_xy / (x.std(ddof=0) * y.std(ddof=0))\n\nprint(\"cov(x, y) =\", cov_xy)\nprint(\"corr(x, y) =\", cor_xy)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Treating P(A | B) and P(B | A) as interchangeable",
        why:
          "They can differ dramatically when class priors are imbalanced; P(default | pattern) is not the same as P(pattern | default).",
        fix:
          "Always write out Bayes’ theorem explicitly and check which conditional you actually have from data or a model.",
      },
      {
        mistake: "Interpreting correlation as causation",
        why:
          "High |ρ| indicates a strong linear relationship, but a third variable can drive both X and Y.",
        fix:
          "Use correlation for feature screening and diagnostics, but rely on experimental design or causal methods for causal claims.",
      },
      {
        mistake: "Ignoring feature distributions when building models",
        why:
          "Many algorithms implicitly assume certain distributions; heavy tails or multimodality can break these assumptions.",
        fix:
          "Inspect univariate and bivariate plots (histograms, KDEs, scatter plots) for key features before choosing or trusting a model.",
      },
    ],
    exercises: [
      {
        question:
          "In a disease screening test, prevalence is 0.5%, sensitivity is 99%, and specificity is 95%. Compute P(disease | positive test).",
        answer:
          "Let D be disease, T be positive test. P(D) = 0.005, P(T | D) = 0.99, P(T | ¬D) = 1 − specificity = 0.05.\nP(T) = P(T | D)P(D) + P(T | ¬D)P(¬D) = 0.99·0.005 + 0.05·0.995 ≈ 0.05445.\nP(D | T) = P(T | D)P(D) / P(T) ≈ 0.99·0.005 / 0.05445 ≈ 0.0907 (about 9%).",
      },
      {
        question:
          "Explain in words what the covariance between two features represents.",
        answer:
          "Covariance measures how two variables move together relative to their means. A positive covariance means they tend to be above or below their means together; a negative covariance means when one is above its mean the other tends to be below. A value near zero suggests no linear relationship.",
      },
      {
        question:
          "Given a joint distribution p(x, y), describe how to obtain the marginal p(x) and the conditional p(y | x).",
        answer:
          "The marginal is p(x) = Σ_y p(x, y) (or ∫ p(x, y) dy in the continuous case). The conditional is p(y | x) = p(x, y) / p(x) whenever p(x) > 0.",
      },
    ],
    furtherReading: [
      {
        title: "Probability in Practice — Bayes, Gaussians & the Iris Dataset",
        href: "/learn/ml/2/probability-exercises",
        type: "internal",
      },
      {
        title: "scikit-learn: Probability and Statistics Tools",
        href: "https://scikit-learn.org/stable/modules/classes.html#module-sklearn.metrics",
        type: "external",
      },
      {
        title: "CS109 Probability Notes",
        href: "https://cs109.github.io/2015/",
        type: "external",
      },
    ],
  },

  "probability-exercises": {
    overview:
      "This chapter turns probability theory into executable code. You will numerically experiment with Bayes’ theorem, Gaussians, covariance, correlation and distribution visualisation on real datasets such as Iris.",
    youWillLearn: [
      "Implementing Bayes’ theorem numerically and exploring base-rate effects",
      "Plotting and comparing Gaussian PDFs with different means and variances",
      "Computing covariance and Pearson correlation from scratch and via NumPy",
      "Exploring empirical joint and marginal distributions on the Iris dataset",
    ],
    mainContent: [
      {
        heading: "Numerical Bayes and the Base-Rate Fallacy",
        body:
          "When implementing Bayes’ theorem in code, you quickly see how sensitive the posterior P(A | B) is to the prior P(A). In highly imbalanced settings (rare diseases, fraud detection), even very accurate tests can yield a majority of false positives. Simulating this numerically with different priors and likelihoods is an excellent way to build intuition for why model calibration and prior knowledge matter.",
      },
      {
        heading: "Visualising Gaussian Families",
        body:
          "By plotting multiple Gaussian PDFs on the same axes you can visualise how μ and σ² shape the distribution. Keeping μ fixed and varying σ² shows the trade-off between concentration and spread. Keeping σ² fixed and varying μ illustrates how the mode shifts. These plots directly inform how you think about feature distributions and the assumptions behind Gaussian-based models.",
      },
      {
        heading: "Empirical Covariance and Correlation on Iris",
        body:
          "Using the Iris dataset, you can compute the full covariance matrix and correlation matrix across the four standard features. High correlation between petal length and petal width, and much lower correlation between sepal and petal features, highlights which features carry redundant information. Reproducing these matrices with both manual loops and NumPy’s built-ins reinforces your understanding of the formulas.",
      },
      {
        heading: "Approximating Joint and Conditional Distributions",
        body:
          "Two-dimensional histograms (or kernel density estimates) approximate the joint distribution p(x, y). Conditioning on species and slicing these histograms reveals class-conditional structures. For example, p(petal_length | species = virginica) looks very different from p(petal_length | species = setosa). This is exactly why simple linear classifiers can separate these classes effectively.",
      },
    ],
    examples: [
      {
        title: "Plotting Gaussian PDFs",
        description:
          "Overlay several Gaussians with different means and variances.",
        code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-5, 5, 400)\n\ndef gaussian(x, mu, sigma):\n    return 1.0 / (np.sqrt(2 * np.pi) * sigma) * np.exp(-0.5 * ((x - mu) / sigma) ** 2)\n\nplt.plot(x, gaussian(x, 0, 1), label=\"μ=0, σ=1\")\nplt.plot(x, gaussian(x, 0, 2), label=\"μ=0, σ=2\")\nplt.plot(x, gaussian(x, 2, 1), label=\"μ=2, σ=1\")\nplt.legend(); plt.show()",
      },
      {
        title: "Covariance Matrix on Iris",
        description:
          "Compute the covariance matrix of the four Iris features manually.",
        code:
          "from sklearn.datasets import load_iris\nimport numpy as np\n\niris = load_iris()\nX = iris.data  # shape (150, 4)\nX_centered = X - X.mean(axis=0, keepdims=True)\n\nn = X.shape[0]\nSigma = (X_centered.T @ X_centered) / n\nprint(\"Covariance matrix:\\n\", Sigma)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using population vs sample formulas interchangeably",
        why:
          "The difference between dividing by n and (n − 1) matters for small samples and affects the bias of your estimator.",
        fix:
          "Be explicit about whether you want population or sample estimates; NumPy and pandas expose both via ddof.",
      },
      {
        mistake: "Interpreting noisy empirical histograms as exact distributions",
        why:
          "Finite samples and binning choices can create artefacts, especially in tails or sparse regions.",
        fix:
          "Use multiple bin sizes, consider kernel density estimation, and always interpret empirical plots with uncertainty in mind.",
      },
    ],
    exercises: [
      {
        question:
          "Simulate 10,000 samples from two different Gaussians and empirically verify that the sample mean and variance converge to the true parameters.",
        answer:
          "Generate samples with np.random.normal, compute sample means and variances for increasing sample sizes (e.g., 100, 1000, 10000) and observe convergence numerically and via plots. The Law of Large Numbers guarantees this behaviour.",
      },
      {
        question:
          "On the Iris dataset, which pair of features has the highest absolute Pearson correlation and what does that imply for feature engineering?",
        answer:
          "Typically petal length and petal width exhibit the highest |ρ|. This implies that one of them may be redundant in some models, or that combining them via a ratio or interaction term could be informative.",
      },
    ],
    furtherReading: [
      {
        title: "Probability Theory — The Language of Uncertainty",
        href: "/learn/ml/2/probability-foundations",
        type: "internal",
      },
      {
        title: "NumPy Random Sampling",
        href: "https://numpy.org/doc/stable/reference/random/index.html",
        type: "external",
      },
      {
        title: "Visualizing Data with Matplotlib",
        href: "https://matplotlib.org/stable/tutorials/introductory/sample_plots.html",
        type: "external",
      },
    ],
  },
};

