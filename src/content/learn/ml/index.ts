import type { StructuredContent } from "@/lib/structured-content";
import { getWeek1StructuredContent } from "./week1";
import { week2Content } from "./week2";
import { week3Content } from "./week3";
import { week4Content } from "./week4";
import { week5Content } from "./week5";
import { week6Content } from "./week6";
import { week7Content } from "./week7";
import { week8Content } from "./week8";
import { week9Content } from "./week9";
import { week10Content } from "./week10";

const weekMaps: Record<number, Record<string, StructuredContent> | undefined> = {
  2: week2Content,
  3: week3Content,
  4: week4Content,
  5: week5Content,
  6: week6Content,
  7: week7Content,
  8: week8Content,
  9: week9Content,
  10: week10Content,
};

export function getMLStructuredContent(
  week: number,
  slug: string,
): StructuredContent | null {
  if (week === 1) {
    return getWeek1StructuredContent(slug);
  }
  const map = weekMaps[week];
  if (!map) return null;
  return map[slug] ?? null;
}


