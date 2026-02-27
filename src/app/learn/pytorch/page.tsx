import Link from "next/link";
import { StructuredContentRenderer } from "@/components/StructuredContentRenderer";
import { pytorchBasicsContent } from "@/content/learn/pytorch/basics";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "PyTorch — Tensors, Autograd & Neural Networks",
  description:
    "Beginner-friendly PyTorch guide: tensors, autograd, nn.Module, training loops, and GPU basics — everything you need to start building neural networks in PyTorch.",
  openGraph: {
    title: "PyTorch — Tensors, Autograd & Neural Networks",
    description:
      "Learn PyTorch from scratch: tensors, autograd, model definition, training loops, and GPU acceleration.",
    url: `${siteConfig.url}/learn/pytorch`,
  },
  alternates: { canonical: `${siteConfig.url}/learn/pytorch` },
};

export default function PyTorchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">PyTorch</span>
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
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              PyTorch
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Tensors, autograd, neural networks, training loops, and GPU acceleration.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <StructuredContentRenderer content={pytorchBasicsContent} />
      </div>
    </div>
  );
}

