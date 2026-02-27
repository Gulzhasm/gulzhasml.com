import Link from "next/link";
import { siteConfig } from "@/lib/constants";

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
    url: `${siteConfig.url}/projects/ai-test-gen`,
  },
  alternates: { canonical: `${siteConfig.url}/projects/ai-test-gen` },
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
            ai-test-gen is a multi-agent LLM orchestration system for test generation. It reads
            structured requirements (Azure DevOps / Jira), passes them through a hybrid rule-engine
            + LLM pipeline, enforces acceptance-criteria coverage with automated feedback loops,
            and exports deterministic, structured test suites ready for import into ADO Test Plans.
          </p>
          <p>
            Instead of a single prompt, the system decomposes work into specialised stages:
            ingestion and NLP parsing, deterministic rule-based generation, RAG-powered semantic
            matching with ChromaDB, LLM correction with JSON-schema enforcement, coverage
            validation, and finally multi-format export (CSV, JSON, Playwright scripts).
          </p>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">System Architecture</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">01</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">Ingestion &amp; Parsing</span> &mdash;
                Adapters pull stories from Azure DevOps/Jira and normalise them into domain models.
                spaCy-based NLP extracts acceptance criteria, UI surfaces, and feature types.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">02</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">Deterministic Generation</span> &mdash;
                A rule engine with 70+ QA rules expands scenarios, generates structural scaffolds
                (PRE-REQ, launch, close, negative paths), and guarantees minimal quality without
                any LLM calls.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">03</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">RAG: Semantic Matching</span> &mdash;
                ChromaDB stores previous steps as embeddings. For new stories, semantically similar
                steps are retrieved as few-shot context to enforce consistent language and patterns.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">04</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">LLM Correction</span> &mdash;
                A provider-agnostic LLM layer (OpenAI / Gemini / Anthropic / Ollama) refines wording,
                fills edge cases, and produces JSON-structured output that matches a strict schema.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">05</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">Validation &amp; Feedback</span> &mdash;
                Coverage validators check that every acceptance criterion is represented. Gaps trigger
                targeted LLM calls to generate missing tests; quality gates enforce structure,
                forbidden-language rules, and accessibility requirements.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5 shrink-0">06</span>
              <p>
                <span className="text-[var(--color-text)] font-medium">Export &amp; Integration</span> &mdash;
                Final suites are exported to ADO-compatible CSVs, JSON, and Playwright scripts, with
                workflows to upload directly into Azure DevOps Test Plans and other tooling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why this architecture */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Why This Architecture?</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm space-y-3 text-sm text-[var(--color-text-muted)]">
          <p>
            A single LLM prompt can hallucinate steps, miss edge cases, and drift in wording between runs.
            ai-test-gen instead pushes as much as possible into deterministic rules, then uses LLMs only
            where they add real value &mdash; language quality, gap filling, and semantic alignment.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-[var(--color-text)] font-medium">Hybrid rules + LLM</span> keeps 70% of logic deterministic,
              reducing hallucination and giving predictable structure across projects.
            </li>
            <li>
              <span className="text-[var(--color-text)] font-medium">RAG with ChromaDB</span> reuses high-quality reference steps so
              new stories read like they were written by the same senior QA engineer.
            </li>
            <li>
              <span className="text-[var(--color-text)] font-medium">Coverage validation loops</span> ensure every acceptance criterion
              is covered at least once, turning ACs into an explicit quality contract.
            </li>
          </ul>
        </div>
      </div>

      {/* Quick start */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Quick Start (Local)</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm text-sm text-[var(--color-text-muted)] space-y-3">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Clone the repo: <code className="px-1 py-0.5 rounded bg-[var(--color-surface)] text-xs">git clone https://github.com/Gulzhasm/ai_test_gen.git</code></li>
            <li>Create a Python 3.10 venv and install deps: <code className="px-1 py-0.5 rounded bg-[var(--color-surface)] text-xs">pip install -r requirements.txt</code></li>
            <li>Configure <code className="px-1 py-0.5 rounded bg-[var(--color-surface)] text-xs">.env</code> with ADO + LLM keys.</li>
            <li>Run your first generation: <code className="px-1 py-0.5 rounded bg-[var(--color-surface)] text-xs">python workflows.py generate --story-id 123456</code></li>
          </ol>
          <p className="text-xs">
            Full Docker flow, CLI reference, and MCP integration are documented in the project README on GitHub.
          </p>
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
