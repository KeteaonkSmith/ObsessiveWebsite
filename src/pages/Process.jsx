import { T } from '../tokens.js'
import { Reveal, InkBtn, Display, SectionLabel } from '../components/shared.jsx'

const STEPS = [
  { num: '01', name: 'DISCOVERY',  detail: '30-minute call. We map your trade, your leads, and your current web presence. No fluff, no upsell — just alignment on what matters.' },
  { num: '02', name: 'BLUEPRINT',  detail: 'We spec the site structure, page layout, and content plan. You approve the direction before we write a single line of code.' },
  { num: '03', name: 'BUILD',      detail: 'Site goes up. Lead capture forms, service pages, and mobile layout are all tested before you see it.' },
  { num: '04', name: 'REVIEW',     detail: 'You get a preview link and a round of revisions. We don\'t go live until you\'re happy.' },
  { num: '05', name: 'LAUNCH',     detail: 'Site is live, DNS is pointed, Google is indexed, and you start receiving lead notifications directly to your phone or email.' },
  { num: '06', name: 'ITERATE',    detail: 'Monthly check-ins on what\'s converting. Standard+ clients receive a full analytics report each month.' },
]

export default function ProcessPage({ setPage }) {
  return (
    <div>
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionLabel text="How It Works" />
                <Display>From call to live in days.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 440, alignSelf: 'flex-end', lineHeight: 1.75 }}>
                We've built this process to be as frictionless as possible on your end. You talk to us, we handle everything else.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ border: `1.5px solid ${T.ink}` }}>
              {STEPS.map((s, i) => (
                <div key={i} className="proc-row" style={{
                  display: 'grid', gridTemplateColumns: '72px 200px 1fr',
                  borderBottom: i < STEPS.length - 1 ? `1px solid ${T.rule2}` : 'none',
                  minHeight: 80, transition: 'background .15s',
                }}>
                  <div className="proc-num" style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 32,
                    color: T.rule2, padding: '20px 16px',
                    borderRight: `1px solid ${T.rule2}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color .2s',
                  }}>{s.num}</div>
                  <div className="proc-name-col" style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                    letterSpacing: '.02em', color: T.ink,
                    padding: '20px 24px', borderRight: `1px solid ${T.rule2}`,
                    display: 'flex', alignItems: 'center',
                  }}>{s.name}</div>
                  <div style={{ padding: '20px 28px', fontSize: 14, color: T.mid, lineHeight: 1.75, display: 'flex', alignItems: 'center' }}>
                    {s.detail}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ marginTop: 48, padding: 36, background: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#fff', marginBottom: 8 }}>READY TO START?</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)' }}>Step 1 is just a 30-minute call. No commitment.</p>
              </div>
              <InkBtn variant="white" onClick={() => setPage('contact')}>Book a Free Call →</InkBtn>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
