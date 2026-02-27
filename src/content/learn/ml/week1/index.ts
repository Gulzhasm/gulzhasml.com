import type { StructuredContent } from "@/lib/structured-content";
import { introToMLContent } from "./intro-to-ml";
import { pythonFundamentalsContent } from "./python-fundamentals";
import { pytorchTensorsContent } from "./pytorch-tensors";
import { pytorchPipelinesContent } from "./pytorch-pipelines";

const week1Content: Record<string, StructuredContent> = {
  "intro-to-ml": introToMLContent,
  "python-fundamentals": pythonFundamentalsContent,
  "pytorch-tensors": pytorchTensorsContent,
  "pytorch-pipelines": pytorchPipelinesContent,
};

export function getWeek1StructuredContent(slug: string): StructuredContent | null {
  return week1Content[slug] ?? null;
}
