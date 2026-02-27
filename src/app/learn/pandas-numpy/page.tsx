import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { pandasNumpyBasicsContent } from "@/content/learn/pandas-numpy/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "Pandas & NumPy — Data Foundations for ML",
  description:
    "Learn how to use NumPy arrays and pandas DataFrames to clean, join, aggregate, and vectorise data for machine learning.",
  openGraph: {
    title: "Pandas & NumPy — Data Foundations for ML",
    description:
      "Deep fundamentals of arrays, broadcasting, indexing, joins, and groupby — everything you need before scikit-learn and PyTorch.",
    url: `${siteConfig.url}/learn/pandas-numpy`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/pandas-numpy` },
};

export default function PandasNumpyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Pandas &amp; NumPy</span>
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
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              Pandas &amp; NumPy
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              DataFrames, arrays, joins, aggregations, and vectorisation for ML workflows.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={pandasNumpyBasicsContent} />
      </div>
    </div>
  );
}

