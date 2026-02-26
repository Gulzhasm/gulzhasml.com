import { siteConfig } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] mb-10 rounded mx-auto" />

        <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
          Interested in AI-powered engineering solutions, collaboration, or just
          want to connect? I would love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="px-8 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-white rounded-lg font-medium transition-colors"
          >
            Send Email
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg font-medium transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] rounded-lg font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
