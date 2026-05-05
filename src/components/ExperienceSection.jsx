const experiences = [
  {
    company: "Netflix",
    role: "Software Engineering Intern",
    period: "May 2026 — Aug 2026",
    location: "Los Gatos, CA",
    points: [
      "Incoming. Real-time developer tooling for game session infrastructure.",
      "Low-latency inspection, debugging, and live session-state analysis at scale.",
    ],
  },
  {
    company: "CosmicBrain AI",
    role: "Technical Intern",
    period: "May 2025 — Aug 2025",
    location: "San Francisco, CA",
    points: [
      "Optimized ONNX Runtime execution graphs by tuning fuse patterns, layout transformations, and kernel selection.",
      "Profiled embedded GPU inference using CUDA utilities and Linux perf to reduce memory stalls and dispatch overhead.",
      "Built a reproducible profiling and regression workflow to validate gains and prevent regressions.",
    ],
  },
  {
    company: "Jumpseat",
    role: "Machine Learning Intern",
    period: "Oct 2024 — May 2025",
    location: "West Lafayette, IN",
    points: [
      "Designed a high-throughput ingestion pipeline handling 9M+ datapoints with scrapers, PostgreSQL, and scheduled workflows.",
      "Revamped a latency-critical pricing engine by rewriting hot Python paths in Cython, reaching 2,000 req/s.",
      "Built simulation frameworks for pricing strategies — improved ticket efficiency by 15% and projected +10% margin.",
    ],
  },
  {
    company: "NASA",
    role: "Deep Learning Intern",
    period: "Jun 2024 — Aug 2024",
    location: "Mountain View, CA",
    points: [
      "Engineered a parallel ETL for 240,000+ astronomical FITS files, reducing conversion time from 24h to 4h (6×).",
      "Developed a multi-stage ensemble pipeline that improved TCE detection accuracy by 15%.",
      "Contributed to uncovering 10+ previously missed exoplanets through improved detection workflows.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 md:py-20 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Experience.
          </h2>
        </div>

        <ol className="divide-y divide-border">
          {experiences.map((item) => (
            <li
              key={`${item.company}-${item.period}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-12"
            >
              <div className="md:col-span-3">
                <div className="font-numeric text-xs text-muted-foreground">
                  {item.period}
                </div>
                <div className="font-numeric text-xs text-muted-foreground mt-1">
                  {item.location}
                </div>
              </div>

              <div className="md:col-span-9">
                <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                  {item.role}
                  <span className="text-muted-foreground">, </span>
                  <em className="italic">{item.company}</em>
                </h3>
                <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed max-w-2xl">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="select-none text-foreground/40">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
