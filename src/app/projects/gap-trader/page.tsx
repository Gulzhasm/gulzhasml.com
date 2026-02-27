import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "ai-gap-trading-forecaster — RL Forecasting Engine & Adversarial UI Testbed",
  description:
    "Reinforcement learning–style forecasting engine and adversarial UI testbed. A dual-purpose trading app that surfaces price gaps while generating a volatile frontend to stress-test self-healing LLM-driven test automation.",
  openGraph: {
    title: "ai-gap-trading-forecaster — RL Forecasting Engine & Adversarial UI Testbed",
    description:
      "A time-series trading application with RL-style decision logic that doubles as an adversarial UI environment to validate the ai-test-gen self-healing test automation pipeline.",
    url: `${siteConfig.url}/projects/gap-trader`,
  },
  alternates: { canonical: `${siteConfig.url}/projects/gap-trader` },
};

export default function GapTraderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-[var(--color-accent)]">Projects</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">ai-gap-trading-forecaster</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-1">
        ai-gap-trading-forecaster
      </h1>
      <p className="text-lg text-[var(--color-accent)] mb-6">
        RL Forecasting Engine & Adversarial UI Testbed
      </p>

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Overview</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm space-y-4 text-[var(--color-text-muted)] leading-relaxed">
          <p>
            gap-trader is a dual-purpose engineering project that bridges financial
            time-series forecasting with ML-powered quality systems. On the surface,
            it is a gap trading assistant that scans for price gaps, manages watchlists,
            and tracks trades over time.
          </p>
          <p>
            Beneath the surface, it functions as an <span className="font-medium text-[var(--color-text)]">Adversarial UI Testbed</span>.
            The frontend is intentionally volatile — DOM structures, CSS classes, and
            component hierarchies are designed to mutate over time. This controlled
            chaos simulates the kind of UI drift seen in fast-moving product teams and
            provides a realistic environment to train and validate the self-healing
            Playwright locators and LLM+RAG test generation pipeline implemented in
            <Link href="/projects/ai-test-gen" className="text-[var(--color-accent)] hover:underline ml-1">
              ai-test-gen
            </Link>.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Core Objectives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Time-Series Gap Forecasting",
              desc: "Scan for gap-up / gap-down patterns and experiment with RL-style decision policies over financial time-series.",
            },
            {
              title: "Adversarial DOM Mutation",
              desc: "Programmatically shift locators, component hierarchies, and CSS classes to simulate UI drift in real products.",
            },
            {
              title: "ML Pipeline Validation",
              desc: "Provide a closed-loop environment to measure recovery rate, latency, and stability of the ai-test-gen self-healing test suite.",
            },
            {
              title: "Human-in-the-Loop Trading Sandbox",
              desc: "Allow manual oversight of RL-style signals while capturing rich telemetry for both trading and QA experiments.",
            },
          ].map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
              <h3 className="font-medium text-[var(--color-text)] mb-1">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Python", "Flask", "SQLAlchemy", "yfinance", "Chart.js", "Interactive Brokers"].map((t) => (
            <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      <a
        href="https://github.com/Gulzhasm/gap-trader"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg text-sm font-medium transition-colors inline-block"
      >
        View on GitHub
      </a>
    </div>
  );
}
