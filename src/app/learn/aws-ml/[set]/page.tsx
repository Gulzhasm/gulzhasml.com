import Link from "next/link";
import { notFound } from "next/navigation";
import { practiceSets, getQuestionsForSet } from "@/content/learn/aws-ml/questions";
import { ExamQuestionCard } from "@/components/ExamQuestionCard";

export function generateStaticParams() {
  return practiceSets.map((s) => ({ set: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ set: string }>;
}) {
  const { set } = await params;
  const setId = parseInt(set, 10);
  const practiceSet = practiceSets.find((s) => s.id === setId);
  if (!practiceSet) return {};
  return {
    title: `${practiceSet.title} — AWS ML Specialty Prep`,
    description: practiceSet.description,
  };
}

export default async function PracticeSetPage({
  params,
}: {
  params: Promise<{ set: string }>;
}) {
  const { set } = await params;
  const setId = parseInt(set, 10);
  const practiceSet = practiceSets.find((s) => s.id === setId);
  if (!practiceSet) notFound();

  const questions = getQuestionsForSet(setId);
  const prevSet = practiceSets.find((s) => s.id === setId - 1);
  const nextSet = practiceSets.find((s) => s.id === setId + 1);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn/aws-ml" className="hover:text-[var(--color-accent)]">
          AWS ML Specialty
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">
          {practiceSet.title}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center text-lg font-bold">
            {practiceSet.id}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">
              {practiceSet.title}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              {practiceSet.description}
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="mb-12">
        {questions.map((q) => (
          <ExamQuestionCard key={q.id} question={q} />
        ))}
      </div>

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {prevSet ? (
          <Link
            href={`/learn/aws-ml/${prevSet.id}`}
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
            {prevSet.title}
          </Link>
        ) : (
          <div />
        )}
        {nextSet ? (
          <Link
            href={`/learn/aws-ml/${nextSet.id}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            {nextSet.title}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
