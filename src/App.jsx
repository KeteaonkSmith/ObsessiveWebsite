import { useState, useEffect } from 'react'
import Nav      from './components/Nav.jsx'
import Footer   from './components/Footer.jsx'
import HomePage    from './pages/Home.jsx'
import WorkPage    from './pages/Work.jsx'
import PricingPage from './pages/Pricing.jsx'
import ProcessPage from './pages/Process.jsx'
import AboutPage   from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (key) => setPage(key)

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <div>
      <Nav page={page} setPage={navigate} />

      {page === 'home'    && <HomePage    setPage={navigate} />}
      {page === 'work'    && <WorkPage    setPage={navigate} />}
      {page === 'pricing' && <PricingPage setPage={navigate} />}
      {page === 'process' && <ProcessPage setPage={navigate} />}
      {page === 'about'   && <AboutPage   setPage={navigate} />}
      {page === 'contact' && <ContactPage setPage={navigate} />}

      <Footer setPage={navigate} />
    </div>
  )
}
