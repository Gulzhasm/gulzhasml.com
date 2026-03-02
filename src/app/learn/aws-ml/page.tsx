import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { awsMlBasicsContent } from "@/content/learn/aws-ml/basics";
import { practiceSets } from "@/content/learn/aws-ml/questions";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "AWS ML Specialty — Exam Prep & Architecture Patterns",
  description:
    "End-to-end preparation for the AWS Certified Machine Learning – Specialty exam: domains, AWS architectures, pitfalls, exam patterns, and 368 practice questions.",
  openGraph: {
    title: "AWS ML Specialty — Exam Prep & Architecture Patterns",
    description:
      "Learn how AWS services and ML fundamentals come together on the AWS ML Specialty exam, with practical design patterns and 368 practice questions.",
    url: `${siteConfig.url}/learn/aws-ml`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/aws-ml` },
};

export default function AwsMlPage() {
  const totalQuestions = practiceSets.reduce(
    (acc, s) => acc + s.questionCount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">AWS ML Specialty</span>
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
                d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-9 4v6"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              AWS ML Specialty Prep
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Exam overview, architecture patterns, and {totalQuestions} practice
              questions across {practiceSets.length} sets.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Content */}
      <div className="mb-14">
        <StructuredContentRenderer content={awsMlBasicsContent} />
      </div>

      {/* Practice Sets Grid */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Practice Questions
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">
          {totalQuestions} exam-style questions organised into{" "}
          {practiceSets.length} practice sets. Click any set to start
          practicing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceSets.map((set) => (
            <Link
              key={set.id}
              href={`/learn/aws-ml/${set.id}`}
              className="group border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-accent)] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center text-sm font-bold">
                  {set.id}
                </span>
                <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {set.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] ml-11">
                {set.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
