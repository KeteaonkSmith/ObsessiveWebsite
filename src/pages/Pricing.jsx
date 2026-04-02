import { T } from '../tokens.js'
import { Reveal, Ticker, InkBtn, Display, SectionLabel } from '../components/shared.jsx'

const PLANS = [
  {
    name: 'STARTER',
    price: '$99',
    period: '/ month',
    tag: 'Perfect for getting online fast',
    highlight: false,
    included: [
      'Professional single-page website',
      'Lead capture form (email delivery)',
      'Mobile-responsive design',
      'Google Business profile setup',
      'Basic local SEO structure',
      'Contact page + service summary',
      'Free setup — $0 upfront',
      'Cancel anytime',
    ],
    notIncluded: [
      'Multi-page site structure',
      'Monthly analytics reports',
      'AI follow-up sequences',
      'Review generation automation',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'STANDARD+',
    price: '$149',
    period: '/ month',
    tag: 'Our most popular — the full system',
    highlight: true,
    included: [
      'Everything in Starter, plus:',
      'Multi-page site (Home, Services, About, Contact)',
      'AI-powered lead follow-up sequences',
      'Automated review request system',
      'Monthly analytics report (leads, traffic, conversions)',
      'Service area pages (local SEO)',
      'Photo gallery / project showcase',
      'Priority support & updates',
      'Free setup — $0 upfront',
      'Cancel anytime',
    ],
    notIncluded: [],
    cta: 'Start with Standard+',
  },
]

const FAQS = [
  ['Do I really pay nothing upfront?', 'Correct. We build and launch your site, then your billing starts. No setup fees, ever.'],
  ['Can I cancel at any time?', 'Yes. No cancellation fees, no notice period. Just let us know and we\'ll stop billing immediately.'],
  ['What\'s in the monthly analytics report?', 'Standard+ clients receive a monthly PDF covering site traffic, lead form submissions, conversion rates, and local SEO keyword rankings.'],
  ['Do I own my site?', 'While you\'re a client, we host and maintain the site. If you cancel, we can transfer your files — we\'ll never hold your content hostage.'],
  ['How long does it take to go live?', 'Most sites are live within 48–72 hours of our kickoff call.'],
  ['What if I need changes?', 'Starter gets minor updates included. Standard+ gets unlimited content updates and priority support.'],
]

export default function PricingPage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}`, padding: '80px 32px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <SectionLabel text="Pricing" />
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,8vw,120px)', lineHeight: .92, color: T.ink, marginBottom: 20, letterSpacing: '.01em' }}>
              $0 UPFRONT.<br /><span style={{ color: T.red }}>ALWAYS.</span>
            </h1>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, color: T.mid, maxWidth: 560, lineHeight: 1.75 }}>
              No setup fees, no contracts. You pay monthly, we stay accountable.
            </p>
          </Reveal>
        </div>
      </div>

      <Ticker />

      {/* ── AGENCY COMPARISON ────────────────── */}
      <div style={{ background: T.ink, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,.1)' }} className="comparison-grid">
              <div style={{ background: T.ink, padding: '40px 40px' }}>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: 12 }}>Traditional Agency</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: 'rgba(255,255,255,.25)', lineHeight: 1, marginBottom: 8 }}>$3K–$8K</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,.3)', lineHeight: 1.8 }}>
                  Upfront build fee<br />
                  + $200–$500/mo maintenance<br />
                  + 4–8 week timeline<br />
                  + Long-term contract<br />
                  + You're one of 50+ clients
                </div>
              </div>
              <div style={{ background: T.red, padding: '40px 40px' }}>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>Obsessive Agency</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: '#fff', lineHeight: 1, marginBottom: 8 }}>$0 Upfront</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.8 }}>
                  From $99/mo total — no surprises<br />
                  + 48-hour go-live<br />
                  + Cancel anytime<br />
                  + AI follow-up included<br />
                  + You get our full attention
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Plans */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        {/* Urgency */}
        <Reveal>
          <div style={{ background: T.redDim, border: `1.5px solid ${T.red}`, padding: '16px 24px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, background: T.red, borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: T.red }}>
              Now booking May clients — <strong>2 onboarding slots remaining.</strong> First come, first served.
            </span>
            <button onClick={() => setPage('contact')} style={{ marginLeft: 'auto', fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: T.red, background: 'none', border: `1px solid ${T.red}`, padding: '6px 14px', cursor: 'pointer', flexShrink: 0 }}>
              Book Now →
            </button>
          </div>
        </Reveal>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: T.ink }}>
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="plan-card" style={{
                background: plan.highlight ? T.ink : T.white,
                padding: '48px 44px',
                border: plan.highlight ? `3px solid ${T.red}` : '1px solid transparent',
                transition: 'border-color .2s',
                position: 'relative', height: '100%',
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: T.red, color: '#fff',
                    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                    fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: plan.highlight ? 'rgba(255,255,255,.4)' : T.muted, marginBottom: 12 }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: plan.highlight ? '#fff' : T.ink, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, fontSize: 16, color: plan.highlight ? 'rgba(255,255,255,.5)' : T.mid }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,.5)' : T.mid, marginBottom: 32, borderBottom: `1px solid ${plan.highlight ? 'rgba(255,255,255,.1)' : T.rule}`, paddingBottom: 20 }}>
                  {plan.tag}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {plan.included.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: plan.highlight ? 'rgba(255,255,255,.85)' : T.ink }}>
                      <span style={{ color: T.red, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                    </div>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: plan.highlight ? 'rgba(255,255,255,.25)' : T.muted, textDecoration: 'line-through' }}>
                      <span style={{ flexShrink: 0, marginTop: 1 }}>✗</span>{f}
                    </div>
                  ))}
                </div>
                <button
                  className="plan-cta"
                  onClick={() => setPage('contact')}
                  style={{
                    width: '100%',
                    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
                    padding: 16,
                    background: plan.highlight ? T.red : 'transparent',
                    color: plan.highlight ? '#fff' : T.ink,
                    border: plan.highlight ? 'none' : `1.5px solid ${T.ink}`,
                    cursor: 'pointer',
                    transition: 'background .15s, color .15s',
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Not sure CTA */}
        <Reveal delay={200}>
          <div style={{ marginTop: 48, padding: '32px 36px', background: T.off, border: `1.5px solid ${T.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: T.ink, marginBottom: 6 }}>NOT SURE WHICH PLAN?</div>
              <p style={{ fontSize: 13, color: T.mid, maxWidth: 500 }}>
                Book a free 30-minute call. We'll review your business, walk through both options, and tell you honestly which one makes sense.
              </p>
            </div>
            <InkBtn onClick={() => setPage('contact')}>Book a Free Call →</InkBtn>
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <div style={{ background: T.off, borderTop: `1.5px solid ${T.ink}`, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <SectionLabel text="Common Questions" />
            <Display style={{ marginBottom: 48 }}>FAQ</Display>
          </Reveal>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: `1.5px solid ${T.ink}`, background: T.ink }}>
            {FAQS.map(([q, a], i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: T.white, padding: '28px 32px', borderBottom: i < FAQS.length - 2 ? `1px solid ${T.rule}` : 'none', borderRight: i % 2 === 0 ? `1px solid ${T.rule}` : 'none' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.ink, marginBottom: 10 }}>{q}</div>
                  <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.75 }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
