import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ──────────────────────────────────────────── */
const T = {
  white:   "#ffffff",
  off:     "#f7f6f3",
  paper:   "#faf9f6",
  rule:    "#e2e0da",
  rule2:   "#ccc9c0",
  ink:     "#111010",
  mid:     "#6b6860",
  muted:   "#9c9a94",
  red:     "#d42b2b",
  redDim:  "#f5dada",
  redHov:  "#b52020",
};

/* ─── GLOBAL STYLES (injected once) ─────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #fff; color: #111010; font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.65; overflow-x: hidden; }
  a { color: inherit; text-decoration: none; }

  .grid-bg {
    background-image:
      linear-gradient(#e2e0da 1px, transparent 1px),
      linear-gradient(90deg, #e2e0da 1px, transparent 1px);
    background-size: 56px 56px;
    /* --grid-offset updated by useScrollShift hook */
    background-position: var(--grid-offset, 0px) var(--grid-offset, 0px);
    transition: background-position 0.05s linear;
  }

  /* Ticker */
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-anim { animation: ticker 34s linear infinite; }

  /* Reveal is scroll-driven via JS (ScrollReveal component) — class is now a no-op */
  .reveal { will-change: transform, opacity; }

  /* Hero entrance — staged, fast, controlled */
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-animate {
    animation: heroFadeUp 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* Nav scroll state */
  .nav-scrolled {
    background: rgba(255,255,255,0.9) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
  }

  /* Reduced motion — disable everything */
  @media (prefers-reduced-motion: reduce) {
    .reveal, .hero-animate {
      transition: none !important;
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  /* Page transitions */
  .page-enter { opacity: 0; transform: translateY(10px); }
  .page-active { opacity: 1; transform: translateY(0); transition: opacity .35s ease, transform .35s ease; }

  /* Hover states — added translateY lift for tactile feel */
  .work-card { transition: background .15s, transform .2s cubic-bezier(0.22,1,0.36,1); }
  .work-card:hover { background: #f7f6f3 !important; transform: translateY(-4px); }
  .work-card:hover .card-bar { transform: scaleX(1) !important; }
  .svc-card { transition: background .15s, transform .2s cubic-bezier(0.22,1,0.36,1); }
  .svc-card:hover { background: #f5dada !important; transform: translateY(-4px); }
  .svc-card:hover .svc-big-num { color: #d42b2b !important; }
  .proc-row:hover { background: #f7f6f3 !important; }
  .proc-row:hover .proc-num { color: #d42b2b !important; }
  .plan-card { transition: border-color .15s, transform .2s cubic-bezier(0.22,1,0.36,1); }
  .plan-card:hover { border-color: #d42b2b !important; transform: translateY(-4px); }
  .plan-card:hover .plan-cta { background: #d42b2b !important; color: #fff !important; }
  .nav-link:hover { color: #111010 !important; background: #f7f6f3 !important; }
  .trade-row:hover { background: #f7f6f3 !important; color: #111010 !important; }
  .trade-row:hover::before { color: #d42b2b !important; }
  .contact-item:hover { background: rgba(255,255,255,.08) !important; color: #fff !important; }
  .hero-stat:hover { background: #f0efe9 !important; }
  .footer-link:hover { color: #d42b2b !important; }

  /* Mobile */
  @media(max-width:640px) {
    .nav-desktop { display: none !important; }
    .hero-sidebar { display: none !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-left { border-right: none !important; padding-right: 0 !important; }
    .work-grid-3 { grid-template-columns: 1fr !important; }
    .svc-grid-3 { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    .proc-name-col { display: none !important; }
    .proc-row { grid-template-columns: 56px 1fr !important; }
  }
  @media(max-width:860px) {
    .work-grid-3 { grid-template-columns: 1fr 1fr !important; }
    .svc-grid-3 { grid-template-columns: 1fr 1fr !important; }
  }
`;

/* ─── SECURITY UTILITIES ─────────────────────────────────────── */
// Sanitize any user-supplied string to prevent XSS
function sanitize(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Validate email format before any submission
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── SCROLL SHIFT HOOK ──────────────────────────────────────── */
// Updates --grid-offset CSS variable on scroll — drives subtle grid parallax
function useScrollShift() {
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const offset = (window.scrollY * 0.15).toFixed(2);
        document.documentElement.style.setProperty('--grid-offset', `${offset}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}

/* ─── REUSABLE COMPONENTS ────────────────────────────────────── */

function InkBtn({ children, onClick, href, variant = "primary", style = {} }) {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    padding: "13px 26px",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
    transition: "background .15s, color .15s, transform .1s",
    ...style,
  };
  const styles = {
    primary: { background: T.red, color: "#fff" },
    outline: { background: "transparent", color: T.ink, border: `1.5px solid ${T.ink}` },
    outlineWhite: { background: "transparent", color: "rgba(255,255,255,.7)", border: "1.5px solid rgba(255,255,255,.25)" },
    white: { background: "#fff", color: T.ink },
  };
  const combined = { ...base, ...styles[variant] };
  if (href) return <a href={href} style={combined}>{children}</a>;
  return <button onClick={onClick} style={combined}>{children}</button>;
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 11, fontWeight: 600,
      letterSpacing: ".1em", textTransform: "uppercase",
      padding: "3px 10px",
      border: `1px solid ${T.rule2}`,
      color: T.muted,
    }}>{children}</span>
  );
}

function SectionLabel({ num, text }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>
      {num && <span style={{ color: T.red, marginRight: 8 }}>{num}</span>}{text}
    </div>
  );
}

function Display({ children, size = "clamp(40px,5vw,68px)", style = {} }) {
  return (
    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size, letterSpacing: ".03em", lineHeight: 1, color: T.ink, ...style }}>
      {children}
    </h2>
  );
}

function Ticker() {
  const items = ["Lead Capture", "Job Booking Systems", "AI-Powered Follow-Up", "Local SEO", "Review Generation", "Social Content", "Short-Form Video", "Performance Analytics"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: T.ink, borderTop: `1.5px solid ${T.ink}`, borderBottom: `1.5px solid ${T.ink}`, overflow: "hidden", padding: "10px 0" }}>
      <div className="ticker-anim" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 28px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
            {t}
            <span style={{ width: 4, height: 4, background: T.red, borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SCROLL PROGRESS SYSTEM ─────────────────────────────────
 *
 * Architecture: module-level registry + rAF loop.
 * Styles are applied directly to DOM nodes — zero React re-renders.
 *
 * Progress formula per element:
 *   raw = (vh - rect.top) / (vh + rect.height)  → 0 when below fold, 1 when above
 *   p   = clamp(raw - index * 0.05, 0, 1)       → stagger by index
 *
 * Opacity: bell curve — fades in, holds, fades out
 *   opacity = clamp(p*3, 0,1) * clamp((1-p)*3, 0,1)
 *   (peaks at 1.0 in the middle third of travel)
 *
 * Transform: translateY 30→0→-30 + scale 0.96→1→0.96
 * ─────────────────────────────────────────────────────────── */
let _srIdCounter = 0;
const _srRegistry = new Map(); // id → { el, index, intensity }
let _srRafId = null;

// Detect reduced-motion preference once at load
const _srReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function _srTick() {
  if (_srRegistry.size === 0) { _srRafId = null; return; }
  const vh = window.innerHeight;

  // ── Read phase (batch getBoundingClientRect — no interleaved writes) ──
  const batch = [];
  for (const [, entry] of _srRegistry) {
    if (!entry.el) continue;
    batch.push({ el: entry.el, rect: entry.el.getBoundingClientRect(), idx: entry.index, int: entry.intensity });
  }

  // ── Write phase ──
  for (const { el, rect, idx, int } of batch) {
    if (_srReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      continue;
    }
    const raw = (vh - rect.top) / (vh + rect.height);
    const p   = Math.max(0, Math.min(1, raw - idx * 0.05)); // stagger

    // Bell-curve opacity: fade in → hold (full opacity) → fade out
    const opacity = Math.min(p * 3, 1) * Math.min((1 - p) * 3, 1);
    // Gentle vertical drift: 30px below → 0 → -30px above
    const ty = (1 - p * 2) * 30 * int;
    // Subtle scale: 0.96 → 1.00 → 0.96
    const sc = 1 - 0.04 * Math.abs(p * 2 - 1) * int;

    el.style.opacity      = opacity.toFixed(3);
    el.style.transform    = `translateY(${ty.toFixed(1)}px) scale(${sc.toFixed(4)})`;
  }

  _srRafId = requestAnimationFrame(_srTick);
}

function _srRegister(el, index, intensity) {
  const id = ++_srIdCounter;
  _srRegistry.set(id, { el, index, intensity });
  if (!_srRafId) _srRafId = requestAnimationFrame(_srTick);
  return id;
}

/* ScrollReveal — scroll-progress-driven reveal component
   Props:
   - index     : stagger order (0, 1, 2…) — later items appear slightly after
   - intensity : motion strength multiplier (default 1, use 0.5 for subtler)
   - style     : passed through to wrapper div
*/
function ScrollReveal({ children, index = 0, intensity = 1, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const id = _srRegister(ref.current, index, intensity);
    return () => { _srRegistry.delete(id); };
  }, [index, intensity]);

  return (
    <div ref={ref} style={{ opacity: 0, willChange: "transform, opacity", ...style }}>
      {children}
    </div>
  );
}

/* Reveal — backwards-compatible shim around ScrollReveal
   Existing <Reveal delay={i*80}> usage maps delay → stagger index
*/
function Reveal({ children, delay = 0, style = {} }) {
  const index = Math.round(delay / 80);
  return <ScrollReveal index={index} style={style}>{children}</ScrollReveal>;
}

/* ─── NAV ─────────────────────────────────────────────────────── */
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { label: "Home", key: "home" },
    { label: "Work", key: "work" },
    { label: "Pricing", key: "pricing" },
    { label: "Process", key: "process" },
    { label: "About", key: "about" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.9)" : T.white,
      backdropFilter: scrolled ? "blur(10px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: `1.5px solid ${T.ink}`,
      transition: "background 0.2s ease, backdrop-filter 0.2s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div style={{ width: 8, height: 8, background: T.red, borderRadius: "50%" }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: ".06em", color: T.ink }}>
            OBSESSIVE AGENCY
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center" }}>
          {links.map(l => (
            <button
              key={l.key}
              className="nav-link"
              onClick={() => setPage(l.key)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
                color: page === l.key ? T.ink : T.mid,
                padding: "8px 16px",
                borderLeft: `1px solid ${T.rule}`,
                background: page === l.key ? T.off : "transparent",
                border: "none",
                borderLeft: `1px solid ${T.rule}`,
                cursor: "pointer",
                transition: "color .15s, background .15s",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setPage("contact")}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
              padding: "10px 22px",
              background: page === "contact" ? T.red : T.ink,
              color: "#fff",
              borderLeft: `1px solid ${T.ink}`,
              border: "none",
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            Book a Consultation
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── HOME PAGE ───────────────────────────────────────────────── */
function HomePage({ setPage }) {
  useScrollShift(); // drives subtle grid background parallax on scroll
  const trades = ["Plumbing & HVAC", "Electrical", "Roofing", "Landscaping", "General Contracting", "Painting & Finishing"];

  return (
    <div className="page-enter page-active">
      {/* HERO */}
      <div className="grid-bg" style={{ borderBottom: `1.5px solid ${T.ink}`, position: "relative", overflow: "hidden" }}>
        <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 360px", minHeight: "calc(100vh - 60px)", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div className="hero-left" style={{ borderRight: `1.5px solid ${T.ink}`, padding: "72px 56px 72px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <ScrollReveal index={0} intensity={0.6}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: T.muted, display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                  <span style={{ width: 32, height: 2, background: T.red, display: "inline-block", flexShrink: 0 }} />
                  Websites That Get You Customers · Chicago, IL
                </div>
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px,10vw,148px)", lineHeight: .92, letterSpacing: ".01em", color: T.ink }}>
                  YOUR SITE<br />SHOULD WORK<br />AS HARD<br />
                  <span style={{ color: T.red }}>AS YOU DO.</span>
                </h1>
              </ScrollReveal>
            </div>
            <ScrollReveal index={1} intensity={0.6}>
              <div style={{ borderTop: `1px solid ${T.rule2}`, paddingTop: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginTop: 40 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.mid, maxWidth: 420, lineHeight: 1.75 }}>
                  We design and build websites for small businesses that turn visitors into paying customers.{" "}
                  <strong style={{ color: T.ink, fontWeight: 600 }}>$0 upfront. From $99/mo. No contracts.</strong>
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
                  <InkBtn onClick={() => setPage("contact")}>Book a Free Call →</InkBtn>
                  <InkBtn variant="outline" onClick={() => setPage("work")}>See Results →</InkBtn>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right sidebar */}
          <div className="hero-sidebar" style={{ padding: "72px 0 72px 40px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 32 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.muted, marginBottom: 14 }}>
                Industries we serve
              </div>
              <div style={{ border: `1.5px solid ${T.ink}` }}>
                {trades.map((t, i) => (
                  <div key={i} className="trade-row" style={{
                    padding: "11px 16px", fontSize: 13, fontWeight: 500, color: T.mid,
                    borderBottom: i < trades.length - 1 ? `1px solid ${T.rule}` : "none",
                    display: "flex", alignItems: "center", gap: 10,
                    transition: "background .15s, color .15s", cursor: "default",
                  }}>
                    <span style={{ color: T.rule2, fontSize: 12 }}>→</span> {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.muted, marginBottom: 12 }}>
                At a glance
              </div>
              {[["$0", "Upfront cost"], ["$99", "Starting / month"], ["24H", "Avg. turnaround"]].map(([val, lbl], i) => (
                <div key={i} className="hero-stat" style={{ background: T.off, border: `1px solid ${T.rule}`, padding: "14px 16px", marginBottom: 1, transition: "background .15s", cursor: "default" }}>
                  <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: T.ink, display: "block", lineHeight: 1 }}>{val}</strong>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: T.muted }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Ticker />

      {/* PROBLEM STATEMENT */}
      <div style={{ background: T.ink, padding: "48px 32px", borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(17px,2vw,22px)", color: "rgba(255,255,255,.85)", lineHeight: 1.7, maxWidth: 680 }}>
            Most websites look good. Very few actually convert.{" "}
            <span style={{ color: T.red, fontWeight: 600 }}>If your site isn't generating customers, it's not doing its job.</span>
          </p>
          <InkBtn variant="white" onClick={() => setPage("contact")}>Fix My Site →</InkBtn>
        </div>
      </div>

      {/* WHY OBSESSIVE */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
              <div>
                <SectionLabel text="Why Obsessive Agency" />
                <Display>Most agencies sell you a website.<br />We sell you results.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 420, lineHeight: 1.75, alignSelf: "flex-end" }}>
                No 6-week timelines. No $5,000 deposits. No disappearing after launch. We're obsessive about one thing: making your site book you jobs.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `1.5px solid ${T.ink}` }} className="svc-grid-3">
            {[
              { icon: "◎", title: "$0 to start. $99/mo. Cancel anytime.", body: "No deposit. No setup fee. Your first payment is your first monthly bill — nothing more. Traditional agencies charge $3,000–$8,000 before they write a single line of code." },
              { icon: "\u2197\uFE0E", title: "Live in 48 hours.", body: "From kickoff call to live, indexed website in under 48 hours. While competitors wait 6 weeks, you're already showing up in search and taking calls." },
              { icon: "▲", title: "Built to convert, not just look good.", body: "Every site ships with click-to-call, lead capture forms, local SEO structure, and Google review prompts. Obsessive about performance — not just aesthetics." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ padding: "36px 32px", borderRight: i < 2 ? `1px solid ${T.ink}` : "none", background: T.white }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.rule2, marginBottom: 16 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: ".02em", color: T.ink, marginBottom: 10 }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* MINI WORK PREVIEW */}
      <div style={{ background: T.off, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <SectionLabel text="Featured Work" />
                <Display>Real clients. Measurable results.</Display>
              </div>
              <InkBtn variant="outline" onClick={() => setPage("work")}>View all work →</InkBtn>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ border: `1.5px solid ${T.ink}`, background: T.white, padding: "28px 32px", display: "flex", alignItems: "center", gap: 32, justifyContent: "space-between", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.red, marginBottom: 6 }}>Cruz Air LLC — HVAC · Chicagoland</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.ink, marginBottom: 8 }}>FROM NO WEBSITE TO BOOKED SOLID</div>
                <p style={{ fontSize: 13, color: T.mid, maxWidth: 500 }}>
                  Cruz Air had no web presence and was losing jobs to competitors on Google. We built a full site — service pages, lead forms, local SEO — in 48 hours. Lead inquiries up 38% in month one.
                </p>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                {[["Live", "Status"], ["HVAC", "Industry"], ["Standard+", "Plan"]].map(([v, l]) => (
                  <div key={l} style={{ background: T.off, border: `1px solid ${T.rule2}`, padding: "10px 14px" }}>
                    <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.ink, display: "block", lineHeight: 1 }}>{v}</strong>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 10, color: T.muted, letterSpacing: ".06em", textTransform: "uppercase" }}>{l}</span>
                  </div>
                ))}
                <a href="https://keteaonksmith.github.io/oa-preview-cruz-air-llc/" target="_blank" rel="noopener noreferrer">
                  <InkBtn>View Live Site →</InkBtn>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}`, borderTop: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 32px 0" }}>
          <Reveal>
            <div style={{ borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 0 }}>
              <SectionLabel text="What clients say" />
              <Display>Don't take our word for it.</Display>
            </div>
          </Reveal>
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 56px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }} className="svc-grid-3">
          {[
              { quote: "Phone started ringing in the first week. Wish I'd done this two years ago.", name: "Mike R.", co: "Plumbing contractor, Chicago IL" },
              { quote: "We went from zero web presence to fully booked in 60 days. It paid for itself in week two.", name: "Dana T.", co: "HVAC owner, Naperville IL" },
              { quote: "I was skeptical about $99/mo. Now I send every contractor I know to Obsessive Agency.", name: "Carlos M.", co: "General contractor, Aurora IL" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ padding: "36px 32px", borderRight: i < 2 ? `1px solid ${T.ink}` : "none" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.red, marginBottom: 16, lineHeight: 1 }}>★★★★★</div>
                  <p style={{ fontSize: 15, color: T.ink, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: T.ink }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.muted }}>{t.co}</div>
                </div>
              </Reveal>
            ))}
        </div>
      </div>

      {/* CTA STRIP */}
      <div style={{ background: T.ink, padding: "72px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,5vw,80px)", color: "#fff", lineHeight: .95, letterSpacing: ".02em", marginBottom: 12 }}>
              YOUR WEBSITE SHOULD BE<br />YOUR BEST<br /><span style={{ color: T.red }}>SALESPERSON.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", maxWidth: 480, lineHeight: 1.75 }}>
              If your site isn't booking you jobs while you sleep, something is wrong. We'll fix it — no deposit, no contract, cancel anytime.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <InkBtn variant="white" onClick={() => setPage("contact")}>Book a Free Call →</InkBtn>
            <InkBtn variant="outlineWhite" onClick={() => setPage("pricing")}>See Pricing</InkBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── WORK PAGE ───────────────────────────────────────────────── */
function WorkPage() {
  const cases = [
    { client: "Cruz Air LLC", title: "ZERO TO BOOKED IN 24H", desc: "Cruz Air had no web presence and was losing jobs to better-ranked competitors. Goal: a fast, professional site that ranks locally and converts visitors into calls.", url: "https://keteaonksmith.github.io/oa-preview-cruz-air-llc/", metrics: [["+38%", "Lead inquiries"], ["24H", "Live turnaround"]], industry: "HVAC", plan: "Standard+" },
    { client: "Up Beet Life", title: "PACKED THE SHOP IN ONE DAY", desc: "A local fitness studio needed to fill a slow Wednesday with an event push. Goal: drive foot traffic fast with organic social. Result: standing room only.", metrics: [["+38%", "Day-of foot traffic"], ["75k", "Views in 24h"]], industry: "Wellness", plan: "Content" },
    { client: "Special T Unlimited", title: "12 NEW ACCOUNTS IN 30 DAYS", desc: "A merch company targeting schools and sports teams needed faster lead conversion. Goal: sharper outreach content and a cleaner pitch. Result: 12 new recurring accounts.", metrics: [["+22%", "Lead reply rate"], ["12", "New accounts"]], industry: "Merch", plan: "Starter" },
  ];

  return (
    <div className="page-enter page-active">
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
              <div>
                <SectionLabel text="Selected Work" />
                <Display>Results we've shipped.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 480, alignSelf: "flex-end", lineHeight: 1.75 }}>
                Real outcomes for real businesses — foot traffic, lead replies, and conversion lifts you can measure.
              </p>
            </div>
          </Reveal>

          <div className="work-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `1.5px solid ${T.ink}` }}>
            {cases.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="work-card" style={{ padding: "28px 24px", borderRight: i < cases.length - 1 ? `1px solid ${T.ink}` : "none", display: "flex", flexDirection: "column", background: T.white, position: "relative", overflow: "hidden", transition: "background .15s" }}>
                  <div className="card-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.red, transform: "scaleX(0)", transformOrigin: "left", transition: "transform .3s ease" }} />
                  {/* Hatched thumb */}
                  <div style={{ aspectRatio: "16/9", background: T.off, border: `1px solid ${T.rule2}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, #e2e0da 8px, #e2e0da 9px)" }} />
                    <span style={{ position: "relative", zIndex: 1, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: ".08em", color: T.muted }}>
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: T.red, fontWeight: 600 }}>View Live Site ↗</a>
                      ) : "Drop media here"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                    <Tag>{c.industry}</Tag>
                    <Tag>{c.plan}</Tag>
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.red, marginBottom: 6 }}>{c.client}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: ".02em", color: T.ink, marginBottom: 8, lineHeight: 1 }}>{c.title}</div>
                  <p style={{ fontSize: 13, color: T.mid, marginBottom: 20, flex: 1, lineHeight: 1.7 }}>{c.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.metrics.map(([v, l]) => (
                      <div key={l} style={{ background: T.off, border: `1px solid ${T.rule2}`, padding: "9px 13px" }}>
                        <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.ink, display: "block", lineHeight: 1 }}>{v}</strong>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, color: T.muted, letterSpacing: ".06em", textTransform: "uppercase" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRICING PAGE ────────────────────────────────────────────── */
function PricingPage({ setPage }) {
  const plans = [
    {
      name: "STARTER",
      price: "$99",
      period: "/ month",
      tag: "Perfect for getting online fast",
      highlight: false,
      features: [
        "Professional single-page website",
        "Lead capture form (email delivery)",
        "Mobile-responsive design",
        "Google Business profile setup",
        "Basic local SEO structure",
        "Contact page + service summary",
        "Free setup — $0 upfront",
        "Cancel anytime",
      ],
      notIncluded: [
        "Multi-page site structure",
        "Monthly analytics reports",
        "AI follow-up sequences",
        "Review generation automation",
      ],
      cta: "Start with Starter",
    },
    {
      name: "STANDARD+",
      price: "$149",
      period: "/ month",
      tag: "Our most popular — the full system",
      highlight: true,
      features: [
        "Everything in Starter, plus:",
        "Multi-page site (Home, Services, About, Contact)",
        "AI-powered lead follow-up sequences",
        "Automated review request system",
        "Monthly analytics report (leads, traffic, conversions)",
        "Service area pages (local SEO)",
        "Photo gallery / project showcase",
        "Priority support & updates",
        "Free setup — $0 upfront",
        "Cancel anytime",
      ],
      notIncluded: [],
      cta: "Start with Standard+",
    },
  ];

  return (
    <div className="page-enter page-active">
      {/* Hero */}
      <div className="grid-bg" style={{ borderBottom: `1.5px solid ${T.ink}`, padding: "80px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel text="Pricing" />
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,8vw,120px)", lineHeight: .92, color: T.ink, marginBottom: 20, letterSpacing: ".01em" }}>
              $0 UPFRONT.<br /><span style={{ color: T.red }}>ALWAYS.</span>
            </h1>
            <p style={{ fontSize: 17, color: T.mid, maxWidth: 560, lineHeight: 1.75 }}>
              No setup fees, no contracts. You pay monthly, we stay accountable. Pick the plan that fits where your business is today.
            </p>
          </Reveal>
        </div>
      </div>

      <Ticker />

      {/* Plan cards */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.ink }}>
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="plan-card" style={{
                background: plan.highlight ? T.ink : T.white,
                padding: "48px 44px",
                border: plan.highlight ? `3px solid ${T.red}` : `1px solid transparent`,
                transition: "border-color .2s",
                position: "relative",
              }}>
                {plan.highlight && (
                  <div style={{ position: "absolute", top: 20, right: 20, background: T.red, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", padding: "4px 10px" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: plan.highlight ? "rgba(255,255,255,.4)" : T.muted, marginBottom: 12 }}>
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: plan.highlight ? "#fff" : T.ink, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 16, color: plan.highlight ? "rgba(255,255,255,.5)" : T.mid }}>{plan.period}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: plan.highlight ? "rgba(255,255,255,.5)" : T.mid, marginBottom: 32, borderBottom: `1px solid ${plan.highlight ? "rgba(255,255,255,.1)" : T.rule}`, paddingBottom: 20 }}>
                  {plan.tag}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: plan.highlight ? "rgba(255,255,255,.85)" : T.ink }}>
                      <span style={{ color: T.red, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </div>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: plan.highlight ? "rgba(255,255,255,.3)" : T.muted, textDecoration: "line-through" }}>
                      <span style={{ color: T.muted, flexShrink: 0, marginTop: 1 }}>✗</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  className="plan-cta"
                  onClick={() => setPage("contact")}
                  style={{
                    width: "100%",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase",
                    padding: "16px 0",
                    background: plan.highlight ? T.red : "transparent",
                    color: plan.highlight ? "#fff" : T.ink,
                    border: plan.highlight ? "none" : `1.5px solid ${T.ink}`,
                    cursor: "pointer",
                    transition: "background .15s, color .15s",
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparison note */}
        <Reveal delay={200}>
          <div style={{ marginTop: 48, padding: "32px 36px", background: T.off, border: `1.5px solid ${T.ink}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: T.ink, marginBottom: 6 }}>NOT SURE WHICH PLAN?</div>
              <p style={{ fontSize: 13, color: T.mid, maxWidth: 500 }}>
                Book a free 30-minute call. We'll review your business, walk through both options, and tell you honestly which one makes sense for where you're at.
              </p>
            </div>
            <InkBtn onClick={() => setPage("contact")}>Book a Free Call →</InkBtn>
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <div style={{ background: T.off, borderTop: `1.5px solid ${T.ink}`, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <SectionLabel text="Common Questions" />
            <Display style={{ marginBottom: 48 }}>FAQ</Display>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.ink }} className="pricing-grid">
            {[
              ["Do I really pay nothing upfront?", "Correct. We build and launch your site, then your billing starts. No setup fees, ever."],
              ["Can I cancel at any time?", "Yes. No cancellation fees, no notice period. Just let us know."],
              ["What's included in the monthly analytics report?", "Standard+ clients receive a monthly PDF covering site traffic, lead form submissions, conversion rates, and SEO keyword rankings."],
              ["Do I own the site?", "While you're a client, we host and maintain the site. If you cancel, we can transfer files to you — we'll never hold your content hostage."],
              ["How long does it take to go live?", "Most sites are live within 48–72 hours of our kickoff call."],
              ["What if I need changes?", "Starter gets minor updates included. Standard+ gets unlimited content updates and priority support."],
            ].map(([q, a], i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: T.white, padding: "28px 32px", borderBottom: i < 4 ? `1px solid ${T.rule}` : "none" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.ink, marginBottom: 10 }}>{q}</div>
                  <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.75 }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROCESS PAGE ────────────────────────────────────────────── */
function ProcessPage({ setPage }) {
  const steps = [
    { num: "01", name: "DISCOVERY", detail: "30-minute call. We map your trade, your leads, and your current web presence. No fluff, no upsell — just alignment on what matters." },
    { num: "02", name: "BLUEPRINT", detail: "We spec the site structure, page layout, and content plan. You approve the direction before we write a single line of code." },
    { num: "03", name: "BUILD", detail: "Site goes up. Lead capture forms, service pages, and mobile layout are all tested before you see it." },
    { num: "04", name: "REVIEW", detail: "You get a preview link and a round of revisions. We don't go live until you're happy." },
    { num: "05", name: "LAUNCH", detail: "Site is live, DNS is pointed, Google is indexed, and you start receiving lead notifications directly to your phone or email." },
    { num: "06", name: "ITERATE", detail: "Monthly check-ins on what's converting and what's not. Standard+ clients receive a full analytics report each month." },
  ];

  return (
    <div className="page-enter page-active">
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
              <div>
                <SectionLabel text="How It Works" />
                <Display>From call to live in days.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 440, alignSelf: "flex-end", lineHeight: 1.75 }}>
                We've built this process to be as frictionless as possible on your end. You talk to us, we handle everything else.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ border: `1.5px solid ${T.ink}` }}>
              {steps.map((s, i) => (
                <div key={i} className="proc-row" style={{ display: "grid", gridTemplateColumns: "72px 200px 1fr", borderBottom: i < steps.length - 1 ? `1px solid ${T.rule2}` : "none", minHeight: 80, transition: "background .15s" }}>
                  <div className="proc-num" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.rule2, padding: "20px 16px", borderRight: `1px solid ${T.rule2}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "color .2s" }}>
                    {s.num}
                  </div>
                  <div className="proc-name-col" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: ".02em", color: T.ink, padding: "20px 24px", borderRight: `1px solid ${T.rule2}`, display: "flex", alignItems: "center" }}>
                    {s.name}
                  </div>
                  <div style={{ padding: "20px 28px", fontSize: 14, color: T.mid, lineHeight: 1.75, display: "flex", alignItems: "center" }}>
                    {s.detail}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ marginTop: 48, padding: "36px", background: T.ink, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#fff", marginBottom: 8 }}>READY TO START?</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>Step 1 is just a 30-minute call. No commitment.</p>
              </div>
              <InkBtn variant="white" onClick={() => setPage("contact")}>Book a Free Call →</InkBtn>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE ──────────────────────────────────────────────── */
function AboutPage({ setPage }) {
  return (
    <div className="page-enter page-active">
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal>
            <div style={{ borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 64 }}>
              <SectionLabel text="About Us" />
              <Display size="clamp(48px,6vw,80px)">Chicago-built.<br />Trade-focused.</Display>
            </div>
          </Reveal>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1.5px solid ${T.ink}` }}>
            <div style={{ padding: "48px 48px 48px 40px", borderRight: `1px solid ${T.ink}` }}>
              <Reveal>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: .95, color: T.ink, marginBottom: 28 }}>OBSESSIVELY<br />SIMPLE ON<br />YOUR END.</h3>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.8, marginBottom: 16 }}>
                  Obsessive Agency is a Chicago creative shop led by Liam — filmmakers, editors, and systems builders who speak fluent short-form and fluent trade.
                </p>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.8, marginBottom: 16 }}>
                  We work with HVAC companies, plumbers, roofers, landscapers, and general contractors who want a real digital presence without hiring a full marketing team.
                </p>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.8, marginBottom: 32 }}>
                  Everything we build is quietly powerful under the hood — AI lead follow-up, review automation, analytics — but simple enough that you never have to think about it.
                </p>
                <InkBtn onClick={() => setPage("contact")}>Work with us →</InkBtn>
              </Reveal>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {[["3+", "Years in market"], ["$0", "Upfront, always"], ["24H", "Avg. go-live time"], ["100%", "Trade-focused"]].map(([v, l], i) => (
                <div key={i} style={{ padding: "32px 28px", borderBottom: i < 2 ? `1px solid ${T.rule2}` : "none", borderRight: i % 2 === 0 ? `1px solid ${T.rule2}` : "none" }}>
                  <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: T.ink, display: "block", lineHeight: 1 }}>{v}</strong>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 11, color: T.muted, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ────────────────────────────────────────────── */
function ContactPage() {
  // Secure form state — never stored in localStorage/sessionStorage
  const [form, setForm] = useState({ name: "", email: "", phone: "", trade: "", message: "", plan: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const TRADE_OPTIONS = ["Plumbing & HVAC", "Electrical", "Roofing", "Landscaping", "General Contracting", "Painting & Finishing", "Other"];
  const PLAN_OPTIONS = ["Not sure yet", "Starter ($99/mo)", "Standard+ ($149/mo)"];

  // Sanitized change handler
  const handleChange = useCallback((field, raw) => {
    // Strip any HTML/script injection attempts before storing
    const safe = sanitize(raw).slice(0, 1000);
    setForm(prev => ({ ...prev, [field]: safe }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    if (!form.trade) e.trade = "Select your trade";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    // In production: POST to your backend API endpoint over HTTPS
    // We never send sensitive data to third-party scripts client-side
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Clear form data from memory after submission
      setForm({ name: "", email: "", phone: "", trade: "", message: "", plan: "" });
    }, 900);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 14px",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    background: T.white,
    border: `1.5px solid ${errors[field] ? T.red : T.rule2}`,
    color: T.ink, outline: "none",
    transition: "border-color .15s",
  });

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
    fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
    color: T.mid, display: "block", marginBottom: 6,
  };

  return (
    <div className="page-enter page-active">
      {/* Hero strip */}
      <div style={{ background: T.ink, borderBottom: `1.5px solid ${T.ink}`, padding: "72px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,8vw,120px)", color: "#fff", lineHeight: .92, letterSpacing: ".01em" }}>
              READY WHEN<br /><span style={{ color: T.red }}>YOU ARE.</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,.5)", marginTop: 20, maxWidth: 500, lineHeight: 1.75 }}>
              Book a call or send us a message. We respond same day and move fast once we're aligned.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.ink }}>

          {/* Left — info */}
          <div style={{ background: T.white, padding: "48px 44px" }}>
            <Reveal>
              <div style={{ marginBottom: 40 }}>
                <SectionLabel text="Direct contact" />
                <a href="mailto:obsessiveagency@gmail.com" className="footer-link" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: T.ink, letterSpacing: ".04em", display: "block", marginBottom: 4, transition: "color .15s" }}>
                  obsessiveagency@gmail.com
                </a>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.muted }}>We respond within a few hours, usually same day.</span>
              </div>

              <div style={{ marginBottom: 40 }}>
                <SectionLabel text="Based in" />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.ink, letterSpacing: ".04em" }}>CHICAGO, ILLINOIS</div>
                <p style={{ fontSize: 13, color: T.mid, marginTop: 4 }}>Serving trade businesses across Chicagoland and remotely across the US.</p>
              </div>

              <div>
                <SectionLabel text="What happens on the call" />
                <div style={{ border: `1.5px solid ${T.ink}` }}>
                  {[
                    ["Step 01", "We review your current web presence"],
                    ["Step 02", "We map out your lead flow gaps"],
                    ["Step 03", "We walk through a custom proposal"],
                    ["Step 04", "No obligation — you decide"],
                  ].map(([s, d], i) => (
                    <div key={i} className="contact-item" style={{ padding: "16px 20px", borderBottom: i < 3 ? `1px solid ${T.rule}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 14, color: T.mid, transition: "background .15s" }}>
                      <div>
                        <strong style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.muted, display: "block" }}>{s}</strong>
                        {d}
                      </div>
                      <span style={{ color: T.red, fontSize: 18, flexShrink: 0 }}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — secure form */}
          <div style={{ background: T.off, padding: "48px 44px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: T.red, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.ink, marginBottom: 12 }}>MESSAGE SENT</div>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75 }}>We'll be in touch within a few hours.<br />Check your inbox — including spam just in case.</p>
              </div>
            ) : (
              <Reveal>
                <SectionLabel text="Send a message" />
                <Display style={{ marginBottom: 32 }}>GET IN<br />TOUCH.</Display>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      placeholder="Your name"
                      maxLength={100}
                      autoComplete="off"
                      style={inputStyle("name")}
                    />
                    {errors.name && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      placeholder="you@company.com"
                      maxLength={200}
                      autoComplete="off"
                      style={inputStyle("email")}
                    />
                    {errors.email && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => handleChange("phone", e.target.value)}
                      placeholder="(555) 000-0000"
                      maxLength={20}
                      style={inputStyle("phone")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Your Trade *</label>
                    <select
                      value={form.trade}
                      onChange={e => handleChange("trade", e.target.value)}
                      style={{ ...inputStyle("trade"), cursor: "pointer" }}
                    >
                      <option value="">Select trade...</option>
                      {TRADE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.trade && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.trade}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Interested plan</label>
                  <select
                    value={form.plan}
                    onChange={e => handleChange("plan", e.target.value)}
                    style={{ ...inputStyle("plan"), cursor: "pointer" }}
                  >
                    <option value="">Select a plan...</option>
                    {PLAN_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    placeholder="Tell us about your business and what you're looking for..."
                    maxLength={1000}
                    rows={4}
                    style={{ ...inputStyle("message"), resize: "vertical", fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                <p style={{ fontSize: 11, color: T.muted, marginBottom: 16, lineHeight: 1.6 }}>
                  Your information is used only to respond to your inquiry. We never sell or share your data with third parties.
                </p>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    width: "100%",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase",
                    padding: 16,
                    background: submitting ? T.muted : T.red,
                    color: "#fff", border: "none", cursor: submitting ? "wait" : "pointer",
                    transition: "background .15s",
                  }}
                >
                  {submitting ? "Sending..." : "Send Message →"}
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ background: T.ink, borderTop: `1.5px solid ${T.ink}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginBottom: 40, borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, background: T.red, borderRadius: "50%" }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff", letterSpacing: ".06em" }}>OBSESSIVE AGENCY</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.75 }}>
              Professional websites for local trade companies. Chicago-built, trade-focused.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 16 }}>Navigation</div>
            {[["Home","home"],["Work","work"],["Pricing","pricing"],["Process","process"],["About","about"],["Contact","contact"]].map(([l,k]) => (
              <button key={k} className="footer-link" onClick={() => setPage(k)} style={{ display: "block", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 8, cursor: "pointer", padding: 0, transition: "color .15s" }}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 16 }}>Contact</div>
            <a href="mailto:obsessiveagency@gmail.com" className="footer-link" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 8, transition: "color .15s" }}>
              obsessiveagency@gmail.com
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)" }}>Chicago, Illinois</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)", letterSpacing: ".04em" }}>
            © {new Date().getFullYear()} Obsessive Agency — All rights reserved
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,.2)", letterSpacing: ".04em" }}>
            $0 upfront · Cancel anytime
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  // Inject global styles once
  useEffect(() => {
    const existing = document.getElementById("oa-global-styles");
    if (existing) return;
    const style = document.createElement("style");
    style.id = "oa-global-styles";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);

    // Security: set CSP meta tag
    const csp = document.createElement("meta");
    csp.httpEquiv = "Content-Security-Policy";
    csp.content = "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';";
    document.head.appendChild(csp);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = (key) => setPage(key);

  return (
    <div>
      <Nav page={page} setPage={navigate} />
      {page === "home"    && <HomePage    setPage={navigate} />}
      {page === "work"    && <WorkPage    />}
      {page === "pricing" && <PricingPage setPage={navigate} />}
      {page === "process" && <ProcessPage setPage={navigate} />}
      {page === "about"   && <AboutPage   setPage={navigate} />}
      {page === "contact" && <ContactPage />}
      <Footer setPage={navigate} />
    </div>
  );
}