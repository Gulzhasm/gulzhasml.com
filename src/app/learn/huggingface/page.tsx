import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { huggingFaceBasicsContent } from "@/content/learn/huggingface/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "Hugging Face — Transformers, Tokenizers & Fine-Tuning",
  description:
    "Deep fundamentals of the Hugging Face ecosystem: tokenisation, AutoModels, pipelines, and fine-tuning transformers for your own tasks.",
  openGraph: {
    title: "Hugging Face — Transformers, Tokenizers & Fine-Tuning",
    description:
      "Learn how to use Hugging Face Transformers for real NLP work: from pipelines to custom fine-tuning.",
    url: `${siteConfig.url}/learn/huggingface`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/huggingface` },
};

export default function HuggingFacePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Hugging Face</span>
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              Hugging Face
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Transformers, tokenizers, pipelines, and fine-tuning for modern NLP.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={huggingFaceBasicsContent} />
      </div>
    </div>
  );
}

