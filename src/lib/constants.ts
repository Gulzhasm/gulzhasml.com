export const siteConfig = {
  name: "Gulzhas Mailybayeva",
  title: "AI/ML Engineer | LLMs, RAG, NLP",
  tagline: "AI/ML Engineer building LLM + RAG systems for reliable software quality (ex-Senior SDET).",
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
      "A hybrid rule-based + LLM pipeline that generates structured manual test cases from Azure DevOps user stories. Combines deterministic scaffolding with Gemini 2.5 Flash for natural-language enrichment, ChromaDB for semantic step matching, and automated upload to ADO Test Plans.",
    metrics: [
      { label: "Time Saved", value: "92%" },
      { label: "Cost/TC", value: "$0.002" },
      { label: "Test Cases", value: "207" },
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
    title: "gap-trader",
    subtitle: "AI-Powered Stock Trading Assistant",
    description:
      "A gap trading assistant that scans for market gaps, manages watchlists, logs trades, and tracks performance. Built with Flask, SQLAlchemy, and real-time market data from yfinance and Finnhub.",
    metrics: [
      { label: "Stack", value: "Flask + ML" },
      { label: "Data", value: "Real-time" },
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
    "LLM cost is negligible ($0.48 for 207 test cases) -- human review is the real cost",
  ],
  rqs: [
    "RQ1: Does hybrid generation reduce time vs manual?",
    "RQ2: What is the first-pass structural quality rate?",
    "RQ3: What are the dominant failure modes?",
    "RQ4: How does hybrid compare to pure LLM approaches?",
  ],
};
