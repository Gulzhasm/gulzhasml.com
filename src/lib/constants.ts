export const siteConfig = {
  name: "Gulzhas Mailybayeva",
  title: "AI/ML Engineer | LLMs, RAG, NLP",
  tagline:
    "I build and ship LLM-powered systems. I developed ai-test-gen -- a hybrid rule-based + LLM pipeline for test case generation that I actively maintain -- and a trading app (ai-gap-trading-forecaster) I use as an adversarial UI testbed.",
  description:
    "AI/ML Engineer specializing in LLM orchestration, RAG pipelines, and NLP. 7+ years of production engineering experience.",
  url: "https://gulzhasml.com",
  github: "https://github.com/Gulzhasm",
  linkedin: "https://www.linkedin.com/in/gulzhas-mailybayeva",
  email: "gulzhasm@gmail.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    title: "ai-test-gen",
    subtitle: "AI-Powered Test Case Generation Framework",
    description:
      "A multi-agent, hybrid rule-based + LLM orchestration system that generates structured manual test cases from Azure DevOps user stories. Deterministic scaffolding handles structure, while Gemini-powered LLM correction and ChromaDB RAG enforce high-quality, consistent steps with automated upload to ADO Test Plans.",
    metrics: [
      { label: "Time Saved", value: "92%" },
      { label: "Cost/TC", value: "$0.002" },
      { label: "Test Cases", value: "870" },
      { label: "Quality", value: "73% first-pass" },
    ],
    tech: [
      "Python",
      "Gemini 2.5 Flash",
      "ChromaDB",
      "spaCy",
      "Azure DevOps API",
      "Clean Architecture",
      "Docker",
    ],
    github: "https://github.com/Gulzhasm/ai_test_gen",
    featured: true,
  },
  {
    title: "ai-gap-trading-forecaster",
    subtitle: "RL Forecasting Engine & Adversarial UI Testbed",
    description:
      "A time-series trading application powered by RL-style decision logic and forecasting that doubles as an adversarial UI testbed. The frontend is intentionally volatile (mutating DOM, shifting locators) to create a realistic, hostile environment for validating the self-healing Playwright locators and LLM+RAG test generation pipeline in ai-test-gen.",
    metrics: [
      { label: "Role", value: "Adversarial UI" },
      { label: "Domain", value: "Trading" },
    ],
    tech: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "yfinance",
      "Chart.js",
      "Interactive Brokers",
    ],
    github: "https://github.com/Gulzhasm/gap-trader",
    featured: false,
  },
];

export const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C#", "TypeScript", "SQL"],
  },
  {
    category: "AI / ML",
    skills: [
      "LLM Orchestration (OpenAI / Gemini / Anthropic)",
      "RAG & Vector Search (ChromaDB)",
      "Embeddings",
      "Prompt Engineering",
      "NLP (spaCy)",
      "Evaluation & Metrics",
    ],
  },
  {
    category: "Test & Quality Engineering",
    skills: [
      "Playwright",
      "Selenium",
      "Appium",
      "RestAssured",
      "WireMock",
      "Cucumber / BDD",
      "JUnit / TestNG / NUnit",
    ],
  },
  {
    category: "Infra & Delivery",
    skills: [
      "Docker",
      "Azure DevOps / Pipelines",
      "Jenkins",
      "Git",
      "Spring Boot",
      "Flask",
      "MongoDB",
      "Oracle / MySQL",
    ],
  },
];

export const research = {
  title:
    "AI-Driven Test Case Generation: A Hybrid Approach Combining Rule-Based Systems with Large Language Models",
  institution: "Queen Mary University of London",
  degree: "MSc (in progress)",
  abstract:
    "This thesis investigates a hybrid approach to automated test case generation that combines deterministic rule-based scaffolding with Large Language Model correction. Evaluated on a production CAD application (55 user stories, 870 test cases), the system achieved 92% time reduction, $0.002 per test case, and 94.4% acceptance criteria coverage.",
  findings: [
    "92% reduction in test creation time vs fully manual methods",
    "First-pass quality rate of 72.9% (95% CI: 58.4%--84.3%)",
    "Dominant failure mode: non-deterministic language in error-handling tests (38.9%)",
    "Hybrid approach provides structural guarantees that pure LLM methods lack",
    "LLM cost is negligible ($1.74 for 870 test cases) -- human review is the real cost",
  ],
  rqs: [
    "RQ1: Does hybrid generation reduce time vs manual?",
    "RQ2: What is the first-pass structural quality rate?",
    "RQ3: What are the dominant failure modes?",
    "RQ4: How does hybrid compare to pure LLM approaches?",
  ],
};
