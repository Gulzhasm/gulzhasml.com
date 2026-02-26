import Link from "next/link";
import { projects } from "@/lib/constants";

export const metadata = {
  title: "AI & Machine Learning Projects",
  description:
    "AI/ML projects: LLM-powered test case generation, stock trading assistant, RAG pipelines. Built with Python, Gemini, ChromaDB, spaCy, and more.",
  openGraph: {
    title: "AI & Machine Learning Projects — Gulzhas Mailybayeva",
    description:
      "AI/ML projects featuring LLM pipelines, RAG systems, and intelligent automation.",
    url: "https://gulzhasml.com/projects",
  },
  alternates: { canonical: "https://gulzhasml.com/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Projects</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
        Projects
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-10">
        AI-powered engineering tools and applications.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={`/projects/${project.title}`}
            className="block p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)]">
                  {project.title}
                </h2>
                <p className="text-sm text-[var(--color-accent)]">
                  {project.subtitle}
                </p>
              </div>
              {project.featured && (
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium">
                  Featured
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              {project.description}
            </p>

            {project.metrics.length > 0 && (
              <div className="flex gap-6 mb-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-lg font-bold text-[var(--color-accent)]">
                      {metric.value}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
