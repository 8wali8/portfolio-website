import { useState } from "react";
import { cn } from "@/lib/utils";

const groups = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "C++", "Rust", "TypeScript", "SQL", "Java"],
  },
  {
    id: "runtime",
    label: "Runtime & Services",
    items: [
      "CUDA",
      "Node.js",
      "REST APIs",
      "WebSockets",
      "Flask",
      "Spring Boot",
      "Kafka",
      "Docker",
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "ONNX Runtime",
      "Computer Vision",
      "OpenCV",
      "YOLO v8",
      "CLIP",
      "Whisper",
      "LSTM",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      "Pandas",
      "Scikit-Learn",
      "Cython",
      "Linear Programming",
      "PostgreSQL",
      "Web Scraping",
    ],
  },
  {
    id: "infra",
    label: "Infra & Observability",
    items: [
      "Linux",
      "Git",
      "AWS / GCP",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Zipkin",
      "MongoDB",
      "FFmpeg",
    ],
  },
];

export const SkillsSection = () => {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? groups : groups.filter((g) => g.id === active);

  return (
    <section
      id="capabilities"
      className="py-32 md:py-40 border-t border-border"
    >
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Toolkit.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Things I reach for. Grouped by where they sit in the stack.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-12 text-sm">
          {[{ id: "all", label: "All" }, ...groups].map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={cn(
                "transition-colors",
                active === g.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {g.label}
              {active === g.id && (
                <span className="ml-1 text-foreground/40">·</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {visible.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
            >
              <div className="md:col-span-3">
                <div className="font-numeric text-xs text-muted-foreground">
                  {group.label}
                </div>
              </div>
              <ul className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-3 text-base">
                {group.items.map((item) => (
                  <li key={item} className="text-foreground/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
