import { T } from '../tokens.js'
import { Reveal, InkBtn, Display, SectionLabel } from '../components/shared.jsx'

// Update these with real URLs / handles once ready
const LINKS = {
  liamLinkedIn:      'https://linkedin.com/in/liam',         // TODO: update
  keteaonkLinkedIn:  'https://linkedin.com/in/keteaonk',     // TODO: update
  instagram:         'https://instagram.com/obsessiveagency',
  linkedin:          'https://linkedin.com/company/obsessiveagency',
  email:             'hello@obsessiveagency.com',
}

function IconLinkedIn({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconInstagram({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function PhotoPlaceholder({ initials, size = 160 }) {
  return (
    <div style={{
      width: size, height: size,
      background: T.off,
      border: `1.5px solid ${T.ink}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: size * 0.3, color: T.rule2, letterSpacing: '.05em',
      }}>{initials}</span>
    </div>
  )
}

const FOUNDERS = [
  {
    name: 'LIAM',
    title: 'CEO & Co-Founder',
    initials: 'L',
    bio: 'Liam comes from a background in film, editing, and visual storytelling. After noticing that trade businesses — the people who keep cities running — had some of the worst web presence around, he built Obsessive to fix it. He leads client strategy, creative direction, and the vision for where this agency goes.',
    linkedin: LINKS.liamLinkedIn,
  },
  {
    name: 'KETEAONK',
    title: 'CTO & Co-Founder',
    initials: 'K',
    bio: 'Keteaonk architects the technical side of every build — from the lead capture systems and AI follow-up sequences to the infrastructure that keeps client sites fast, secure, and always on. He turns the creative direction into production-grade code.',
    linkedin: LINKS.keteaonkLinkedIn,
  },
]

export default function AboutPage({ setPage }) {
  return (
    <div>
      {/* ── HEADER ───────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 64px' }}>
          <Reveal>
            <SectionLabel text="About Us" />
            <Display size="clamp(48px,6vw,88px)">
              Two founders.<br />One obsession.
            </Display>
          </Reveal>
        </div>
      </div>

      {/* ── FOUNDERS ─────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="founders-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: T.ink, gap: 1 }}>
            {FOUNDERS.map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ background: T.white, padding: '48px 44px' }}>
                  {/* Photo + name row */}
                  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 28 }}>
                    {/* Photo placeholder — swap src into an <img> when ready */}
                    <PhotoPlaceholder initials={f.initials} size={100} />
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, lineHeight: 1, color: T.ink, marginBottom: 4 }}>{f.name}</div>
                      <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: T.red, marginBottom: 12 }}>{f.title}</div>
                      <a
                        href={f.linkedin}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                          fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
                          color: T.mid, border: `1px solid ${T.rule2}`,
                          padding: '5px 10px', transition: 'color .15s, border-color .15s',
                        }}
                      >
                        <IconLinkedIn /> LinkedIn
                      </a>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.85 }}>{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPANY VIDEO ────────────────────── */}
      <div style={{ background: T.ink, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <SectionLabel num="—" text="Our story" />
            <Display style={{ color: '#fff', marginBottom: 40 }}>How we work.</Display>
          </Reveal>
          <Reveal delay={100}>
            {/* Video placeholder — replace this div with an <iframe> embed when ready */}
            {/* Example: <iframe src="https://www.youtube.com/embed/YOUR_ID" ... /> */}
            <div style={{
              position: 'relative',
              width: '100%', aspectRatio: '16/9',
              background: '#1a1918',
              border: `1.5px solid rgba(255,255,255,.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              {/* Play button */}
              <div style={{
                width: 72, height: 72,
                border: `2px solid rgba(255,255,255,.3)`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 0,
              }}>
                <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `20px solid ${T.red}`, marginLeft: 4 }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 28, left: 32,
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                color: 'rgba(255,255,255,.5)', letterSpacing: '.08em',
              }}>
                OUR STORY — DROP YOUR VIDEO HERE
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── CONNECT ──────────────────────────── */}
      <div style={{ borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
          <Reveal>
            <SectionLabel text="Connect with us" />
            <Display style={{ marginBottom: 40 }}>Follow the build.</Display>
          </Reveal>
          <Reveal delay={80}>
            <div className="connect-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: T.ink }}>
              {[
                {
                  icon: <IconInstagram size={20} />,
                  label: 'Instagram',
                  handle: '@obsessiveagency',
                  desc: 'Behind-the-scenes, client work, and trade content.',
                  href: LINKS.instagram,
                },
                {
                  icon: <IconLinkedIn size={20} />,
                  label: 'LinkedIn',
                  handle: 'Obsessive Agency',
                  desc: 'Company updates, insights, and industry posts.',
                  href: LINKS.linkedin,
                },
                {
                  icon: <span style={{ fontSize: 20 }}>✉</span>,
                  label: 'Email',
                  handle: LINKS.email,
                  desc: 'Best way to reach us. We respond same day.',
                  href: `mailto:${LINKS.email}`,
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="social-pill"
                  style={{
                    display: 'block',
                    background: T.white,
                    padding: '32px 28px',
                    transition: 'background .15s',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ color: T.red, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: T.muted, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.ink, marginBottom: 8 }}>{s.handle}</div>
                  <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.7 }}>{s.desc}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── STATS ────────────────────────────── */}
      <div style={{ background: T.off, borderBottom: `1.5px solid ${T.ink}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: T.ink }}>
            {[
              ['Est. 2024','Chicago, IL'],
              ['$0','Upfront, always'],
              ['48H','Avg. go-live time'],
              ['100%','Trade-focused'],
            ].map(([v,l], i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: T.white, padding: '32px 28px' }}>
                  <strong style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: T.ink, display: 'block', lineHeight: 1, marginBottom: 4 }}>{v}</strong>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 11, color: T.muted, letterSpacing: '.08em', textTransform: 'uppercase' }}>{l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────── */}
      <div style={{ background: T.ink, padding: '72px 32px' }}>
        <div className="cta-strip-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,4vw,64px)', color: '#fff', lineHeight: .95 }}>
            WANT TO WORK<br /><span style={{ color: T.red }}>WITH US?</span>
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <InkBtn variant="white" onClick={() => setPage('contact')}>Book a Free Call →</InkBtn>
            <InkBtn variant="outlineWhite" onClick={() => setPage('pricing')}>See Pricing</InkBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
