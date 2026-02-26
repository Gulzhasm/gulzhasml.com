import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, getTopicBySlug } from "@/lib/topics";

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Not Found" };
  return {
    title: `${topic.title} — Learn AI & Machine Learning`,
    description: `${topic.description} Part of gulzhas.ml learning resources on AI, machine learning, and NLP.`,
    keywords: [...topic.tags, "machine learning", "AI", "learn", topic.title],
    openGraph: {
      title: `${topic.title} — Learn AI & Machine Learning`,
      description: topic.description,
      url: `https://gulzhasml.com/learn/${slug}`,
    },
    alternates: { canonical: `https://gulzhasml.com/learn/${slug}` },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

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

      {/* Overview */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          Overview
        </h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {topic.overview}
          </p>
        </div>
      </div>

      {/* Resources */}
      {topic.resources.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Content & Resources
          </h2>
          <div className="space-y-3">
            {topic.resources.map((resource, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--color-accent)]">
                    {resource.type === "lab"
                      ? "LAB"
                      : resource.type === "lecture"
                        ? "LEC"
                        : resource.type === "notebook"
                          ? "NB"
                          : resource.type === "tutorial"
                            ? "TUT"
                            : resource.type === "project"
                              ? "PRJ"
                              : "POST"}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-[var(--color-text)]">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {resource.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-10 p-8 rounded-xl border-2 border-dashed border-[var(--color-border)] text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[var(--color-text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="font-medium text-[var(--color-text)] mb-1">
            Content Coming Soon
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Tutorials, notebooks, and learning materials will be added as I
            progress through this topic.
          </p>
        </div>
      )}
    </div>
  );
}
