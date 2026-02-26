import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Blog — AI, Machine Learning, NLP & Engineering",
  description:
    "Articles on machine learning, AI engineering, NLP, LLM orchestration, test automation, and Python development. Practical insights from real projects.",
  openGraph: {
    title: "Blog — AI, Machine Learning & Engineering",
    description:
      "Articles on machine learning, AI engineering, NLP, LLM orchestration, and Python development.",
    url: "https://gulzhasml.com/blog",
  },
  alternates: { canonical: "https://gulzhasml.com/blog" },
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Blog</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
        Blog
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-10">
        Writing about AI, ML, NLP, and engineering. Posts are also published on Medium.
      </p>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  &middot; {post.readTime}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl border-2 border-dashed border-[var(--color-border)] text-center">
          <h3 className="font-medium text-[var(--color-text)] mb-1">
            Coming Soon
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Blog posts will be published here and on Medium.
          </p>
        </div>
      )}
    </div>
  );
}
