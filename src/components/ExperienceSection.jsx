import PropTypes from "prop-types";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TypedHeading } from "./TypedHeading";

const experiences = [
  {
    company: "Netflix",
    role: "Software Engineering Intern",
    period: "May 2026 — Aug 2026",
    location: "Los Gatos, CA",
    logo: "/company-logos/netflix.png",
    tags: ["GraphQL", "React", "TypeScript", "Distributed systems"],
    points: [
      "Shipped an end-to-end real-time developer tooling feature for distributed game session infrastructure, leading collaboration with Product, Design, & cross-functional stakeholders from requirements through implementation, testing, and feedback iteration",
      "Designed and implemented federated GraphQL backend APIs supporting 10,000+ requests per second, enabling scalable access to live distributed game session state",
      "Integrated React/TypeScript UI workflows with backend APIs to support low-latency visualization, inspection, and debugging of production game sessions",
    ],
  },
  {
    company: "CosmicBrain AI",
    role: "Technical Intern",
    period: "May 2025 — Aug 2025",
    location: "San Francisco, CA",
    logo: "/company-logos/cosmicbrain.png",
    tags: ["ONNX Runtime", "CUDA", "Linux perf", "Embedded GPU"],
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
    logo: "/company-logos/jumpseat.png",
    tags: ["Python", "Cython", "PostgreSQL", "Scrapers"],
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
    logo: "/company-logos/nasa.png",
    tags: ["Deep learning", "Parallel ETL", "Ensembles", "FITS"],
    points: [
      "Engineered a parallel ETL for 240,000+ astronomical FITS files, reducing conversion time from 24h to 4h (6×).",
      "Developed a multi-stage ensemble pipeline that improved TCE detection accuracy by 15%.",
      "Contributed to uncovering 10+ previously missed exoplanets through improved detection workflows.",
    ],
  },
];

export const ExperienceSection = ({ open, onToggle, started, onHeadingDone }) => (
  <section id="experience" className="flex-1 flex flex-col justify-center border-t border-border">
    {/* The heading wraps its own toggle, so the button's text IS the heading. */}
    <h2 className="container">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 py-5 md:py-7 text-left w-full"
        aria-expanded={open}
      >
        <TypedHeading text="Experience." started={started} onDone={onHeadingDone} />
        <ChevronDown
          size={28}
          strokeWidth={1.25}
          className={`text-foreground/40 flex-shrink-0 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
        />
      </button>
    </h2>
  </section>
);

ExperienceSection.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
  onHeadingDone: PropTypes.func,
};

// One role on the timeline. The logo doubles as the spine's node, and the
// bullets stay collapsed behind the heading's own toggle.
const ExperienceEntry = ({ item, isLast, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${useId()}-points`;

  return (
    <li
      className={`group relative pl-12 md:pl-14 pb-10 last:pb-0 ${isLast ? "" : "md:grow"}`}
    >
      {/* The spine, stopping at the last node so the line never dangles. */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-4 top-11 bottom-0 w-px -translate-x-1/2 bg-border"
        />
      )}

      {/* Decorative: the company is already named in the heading, so this
          carries no alt text of its own. The logos ship with their own
          backgrounds, so they are framed as tiles rather than dropped bare. */}
      <img
        src={item.logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute left-0 top-1.5 h-8 w-8 rounded-md object-cover ring-1 ring-border/70 grayscale opacity-80 transition duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100"
      />

      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-3 text-left"
        >
          <span className="font-display text-2xl md:text-3xl tracking-tight">
            {item.role}
            <span className="text-muted-foreground">, </span>
            <em className="italic">{item.company}</em>
          </span>
          <ChevronDown
            size={20}
            strokeWidth={1.25}
            className={`mt-2 text-foreground/40 flex-shrink-0 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      <div className="font-numeric text-xs text-muted-foreground mt-1">
        {item.period} · {item.location}
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="font-numeric text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border rounded-full px-2.5 py-1"
          >
            {tag}
          </li>
        ))}
      </ul>

      {open && (
        <ul
          id={panelId}
          className="animate-unroll mt-5 space-y-2 text-muted-foreground leading-relaxed max-w-2xl"
        >
          {item.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="select-none text-foreground/40">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

ExperienceEntry.propTypes = {
  item: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
};

export const ExperienceContent = () => (
  // On desktop this sits in a full-height column, so the list claims that
  // height and shares the leftover space between the roles. Mobile keeps its
  // natural flow, where the page scrolls anyway.
  <ol className="container py-8 md:flex md:flex-col md:min-h-screen">
    {experiences.map((item, index) => (
      <ExperienceEntry
        key={`${item.company}-${item.period}`}
        item={item}
        isLast={index === experiences.length - 1}
        // The current role opens by default; nobody should have to click to
        // see the most recent thing.
        defaultOpen={index === 0}
      />
    ))}
  </ol>
);
