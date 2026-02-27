"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mlWeek1Items = [
  { label: "What Is ML, Really?", href: "/learn/ml/1/intro-to-ml" },
  { label: "Python Fundamentals for ML", href: "/learn/ml/1/python-fundamentals" },
  { label: "PyTorch I — Tensors & Broadcasting", href: "/learn/ml/1/pytorch-tensors" },
  { label: "PyTorch II — Training Pipelines", href: "/learn/ml/1/pytorch-pipelines" },
];

const learnTopics = [
  { label: "Machine Learning", href: "/learn/ml", children: [
    { label: "Week 1: Intro + Setup", href: "/learn/ml/1", children: mlWeek1Items },
  ]},
  { label: "Artificial Intelligence", href: "/learn/ai" },
  { label: "Natural Language Processing", href: "/learn/nlp" },
  { label: "Statistical Planning and Reinforcement Learning", href: "/learn/sprl" },
  { label: "Neural Networks & NLP", href: "/learn/nn-nlp" },
  { label: "Conversational Agents", href: "/learn/conversational" },
  { label: "Information Retrieval", href: "/learn/ir" },
];

const toolsTopics = [
  { label: "PyTorch", href: "/learn/pytorch" },
  { label: "Scikit-learn", href: "/learn/sklearn" },
  { label: "Pandas & NumPy", href: "/learn/pandas-numpy" },
  { label: "Hugging Face", href: "/learn/huggingface" },
  { label: "spaCy", href: "/learn/spacy" },
];

const projectLinks = [
  { label: "ai-test-gen", href: "/projects/ai-test-gen" },
  { label: "gap-trader", href: "/projects/gap-trader" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

type LearnItem = {
  label: string;
  href: string;
  children?: LearnItem[];
};

function LearnItemLink({
  item,
  pathname,
}: {
  item: LearnItem;
  pathname: string;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const isChildActive = hasChildren && item.children!.some(
    (c) => pathname === c.href || (c.children && c.children.some((cc) => pathname === cc.href))
  );
  const [open, setOpen] = useState(isActive || !!isChildActive);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`block px-4 py-1.5 text-sm rounded-r-lg border-l-2 transition-colors ${
          isActive
            ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
            : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div key={item.href}>
      <div
        className={`flex items-center gap-1 rounded-r-lg border-l-2 transition-colors ${
          isActive
            ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
            : "border-transparent"
        }`}
      >
        <Link
          href={item.href}
          className={`flex-1 px-4 py-1.5 text-sm ${
            isActive ? "text-[var(--color-accent)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          } hover:bg-[var(--color-surface-hover)] transition-colors`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="px-2 py-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <ChevronIcon open={open} />
        </button>
      </div>
      {open && (
        <div className="ml-2">
          {item.children!.map((child) => (
            <LearnItemLink key={child.href} item={child} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarSection({
  title,
  items,
  pathname,
  defaultOpen = true,
}: {
  title: string;
  items: LearnItem[];
  pathname: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
      >
        {title}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="ml-2">
          {items.map((item) => (
            <LearnItemLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[var(--color-border)]">
        <Link href="/" className="text-xl font-bold text-[var(--color-text)]">
          gulzhas<span className="text-[var(--color-accent)]">.ml</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {/* Home */}
        <Link
          href="/"
          className={`flex items-center gap-3 px-5 py-2 text-sm transition-colors ${
            pathname === "/"
              ? "text-[var(--color-accent)] font-medium bg-[var(--color-accent-light)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>

        <div className="my-3 border-t border-[var(--color-border)]" />

        {/* Learn */}
        <SidebarSection title="Learn" items={learnTopics} pathname={pathname} />

        <div className="my-2" />

        {/* Tools & Frameworks */}
        <SidebarSection
          title="Tools & Frameworks"
          items={toolsTopics}
          pathname={pathname}
          defaultOpen={false}
        />

        <div className="my-3 border-t border-[var(--color-border)]" />

        {/* Projects */}
        <SidebarSection title="Projects" items={projectLinks} pathname={pathname} />

        <div className="my-3 border-t border-[var(--color-border)]" />

        {/* Standalone links */}
        {[
          { label: "Research", href: "/research", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
          { label: "Blog", href: "/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
          { label: "About", href: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-5 py-2 text-sm transition-colors ${
              pathname === link.href
                ? "text-[var(--color-accent)] font-medium bg-[var(--color-accent-light)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Gulzhasm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/gulzhas-mailybayeva"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:gulzhasm@gmail.com"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[var(--color-background)] shadow-md border border-[var(--color-border)]"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5 text-[var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside className="sidebar hidden md:block fixed top-0 left-0 h-screen bg-[var(--color-sidebar)] border-r border-[var(--color-border)] z-40">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 left-0 w-[280px] h-full bg-[var(--color-background)] shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
