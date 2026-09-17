import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center text-foreground" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="max-w-xl py-16">
          <p className="font-numeric text-xs uppercase tracking-[0.18em] text-muted-foreground">
            404
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight mt-5">
            This page doesn&rsquo;t exist.
          </h1>

          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            The link may be old or mistyped. Everything on this site lives on the home page.
          </p>

          <Link
            to="/"
            className="link-underline link-underline-hover inline-block mt-10 text-sm text-foreground"
          >
            Go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};
