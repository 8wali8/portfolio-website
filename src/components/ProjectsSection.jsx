import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "RoboLense",
    summary:
      "Overall Winner at Catapult 2026. Built the object detection pipeline and frontend for a system that converts human task videos into robot-ready MuJoCo simulations.",
    image: "/projects/project4.png",
    metrics: [
      { label: "Award", value: "Overall Winner" },
      { label: "Hackathon", value: "Catapult 2026" },
      { label: "Role", value: "Frontend + Object Detection" },
      { label: "Output", value: "MuJoCo simulation" },
    ],
    architecture:
      "Video upload -> pose pipeline + object pipeline -> scene reconstruction -> unified export -> MuJoCo simulation",
    bottleneck:
      "The hardest part was making noisy motion and object signals line up well enough to produce simulator-ready output from a single video.",
    tradeoff:
      "Kept the system modular and service-oriented so each robotics and vision step could be improved independently without blocking the full pipeline.",
    optimization:
      "Used async distributed services, automated artifact generation, and a unified scene export flow to turn raw video into a working simulation end to end.",
    codeUrl: "https://github.com/RRWRA-Catapult26",
    liveUrl: "https://devpost.com/software/robolens",
  },
  {
    id: 2,
    title: "Jumpseat Travel Platform",
    summary:
      "Airline pricing system that ingested large-scale fare data and pushed the hot path into a high-throughput pricing engine.",
    image: "/projects/project2.png",
    metrics: [
      { label: "Throughput", value: "2K+ req/s" },
      { label: "Scale", value: "9M+ data points" },
      { label: "Latency focus", value: "Hot-path tuning" },
      { label: "Data store", value: "9M+ records" },
    ],
    architecture:
      "Scrapers -> data store -> pricing engine -> API -> dashboard and booking flow",
    bottleneck:
      "The request path was too expensive when every query re-did work that could be cached or precomputed.",
    tradeoff:
      "Kept the service architecture straightforward so the optimization effort stayed concentrated on the path that mattered.",
    optimization:
      "Applied Cython on hot paths, tuned PostgreSQL indexes, and reduced repeated work before the request hit the database.",
    codeUrl: "https://github.com/Campus-Ventures/safe-stack-2",
    liveUrl: "https://www.jumpseatapp.com/",
  },
  {
    id: 3,
    title: "Bitcoin Mining Optimization Platform",
    summary:
      "24-hour hackathon solution for MARA Holdings that turned multi-site mining data into sub-second allocation decisions.",
    image: "/projects/project1.png",
    metrics: [
      { label: "Throughput", value: "Sub-second" },
      { label: "Scale", value: "100+ sites" },
      { label: "Impact", value: "15-25% profit lift" },
      { label: "Efficiency", value: "20% less waste" },
    ],
    architecture:
      "Market / weather feeds -> forecasting models -> LP solver -> site dashboard -> allocation changes",
    bottleneck:
      "The solver had to stay responsive while combining geography, power limits, and device constraints.",
    tradeoff:
      "Kept the stack simple and deterministic instead of hiding the optimization behind extra service layers.",
    optimization:
      "Used constraint-aware allocation, fast data prep, and a tight feedback loop between model output and visualization.",
    codeUrl: "https://github.com/Sanjana-SKS/MaraHackathon25",
    liveUrl: "https://github.com/Sanjana-SKS/MaraHackathon25/blob/main/README.md",
  },
  {
    id: 4,
    title: "StreamSense Analytics Platform",
    summary:
      "Distributed streaming analytics system for Twitch that fused video, audio, and chat into a real-time sponsorship intelligence pipeline.",
    image: "/projects/project3.png",
    metrics: [
      { label: "Throughput", value: "10K+ events" },
      { label: "Latency", value: "<200ms P95" },
      { label: "Platform", value: "Kafka + Spring Boot" },
      { label: "Observability", value: "Prometheus / Grafana / Zipkin" },
    ],
    architecture:
      "Twitch ingestion -> Kafka topics -> Spring Boot services -> async ML inference -> GraphQL dashboard",
    bottleneck:
      "Keeping event ingestion and ML inference stable during burst traffic without cascading failures.",
    tradeoff:
      "Prioritized resilient event flow and observability over adding extra model complexity in the first release.",
    optimization:
      "Added backpressure-aware async queues, circuit-breaker protections, and load tests to reduce latency variance.",
    codeUrl: "https://github.com/8wali8/StreamSense-Production",
    liveUrl: "https://devpost.com/software/streamsense",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-3">
            Selected case studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Systems built for load, latency, and reliability.
          </h2>
          <p className="text-muted-foreground">
            Each project is framed as a problem, a constraint, and a measured
            outcome. The layout is meant to scan quickly: what it did, what hurt,
            and how it was improved.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xs card-hover max-w-6xl mx-auto w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
                <div className="p-4 md:p-5 bg-secondary/20">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                      <div className="flex items-center gap-2 border-b border-border bg-background/80 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                        <span className="ml-auto text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                          Screenshot
                        </span>
                      </div>
                      <div className="aspect-video overflow-hidden bg-secondary/10 flex items-center justify-center p-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <div className="rounded-2xl border border-border bg-background p-4">
                        <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                          Architecture
                        </div>
                        <p className="text-sm text-foreground/80 leading-6 font-mono break-words">
                          {project.architecture}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border bg-background p-4">
                        <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                          Bottleneck
                        </div>
                        <p className="text-sm text-muted-foreground leading-6">
                          {project.bottleneck}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-7 lg:p-8 text-left space-y-4 self-start">
                  <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                    Case Study {String(project.id).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-7 max-w-2xl">
                      {project.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-border bg-background px-4 py-3"
                      >
                        <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
                          {metric.label}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                        Tradeoff
                      </div>
                      <p className="text-sm text-muted-foreground leading-6">
                        {project.tradeoff}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                        Optimization
                      </div>
                      <p className="text-sm text-muted-foreground leading-6">
                        {project.optimization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center pt-0.5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span>Live / Write-up</span>
                    </a>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/8wali8"
            rel="noreferrer"
          >
            See More Code <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section >
  );
};
