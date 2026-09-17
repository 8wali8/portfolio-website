// Shared control for the site's typing animations.
//
// The animation is a flourish, not content: it is skipped outright for anyone
// who asked for reduced motion, and the first deliberate input (a tap, a
// click, any key) skips it for everyone else — someone who is already
// interacting should not be made to wait for text to finish appearing.
//
// The flag is module-global on purpose: the hero and every section heading
// share one decision, so a skip part-way through the cascade settles the
// headings that have not started yet.

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function reducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

let skipped = reducedMotion();

// One-shot subscribers, notified the moment the animation is skipped.
const listeners = new Set();

export function isTypingSkipped() {
  return skipped;
}

export function skipTyping() {
  if (skipped) return;
  skipped = true;
  // Copy first: a listener may unsubscribe while we are notifying.
  for (const listener of [...listeners]) listener();
  listeners.clear();
}

// Registers fn to run when the animation is skipped, and returns an
// unsubscribe. Already skipped means fn runs immediately.
export function onTypingSkip(fn) {
  if (skipped) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Sleep for the animation loops: resolves immediately once skipped, and a
// sleep already in flight is cut short rather than running out the clock.
export function typingSleep(ms) {
  if (skipped) return Promise.resolve();
  return new Promise((resolve) => {
    const wake = () => {
      clearTimeout(timer);
      resolve();
    };
    const timer = setTimeout(() => {
      listeners.delete(wake);
      resolve();
    }, ms);
    listeners.add(wake);
  });
}

if (typeof window !== "undefined") {
  // Capture phase, so a click on an interactive element still counts.
  const options = { once: true, capture: true, passive: true };
  window.addEventListener("pointerdown", skipTyping, options);
  window.addEventListener("keydown", skipTyping, options);
}
