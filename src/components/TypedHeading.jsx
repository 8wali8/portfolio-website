import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

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
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      setActive(true);
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        setTyped(full.slice(0, i));
        await sleep(CHAR_SPEED);
      }
      setActive(false);
      if (!cancelled && onDoneRef.current) onDoneRef.current();
    };

    run();
    return () => { cancelled = true; };
  }, [started, text]);

  const collapsed = isCollapsed(typed, "h2");

  if (collapsed) {
    return (
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
        {text}
      </h2>
    );
  }

  return (
    <p className="font-display text-base leading-relaxed">
      {renderBlock(typed, "h2")}
      {active && <Cursor />}
    </p>
  );
};

TypedHeading.propTypes = {
  text: PropTypes.string.isRequired,
  started: PropTypes.bool.isRequired,
  onDone: PropTypes.func,
};
