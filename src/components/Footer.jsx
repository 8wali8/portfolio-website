import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container flex items-center justify-between">
        <p className="font-numeric text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Ujjawal Prasad
        </p>
        <a
          href="#hero"
          aria-label="Back to top"
          className="link-underline link-underline-hover inline-flex items-center gap-1 text-xs text-foreground"
        >
          Back to top <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
};
