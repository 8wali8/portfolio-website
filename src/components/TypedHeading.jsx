import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { isTypingSkipped, typingSleep } from "../lib/typing";

const CHAR_SPEED = 32;

const tag = (text) => (
  <span className="font-numeric text-xs text-muted-foreground/50 not-italic leading-none">
    {text}
  </span>
);

const Cursor = () => (
  <span className="inline-block w-[2px] h-[0.85em] bg-foreground align-middle ml-px animate-cursor-blink" />
);

function renderBlock(typed, outerTag) {
  if (!typed) return null;
  const open = `<${outerTag}>`;
  const close = `</${outerTag}>`;
  if (typed.startsWith(open) && typed.endsWith(close) && typed.length >= open.length + close.length) {
    return typed.slice(open.length, typed.length - close.length);
  }
  if (typed.length <= open.length && open.startsWith(typed)) return tag(typed);
  if (typed.startsWith(open)) {
    const afterOpen = typed.slice(open.length);
    let closePrefix = "";
    for (let len = 1; len <= close.length; len++) {
      if (afterOpen.endsWith(close.slice(0, len))) closePrefix = close.slice(0, len);
    }
    if (closePrefix) {
      const inner = afterOpen.slice(0, afterOpen.length - closePrefix.length);
      return <>{tag(open)}{inner}{tag(closePrefix)}</>;
    }
    return <>{tag(open)}{afterOpen}</>;
  }
  return tag(typed);
}

function isCollapsed(typed, outerTag) {
  const open = `<${outerTag}>`;
  const close = `</${outerTag}>`;
  return typed.startsWith(open) && typed.endsWith(close) && typed.length >= open.length + close.length;
}

export const TypedHeading = ({ text, started, onDone }) => {
  const [typed, setTyped] = useState("");
  const [active, setActive] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!started) return;
    const full = `<h2>${text}</h2>`;
    let cancelled = false;

    // Settle on the finished heading. onDone still fires either way: it is
    // what starts the next section's heading.
    const finish = () => {
      if (cancelled) return;
      setTyped(full);
      setActive(false);
      if (onDoneRef.current) onDoneRef.current();
    };

    const run = async () => {
      if (isTypingSkipped()) return finish();
      setActive(true);
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        if (isTypingSkipped()) return finish();
        setTyped(full.slice(0, i));
        await typingSleep(CHAR_SPEED);
      }
      finish();
    };

    run();
    return () => { cancelled = true; };
  }, [started, text]);

  const collapsed = isCollapsed(typed, "h2");

  // Only spans: this renders inside the section's <h2> > <button>, where a
  // block element would be invalid. The sr-only span is the heading's real
  // text; the animated markup beside it is decorative.
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {collapsed ? (
          <span className="font-display block text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {text}
          </span>
        ) : (
          <span className="font-display block text-base leading-relaxed">
            {renderBlock(typed, "h2")}
            {active && <Cursor />}
          </span>
        )}
      </span>
    </>
  );
};

TypedHeading.propTypes = {
  text: PropTypes.string.isRequired,
  started: PropTypes.bool.isRequired,
  onDone: PropTypes.func,
};
