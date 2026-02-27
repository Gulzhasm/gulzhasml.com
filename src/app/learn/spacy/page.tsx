import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { spacyBasicsContent } from "@/content/learn/spacy/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "spaCy — Production-Grade NLP Pipelines",
  description:
    "Learn how spaCy's pipeline, Doc/Token/Span objects, and custom components let you build robust NLP systems.",
  openGraph: {
    title: "spaCy — Production-Grade NLP Pipelines",
    description:
      "Deep dive into spaCy: pipelines, linguistic annotations, pattern matching, and custom components.",
    url: `${siteConfig.url}/learn/spacy`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/spacy` },
};

export default function SpacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">spaCy</span>
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              spaCy
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Tokenisation, parsing, NER, pattern matching, and custom components for real NLP pipelines.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={spacyBasicsContent} />
      </div>
    </div>
  );
}

