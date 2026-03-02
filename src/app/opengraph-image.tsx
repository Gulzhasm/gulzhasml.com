import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Gulzhas Mailybayeva | AI/ML Engineer | Machine Learning, NLP, LLM Orchestration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            opacity: 0.9,
            marginBottom: 16,
          }}
        >
          gulzhas.ml
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Gulzhas Mailybayeva
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            opacity: 0.9,
            marginBottom: 40,
          }}
        >
          AI/ML Engineer &bull; NLP &bull; LLM Orchestration &bull; Test
          Automation
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 18,
            opacity: 0.8,
          }}
        >
          <span>Machine Learning · NLP · LLM Orchestration · RAG</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
