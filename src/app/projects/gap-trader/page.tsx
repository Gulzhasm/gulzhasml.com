import Link from "next/link";

export const metadata = {
  title: "gap-trader | gulzhas.ml",
  description: "AI-Powered Stock Trading Assistant",
};

export default function GapTraderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-[var(--color-accent)]">Projects</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">gap-trader</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-1">
        gap-trader
      </h1>
      <p className="text-lg text-[var(--color-accent)] mb-6">
        AI-Powered Stock Trading Assistant
      </p>

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Overview</h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm space-y-4 text-[var(--color-text-muted)] leading-relaxed">
          <p>
            A gap trading assistant that scans for market gaps, manages watchlists,
            logs trades, and tracks performance. Built with Flask, SQLAlchemy, and
            real-time market data from yfinance and Finnhub.
          </p>
          <p>
            The application identifies gap-up and gap-down opportunities in the market,
            provides real-time price monitoring, and helps track trading performance
            with detailed analytics and chart visualizations.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Gap Scanner", desc: "Automated scanning for market gap opportunities" },
            { title: "Watchlist", desc: "Personal watchlist with real-time price updates" },
            { title: "Trade Logger", desc: "Log trades with entry/exit points and P&L" },
            { title: "Performance Analytics", desc: "Charts and metrics for trading performance" },
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
