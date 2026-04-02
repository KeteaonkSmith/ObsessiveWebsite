import { useState, useCallback } from 'react'
import { T } from '../tokens.js'
import { Reveal, InkBtn, Display, SectionLabel } from '../components/shared.jsx'
import { sanitize, isValidEmail, canSubmit } from '../utils.js'

const TRADES = ['Plumbing & HVAC', 'Electrical', 'Roofing', 'Landscaping', 'General Contracting', 'Painting & Finishing', 'Other']
const PLANS  = ['Not sure yet', 'Starter ($99/mo)', 'Standard+ ($149/mo)']
const EMPTY  = { name: '', email: '', phone: '', trade: '', plan: '', message: '' }

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgojvzr'

export default function ContactPage() {
  const [form, setForm]             = useState(EMPTY)
  const [errors, setErrors]         = useState({})
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = useCallback((field, raw) => {
    const safe = sanitize(String(raw)).slice(0, field === 'message' ? 1000 : 200)
    setForm(prev => ({ ...prev, [field]: safe }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email address'
    if (!form.trade) e.trade = 'Select your trade'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    if (!canSubmit()) { setRateLimited(true); return }

    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          trade:   form.trade,
          plan:    form.plan,
          message: form.message,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setForm(EMPTY)
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitError(data?.error || 'Something went wrong. Please email us directly.')
      }
    } catch {
      setSubmitError('Network error. Please email hello@obsessiveagency.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = (field) => ({
    width: '100%', padding: '12px 14px',
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 14,
    background: T.white,
    border: `1.5px solid ${errors[field] ? T.red : T.rule2}`,
    color: T.ink, outline: 'none',
    transition: 'border-color .15s',
  })

  const label = {
    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
    fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
    color: T.mid, display: 'block', marginBottom: 6,
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: T.ink, borderBottom: `1.5px solid ${T.ink}`, padding: '72px 32px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,8vw,120px)', color: '#fff', lineHeight: .92, letterSpacing: '.01em' }}>
              READY WHEN<br /><span style={{ color: T.red }}>YOU ARE.</span>
            </h1>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: 'rgba(255,255,255,.5)', marginTop: 20, maxWidth: 500, lineHeight: 1.75 }}>
              Book a call or send us a message. We respond same day and move fast once we're aligned.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: T.ink }}>

          {/* Left — info */}
          <div style={{ background: T.white, padding: '48px 44px' }}>
            <Reveal>
              <div style={{ marginBottom: 40 }}>
                <SectionLabel text="Direct contact" />
                <a href="mailto:hello@obsessiveagency.com" className="footer-link" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: T.ink, letterSpacing: '.04em', display: 'block', marginBottom: 4, transition: 'color .15s' }}>
                  hello@obsessiveagency.com
                </a>
                <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: T.muted }}>We respond within a few hours, usually same day.</span>
              </div>

              <div style={{ marginBottom: 40 }}>
                <SectionLabel text="Based in" />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.ink, letterSpacing: '.04em' }}>CHICAGO, ILLINOIS</div>
                <p style={{ fontSize: 13, color: T.mid, marginTop: 4 }}>Serving trade businesses across Chicagoland and remotely across the US.</p>
              </div>

              <div>
                <SectionLabel text="What happens on the call" />
                <div style={{ border: `1.5px solid ${T.ink}` }}>
                  {[
                    ['Step 01', 'We review your current web presence'],
                    ['Step 02', 'We map out your lead flow gaps'],
                    ['Step 03', 'We walk through a custom proposal'],
                    ['Step 04', 'No obligation — you decide'],
                  ].map(([s, d], i) => (
                    <div key={i} className="contact-item" style={{
                      padding: '16px 20px',
                      borderBottom: i < 3 ? `1px solid ${T.rule}` : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontSize: 14, color: T.mid, transition: 'background .15s',
                    }}>
                      <div>
                        <strong style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: T.muted, display: 'block' }}>{s}</strong>
                        {d}
                      </div>
                      <span style={{ color: T.red, fontSize: 18, flexShrink: 0 }}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <div style={{ background: T.off, padding: '48px 44px' }}>
            {rateLimited ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.ink, marginBottom: 12 }}>TOO MANY SUBMISSIONS</div>
                <p style={{ fontSize: 14, color: T.mid }}>Please email us directly at hello@obsessiveagency.com</p>
              </div>
            ) : submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: T.red, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.ink, marginBottom: 12 }}>MESSAGE SENT</div>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75 }}>We'll be in touch within a few hours.<br />Check your inbox — including spam just in case.</p>
              </div>
            ) : (
              <Reveal>
                <SectionLabel text="Send a message" />
                <Display style={{ marginBottom: 32 }}>GET IN<br />TOUCH.</Display>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={label}>Name *</label>
                    <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your name" maxLength={100} autoComplete="off" style={inputBase('name')} />
                    {errors.name && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={label}>Email *</label>
                    <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@company.com" maxLength={200} autoComplete="off" style={inputBase('email')} />
                    {errors.email && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={label}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="(555) 000-0000" maxLength={20} style={inputBase('phone')} />
                  </div>
                  <div>
                    <label style={label}>Your Trade *</label>
                    <select value={form.trade} onChange={e => handleChange('trade', e.target.value)} style={{ ...inputBase('trade'), cursor: 'pointer' }}>
                      <option value="">Select trade...</option>
                      {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.trade && <p style={{ fontSize: 11, color: T.red, marginTop: 4 }}>{errors.trade}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={label}>Interested plan</label>
                  <select value={form.plan} onChange={e => handleChange('plan', e.target.value)} style={{ ...inputBase('plan'), cursor: 'pointer' }}>
                    <option value="">Select a plan...</option>
                    {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={label}>Message</label>
                  <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} placeholder="Tell us about your business..." maxLength={1000} rows={4} style={{ ...inputBase('message'), resize: 'vertical' }} />
                </div>

                {submitError && (
                  <p style={{ fontSize: 12, color: T.red, marginBottom: 12, lineHeight: 1.6 }}>{submitError}</p>
                )}

                <p style={{ fontSize: 11, color: T.muted, marginBottom: 16, lineHeight: 1.6 }}>
                  Your information is used only to respond to your inquiry. We never sell or share your data.
                </p>

                <button onClick={handleSubmit} disabled={submitting} style={{
                  width: '100%',
                  fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                  fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase',
                  padding: 16,
                  background: submitting ? T.muted : T.red,
                  color: '#fff', border: 'none',
                  cursor: submitting ? 'wait' : 'pointer',
                  transition: 'background .15s',
                }}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
