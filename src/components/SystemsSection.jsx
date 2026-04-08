import { Activity, Bug, Cpu, Gauge, Workflow } from "lucide-react";

const workflowSteps = [
  "Reproduce the issue under load.",
  "Collect traces, counters, and flamegraphs.",
  "Isolate the hot path or contention point.",
  "Change one variable at a time.",
  "Benchmark again before shipping.",
];

const toolset = [
  "Kafka",
  "Spring Boot",
  "Docker",
  "Kubernetes",
  "Prometheus",
  "Grafana",
  "Zipkin",
  "ONNX Runtime",
  "perf",
  "Flamegraphs",
  "CUDA profiling",
  "Nsight Systems",
  "OpenTelemetry",
  "Tracing + logs",
];

const improvements = [
  {
    title: "NASA ETL pipeline",
    metric: "6x faster conversion",
    detail:
      "Parallelized processing for 240,000+ FITS files and reduced conversion time from 24+ hours to 4 hours.",
  },
  {
    title: "CosmicBrain inference path",
    metric: "Lower GPU overhead",
    detail:
      "Tuned ONNX Runtime fusion and kernel selection using CUDA and perf-guided profiling workflows.",
  },
  {
    title: "StreamSense live pipeline",
    metric: "10K+ events, <200ms P95",
    detail:
      "Built a distributed streaming architecture with resilient event flow, backpressure, and observability.",
  },
];

export const SystemsSection = () => {
  return (
    <section id="systems" className="py-24 px-4 relative bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-3">
            Performance / Systems
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            I profile first, then I optimize the bottleneck.
          </h2>
          <p className="text-muted-foreground text-lg">
            My workflow is built for systems that need to stay predictable when load,
            concurrency, and data volume all rise at once. I use traces, counters,
            and benchmarks to decide what actually changes performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="gradient-border p-6 card-hover bg-card/80">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Profiling stack</h3>
                <p className="text-sm text-muted-foreground">
                  The first pass is always measurement.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {toolset.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-xs rounded-full border border-border bg-background text-foreground/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="gradient-border p-6 card-hover bg-card/80">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Bug className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Debugging approach</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce noise before changing code.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-left text-muted-foreground">
              {workflowSteps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="gradient-border p-6 card-hover bg-card/80">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Improvement loop</h3>
                <p className="text-sm text-muted-foreground">
                  Change, verify, and keep the system stable.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-left">
              {improvements.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">My working model</h3>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-background p-4 text-left text-sm leading-6 text-foreground/80 border border-border">
                {`trace -> locate hot path -> patch -> benchmark -> compare -> ship
   |            |            |             |           |
perf / CUDA   contention   Cython / SQL   load test   regression check`}
              </pre>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">What I optimize for</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-background p-4">
                  Low tail latency and less jitter
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  Higher throughput without fragile scaling tricks
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  Clear observability and fast diagnosis
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  Reliability under noisy, real-world load
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-foreground/70">
                <span className="px-3 py-1 rounded-full border border-border">Kafka</span>
                <span className="px-3 py-1 rounded-full border border-border">Spring Boot</span>
                <span className="px-3 py-1 rounded-full border border-border">Kubernetes</span>
                <span className="px-3 py-1 rounded-full border border-border">Grafana</span>
                <span className="px-3 py-1 rounded-full border border-border">Zipkin</span>
                <span className="px-3 py-1 rounded-full border border-border">CUDA</span>
                <span className="px-3 py-1 rounded-full border border-border">perf</span>
                <span className="px-3 py-1 rounded-full border border-border">Tracing</span>
                <span className="px-3 py-1 rounded-full border border-border">Backpressure</span>
                <span className="px-3 py-1 rounded-full border border-border">Load testing</span>
                <span className="px-3 py-1 rounded-full border border-border">Benchmarking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Throughput", value: "10K+ events", note: "Distributed stream processing under bursty load." },
            { label: "Scale", value: "240K+ files", note: "Parallel ETL for astronomy workflows." },
            { label: "Latency", value: "<200ms P95", note: "Real-time pipeline and dashboard responsiveness." },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-5 text-left">
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">{item.label}</div>
              <div className="text-2xl font-semibold mb-1">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};