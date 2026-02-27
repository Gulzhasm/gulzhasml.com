/**
 * Structured content for chapter-style learning pages.
 * When present, the resource page renders Overview, Key Ideas, Examples, etc.
 */

export interface FurtherReadingLink {
  title: string;
  href: string;
  type: "internal" | "external";
}

export interface Exercise {
  question: string;
  answer: string;
}

export interface StructuredContent {
  overview: string;
  youWillLearn: string[];
  mainContent: {
    heading: string;
    body: string;
  }[];
  examples?: {
    title: string;
    description: string;
    code?: string;
  }[];
  commonMistakes?: {
    mistake: string;
    why: string;
    fix: string;
  }[];
  exercises?: Exercise[];
  furtherReading: FurtherReadingLink[];
}
