import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CHAR_SPEED = 32;

const SCRIPT = [
  { key: "name",     text: "<p>Ujjawal Prasad</p>",                                    pause: 320 },
  { key: "heading",  text: "<h1>I build <em>high-performance</em> systems.</h1>",       pause: 280 },
  { key: "subtitle", text: "<p>Purdue CS + Statistics.</p>",                            pause: 0   },
];

const Cursor = () => (
  <span className="inline-block w-[2px] h-[0.85em] bg-foreground align-middle ml-px animate-cursor-blink" />
);

// Tag characters shown in monospace muted style while markup is being typed.
const tag = (text) => (
  <span className="font-numeric text-xs text-muted-foreground/50 not-italic leading-none">
    {text}
  </span>
);

// Renders inline <em>...</em> — shows tag chars while typing, collapses to
// real italic the moment </em> finishes.
function renderInlineContent(typed) {
  // Complete <em>...</em> — collapse.
  const complete = /^([\s\S]*)<em>([\s\S]*?)<\/em>([\s\S]*)$/.exec(typed);
  if (complete) {
    const [, before, content, after] = complete;
    return (
      <>
        {before}
        <em className="italic text-foreground/80">{content}</em>
        {after}
      </>
    );
  }

  // <em> open tag present — show tag chars + content + partial close tag.
  const openIdx = typed.indexOf("<em>");
  if (openIdx !== -1) {
    const before = typed.slice(0, openIdx);
    const afterOpen = typed.slice(openIdx + 4);
    const closePartial = afterOpen.match(/<(?:\/(?:em?)?)?$/);
    if (closePartial) {
      return (
        <>
          {before}
          {tag("<em>")}
          {afterOpen.slice(0, closePartial.index)}
          {tag(closePartial[0])}
        </>
      );
    }
    return (
      <>
        {before}
        {tag("<em>")}
        {afterOpen}
      </>
    );
  }

  // Partial <em> opening tag at end of string.
  const openPartial = typed.match(/<(?:em?)?$/);
  if (openPartial) {
    return (
      <>
        {typed.slice(0, openPartial.index)}
        {tag(openPartial[0])}
      </>
    );
  }

  return typed;
}

// Renders a block element with visible opening/closing tag markup while typing.
// Collapses to plain content the moment the close tag finishes.
// renderInner is applied to the inner content (defaults to identity).
function renderBlock(typed, outerTag, renderInner = (s) => s) {
  if (!typed) return null;
  const open = `<${outerTag}>`;
  const close = `</${outerTag}>`;

  // Complete: both tags typed — hide them, show only content.
  if (
    typed.startsWith(open) &&
    typed.endsWith(close) &&
    typed.length >= open.length + close.length
  ) {
    return renderInner(typed.slice(open.length, typed.length - close.length));
  }

  // Opening tag still being typed (length ≤ open, string is a prefix of open).
  if (typed.length <= open.length && open.startsWith(typed)) {
    return tag(typed);
  }

  // Opening tag complete; render it + content + any partial close tag.
  if (typed.startsWith(open)) {
    const afterOpen = typed.slice(open.length);
    // Find the longest suffix of afterOpen that is a prefix of the close tag.
    let closePrefix = "";
    for (let len = 1; len <= close.length; len++) {
      if (afterOpen.endsWith(close.slice(0, len))) closePrefix = close.slice(0, len);
    }
    if (closePrefix) {
      const inner = afterOpen.slice(0, afterOpen.length - closePrefix.length);
      return (
        <>
          {tag(open)}
          {renderInner(inner)}
          {tag(closePrefix)}
        </>
      );
    }
    return (
      <>
        {tag(open)}
        {renderInner(afterOpen)}
      </>
    );
  }

  return tag(typed);
}

// True once the full typed string includes both the open and close tag.
function isCollapsed(text, outerTag) {
  const open = `<${outerTag}>`;
  const close = `</${outerTag}>`;
  return (
    text.startsWith(open) &&
    text.endsWith(close) &&
    text.length >= open.length + close.length
  );
}

export const HeroSection = ({ onDone }) => {
  const [texts, setTexts] = useState({ name: "", heading: "", subtitle: "" });
  const [cursorKey, setCursorKey] = useState("name");

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      for (const { key, text, pause } of SCRIPT) {
        if (cancelled) return;
        setCursorKey(key);
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return;
          setTexts((t) => ({ ...t, [key]: text.slice(0, i) }));
          await sleep(CHAR_SPEED);
        }
        if (pause) await sleep(pause);
      }
      setCursorKey(null);
      if (!cancelled && onDone) onDone();
    };

    run();
    return () => { cancelled = true; };
  }, [onDone]);

  const nameCollapsed     = isCollapsed(texts.name, "p");
  const headingCollapsed  = isCollapsed(texts.heading, "h1");
  const subtitleCollapsed = isCollapsed(texts.subtitle, "p");

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center flex-1 py-12 md:py-0"
    >
      <div className="container">
        <div className="max-w-3xl">

          {/* Name: paragraph size while typing → text-xl once collapsed */}
          <p className={`font-display mb-8 ${nameCollapsed ? "text-xl" : "text-base"}`}>
            {renderBlock(texts.name, "p")}
            {cursorKey === "name" && <Cursor />}
          </p>

          {/* Heading: paragraph-sized <p> while typing → large <h1> once collapsed */}
          {(texts.heading || cursorKey === "heading") && (
            headingCollapsed ? (
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
                {renderBlock(texts.heading, "h1", renderInlineContent)}
                {cursorKey === "heading" && <Cursor />}
              </h1>
            ) : (
              <p className="font-display text-base leading-relaxed">
                {renderBlock(texts.heading, "h1", renderInlineContent)}
                {cursorKey === "heading" && <Cursor />}
              </p>
            )
          )}

          {/* Subtitle: no muted color while typing → muted once collapsed */}
          {(texts.subtitle || cursorKey === "subtitle") && (
            <p className={`mt-10 max-w-xl leading-relaxed ${subtitleCollapsed ? "text-base md:text-lg text-muted-foreground" : "text-base"}`}>
              {renderBlock(texts.subtitle, "p")}
              {cursorKey === "subtitle" && <Cursor />}
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  onDone: PropTypes.func,
};
