import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SBV + APH: Guia de Emergência",
    short_name: "SBV+APH",
    description: "Orientação rápida para salvar vidas - Suporte Básico de Vida e APH.",
    start_url: "/",
    display: "standalone",
    background_color: "#070d1e",
    theme_color: "#070d1e",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
