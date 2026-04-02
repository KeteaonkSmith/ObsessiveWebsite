import { useState, useEffect } from 'react'
import { T } from '../tokens.js'

const LINKS = [
  { label: 'Home',    key: 'home' },
  { label: 'Work',    key: 'work' },
  { label: 'Pricing', key: 'pricing' },
  { label: 'Process', key: 'process' },
  { label: 'About',   key: 'about' },
]

export default function Nav({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (key) => {
    setPage(key)
    setMobileOpen(false)
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.92)' : T.white,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `1.5px solid ${T.ink}`,
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
          <div style={{ width: 8, height: 8, background: T.red, borderRadius: '50%' }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.06em', color: T.ink }}>
            OBSESSIVE AGENCY
          </span>
        </div>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center' }}>
          {LINKS.map(l => (
            <button
              key={l.key}
              className="nav-link"
              onClick={() => navigate(l.key)}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600, fontSize: 12,
                letterSpacing: '.08em', textTransform: 'uppercase',
                color: page === l.key ? T.ink : T.mid,
                padding: '8px 16px',
                borderLeft: `1px solid ${T.rule}`,
                background: page === l.key ? T.off : 'transparent',
                border: 'none',
                borderLeft: `1px solid ${T.rule}`,
                cursor: 'pointer',
                transition: 'color .15s, background .15s',
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate('contact')}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 700, fontSize: 12,
              letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '10px 22px',
              background: page === 'contact' ? T.red : T.ink,
              color: '#fff',
              borderLeft: `1px solid ${T.ink}`,
              border: 'none',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
          >
            Book a Consultation
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'absolute', top: 60, left: 0, right: 0,
            background: T.white,
            borderBottom: `1.5px solid ${T.ink}`,
            zIndex: 199,
          }}
        >
          {LINKS.map(l => (
            <button
              key={l.key}
              onClick={() => navigate(l.key)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600, fontSize: 14,
                letterSpacing: '.06em', textTransform: 'uppercase',
                color: page === l.key ? T.ink : T.mid,
                padding: '18px 32px',
                background: page === l.key ? T.off : 'transparent',
                border: 'none',
                borderBottom: `1px solid ${T.rule}`,
                cursor: 'pointer',
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate('contact')}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 700, fontSize: 14,
              letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '20px 32px',
              background: T.red,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Book a Consultation →
          </button>
        </div>
      )}
    </nav>
  )
}
