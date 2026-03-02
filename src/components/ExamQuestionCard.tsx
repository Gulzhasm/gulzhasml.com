"use client";

import { useState } from "react";
import type { ExamQuestion } from "@/lib/aws-ml-types";

const LETTERS = ["A", "B", "C", "D", "E"];

export function ExamQuestionCard({ question }: { question: ExamQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;

  return (
    <div className="border border-[var(--color-border)] rounded-xl p-6 mb-6">
      {/* Question number + text */}
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center text-sm font-bold">
          {question.id}
        </span>
        <p className="text-[var(--color-text)] text-sm leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-2 ml-11">
        {question.choices.map((choice, idx) => {
          const isCorrect = idx === question.correctIndex;
          const isSelected = idx === selected;

          let borderClass = "border-[var(--color-border)]";
          let bgClass = "hover:bg-[var(--color-surface-hover)]";
          let textClass = "text-[var(--color-text-secondary)]";

          if (revealed) {
            if (isCorrect) {
              borderClass = "border-emerald-500";
              bgClass = "bg-emerald-500/10";
              textClass = "text-emerald-400 font-medium";
            } else if (isSelected && !isCorrect) {
              borderClass = "border-red-500";
              bgClass = "bg-red-500/10";
              textClass = "text-red-400";
            } else {
              bgClass = "opacity-50";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(idx)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border transition-all ${borderClass} ${bgClass} ${
                !revealed ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  revealed && isCorrect
                    ? "bg-emerald-500 text-white"
                    : revealed && isSelected
                      ? "bg-red-500 text-white"
                      : "bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
                }`}
              >
                {LETTERS[idx]}
              </span>
              <span className={`text-sm leading-relaxed ${textClass}`}>
                {choice}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {revealed && (
        <div className="ml-11 mt-3">
          {selected === question.correctIndex ? (
            <p className="text-emerald-400 text-sm font-medium">Correct!</p>
          ) : (
            <p className="text-red-400 text-sm">
              Incorrect. The correct answer is{" "}
              <span className="font-bold">
                {LETTERS[question.correctIndex]}
              </span>
              .
            </p>
          )}
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="mt-2 text-xs text-[var(--color-accent)] hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
