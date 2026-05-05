import { useEffect, useRef } from "react";

export const IkBackground = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let raf = 0;
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
      const radius = 2.5;
      const swingAmp = Math.PI * 0.75;
      const tick = () => {
        if (stopped) return;
        angle += 0.0015 * dir;
        if (angle >= swingAmp || angle <= -swingAmp) dir *= -1;
        Plotly.relayout(el, {
          "scene.camera.eye": {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            z: 0.55,
          },
          "scene.camera.center": { x: 0, y: 0, z: -0.15 },
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

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
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    >
      <iframe
        ref={iframeRef}
        src="/ik-viz.html"
        title=""
        tabIndex={-1}
        className="absolute border-0"
        style={{
          opacity: 0.40,
          pointerEvents: "none",
          width: "130%",
          height: "130%",
          top: "-15%",
          left: "-15%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsl(38 30% 95% / 0.7) 100%)",
        }}
      />
      <div
        className="absolute bottom-4 right-4 font-numeric text-[10px] uppercase tracking-[0.18em] text-foreground/40 leading-snug text-right"
        style={{ pointerEvents: "none" }}
      >
        Background — custom IK solver
        <br />
        for 6 DOF robotic arm
      </div>
    </div>
  );
};
