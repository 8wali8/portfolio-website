import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from "lucide-react";

const YAW_STEP = Math.PI / 8;  // ~22.5° per click
const PITCH_STEP = 0.2;
const PITCH_MAX = 1.4;
const PITCH_MIN = -0.3;
const SPRING = 0.04;  // stiffness — higher = snappier
const DAMPING = 0.85;  // velocity retention — lower = more friction

export const IkBackground = () => {
  const iframeRef = useRef(null);
  const [ready, setReady] = useState(false);
  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0);

  const adjust = (dir) => {
    if (dir === "left") targetYawRef.current -= YAW_STEP;
    if (dir === "right") targetYawRef.current += YAW_STEP;
    if (dir === "up") targetPitchRef.current = Math.min(PITCH_MAX, targetPitchRef.current + PITCH_STEP);
    if (dir === "down") targetPitchRef.current = Math.max(PITCH_MIN, targetPitchRef.current - PITCH_STEP);
  };

  // Zeroing the targets is enough — the spring smoothly returns the camera.
  const handleReset = () => {
    targetYawRef.current = 0;
    targetPitchRef.current = 0;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let raf = 0;
    let fadeTimer = 0;
    let stopped = false;

    const tune = () => {
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc || !win.Plotly) return false;

      const el = doc.querySelector(".plotly-graph-div");
      if (!el) return false;

      const Plotly = win.Plotly;

      // Strip the surrounding report chrome so only the plot shows through.
      doc.querySelectorAll("h1, .summary").forEach((n) => {
        n.style.display = "none";
      });
      Object.assign(doc.documentElement.style, {
        width: "100%",
        height: "100%",
      });
      Object.assign(doc.body.style, {
        margin: "0",
        padding: "0",
        background: "transparent",
        width: "100%",
        height: "100%",
      });
      // Size el and its parent to fill the iframe, then tell Plotly to reflow.
      const container = el.parentElement;
      if (container) {
        Object.assign(container.style, { width: "100%", height: "100%" });
      }
      Object.assign(el.style, { width: "100%", height: "100%" });
      Plotly.Plots.resize(el);

      const axisBase = {
        visible: true,
        showbackground: true,
        backgroundcolor: "rgba(40, 28, 22, 0.04)",
        showgrid: true,
        gridcolor: "rgba(40, 28, 22, 0.35)",
        gridwidth: 1,
        showline: true,
        linecolor: "rgba(40, 28, 22, 0.9)",
        linewidth: 3,
        zeroline: true,
        zerolinecolor: "rgba(40, 28, 22, 0.75)",
        zerolinewidth: 3,
        showticklabels: false,
        ticks: "",
        showspikes: false,
      };
      const labelFont = { size: 14, color: "rgba(40, 28, 22, 0.8)", family: "JetBrains Mono, monospace" };

      Plotly.relayout(el, {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        margin: { l: 0, r: 0, t: 0, b: 0 },
        title: { text: "" },
        "scene.bgcolor": "rgba(0,0,0,0)",
        "scene.xaxis": { ...axisBase, title: { text: "x", font: labelFont } },
        "scene.yaxis": { ...axisBase, title: { text: "y", font: labelFont } },
        "scene.zaxis": { ...axisBase, title: { text: "z", font: labelFont } },
      });

      // Darken markers so they're actually visible on a cream background.
      const traceCount = (el.data || []).length;
      for (let i = 0; i < traceCount; i++) {
        Plotly.restyle(
          el,
          {
            "marker.color": "rgba(40, 28, 22, 0.55)",
            "marker.size": 1.6,
            "marker.opacity": 0.7,
            "line.color": "rgba(40, 28, 22, 0.4)",
          },
          [i]
        );
      }

      let angle = 0;
      let dir = 1;
      const radius = 3.8;
      const swingAmp = Math.PI * 0.75;
      // Spring-damper state — internal to the loop, no refs needed.
      let curYaw = 0, curPitch = 0;
      let velYaw = 0, velPitch = 0;
      const tick = () => {
        if (stopped) return;
        angle += 0.0015 * dir;
        if (angle >= swingAmp || angle <= -swingAmp) dir *= -1;
        // Accelerate toward target, decelerate on approach.
        velYaw = velYaw * DAMPING + (targetYawRef.current - curYaw) * SPRING;
        velPitch = velPitch * DAMPING + (targetPitchRef.current - curPitch) * SPRING;
        // Clamp: if this step would cross the target, land exactly on it.
        // Opposite signs on (cur - target) vs (cur + vel - target) means we crossed.
        if ((curYaw + velYaw - targetYawRef.current) * (curYaw - targetYawRef.current) < 0)
          velYaw = targetYawRef.current - curYaw;
        if ((curPitch + velPitch - targetPitchRef.current) * (curPitch - targetPitchRef.current) < 0)
          velPitch = targetPitchRef.current - curPitch;
        curYaw += velYaw;
        curPitch += velPitch;
        Plotly.relayout(el, {
          "scene.camera.eye": {
            x: radius * Math.cos(angle + curYaw),
            y: radius * Math.sin(angle + curYaw),
            z: 0.55 + curPitch,
          },
          "scene.camera.center": { x: 0, y: 0, z: -0.15 },
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Plotly's relayout/restyle calls are async — wait for the first
      // styled frame to actually be painted before revealing the iframe.
      fadeTimer = setTimeout(() => {
        if (!stopped) setReady(true);
      }, 250);

      return true;
    };

    // Plotly may finish initializing after onload, so poll briefly.
    const onLoad = () => {
      const start = Date.now();
      const interval = setInterval(() => {
        if (tune() || Date.now() - start > 8000) clearInterval(interval);
      }, 150);
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  const btnCls =
    "w-7 h-7 flex items-center justify-center rounded border border-border/50 bg-background/70 backdrop-blur-sm text-foreground/45 hover:text-foreground/80 hover:bg-background/90 transition-colors duration-150 cursor-pointer select-none";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{
          zIndex: 0,
          opacity: ready ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <iframe
          ref={iframeRef}
          src="/ik-viz.html"
          title=""
          tabIndex={-1}
          className="absolute border-0 ik-bg-iframe"
          style={{
            opacity: 0.4,
            pointerEvents: "none",
            width: "130%",
            height: "130%",
            top: "-5%",
            left: "5%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, hsl(38 30% 95% / 0.7) 100%)",
          }}
        />
      </div>

      {ready && (
        <div
          className="fixed top-4 right-4 flex flex-col items-center gap-1"
          style={{ zIndex: 50 }}
        >
          <div className="grid grid-cols-3 gap-1">
            <span />
            <button className={btnCls} onClick={() => adjust("up")} aria-label="Tilt up">
              <ArrowUp size={13} strokeWidth={1.75} />
            </button>
            <span />
            <button className={btnCls} onClick={() => adjust("left")} aria-label="Rotate left">
              <ArrowLeft size={13} strokeWidth={1.75} />
            </button>
            <span />
            <button className={btnCls} onClick={() => adjust("right")} aria-label="Rotate right">
              <ArrowRight size={13} strokeWidth={1.75} />
            </button>
            <span />
            <button className={btnCls} onClick={() => adjust("down")} aria-label="Tilt down">
              <ArrowDown size={13} strokeWidth={1.75} />
            </button>
            <span />
          </div>
          <button
            className="mt-0.5 h-6 w-full px-2 flex items-center justify-center gap-1 rounded border border-border/50 bg-background/70 backdrop-blur-sm text-foreground/45 hover:text-foreground/80 hover:bg-background/90 transition-colors duration-150 cursor-pointer select-none font-numeric text-[9px] uppercase tracking-[0.14em]"
            onClick={handleReset}
            aria-label="Reset orientation"
          >
            <RotateCcw size={9} strokeWidth={1.75} />
            reset
          </button>
        </div>
      )}

      <div
        className="fixed bottom-4 right-4 font-numeric text-[10px] uppercase tracking-[0.18em] text-foreground/40 leading-snug text-right pointer-events-none"
        style={{ zIndex: 50 }}
      >
        Background — custom IK solver
        <br />
        <a
          href="https://devpost.com/software/oneshot-03ucli"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto underline decoration-foreground/30 hover:decoration-foreground/70 hover:text-foreground/70 transition-colors duration-200"
        >
          for 6 DOF robotic arm
        </a>
      </div>
    </>
  );
};
