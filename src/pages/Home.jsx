import { T } from '../tokens.js'
import { Reveal, Ticker, InkBtn, Display, SectionLabel } from '../components/shared.jsx'

const TRADES = ['Plumbing & HVAC', 'Electrical', 'Roofing', 'Landscaping', 'General Contracting', 'Painting & Finishing']

export default function HomePage({ setPage }) {
  return (
    <div>
      {/* ── URGENCY BANNER ───────────────────── */}
      <div style={{ background: T.red, padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <span style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
          fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff',
        }}>
          Now booking May clients — 2 onboarding slots remaining
        </span>
        <button
          onClick={() => setPage('contact')}
          className="urgency-link"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,.75)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '.06em', textDecoration: 'underline' }}
        >
          Claim yours →
        </button>
      </div>

      {/* ── HERO ─────────────────────────────── */}
      <div className="hero" style={{ borderBottom: `1.5px solid ${T.ink}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: '1fr 360px',
          minHeight: 'calc(100vh - 104px)', position: 'relative', zIndex: 1,
        }}>
          {/* Left */}
          <div className="hero-left" style={{
            borderRight: `1.5px solid ${T.ink}`,
            padding: '72px 56px 72px 0',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
                color: T.muted, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
              }}>
                <span style={{ width: 32, height: 2, background: T.red, display: 'inline-block', flexShrink: 0 }} />
                Professional Websites · Chicago, IL · Est. 2024
              </div>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(72px,10vw,148px)',
                lineHeight: .92, letterSpacing: '.01em', color: T.ink,
              }}>
                YOUR NEXT<br />CUSTOMER<br />IS SEARCHING<br />
                <span style={{ color: T.red }}>RIGHT NOW.</span>
              </h1>
            </div>

            {/* Mobile stats — shown only on mobile (sidebar hidden) */}
            <div
              className="hero-mobile-stats"
              style={{
                display: 'none',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 1, background: T.ink,
                margin: '32px 0',
              }}
            >
              {[['$0','Upfront'], ['$99','/ month'], ['48H','Go-live']].map(([val, lbl], i) => (
                <div key={i} style={{ background: T.off, padding: '14px 16px' }}>
                  <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: T.ink, display: 'block', lineHeight: 1 }}>{val}</strong>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: T.muted }}>{lbl}</span>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: `1px solid ${T.rule2}`, paddingTop: 28,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 32, flexWrap: 'wrap', marginTop: 40,
            }}>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: T.mid, maxWidth: 420, lineHeight: 1.75 }}>
                We build hand-crafted websites that generate leads, book jobs, and handle follow-up —{' '}
                <strong style={{ color: T.ink, fontWeight: 700 }}>$0 upfront, from $99/mo.</strong>
              </p>
              <div className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
                <InkBtn onClick={() => setPage('contact')}>Get Your Site →</InkBtn>
                <InkBtn variant="outline" onClick={() => setPage('work')}>See Our Work</InkBtn>
              </div>
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hero-sidebar" style={{ padding: '72px 0 72px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: T.muted, marginBottom: 14 }}>
                Industries we serve
              </div>
              <div style={{ border: `1.5px solid ${T.ink}` }}>
                {TRADES.map((t, i) => (
                  <div key={i} className="trade-row" style={{
                    padding: '11px 16px', fontSize: 13, fontWeight: 500, color: T.mid,
                    borderBottom: i < TRADES.length - 1 ? `1px solid ${T.rule}` : 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                    transition: 'background .15s, color .15s', cursor: 'default',
                  }}>
                    <span style={{ color: T.rule2, fontSize: 12 }}>→</span>{t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: T.muted, marginBottom: 12 }}>
                At a glance
              </div>
              {[['$0','Upfront cost'], ['$99','Starting / month'], ['48H','Avg. go-live time']].map(([val, lbl], i) => (
                <div key={i} className="hero-stat" style={{
                  background: T.off, border: `1px solid ${T.rule}`,
                  padding: '14px 16px', marginBottom: 1,
                  transition: 'background .15s', cursor: 'default',
                }}>
                  <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: T.ink, display: 'block', lineHeight: 1 }}>{val}</strong>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: T.muted }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Ticker />

      {/* ── WHY OA ───────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionLabel text="Why Obsessive Agency" />
                <Display>No retainer. No fluff.<br />Just more jobs.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 400, lineHeight: 1.75, alignSelf: 'flex-end' }}>
                Most web agencies lock you into expensive contracts and disappear. We flip the model — pay monthly, cancel anytime, get results.
              </p>
            </div>
          </Reveal>
          <div className="why-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1.5px solid ${T.ink}` }}>
            {[
              { icon: '◎', title: 'Zero upfront. Ever.', body: 'Get your site live without writing a check. Your first payment is your first monthly fee — nothing more. vs. $3,000–$8,000 at a traditional agency.' },
              { icon: '↗', title: 'Live in 48 Hours',    body: 'From kickoff call to live website in under 48 hours. No 6-week timelines, no waiting around while jobs walk to your competitor.' },
              { icon: '▲', title: 'Built to Book Jobs',  body: 'Every site includes lead capture, AI follow-up, and review automation — not just a pretty page that sits there doing nothing.' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`why-card${i === 0 ? ' why-card-first' : ''}`} style={{
                  padding: '36px 32px',
                  borderRight: i < 2 ? `1px solid ${T.ink}` : 'none',
                  background: T.white, transition: 'background .15s', height: '100%',
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.rule2, marginBottom: 16 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: '.02em', color: T.ink, marginBottom: 10 }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── WORK PREVIEW ─────────────────────── */}
      <div style={{ background: T.off, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionLabel text="Featured Work" />
                <Display>See what we ship.</Display>
              </div>
              <InkBtn variant="outline" onClick={() => setPage('work')}>View all work →</InkBtn>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ border: `1.5px solid ${T.ink}`, background: T.white, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: T.red, marginBottom: 6 }}>Cruz Air LLC — Live Site</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.ink, marginBottom: 8 }}>CHICAGO HVAC WEBSITE</div>
                <p style={{ fontSize: 13, color: T.mid, maxWidth: 500 }}>
                  Full professional site with service pages, lead forms, and local SEO structure — delivered for a Chicagoland HVAC contractor.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                {[['Live','Status'],['HVAC','Industry'],['Standard+','Plan']].map(([v,l]) => (
                  <div key={l} style={{ background: T.off, border: `1px solid ${T.rule2}`, padding: '10px 14px' }}>
                    <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.ink, display: 'block', lineHeight: 1 }}>{v}</strong>
                    <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 10, color: T.muted, letterSpacing: '.06em', textTransform: 'uppercase' }}>{l}</span>
                  </div>
                ))}
                <InkBtn href="https://keteaonksmith.github.io/oa-preview-cruz-air-llc/">View Live Site →</InkBtn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── CTA STRIP ────────────────────────── */}
      <div style={{ background: T.ink, padding: '72px 32px' }}>
        <div className="cta-strip-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,5vw,80px)', color: '#fff', lineHeight: .95, letterSpacing: '.02em', marginBottom: 12 }}>
              READY TO GET<br /><span style={{ color: T.red }}>MORE JOBS?</span>
            </h2>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,.4)', letterSpacing: '.04em' }}>
              vs. $3,000–$8,000 upfront at a traditional agency · No contracts · Cancel anytime
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <InkBtn variant="white" onClick={() => setPage('contact')}>Get Started Free →</InkBtn>
            <InkBtn variant="outlineWhite" onClick={() => setPage('pricing')}>See Pricing</InkBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
