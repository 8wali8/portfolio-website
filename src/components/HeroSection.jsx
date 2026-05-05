import { ArrowUpRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex flex-col justify-center pt-8"
    >
      <div className="container">
        <div className="max-w-3xl">
          <p className="font-display text-xl opacity-0 animate-fade-in mb-8">
            Ujjawal Prasad
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight opacity-0 animate-fade-in-delay-1">
            I build {" "}
            <em className="italic text-foreground/80">high-performance</em>{" "}
            systems.
          </h1>

          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-in-delay-2">
            Purdue CS + Statistics.
          </p>

          <div className="mt-10 flex items-center gap-8 text-sm opacity-0 animate-fade-in-delay-3">
            <a
              href="#projects"
              className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
            >
              Selected work <ArrowUpRight size={14} />
            </a>
            <a
              href="#experience"
              className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
            >
              Experience <ArrowUpRight size={14} />
            </a>
            <a
              href="#contact"
              className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
