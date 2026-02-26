import { research } from "@/lib/constants";

export function Research() {
  return (
    <section
      id="research"
      className="py-24 px-6 bg-[var(--color-surface)]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Research</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] mb-10 rounded" />

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-8">
          <p className="text-sm text-[var(--color-accent)] mb-2">
            {research.institution} &middot; {research.degree}
          </p>

          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4 leading-snug">
            {research.title}
          </h3>

          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            {research.abstract}
          </p>

          <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
            Key Findings
          </h4>
          <ul className="space-y-2 mb-8">
            {research.findings.map((finding, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
              >
                <span className="text-[var(--color-accent)] mt-0.5 shrink-0">
                  &bull;
                </span>
                {finding}
              </li>
            ))}
          </ul>

          <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
            Research Questions
          </h4>
          <ul className="space-y-2">
            {research.rqs.map((rq, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
              >
                <span className="text-[var(--color-accent-secondary)] mt-0.5 shrink-0 font-mono text-xs">
                  {`0${i + 1}`}
                </span>
                {rq}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
