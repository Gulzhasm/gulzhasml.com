import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicBySlug, getMLSection, TopicResource } from "@/lib/topics";

const allWeeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function generateStaticParams() {
  return allWeeks.map((week) => ({ week: String(week) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const section = getMLSection(Number(week));
  if (!section) return { title: "Not Found" };
  return {
    title: `${section.title} — Machine Learning`,
    description: section.summary.slice(0, 160),
    openGraph: {
      title: `${section.title} — Machine Learning`,
      description: section.summary.slice(0, 160),
      url: `https://gulzhasml.com/learn/ml/${week}`,
    },
    alternates: { canonical: `https://gulzhasml.com/learn/ml/${week}` },
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

export default async function MLWeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week: weekStr } = await params;
  const weekNum = Number(weekStr);
  const section = getMLSection(weekNum);
  const topic = getTopicBySlug("ml");
  if (!section || !topic?.sections) notFound();

  const prevWeek = weekNum > 1 ? weekNum - 1 : null;
  const nextWeek = weekNum < 10 ? weekNum + 1 : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn/ml" className="hover:text-[var(--color-accent)]">
          Machine Learning
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Topic {weekNum}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-bold text-white bg-[var(--color-accent)] px-3 py-1.5 rounded-lg">
            {weekNum}
          </span>
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {section.title}
          </h1>
        </div>
      </div>

      {/* Summary / Report */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          Summary
        </h2>
        <div className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {section.summary}
          </p>
        </div>
      </div>

      {/* Materials */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          Materials
        </h2>
        <div className="space-y-3">
          {section.resources.map((resource, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border border-[var(--color-border)] shadow-sm"
            >
              <div className="flex items-start gap-3">
                <ResourceBadge type={resource.type} />
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-text)] mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {prevWeek ? (
          <Link
            href={`/learn/ml/${prevWeek}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg
              className="w-4 h-4"
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
            {topic.sections.find((s) => s.week === prevWeek)?.title}
          </Link>
        ) : (
          <div />
        )}
        {nextWeek ? (
          <Link
            href={`/learn/ml/${nextWeek}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-right"
          >
            {topic.sections.find((s) => s.week === nextWeek)?.title}
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
            href="/learn/ml"
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Back to overview
          </Link>
        )}
      </div>
    </div>
  );
}
