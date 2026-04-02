import { T } from '../tokens.js'

// Update these URLs once social profiles are live
const SOCIALS = {
  instagram: 'https://instagram.com/obsessiveagency',
  linkedin:  'https://linkedin.com/company/obsessiveagency',
  email:     'hello@obsessiveagency.com',
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

export default function Footer({ setPage }) {
  const nav = [
    ['Home','home'],['Work','work'],['Pricing','pricing'],
    ['Process','process'],['About','about'],['Contact','contact'],
  ]
  return (
    <footer style={{ background: T.ink, borderTop: `1.5px solid ${T.ink}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px 28px' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: 32, marginBottom: 40,
            borderBottom: '1px solid rgba(255,255,255,.1)', paddingBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, background: T.red, borderRadius: '50%' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#fff', letterSpacing: '.06em' }}>
                OBSESSIVE AGENCY
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.75, marginBottom: 20 }}>
              Professional websites for local trade companies.<br />Chicago-built, trade-focused.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={SOCIALS.instagram}
                target="_blank" rel="noopener noreferrer"
                className="footer-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 11, color: 'rgba(255,255,255,.4)',
                  fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
                  transition: 'color .15s',
                }}
              >
                <IconInstagram /> Instagram
              </a>
              <span style={{ color: 'rgba(255,255,255,.15)', fontSize: 11 }}>·</span>
              <a
                href={SOCIALS.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="footer-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 11, color: 'rgba(255,255,255,.4)',
                  fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
                  transition: 'color .15s',
                }}
              >
                <IconLinkedIn /> LinkedIn
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
              Navigation
            </div>
            {nav.map(([label, key]) => (
              <button
                key={key}
                className="footer-link"
                onClick={() => setPage(key)}
                style={{
                  display: 'block', background: 'none', border: 'none',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13, color: 'rgba(255,255,255,.5)',
                  marginBottom: 8, cursor: 'pointer', padding: 0,
                  transition: 'color .15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
              Contact
            </div>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="footer-link"
              style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 8, transition: 'color .15s' }}
            >
              {SOCIALS.email}
            </a>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 20 }}>Chicago, Illinois</p>
            <button
              onClick={() => setPage('contact')}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 700, fontSize: 11,
                letterSpacing: '.1em', textTransform: 'uppercase',
                padding: '10px 18px',
                background: T.red, color: '#fff',
                border: 'none', cursor: 'pointer',
              }}
            >
              Book a Free Call →
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: '.04em' }}>
            © {new Date().getFullYear()} Obsessive Agency — All rights reserved
          </div>
          <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,.2)', letterSpacing: '.04em' }}>
            $0 upfront · Cancel anytime
          </div>
        </div>
      </div>
    </footer>
  )
}
