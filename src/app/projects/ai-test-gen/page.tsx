import Link from "next/link";

export const metadata = {
  title: "ai-test-gen — AI-Powered Test Case Generation with LLM",
  description:
    "Hybrid rule-based + LLM pipeline generating test cases from user stories. 92% time reduction, $0.002/test case. Built with Python, Gemini 2.5 Flash, ChromaDB, and spaCy.",
  keywords: [
    "AI test generation",
    "LLM test automation",
    "automated test cases",
    "Gemini AI",
    "ChromaDB",
    "spaCy NLP",
    "Azure DevOps",
  ],
  openGraph: {
    title: "ai-test-gen — AI-Powered Test Case Generation",
    description:
      "Hybrid rule-based + LLM pipeline: 92% time reduction, $0.002 per test case. Python, Gemini, ChromaDB, spaCy.",
    url: "https://gulzhasml.com/projects/ai-test-gen",
  },
  alternates: { canonical: "https://gulzhasml.com/projects/ai-test-gen" },
};

export default function AiTestGenPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-[var(--color-accent)]">Projects</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">ai-test-gen</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-1">
        ai-test-gen
      </h1>
      <p className="text-lg text-[var(--color-accent)] mb-6">
        AI-Powered Test Case Generation Framework
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Time Saved", value: "92%" },
          { label: "Cost/TC", value: "$0.002" },
          { label: "Test Cases", value: "207" },
          { label: "Quality", value: "73% first-pass" },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm text-center">
            <p className="text-2xl font-bold text-[var(--color-accent)]">{m.value}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Overview</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm space-y-4 text-[var(--color-text-muted)] leading-relaxed">
          <p>
            A hybrid rule-based + LLM pipeline that generates structured manual test cases
            from Azure DevOps user stories. Combines deterministic scaffolding with
            Gemini 2.5 Flash for natural-language enrichment, ChromaDB for semantic step
            matching, and automated upload to ADO Test Plans.
          </p>
          <p>
            The system first extracts acceptance criteria and UI elements from user stories
            using spaCy NLP, then applies rule-based templates for deterministic structure.
            The LLM enriches test steps with natural language and handles edge cases. ChromaDB
            provides semantic similarity matching to maintain consistent wording across
            related test cases.
          </p>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Architecture</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">01</span>
              <p><span className="text-[var(--color-text)] font-medium">Input</span> &mdash; Azure DevOps user story with acceptance criteria</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">02</span>
              <p><span className="text-[var(--color-text)] font-medium">NLP Extraction</span> &mdash; spaCy extracts entities, actions, UI elements</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">03</span>
              <p><span className="text-[var(--color-text)] font-medium">Rule-Based Scaffold</span> &mdash; Deterministic templates generate test structure</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">04</span>
              <p><span className="text-[var(--color-text)] font-medium">Semantic Matching</span> &mdash; ChromaDB finds similar existing steps for consistency</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">05</span>
              <p><span className="text-[var(--color-text)] font-medium">LLM Enrichment</span> &mdash; Gemini 2.5 Flash refines language and adds edge cases</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">06</span>
              <p><span className="text-[var(--color-text)] font-medium">Output</span> &mdash; Structured CSV + automated upload to ADO Test Plans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Python", "Gemini 2.5 Flash", "ChromaDB", "spaCy",
            "Azure DevOps API", "Clean Architecture", "Docker",
            "MCP Server", "python-docx",
          ].map((t) => (
            <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4">
        <a
          href="https://github.com/Gulzhasm/ai_test_gen"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg text-sm font-medium transition-colors"
        >
          View on GitHub
        </a>
        <Link
          href="/research"
          className="px-6 py-2.5 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg text-sm font-medium transition-colors"
        >
          Read Research
        </Link>
      </div>
    </div>
  );
}
