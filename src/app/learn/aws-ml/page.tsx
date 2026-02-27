import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { awsMlBasicsContent } from "@/content/learn/aws-ml/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "AWS ML Specialty — Exam Prep & Architecture Patterns",
  description:
    "End-to-end preparation for the AWS Certified Machine Learning – Specialty exam: domains, AWS architectures, pitfalls, and exam patterns.",
  openGraph: {
    title: "AWS ML Specialty — Exam Prep & Architecture Patterns",
    description:
      "Learn how AWS services and ML fundamentals come together on the AWS ML Specialty exam, with practical design patterns and traps to avoid.",
    url: `${siteConfig.url}/learn/aws-ml`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/aws-ml` },
};

export default function AwsMlPage() {
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
              One-page roadmap for the AWS Certified Machine Learning – Specialty exam.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={awsMlBasicsContent} />
      </div>
    </div>
  );
}

