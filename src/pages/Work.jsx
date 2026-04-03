import { T } from '../tokens.js'
import { Reveal, InkBtn, Display, SectionLabel, Tag } from '../components/shared.jsx'

const PRINCIPLES = [
  { num: '01', title: 'Performance First',    body: 'Every site scores 90+ on Google PageSpeed. Fast sites rank higher and convert better — slow sites lose jobs to your competitor.' },
  { num: '02', title: 'Mobile-Native',        body: 'Over 70% of trade searches happen on a phone. Every layout, every button, every form is built for mobile first, desktop second.' },
  { num: '03', title: 'Lead Architecture',    body: 'Forms connected to instant notifications. AI follow-up sequences. Review automation. The site does the follow-up so you don\'t have to.' },
]

export default function WorkPage({ setPage }) {
  return (
    <div>
      {/* ── HEADER ───────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 64px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 0, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionLabel text="Selected Work" />
                <Display>Craft over volume.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 440, alignSelf: 'flex-end', lineHeight: 1.75, paddingBottom: 6 }}>
                We're new, and we're selective. Every build gets our full attention — no templates, no shortcuts.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── CRUZ AIR — HERO CASE STUDY ───────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
          <Reveal>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: T.muted, marginBottom: 32 }}>
              Case Study 001
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: T.ink, border: `1.5px solid ${T.ink}` }} className="about-grid">
              {/* Left — info */}
              <div style={{ background: T.white, padding: '48px 44px' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  <Tag>HVAC</Tag>
                  <Tag>Standard+</Tag>
                  <Tag>Live</Tag>
                </div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: T.red, marginBottom: 8 }}>Local HVAC Contractor</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,4vw,52px)', color: T.ink, lineHeight: .95, marginBottom: 20 }}>CRUZ AIR LLC<br /></div>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.85, marginBottom: 28, maxWidth: 440 }}>
                  A full professional site for a Chicagoland HVAC contractor — service pages, lead capture forms, Google Business setup, and local SEO structure. Built and launched within 24 hours of kickoff.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                  {[['Live','Status'], ['HVAC','Industry'], ['Standard+','Plan'], ['24H','Delivered']].map(([v,l]) => (
                    <div key={l} style={{ background: T.off, border: `1px solid ${T.rule2}`, padding: '10px 14px' }}>
                      <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.ink, display: 'block', lineHeight: 1 }}>{v}</strong>
                      <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 10, color: T.muted, letterSpacing: '.06em', textTransform: 'uppercase' }}>{l}</span>
                    </div>
                  ))}
                </div>
                <InkBtn href="https://keteaonksmith.github.io/oa-preview-cruz-air-llc/">View Live Site →</InkBtn>
              </div>
              {/* Right — visual placeholder */}
              <div style={{ background: '#1a1918', padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 360 }}>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>
                  Site Preview
                </div>
                {/* Stylized placeholder — swap with screenshot img */}
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,.08)', marginTop: 24, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.015) 20px, rgba(255,255,255,.015) 21px)',
                  }} />
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: '.2em', color: 'rgba(255,255,255,.2)', marginBottom: 8 }}>CRUZAIRLLC.COM</div>
                    <a
                      href="https://keteaonksmith.github.io/oa-preview-cruz-air-llc/"
                      target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: T.red }}
                    >
                      View Live ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── DESIGN STANDARDS ─────────────────── */}
      <div style={{ background: T.off, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 18, marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <SectionLabel text="What goes into every build" />
                <Display>Our standards.</Display>
              </div>
              <p style={{ fontSize: 15, color: T.mid, maxWidth: 420, alignSelf: 'flex-end', lineHeight: 1.75 }}>
                Not features we upsell — requirements we build to on every single project.
              </p>
            </div>
          </Reveal>
          <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1.5px solid ${T.ink}` }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="principle-card" style={{
                  padding: '36px 32px',
                  borderRight: i < 2 ? `1px solid ${T.ink}` : 'none',
                  background: T.white, transition: 'background .15s', height: '100%',
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: T.rule2, lineHeight: 1, marginBottom: 16 }}>{p.num}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '.02em', color: T.ink, marginBottom: 10 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXT CLIENT TEASER ───────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
          <Reveal>
            <div style={{ border: `1.5px solid ${T.ink}`, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: T.red, marginBottom: 10 }}>
                  ● Currently Onboarding
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: T.ink, marginBottom: 8 }}>YOUR BUSINESS HERE.</div>
                <p style={{ fontSize: 14, color: T.mid, maxWidth: 460, lineHeight: 1.75 }}>
                  We're building case studies as we grow. Be our next featured client — get a professional site live in 24 hours with $0 upfront.
                </p>
              </div>
              <InkBtn onClick={() => setPage('contact')}>Claim a Spot →</InkBtn>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
