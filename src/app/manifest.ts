import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gulzhas Mailybayeva — AI/ML Engineer",
    short_name: "gulzhas.ml",
    description:
      "AI/ML Engineer portfolio — machine learning, NLP, LLM orchestration, and intelligent test automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a73e8",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
