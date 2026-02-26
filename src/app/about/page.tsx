import Link from "next/link";
import { siteConfig, skillCategories } from "@/lib/constants";

export const metadata = {
  title: "About Gulzhas Mailybayeva — AI/ML Engineer, NLP & Test Automation",
  description:
    "7+ years in QA/SDET, now building AI systems. Specializing in machine learning, NLP, LLM orchestration, and RAG pipelines. MSc AI at Queen Mary University of London.",
  openGraph: {
    title: "About Gulzhas Mailybayeva — AI/ML Engineer",
    description:
      "7+ years in QA/SDET, now building AI systems. Machine learning, NLP, LLM orchestration. MSc AI at QMUL.",
    url: "https://gulzhasml.com/about",
  },
  alternates: { canonical: "https://gulzhasml.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">About</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
        About
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-10">
        {siteConfig.title}
      </p>

      {/* Bio */}
      <div className="mb-10 space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Senior SDET with 7+ years of experience building robust test
          frameworks in Java and C#. Most recently at{" "}
          <a
            href="https://www.kandasoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            KandaSoft
          </a>
          , where I led automation across 5 squads, achieved 98% test
          coverage, and built E2E frameworks with Playwright and WireMock.
        </p>
        <p>
          Now transitioning into{" "}
          <span className="text-[var(--color-text)] font-medium">AI/ML Engineering</span>,
          pursuing an MSc in Computer Science (AI) at{" "}
          <span className="text-[var(--color-text)] font-medium">Queen Mary University of London</span>.
          My thesis research combines deterministic rule-based systems with Large Language Models
          to automate test case generation from user stories -- bridging QA engineering with applied AI.
        </p>
        <p>
          Previously built BDD frameworks at{" "}
          <span className="text-[var(--color-text)] font-medium">JPMorgan Chase</span>,
          and established automation strategies at U.S. Bank and Swift Prepaid Solutions.
          My goal: leverage deep QA domain expertise with modern AI/MLOps to build
          intelligent engineering systems.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Experience", value: "7+ years" },
          { label: "Focus", value: "AI/ML Engineering" },
          { label: "Education", value: "MSc AI, QMUL" },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
            <p className="text-sm text-[var(--color-text-muted)]">{item.label}</p>
            <p className="text-lg font-semibold text-[var(--color-text)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">Experience</h2>
        <div className="space-y-5">
          {[
            {
              role: "Senior SDET / AI Engineer",
              company: "KandaSoft",
              period: "2022 -- Present",
              highlight: "Led automation across 5 squads, 98% test coverage, built hybrid AI test generation pipeline (rule-based + LLM), ChromaDB RAG, ADO integration",
            },
            {
              role: "QA Automation Lead",
              company: "JPMorgan Chase & Co.",
              period: "2019 -- 2021",
              highlight: "Migrated 300+ test cases to BDD Cucumber, reduced PVT execution time by 80%",
            },
            {
              role: "Senior QA / QA Engineer",
              company: "Swift Prepaid Solutions / U.S. Bank",
              period: "2017 -- 2019",
              highlight: "Built automation frameworks from scratch, enhanced testing efficiency by 80%",
            },
          ].map((exp) => (
            <div key={exp.company} className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
              <div>
                <p className="font-semibold text-[var(--color-text)]">{exp.role}</p>
                <p className="text-sm text-[var(--color-accent)]">
                  {exp.company} &middot; {exp.period}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{exp.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="p-5 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-3">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Oracle Certified Professional Java SE 8",
            "AWS AI Practitioner",
            "Azure AI Fundamentals",
            "Azure Data Fundamentals",
          ].map((cert) => (
            <span key={cert} className="text-sm px-4 py-2 rounded-lg bg-white border border-[var(--color-border)] shadow-sm text-[var(--color-text-muted)]">
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Get in Touch</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          Interested in AI-powered engineering solutions, collaboration, or just want to connect?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg text-sm font-medium transition-colors text-center"
          >
            Send Email
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg text-sm font-medium transition-colors text-center"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg text-sm font-medium transition-colors text-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
