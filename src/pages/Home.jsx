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
              <div className="hero-animate" style={{
                animationDelay: '0ms',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
                color: T.muted, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
              }}>
                <span style={{ width: 32, height: 2, background: T.red, display: 'inline-block', flexShrink: 0 }} />
                Websites for Trade Businesses · Chicago, IL · Est. 2024
              </div>
              <h1 className="hero-animate" style={{
                animationDelay: '80ms',
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

            <div className="hero-animate" style={{
              animationDelay: '200ms',
              borderTop: `1px solid ${T.rule2}`, paddingTop: 28,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 32, flexWrap: 'wrap', marginTop: 40,
            }}>
              <div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: T.mid, maxWidth: 420, lineHeight: 1.75, marginBottom: 12 }}>
                  Professional websites for HVAC, plumbing, roofing, and electrical contractors —
                  built to rank on Google, capture leads, and turn calls into booked jobs.
                </p>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: T.muted, maxWidth: 420, lineHeight: 1.65 }}>
                  <strong style={{ color: T.ink, fontWeight: 700 }}>$0 upfront · $99/mo · Cancel anytime</strong>
                  {' '}— no contracts, no deposits, live in 48 hours.
                </p>
              </div>
              <div className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
                <InkBtn onClick={() => setPage('contact')}>Get a Free Quote →</InkBtn>
                <InkBtn variant="outline" onClick={() => setPage('work')}>See Our Work</InkBtn>
              </div>
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hero-sidebar hero-animate" style={{ animationDelay: '300ms', padding: '72px 0 72px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

      {/* ── PROBLEM STATEMENT ────────────────── */}
      <div style={{ background: T.ink, padding: '48px 32px', borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <p style={{ fontSize: 'clamp(17px,2vw,22px)', color: 'rgba(255,255,255,.85)', lineHeight: 1.7, maxWidth: 680 }}>
            Most websites look good. Very few actually convert.{' '}
            <span style={{ color: T.red, fontWeight: 600 }}>If your site isn't generating customers, it's not doing its job.</span>
          </p>
          <InkBtn variant="white" onClick={() => setPage('contact')}>Fix My Site →</InkBtn>
        </div>
      </div>

      {/* ── WHY OA ───────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 18, marginBottom: 56, flexWrap: 'wrap', gap: 16, position: 'relative' }}>
              <div>
                <SectionLabel text="How it works" />
                <Display>Simple pricing.<br />Fast turnaround.<br />Real results.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 400, lineHeight: 1.75, alignSelf: 'flex-end' }}>
                Other agencies charge $5,000–$10,000 upfront, take 6–8 weeks, then hand you a site and disappear. We do the opposite.
              </p>
              <Reveal variant="line-reveal" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', background: T.ink }} />
            </div>
          </Reveal>
          <div className="why-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1.5px solid ${T.ink}` }}>
            {[
              { icon: '◎', title: 'No upfront cost — ever.', body: 'Pay nothing to get started. Your first charge is your first monthly fee ($99). No deposit, no setup cost, no surprise invoices. Cancel anytime with 30 days notice.' },
              { icon: '↗', title: 'Your site is live in 48 hours.', body: 'We handle everything — design, copy, hosting, domain setup. Most clients are live within two business days of our kickoff call. No waiting 6 weeks while leads go elsewhere.' },
              { icon: '▲', title: 'Every site is built to capture leads.', body: 'Click-to-call, contact forms, Google Maps, local SEO, and review generation — all included. Your site works for you 24/7, even when you\'re on a job.' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`why-card${i === 0 ? ' why-card-first' : ''}`} style={{
                  padding: '36px 32px',
                  borderRight: i < 2 ? `1px solid ${T.ink}` : 'none',
                  background: T.white, height: '100%',
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.red, marginBottom: 16 }}>{c.icon}</div>
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
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 18, marginBottom: 48, flexWrap: 'wrap', gap: 16, position: 'relative' }}>
              <div>
                <SectionLabel text="Featured Work" />
                <Display>See how we deliver.</Display>
              </div>
              <InkBtn variant="outline" onClick={() => setPage('work')}>View all work →</InkBtn>
              <Reveal variant="line-reveal" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', background: T.ink }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ border: `1.5px solid ${T.ink}`, background: T.white, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: T.red, marginBottom: 6 }}>Cruz Air LLC — Live Site</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.ink, marginBottom: 8 }}>CRUZ AIR LLC</div>
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

      {/* ── TRUST / SOCIAL PROOF ─────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        {/* Stat bar */}
        <div style={{ borderBottom: `1.5px solid ${T.ink}`, background: T.off }}>
          <div className="why-grid-3" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              { stat: '+38%', label: 'Average increase in lead inquiries', sub: 'within 30 days of launch' },
              { stat: '48H',  label: 'Average time from call to live site', sub: 'fully indexed and ready' },
              { stat: '$99',  label: 'Total monthly cost — all in', sub: 'no hidden fees, no contracts' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '32px', borderRight: i < 2 ? `1px solid ${T.ink}` : 'none' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: T.red, lineHeight: 1, marginBottom: 6 }}>{s.stat}</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: T.ink, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: T.muted }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonials */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 0' }}>
          <Reveal>
            <div style={{ borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 0 }}>
              <SectionLabel text="Client results" />
              <Display>Contractors who made the switch.</Display>
            </div>
          </Reveal>
        </div>
        <div className="why-grid-3" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 56px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {[
            { result: '+4 jobs/week', quote: 'Phone started ringing the first week. I went from 2 jobs a week to fully booked in under a month.', name: 'Mike R.', co: 'Plumber · Chicago, IL' },
            { result: 'Booked 60 days out', quote: 'We had no website at all. They built ours in two days and it paid for itself within the first two weeks.', name: 'Dana T.', co: 'HVAC owner · Naperville, IL' },
            { result: '5 referrals sent', quote: 'I thought $99 sounded too good. Three months in, I\'ve referred five other contractors. It works.', name: 'Carlos M.', co: 'General contractor · Aurora, IL' },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: '36px 32px', borderRight: i < 2 ? `1px solid ${T.ink}` : 'none' }}>
                <div style={{ display: 'inline-block', background: T.redDim, color: T.red, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', marginBottom: 20 }}>{t.result}</div>
                <p style={{ fontSize: 15, color: T.ink, lineHeight: 1.75, marginBottom: 24 }}>"{t.quote}"</p>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: T.ink }}>{t.name}</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: T.muted }}>{t.co}</div>
              </div>
            </Reveal>
          ))}
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
