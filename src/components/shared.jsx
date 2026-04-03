import { useEffect, useRef } from 'react'
import { T } from '../tokens.js'

export function Display({ children, size = 'clamp(40px,5vw,68px)', style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: size, letterSpacing: '.03em',
      lineHeight: 1, color: T.ink, ...style,
    }}>
      {children}
    </h2>
  )
}

export function SectionLabel({ num, text }) {
  return (
    <div style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 700, fontSize: 11,
      letterSpacing: '.16em', textTransform: 'uppercase',
      color: T.muted, marginBottom: 10,
    }}>
      {num && <span style={{ color: T.red, marginRight: 8 }}>{num}</span>}
      {text}
    </div>
  )
}

export function InkBtn({ children, onClick, href, variant = 'primary', style = {}, disabled = false }) {
  const base = {
    fontFamily: "'Instrument Sans', sans-serif",
    fontWeight: 700, fontSize: 13,
    letterSpacing: '.06em', textTransform: 'uppercase',
    padding: '13px 26px', display: 'inline-block',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    opacity: disabled ? 0.6 : 1,
    ...style,
  }
  const variants = {
    primary:      { background: T.red,    color: '#fff' },
    outline:      { background: 'transparent', color: T.ink,  border: `1.5px solid ${T.ink}` },
    outlineWhite: { background: 'transparent', color: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.25)' },
    white:        { background: '#fff',    color: T.ink  },
  }
  const combined = { ...base, ...variants[variant] }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="ink-btn" style={combined}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} disabled={disabled} className="ink-btn" style={combined}>
      {children}
    </button>
  )
}

export function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 600, fontSize: 11,
      letterSpacing: '.1em', textTransform: 'uppercase',
      padding: '3px 10px',
      border: `1px solid ${T.rule2}`,
      color: T.muted,
    }}>
      {children}
    </span>
  )
}

export function Ticker() {
  const items = [
    'Lead Capture', 'Job Booking Systems', 'AI-Powered Follow-Up',
    'Local SEO', 'Review Generation', 'Social Content',
    'Short-Form Video', 'Performance Analytics',
  ]
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: T.ink,
      borderTop: `1.5px solid ${T.ink}`,
      borderBottom: `1.5px solid ${T.ink}`,
      overflow: 'hidden', padding: '10px 0',
    }}>
      <div className="ticker-anim" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '0 28px',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600, fontSize: 11,
            letterSpacing: '.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.45)',
          }}>
            {t}
            <span style={{ width: 4, height: 4, background: T.red, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Scroll-reveal wrapper
   Props:
   - delay: ms offset before animation starts (manual stagger)
   - variant: 'fade-up' | 'fade-in' | 'scale-in' | 'clip-reveal' | 'line-reveal'
   - stagger: auto-staggers direct children at 90ms intervals
*/
export function Reveal({ children, delay = 0, style = {}, variant = 'fade-up', stagger = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (stagger) {
      // Observe wrapper; on intersect, stagger-reveal each direct child
      const kids = Array.from(el.children)
      kids.forEach(child => child.classList.add('reveal'))
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          kids.forEach((child, i) => {
            child.style.transitionDelay = `${i * 90}ms`
            child.classList.add('visible')
          })
          obs.unobserve(el)
        }
      }, { threshold: 0.07 })
      obs.observe(el)
      return () => obs.disconnect()
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) }
    }, { threshold: 0.07 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [stagger])

  if (stagger) {
    return (
      <div ref={ref} style={style}>
        {children}
      </div>
    )
  }
  return (
    <div
      ref={ref}
      className="reveal"
      data-anim={variant}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  )
}
