import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-card relative border-t border-border/50 flex flex-wrap justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Ujjawal Prasad.
      </p>
      <a
        href="#hero"
        aria-label="Back to top"
        title="Back to top"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
