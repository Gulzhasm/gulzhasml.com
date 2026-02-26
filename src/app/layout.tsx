import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { siteConfig } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AI/ML Engineer — Machine Learning, NLP, LLM Orchestration`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "AI/ML Engineer specializing in machine learning, NLP, LLM orchestration, and intelligent test automation. MSc AI candidate at Queen Mary University of London. Portfolio featuring AI projects, research, and learning resources.",
  keywords: [
    "AI engineer",
    "machine learning",
    "ML engineer",
    "NLP",
    "natural language processing",
    "LLM orchestration",
    "large language models",
    "test automation",
    "AI portfolio",
    "deep learning",
    "RAG pipeline",
    "Gulzhas Mailybayeva",
    "QMUL",
    "AI projects",
    "Python AI",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} | AI/ML Engineer`,
    description:
      "AI/ML Engineer specializing in machine learning, NLP, LLM orchestration, and intelligent test automation. MSc AI at QMUL.",
    url: siteConfig.url,
    siteName: "gulzhas.ml",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | AI/ML Engineer`,
    description:
      "AI/ML Engineer — machine learning, NLP, LLM orchestration, and intelligent test automation.",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "gulzhas.ml",
      url: siteConfig.url,
      description:
        "AI/ML Engineer portfolio — machine learning, NLP, LLM orchestration, and intelligent test automation.",
    },
    {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "AI/ML Engineer",
      description:
        "AI/ML Engineer specializing in machine learning, NLP, LLM orchestration, and intelligent test automation. MSc AI candidate at Queen Mary University of London.",
      sameAs: [siteConfig.github, siteConfig.linkedin],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Queen Mary University of London",
      },
      knowsAbout: [
        "Machine Learning",
        "Natural Language Processing",
        "Large Language Models",
        "Test Automation",
        "RAG Pipelines",
        "Deep Learning",
        "Python",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="sidebar-layout">
          <Sidebar />
          <main className="main-content md:ml-[260px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
