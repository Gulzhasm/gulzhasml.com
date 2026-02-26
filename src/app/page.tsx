import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { topics } from "@/lib/topics";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Gulzhas Mailybayeva | AI/ML Engineer — Machine Learning, NLP, LLM Orchestration",
  description:
    "AI/ML Engineer portfolio featuring machine learning projects, NLP research, LLM orchestration, RAG pipelines, and intelligent test automation. MSc AI at Queen Mary University of London.",
  openGraph: {
    title: "Gulzhas Mailybayeva | AI/ML Engineer",
    description:
      "Portfolio featuring AI/ML projects, NLP research, and learning resources in machine learning, deep learning, and LLM orchestration.",
    url: "https://gulzhasml.com",
  },
  alternates: { canonical: "https://gulzhasml.com" },
};

export default function Home() {
  const featuredTopics = topics.filter((t) => t.category === "topic").slice(0, 4);
  const tools = topics.filter((t) => t.category === "tool").slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Welcome */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          Gulzhas Mailybayeva — AI/ML Engineer
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          Machine Learning · NLP · LLM Orchestration · RAG
        </p>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          {siteConfig.tagline}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "AI Projects", value: "2" },
          { label: "Research", value: "1" },
          { label: "Topics", value: String(topics.filter((t) => t.category === "topic").length) },
          { label: "Tools & Frameworks", value: String(topics.filter((t) => t.category === "tool").length) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm"
          >
            <p className="text-2xl font-bold text-[var(--color-accent)]">
              {stat.value}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Featured: Thesis */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Featured Research
        </h2>
        <Link
          href="/research"
          className="block p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-[var(--color-accent)] font-medium mb-1">
            MSc Thesis
          </p>
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            AI-Driven Test Case Generation: A Hybrid Approach
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            92% time reduction, $0.002 per test case, 94.4% acceptance criteria
            coverage. Combining rule-based scaffolding with LLM correction.
          </p>
          <div className="flex gap-4 mt-4">
            {[
              { label: "Time Saved", value: "92%" },
              { label: "Cost/TC", value: "$0.002" },
              { label: "Quality", value: "73% first-pass" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-lg font-bold text-[var(--color-accent)]">
                  {m.value}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* Topics grid */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/learn/${topic.slug}`}
              className="p-5 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={topic.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-text)]">
                  {topic.title}
                </h3>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Tools & Frameworks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/learn/${tool.slug}`}
              className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={tool.icon}
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                {tool.shortTitle}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Flagship project */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Featured Project
        </h2>
        <Link
          href="/projects/ai-test-gen"
          className="block p-6 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
            ai-test-gen
          </h3>
          <p className="text-sm text-[var(--color-accent)] mb-2">
            AI-Powered Test Case Generation Framework
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            A hybrid rule-based + LLM pipeline that generates structured manual
            test cases from Azure DevOps user stories. Combines deterministic
            scaffolding with Gemini 2.5 Flash, ChromaDB for semantic step
            matching, and automated upload to ADO Test Plans.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Python", "Gemini 2.5 Flash", "ChromaDB", "spaCy", "Azure DevOps API"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </Link>
      </div>

      {/* Recent posts */}
      {posts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.slug}
                className="p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-[var(--color-text)] text-sm">
                    {post.title}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] shrink-0 ml-4">
                    {post.readTime}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
