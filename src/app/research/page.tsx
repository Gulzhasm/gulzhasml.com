import Link from "next/link";
import { research } from "@/lib/constants";

export const metadata = {
  title: "MSc Research — AI-Driven Test Case Generation with LLMs",
  description:
    "MSc thesis: hybrid rule-based + LLM approach to test case generation. 92% time reduction, 94.4% acceptance criteria coverage, $0.002 per test case.",
  keywords: [
    "AI test generation research",
    "LLM test automation",
    "MSc AI thesis",
    "hybrid AI approach",
  ],
  openGraph: {
    title: "Research — AI-Driven Test Case Generation",
    description:
      "MSc thesis: hybrid rule-based + LLM test case generation. 92% time reduction, 94.4% coverage.",
    url: "https://gulzhasml.com/research",
    type: "article",
  },
  alternates: { canonical: "https://gulzhasml.com/research" },
};

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Research</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
        Research
      </h1>
      <p className="text-sm text-[var(--color-accent)] mb-10">
        {research.institution} &middot; {research.degree}
      </p>

      {/* Thesis */}
      <div className="mb-10">
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4 leading-snug">
            {research.title}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
            {research.abstract}
          </p>

          {/* Key Findings */}
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
            Key Findings
          </h3>
          <ul className="space-y-2 mb-8">
            {research.findings.map((finding, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)] mt-0.5 shrink-0">&bull;</span>
                {finding}
              </li>
            ))}
          </ul>

          {/* Research Questions */}
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
            Research Questions
          </h3>
          <ul className="space-y-2">
            {research.rqs.map((rq, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent-secondary)] mt-0.5 shrink-0 font-mono text-xs">
                  {`0${i + 1}`}
                </span>
                {rq}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Link to project */}
      <div className="flex gap-4">
        <Link
          href="/projects/ai-test-gen"
          className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg text-sm font-medium transition-colors"
        >
          View Project
        </Link>
        <a
          href="https://github.com/Gulzhasm/ai_test_gen"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg text-sm font-medium transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
