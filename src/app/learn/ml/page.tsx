import Link from "next/link";
import { getTopicBySlug, TopicResource } from "@/lib/topics";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Machine Learning — Learn AI & Machine Learning",
  description:
    "A comprehensive journey through core machine learning concepts — regression, classification, clustering, neural networks, deep learning, and more.",
  keywords: [
    "machine learning",
    "regression",
    "classification",
    "neural networks",
    "deep learning",
    "PyTorch",
    "scikit-learn",
  ],
  openGraph: {
    title: "Machine Learning — Learn AI & Machine Learning",
    description:
      "Comprehensive ML learning resources: theory and practice from fundamentals to deep learning.",
    url: "https://gulzhasml.com/learn/ml",
  },
  alternates: { canonical: "https://gulzhasml.com/learn/ml" },
};

function ResourceBadge({ type }: { type: TopicResource["type"] }) {
  const labels: Record<string, string> = {
    theory: "THEORY",
    practice: "PRACTICE",
    notebook: "NOTEBOOK",
    project: "PROJECT",
    tutorial: "TUTORIAL",
    post: "POST",
  };

  const colors: Record<string, string> = {
    theory: "bg-blue-50 text-blue-700 border-blue-200",
    practice: "bg-emerald-50 text-emerald-700 border-emerald-200",
    notebook: "bg-purple-50 text-purple-700 border-purple-200",
    project: "bg-amber-50 text-amber-700 border-amber-200",
    tutorial: "bg-cyan-50 text-cyan-700 border-cyan-200",
    post: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[type] || "bg-gray-50 text-gray-600 border-gray-200"}`}
    >
      {labels[type] || type.toUpperCase()}
    </span>
  );
}

export default function MLPage() {
  const topic = getTopicBySlug("ml");
  if (!topic || !topic.sections) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={topic.icon}
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              {topic.title}
            </h1>
          </div>
        </div>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {topic.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          Summary
        </h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {topic.overview}
          </p>
        </div>
      </div>

      {/* Topics & Practice — All Weeks */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
          Topics & Practice
        </h2>
        <div className="space-y-4">
          {topic.sections.map((section) => (
            <Link
              key={section.week}
              href={`/learn/ml/${section.week}`}
              className="block rounded-xl border border-[var(--color-border)] bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-[var(--color-accent)] transition-all group"
            >
              {/* Card Header */}
              <div className="px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] group-hover:bg-[var(--color-accent-light)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white bg-[var(--color-accent)] px-2.5 py-1 rounded-md">
                      {section.week}
                    </span>
                    <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <svg
                    className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4">
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3 line-clamp-2">
                  {section.summary}
                </p>

                {/* Resource Badges */}
                <div className="flex flex-wrap gap-2">
                  {section.resources.map((resource, i) => (
                    <ResourceBadge key={i} type={resource.type} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
