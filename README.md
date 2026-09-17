# ujjawalprasad.com

My personal site — experience, selected work, and how to reach me. Live at
**[ujjawalprasad.com](https://ujjawalprasad.com)**.

## The two ideas

**The hero types itself in HTML.** Instead of animating finished text, the hero types
out the markup — `<h1>I build <em>high-performance</em> systems.</h1>` — showing the
tags in monospace as they go, then collapsing each element into its real styling the
moment its closing tag lands. The section headings below it do the same, each one
starting when the previous finishes. It is a small joke about the medium, and it means
the page shows its own construction.

**The background is a real solver.** The drifting 3D plot behind the page is the output
of a custom inverse-kinematics solver for a 6-DOF robotic arm, written for
[OneShot](https://devpost.com/software/oneshot-03ucli) (Best Use of AMD Tech,
StarkHacks 2026). It is a Plotly scene in a sandboxed iframe: the site strips the
report chrome, restyles the axes to match the page, and orbits the camera on a
spring-damped path. The arrow pad in the top right rotates and tilts it.

## Stack

React 18 · Vite 5 · Tailwind CSS 4 · React Router 7 · lucide-react · Plotly (in the
background scene only) · deployed on Vercel with Vercel Analytics.

Type is Instrument Serif for display, Inter for body, JetBrains Mono for numerics.

## Running it locally

Needs Node 18 or newer.

```bash
npm install
npm run dev        # dev server on http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # serve the built output
npm run lint       # eslint, warnings treated as errors
```

## Where things live

| Path | What it is |
|---|---|
| `index.html` | Head tags, fonts, canonical URL, social preview |
| `src/App.jsx` | Routes, plus the background and analytics |
| `src/pages/Home.jsx` | Page layout — two columns on desktop, stacked on mobile, one section open at a time |
| `src/pages/NotFound.jsx` | 404 |
| `src/components/HeroSection.jsx` | The typed-HTML hero |
| `src/components/TypedHeading.jsx` | The typed section headings |
| `src/components/ExperienceSection.jsx` | Experience content |
| `src/components/ProjectsSection.jsx` | Selected work, including the project data |
| `src/components/ContactSection.jsx` | Contact details |
| `src/components/IkBackground.jsx` | The IK scene iframe, camera orbit, and controls |
| `src/lib/typing.js` | Shared skip / reduced-motion state for every typing animation |
| `src/index.css` | The whole theme — colors, fonts, custom utilities |
| `public/ik-viz.html` | The standalone Plotly IK visualization |
| `public/projects/` | Project screenshots (WebP) |
| `public/og-image.png` | Social preview card |

## Motion and screen readers

The typing is decoration, and the site treats it that way:

- **Reduced motion is honored.** If the browser reports
  `prefers-reduced-motion: reduce`, nothing types — the text is there on load, and the
  background's idle orbit stays parked (the arrow controls still work).
- **It can be skipped.** The first tap, click, or keypress anywhere finishes every
  animation immediately. Nobody who is already interacting waits for text to appear.
- **Screen readers get clean text.** The animated markup is `aria-hidden`; beside it
  sits a visually hidden copy of the finished hero carrying the page's only `<h1>`.
  Each section heading is a real `<h2>` wrapping its own toggle button, so the
  headings are navigable and the markup being typed is never read aloud.
- The background iframe is `aria-hidden` and outside the tab order.

## Contact

- Email — [ujjawalprasad111@gmail.com](mailto:ujjawalprasad111@gmail.com)
- LinkedIn — [ujjawal-prasad](https://www.linkedin.com/in/ujjawal-prasad/)
- GitHub — [8wali8](https://github.com/8wali8)
