# Obsessive Agency — Website

Multi-page React + Vite site for Obsessive Agency.

## Quick Start

### Requirements
- **Node.js 18+** — download at https://nodejs.org

### Setup (one time)

```bash
# 1. Open Terminal, navigate to this folder
cd oa-site

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser. The site hot-reloads on every save.

---

## Project Structure

```
oa-site/
├── index.html              # HTML entry point
├── vite.config.js          # Vite config
├── package.json
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Page router
    ├── index.css           # Global styles + media queries
    ├── tokens.js           # Design tokens (colors)
    ├── utils.js            # sanitize(), isValidEmail(), canSubmit()
    ├── components/
    │   ├── shared.jsx      # Display, SectionLabel, InkBtn, Ticker, Reveal
    │   ├── Nav.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        ├── Work.jsx
        ├── Pricing.jsx
        ├── Process.jsx
        ├── About.jsx
        └── Contact.jsx
```

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Upload the contents of `dist/` to:
- **GitHub Pages** — push `dist/` contents to your `gh-pages` branch
- **Netlify** — drag & drop the `dist/` folder at netlify.com/drop
- **Vercel** — run `npx vercel` in this folder

---

## Connecting the Contact Form

The form in `src/pages/Contact.jsx` currently simulates a submission.  
To wire it to a real backend, replace the `setTimeout` block with a `fetch` call:

```js
// In src/pages/Contact.jsx — handleSubmit()
const res = await fetch('https://your-api.com/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name:    form.name,
    email:   form.email,
    phone:   form.phone,
    trade:   form.trade,
    plan:    form.plan,
    message: form.message,
  }),
})
```

Free options for receiving form submissions:
- **Formspree** (https://formspree.io) — paste your endpoint URL
- **Resend** (https://resend.com) — email API with a free tier
- **EmailJS** (https://emailjs.com) — browser-side email sending

---

## Security Notes

- All user input is run through `sanitize()` in `src/utils.js` before touching React state
- Email is validated with `isValidEmail()` before submission
- `canSubmit()` rate-limits to 3 submissions per session (in-memory only)
- Zero use of `localStorage` or `sessionStorage`
- Form data is cleared from memory immediately after successful submission
- All external links use `rel="noopener noreferrer"`

---

## Customization

| What | Where |
|------|-------|
| Colors | `src/tokens.js` |
| Nav links | `src/components/Nav.jsx` |
| Work cases | `src/pages/Work.jsx` → `CASES` array |
| Pricing plans | `src/pages/Pricing.jsx` → `PLANS` array |
| Process steps | `src/pages/Process.jsx` → `STEPS` array |
| Contact email | `src/pages/Contact.jsx` + `src/components/Footer.jsx` |
