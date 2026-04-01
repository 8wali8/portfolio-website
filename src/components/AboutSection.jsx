import { Brain, Database, Layers } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Background <span className="text-primary"> / Focus</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              CS + Statistics at Purdue, focused on real-time and distributed systems
            </h3>

            <p className="text-muted-foreground">
              I&apos;m pursuing a B.S. in Computer Science with a second major in
              Statistics at Purdue (Expected May 2027). I&apos;ve worked across NASA,
              CosmicBrain AI, and Jumpseat on performance-critical systems, and I&apos;m
              joining Netflix as an incoming Software Engineering Intern in Summer 2026
              to build internal real-time tooling for game session infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Reach Out
              </a>

              <a
                href="https://docs.google.com/document/d/1j1qUSpRtYCYp8zDFgWtFGfviwwQXYYJvvGBDs0dM2EU/edit?usp=sharing"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Systems Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Low-Latency Systems</h4>
                  <p className="text-muted-foreground">
                    At Jumpseat, I rewrote Python bottlenecks in Cython to hit
                    2,000 req/s and improved ticket pricing outcomes by 15%.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">ML Systems Under Constraints</h4>
                  <p className="text-muted-foreground">
                    At CosmicBrain AI, I tuned ONNX Runtime execution graphs and
                    profiled embedded GPU inference with CUDA and Linux perf to
                    reduce stalls and dispatch overhead.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Distributed Event-Driven Architecture</h4>
                  <p className="text-muted-foreground">
                    At NASA, I parallelized ETL for 240,000+ FITS files and reduced
                    conversion time from 24+ hours to 4 hours (6x), enabling faster
                    model iteration and better detection outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
