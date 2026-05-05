import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-5xl mx-auto text-center z-10">
        <div className="space-y-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary opacity-0 animate-fade-in">
            Purdue CS + Statistics | Systems Engineering
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            <span className="block opacity-0 animate-fade-in-delay-1">
              I build high-performance systems
            </span>
            <span className="block text-primary opacity-0 animate-fade-in-delay-2">
              that operate under load.
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#experience" className="cosmic-button">
              View Experiences
            </a>
            <a
              href="#projects"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              See Case Studies
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
