export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  mediumUrl?: string;
  readTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "hybrid-test-generation",
    title: "How I Built a Hybrid Rule-Based + LLM Test Generation Pipeline",
    date: "2026-02-15",
    excerpt:
      "870 test cases, $0.002 each, 92% time saved. A deep dive into combining deterministic scaffolding with Gemini 2.5 Flash for automated test case generation from user stories.",
    tags: ["AI", "Test Automation", "LLM", "Engineering"],
    readTime: "8 min",
  },
  {
    slug: "java-to-python-ai",
    title: "From 10 Years of Java to Python for AI: What Actually Transfers",
    date: "2026-02-20",
    excerpt:
      "After a decade of Java enterprise development, here's what carried over to Python ML/AI work -- and what I had to completely relearn.",
    tags: ["Python", "Java", "Career", "AI"],
    readTime: "6 min",
  },
];
