import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicBySlug, getMLSection, getMLResource, TopicResource } from "@/lib/topics";

export function generateStaticParams() {
  const ml = getTopicBySlug("ml");
  if (!ml?.sections) return [];
  const params: { week: string; rid: string }[] = [];
  for (const section of ml.sections) {
    for (const resource of section.resources) {
      params.push({ week: String(section.week), rid: resource.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string; rid: string }>;
}) {
  const { week, rid } = await params;
  const resource = getMLResource(Number(week), rid);
  if (!resource) return { title: "Not Found" };
  return {
    title: `${resource.title} — Machine Learning`,
    description: resource.description,
    openGraph: {
      title: `${resource.title} — Machine Learning`,
      description: resource.description,
      url: `https://gulzhasml.com/learn/ml/${week}/${rid}`,
    },
    alternates: { canonical: `https://gulzhasml.com/learn/ml/${week}/${rid}` },
  };
}

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

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ week: string; rid: string }>;
}) {
  const { week: weekStr, rid } = await params;
  const weekNum = Number(weekStr);
  const section = getMLSection(weekNum);
  const resource = getMLResource(weekNum, rid);
  if (!section || !resource) notFound();

  const resources = section.resources;
  const currentIndex = resources.findIndex((r) => r.slug === rid);
  const prevResource = currentIndex > 0 ? resources[currentIndex - 1] : null;
  const nextResource =
    currentIndex < resources.length - 1 ? resources[currentIndex + 1] : null;

  const paragraphs = resource.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 flex-wrap">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn/ml" className="hover:text-[var(--color-accent)]">
          Machine Learning
        </Link>
        <span>/</span>
        <Link
          href={`/learn/ml/${weekNum}`}
          className="hover:text-[var(--color-accent)]"
        >
          {section.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{resource.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <ResourceBadge type={resource.type} />
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {resource.title}
          </h1>
        </div>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
          {resource.description}
        </p>
      </div>

      {/* Content */}
      <div className="mb-10">
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[var(--color-text-muted)] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {prevResource ? (
          <Link
            href={`/learn/ml/${weekNum}/${prevResource.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {prevResource.title}
          </Link>
        ) : (
          <Link
            href={`/learn/ml/${weekNum}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {section.title}
          </Link>
        )}
        {nextResource ? (
          <Link
            href={`/learn/ml/${weekNum}/${nextResource.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-right"
          >
            {nextResource.title}
            <svg
              className="w-4 h-4 shrink-0"
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
          </Link>
        ) : (
          <Link
            href={`/learn/ml/${weekNum}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Back to {section.title}
          </Link>
        )}
      </div>
    </div>
  );
}
