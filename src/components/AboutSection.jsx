import { Brain, Database, Layers } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              CS & Statistics Student at Purdue
            </h3>

            <p className="text-muted-foreground">
              I&apos;m a Computer Science & Statistics student at Purdue University with
              hands-on experience at NASA, CosmicBrain AI, and Jumpseat. I&apos;ve worked
              on everything from exoplanet detection models to robotics simulation platforms.
            </p>

            <p className="text-muted-foreground">
              Currently seeking Summer 2026 SWE internships where I can build high-performance
              systems, intelligent automation tools, and scalable applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="https://docs.google.com/document/d/1j1qUSpRtYCYp8zDFgWtFGfviwwQXYYJvvGBDs0dM2EU/edit?usp=sharing"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                General Resume
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
                  <h4 className="font-semibold text-lg">High-Performance Systems</h4>
                  <p className="text-muted-foreground">
                    Building scalable systems and GPU-accelerated pipelines using Rust, Python, and CUDA.
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
                  <h4 className="font-semibold text-lg">AI & Robotics</h4>
                  <p className="text-muted-foreground">
                    Developing intelligent models and robotics simulation platforms using PyTorch and deep learning.
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
                  <h4 className="font-semibold text-lg">Full-Stack Engineering</h4>
                  <p className="text-muted-foreground">
                    Creating production applications with React/Node.js, real-time features, and scalable backends.
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
