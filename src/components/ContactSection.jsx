import { ArrowUpRight } from "lucide-react";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-20 border-t border-border"
    >
      <div className="container">
        <div className="max-w-lg">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Let&rsquo;s talk.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            Open to talk about opportunities in software
            engineering and ML. The fastest way to reach me is email.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <dt className="font-numeric text-xs text-muted-foreground pt-0.5">
                Email
              </dt>
              <dd>
                <a
                  href="mailto:ujjawalprasad111@gmail.com"
                  className="link-underline link-underline-hover text-foreground"
                >
                  ujjawalprasad111@gmail.com
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <dt className="font-numeric text-xs text-muted-foreground pt-0.5">
                Phone
              </dt>
              <dd>
                <a
                  href="tel:+19082104753"
                  className="link-underline link-underline-hover text-foreground"
                >
                  (908) 210-4753
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <dt className="font-numeric text-xs text-muted-foreground pt-0.5">
                Location
              </dt>
              <dd className="text-foreground">San Francisco, CA</dd>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <dt className="font-numeric text-xs text-muted-foreground pt-0.5">
                Elsewhere
              </dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="https://linkedin.com/in/ujjawal-prasad/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
                >
                  LinkedIn <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://github.com/8wali8"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="link-underline link-underline-hover inline-flex items-center gap-1 text-foreground"
                >
                  GitHub <ArrowUpRight size={12} />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
