import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { sklearnBasicsContent } from "@/content/learn/sklearn/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "Scikit-learn — Pipelines, Model Selection & Classical ML",
  description:
    "Deep dive into scikit-learn: estimator API, preprocessing with Pipelines, cross-validation, hyperparameter tuning, and metrics for robust classical ML.",
  openGraph: {
    title: "Scikit-learn — Pipelines, Model Selection & Classical ML",
    description:
      "Learn how to structure end-to-end machine learning workflows in scikit-learn with pipelines, cross-validation, and hyperparameter search.",
    url: `${siteConfig.url}/learn/sklearn`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/sklearn` },
};

export default function SklearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Scikit-learn</span>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              Scikit-learn
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Classical ML workflows: preprocessing, pipelines, cross-validation, and model selection.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={sklearnBasicsContent} />
      </div>
    </div>
  );
}

