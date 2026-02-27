"use client";

import { useState } from "react";

interface CollapsibleProps {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ summary, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors"
      >
        {summary}
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
