import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicBySlug, getConversationalSection, getConversationalResource, TopicResource } from "@/lib/topics";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  const topic = getTopicBySlug("conversational");
  if (!topic?.sections) return [];
  const params: { week: string; rid: string }[] = [];
  for (const section of topic.sections) {
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
  const resource = getConversationalResource(Number(week), rid);
  if (!resource) return { title: "Not Found" };
  return {
    title: `${resource.title} — Conversational Agents`,
    description: resource.description,
    openGraph: {
      title: `${resource.title} — Conversational Agents`,
      description: resource.description,
      url: `${siteConfig.url}/learn/conversational/${week}/${rid}`,
    },
    alternates: { canonical: `${siteConfig.url}/learn/conversational/${week}/${rid}` },
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

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-[13px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function ConversationalResourcePage({
  params,
}: {
  params: Promise<{ week: string; rid: string }>;
}) {
  const { week: weekStr, rid } = await params;
  const weekNum = Number(weekStr);
  const section = getConversationalSection(weekNum);
  const resource = getConversationalResource(weekNum, rid);
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
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 flex-wrap">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn/conversational" className="hover:text-[var(--color-accent)]">
          Conversational Agents
        </Link>
        <span>/</span>
        <Link
          href={`/learn/conversational/${weekNum}`}
          className="hover:text-[var(--color-accent)]"
        >
          {section.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{resource.title}</span>
      </nav>

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

        {section.lecturePdfUrl && (
          <a
            href={section.lecturePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 mr-3 px-4 py-2 rounded-lg bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-medium hover:bg-[var(--color-accent-light)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {section.lectureTitle ?? "Lecture (PDF)"}
          </a>
        )}
        {resource.notebookUrl && (
          <a
            href={resource.notebookUrl}
            download
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Notebook (.ipynb)
          </a>
        )}
      </div>

      <div className="mb-10">
        <div className="p-8 rounded-xl bg-white border border-[var(--color-border)] shadow-sm">
          <article className="space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-[var(--color-text-secondary)] leading-[1.8] text-[15px]"
              >
                {renderInlineCode(paragraph)}
              </p>
            ))}
          </article>
        </div>
      </div>

      {resources.length > 1 && (
        <div className="mb-10 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
            Related Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {resources
              .filter((r) => r.slug !== rid)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/learn/conversational/${weekNum}/${r.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {r.title}
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {prevResource ? (
          <Link
            href={`/learn/conversational/${weekNum}/${prevResource.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {prevResource.title}
          </Link>
        ) : (
          <Link
            href={`/learn/conversational/${weekNum}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {section.title}
          </Link>
        )}
        {nextResource ? (
          <Link
            href={`/learn/conversational/${weekNum}/${nextResource.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-right"
          >
            {nextResource.title}
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/learn/conversational/${weekNum}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Back to {section.title}
          </Link>
        )}
      </div>
    </div>
  );
}
