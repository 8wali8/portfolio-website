import PropTypes from "prop-types";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { TypedHeading } from "./TypedHeading";

const projects = [
  {
    id: 1,
    title: "RoboLense",
    summary:
      "Overall winner at Catapult 2026. Built the object-detection pipeline and frontend for a system that converts human task videos into robot-ready MuJoCo simulations.",
    image: "/projects/project4.png",
    metrics: [
      { label: "Award", value: "Overall Winner" },
      { label: "Hackathon", value: "Catapult 2026" },
      { label: "Output", value: "MuJoCo simulation" },
    ],
    codeUrl: "https://github.com/RRWRA-Catapult26",
    liveUrl: "https://devpost.com/software/robolens",
  },
  {
    id: 2,
    title: "Jumpseat",
    summary:
      "Airline pricing system that ingested large-scale fare data and pushed the hot path into a high-throughput pricing engine.",
    image: "/projects/project2.png",
    metrics: [
      { label: "Throughput", value: "2K+ req/s" },
      { label: "Scale", value: "9M+ records" },
      { label: "Focus", value: "Hot-path tuning" },
    ],
    codeUrl: "https://github.com/Campus-Ventures/safe-stack-2",
    liveUrl: "https://www.jumpseatapp.com/",
  },
  {
    id: 3,
    title: "Bitcoin Mining Optimizer",
    summary:
      "24-hour hackathon for MARA Holdings. Turned multi-site mining data into sub-second allocation decisions across 100+ sites.",
    image: "/projects/project1.png",
    metrics: [
      { label: "Latency", value: "Sub-second" },
      { label: "Scale", value: "100+ sites" },
      { label: "Impact", value: "+15-25% profit" },
    ],
    codeUrl: "https://github.com/Sanjana-SKS/MaraHackathon25",
    liveUrl: "https://github.com/Sanjana-SKS/MaraHackathon25/blob/main/README.md",
  },
  {
    id: 4,
    title: "StreamSense",
    summary:
      "Distributed streaming analytics for Twitch — fused video, audio, and chat into a real-time sponsorship-intelligence pipeline.",
    image: "/projects/project3.png",
    metrics: [
      { label: "Throughput", value: "10K+ events/s" },
      { label: "Latency", value: "<200ms p95" },
      { label: "Stack", value: "Kafka + Spring Boot" },
    ],
    codeUrl: "https://github.com/8wali8/StreamSense-Production",
    liveUrl: "https://devpost.com/software/streamsense",
  },
];

export const ProjectsSection = ({ open, onToggle, started, onHeadingDone }) => (
  <section id="projects" className="flex-1 flex flex-col justify-center border-t border-border">
    <div className="container">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 py-5 md:py-7 text-left w-full"
        aria-expanded={open}
      >
        <TypedHeading text="Selected work." started={started} onDone={onHeadingDone} />
        <ChevronDown
          size={28}
          strokeWidth={1.25}
          className={`text-foreground/40 flex-shrink-0 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  </section>
);

ProjectsSection.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
  onHeadingDone: PropTypes.func,
};

export const ProjectsContent = () => (
  <div className="container py-8">
    <div className="space-y-14 md:space-y-24">
      {projects.map((project, index) => {
        const reverse = index % 2 === 1;
        return (
          <article
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            <div className={reverse ? "lg:col-span-7 lg:order-2" : "lg:col-span-7 lg:order-1"}>
              <div className="overflow-hidden rounded-md border border-border bg-card transition-all duration-300 ease-out hover:scale-[1.025] hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-[16/10] flex items-center justify-center p-4 md:p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className={reverse ? "lg:col-span-5 lg:order-1" : "lg:col-span-5 lg:order-2"}>
              <div className="font-numeric text-xs text-muted-foreground mb-4">
                {String(project.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{project.summary}</p>

              <dl className="grid grid-cols-3 gap-4 mb-8 border-t border-border pt-6">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-[11px] text-muted-foreground mb-1">{metric.label}</dt>
                    <dd className="font-numeric text-sm text-foreground">{metric.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
                >
                  Live <ArrowUpRight size={14} />
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
                >
                  Code <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    <div className="mt-14 pt-10 border-t border-border pb-10">
      <a
        href="https://github.com/8wali8"
        target="_blank"
        rel="noreferrer"
        className="link-underline link-underline-hover inline-flex items-center gap-2 text-sm text-foreground"
      >
        More on GitHub <ArrowUpRight size={14} />
      </a>
    </div>
  </div>
);
