import { CalendarDays, MapPin } from "lucide-react";

const experiences = [
    {
        company: "Netflix",
        logo: "/company-logos/netflix.png",
        role: "Software Engineering Intern (Incoming)",
        period: "May 2026",
        location: "Los Gatos, CA",
        points: [
            "Incoming Summer 2026.",
            "Will work on internal real-time developer tooling for game session infrastructure.",
            "Focus area: low-latency inspection, debugging, and live session-state analysis at scale.",
        ],
    },
    {
        company: "CosmicBrain AI",
        logo: "/company-logos/cosmicbrain.png",
        role: "Technical Intern",
        period: "May 2025 - August 2025",
        location: "San Francisco, CA",
        points: [
            "Optimized ONNX Runtime execution graphs by tuning fuse patterns, layout transformations, and kernel selection.",
            "Profiled embedded GPU inference using CUDA utilities and Linux perf counters to reduce memory stalls and dispatch overhead.",
            "Built a reproducible profiling and regression workflow to validate gains and prevent performance regressions.",
        ],
    },
    {
        company: "Jumpseat",
        logo: "/company-logos/jumpseat.png",
        role: "Machine Learning Intern",
        period: "October 2024 - May 2025",
        location: "West Lafayette, IN",
        points: [
            "Designed a high-throughput ingestion pipeline handling 9M+ datapoints with scrapers, PostgreSQL, and scheduled workflows.",
            "Revamped a latency-critical pricing engine by rewriting hot Python paths in Cython, achieving 2,000 requests/second.",
            "Built simulation frameworks for pricing strategies, improving ticket efficiency by 15% and projecting +10% profit margin.",
        ],
    },
    {
        company: "NASA",
        logo: "/company-logos/nasa.png",
        role: "Deep Learning Intern",
        period: "June 2024 - August 2024",
        location: "Mountain View, CA",
        points: [
            "Engineered a parallel ETL pipeline for 240,000+ astronomical FITS files, reducing conversion time from 24+ hours to 4 hours (6x).",
            "Developed a multi-stage ensemble pipeline that improved TCE detection accuracy by 15%.",
            "Contributed to uncovering 10+ previously missed exoplanets through improved detection workflows.",
        ],
    },
];

export const ExperienceSection = () => {
    return (
        <section id="experience" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-3">
                        Work Experience
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold">Internship Experience</h2>
                </div>

                <div className="space-y-5">
                    {experiences.map((item) => (
                        <article
                            key={`${item.company}-${item.period}`}
                            className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-xs card-hover"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <img
                                            src={item.logo}
                                            alt={`${item.company} logo`}
                                            className="h-7 w-7 rounded-sm object-contain bg-white"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                        <p className="text-xs uppercase tracking-[0.25em] text-primary">
                                            {item.company}
                                        </p>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold">{item.role}</h3>
                                </div>

                                <div className="text-sm text-muted-foreground space-y-1 md:text-right">
                                    <p className="inline-flex items-center gap-2 md:justify-end">
                                        <CalendarDays className="h-4 w-4" />
                                        {item.period}
                                    </p>
                                    <p className="inline-flex items-center gap-2 md:justify-end">
                                        <MapPin className="h-4 w-4" />
                                        {item.location}
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3 text-muted-foreground">
                                {item.points.map((point) => (
                                    <li key={point} className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
