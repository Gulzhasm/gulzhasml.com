export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">About</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] mb-10 rounded" />

        <div className="space-y-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
          <p>
            I build reliable AI systems —{" "}
            <span className="text-[var(--color-text)]">
              LLM orchestration, RAG pipelines, and NLP
            </span>
            {" "}— grounded in real engineering rigor.
            I&apos;m currently completing an MSc in Computer Science (AI) at{" "}
            <span className="text-[var(--color-text)]">
              Queen Mary University of London
            </span>
            , where my thesis produced a hybrid rule-based + LLM pipeline that generates
            structured test cases with 92% time reduction at ~$0.002 per test case.
          </p>

          <p>
            Before moving into AI full-time, I spent 7+ years designing production-grade
            test infrastructure across finance and enterprise teams. That background shapes
            how I work today: reproducible pipelines, measurable outcomes, clean architecture,
            and a bias toward systems that hold up in CI/CD — not just demos.
          </p>

          <p>
            On this site (and on{" "}
            <a
              href="https://medium.com/@gulzhasm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              Medium
            </a>
            ), I publish learning notes, Jupyter notebooks, and practical deep-dives
            on ML, NLP, and deep learning — so I can refresh fast before interviews and
            help others build the same fundamentals. My goal is simple: ship production-ready
            AI — then document the path.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Experience", value: "7+ years" },
            { label: "Focus", value: "AI/ML Engineering (LLMs · RAG · NLP · Evaluation)" },
            { label: "Education", value: "MSc Computer Science (AI), QMUL" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <p className="text-sm text-[var(--color-text-muted)]">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
            Experience
          </h3>
          <div className="space-y-6">
            {[
              {
                role: "AI Engineer / Senior SDET",
                company: "KandaSoft",
                period: "2022 -- Present",
                highlight:
                  "Built a hybrid AI test-generation pipeline (rule-based + LLM) with RAG (ChromaDB) and Azure DevOps integration. Led automation across 5 squads; designed evaluation metrics, prompt contracts, and structured outputs for deterministic test-case generation",
              },
              {
                role: "QA Automation Lead",
                company: "JPMorgan Chase & Co.",
                period: "2019 -- 2021",
                highlight:
                  "Migrated 300+ end-to-end tests to BDD Cucumber; reduced PVT execution time by 80%. Built reusable automation components and framework structure; led migration strategy",
              },
              {
                role: "Senior QA / QA Engineer",
                company: "Swift Prepaid Solutions / U.S. Bank",
                period: "2017 -- 2019",
                highlight:
                  "Built automation frameworks from scratch; improved testing efficiency by ~80%. Owned end-to-end quality lifecycle across UI/API/backend systems",
              },
            ].map((exp) => (
              <div
                key={exp.company}
                className="flex gap-4 items-start group"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0 group-first:ring-4 group-first:ring-[var(--color-accent)]/20" />
                <div>
                  <p className="font-semibold text-[var(--color-text)]">
                    {exp.role}
                  </p>
                  <p className="text-sm text-[var(--color-accent)]">
                    {exp.company} &middot; {exp.period}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {exp.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Oracle Certified Professional Java SE 8",
              "AWS AI Practitioner",
              "Azure AI Fundamentals",
              "Azure Data Fundamentals",
            ].map((cert) => (
              <span
                key={cert}
                className="text-sm px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
