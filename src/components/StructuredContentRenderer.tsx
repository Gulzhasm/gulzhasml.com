"use client";

import Link from "next/link";
import type { StructuredContent } from "@/lib/structured-content";
import { Collapsible } from "./Collapsible";

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-[13px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function StructuredContentRenderer({ content }: { content: StructuredContent }) {
  return (
    <article className="space-y-10">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">Overview</h2>
        <p className="text-[var(--color-text-secondary)] leading-[1.8]">
          {renderInlineCode(content.overview)}
        </p>
      </section>

      {/* You Will Learn */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">You Will Learn</h2>
        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)]">
          {content.youWillLearn.map((item, i) => (
            <li key={i}>{renderInlineCode(item)}</li>
          ))}
        </ul>
      </section>

      {/* Main Content */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Main Content</h2>
        <div className="space-y-6">
          {content.mainContent.map((block, i) => (
            <div key={i}>
              <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">{block.heading}</h3>
              <p className="text-[var(--color-text-secondary)] leading-[1.8]">
                {renderInlineCode(block.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      {content.examples && content.examples.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Examples</h2>
          <div className="space-y-6">
            {content.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--color-border)] overflow-hidden"
              >
                <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                  <h4 className="font-medium text-[var(--color-text)]">{ex.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{ex.description}</p>
                </div>
                {ex.code && (
                  <pre className="p-4 overflow-x-auto text-sm font-mono bg-[var(--color-surface)] text-[var(--color-text)]">
                    <code>{ex.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Common Mistakes</h2>
          <div className="space-y-4">
            {content.commonMistakes.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-amber-200 bg-amber-50/50"
              >
                <p className="font-medium text-amber-800 mb-1">{m.mistake}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  <span className="text-amber-700">Why:</span> {m.why}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <span className="text-emerald-700 font-medium">Fix:</span> {m.fix}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exercises */}
      {content.exercises && content.exercises.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Mini Exercises</h2>
          <div className="space-y-4">
            {content.exercises.map((ex, i) => (
              <div key={i} className="p-4 rounded-lg border border-[var(--color-border)] bg-white">
                <p className="text-[var(--color-text)] font-medium mb-2">
                  {i + 1}. {renderInlineCode(ex.question)}
                </p>
                <Collapsible summary="Show answer">
                  <p className="whitespace-pre-wrap font-mono text-[13px]">{ex.answer}</p>
                </Collapsible>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Further Reading */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Further Reading</h2>
        <ul className="space-y-2">
          {content.furtherReading.map((link, i) => (
            <li key={i}>
              {link.type === "internal" ? (
                <Link
                  href={link.href}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {link.title}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {link.title}
                  <span className="ml-1 text-xs text-[var(--color-text-muted)]">↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
