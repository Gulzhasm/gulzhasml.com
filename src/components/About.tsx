export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">About Gulzhas Mailybayeva</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] mb-10 rounded" />

        <div className="space-y-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
          <p>
            AI/ML Engineer specializing in{" "}
            <span className="text-[var(--color-text)]">
              LLM orchestration, RAG pipelines, and NLP
            </span>
            {" "}— with a systems mindset: evaluation, reproducibility, and production-readiness.
          </p>

          <p>
            I built and actively develop{" "}
            <span className="text-[var(--color-text)]">ai-test-gen</span>, a hybrid
            rule-based + LLM pipeline that generates structured test cases from user stories.
            Evaluated on a production CAD application, it delivers a 92% reduction in authoring time,
            94.4% acceptance criteria coverage, and a 72.9% first-pass structural quality rate at
            ~$0.002 per test case (870 test cases for $1.74 of LLM cost).
          </p>

          <p>
            I&apos;m currently completing an MSc in Computer Science (AI) at{" "}
            <span className="text-[var(--color-text)]">
              Queen Mary University of London
            </span>
            , where my thesis research formalizes the methodology behind ai-test-gen.
          </p>

          <p>
            Before dedicating myself to AI full-time, I spent years building large-scale engineering
            automation in enterprise environments. That experience shaped how I build AI today:
            clean interfaces, measurable outcomes, robust pipelines, and a strong bias toward
            systems that work reliably outside the demo.
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
            ), I publish daily learning notes, Jupyter notebooks, and deep dives on ML, NLP,
            and deep learning — designed as fast refreshers for interviews and practical
            references for building real systems.
          </p>

          <p className="text-[var(--color-text)]">
            Open to: AI/ML Engineer · Applied AI · LLM / RAG Engineer · ML Systems / MLOps (London / Remote)
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Experience", value: "7+ years" },
            { label: "Specialization", value: "AI/ML Engineering (LLMs · RAG · NLP · Evaluation)" },
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
            Engineering Experience
          </h3>
          <div className="space-y-6">
            {[
              {
                role: "AI Automation Engineer (Quality Systems)",
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
