import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Links already covered by the mobile bottom nav bar — no need to duplicate them in the hamburger menu
const extraMobileLinks = [
  { to: '/about', label: 'About' },
  { to: '/track-booking', label: 'Track Booking' },
]

export default function TopHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Wedding Tabs Logo" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-heading text-xl font-semibold text-charcoal">Wedding Tabs</span>
          </NavLink>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-charcoal'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/get-quote"
            className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-gold text-charcoal font-semibold px-4 py-2 hover:opacity-90 transition"
          >
            Get Quote
          </NavLink>

          {/* Mobile: only "More" links live here (Home/Portfolio/Services/Get Quote/Contact are on the bottom nav bar) */}
          <button className="lg:hidden p-2 text-charcoal" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile "More" menu — slides up from the bottom as a sheet, sitting just above the bottom nav bar */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 top-20 bg-charcoal/40 z-40" onClick={() => setOpen(false)} />
          <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-cream rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4">
            <div className="flex flex-col gap-1">
              {extraMobileLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-charcoal font-medium py-3 px-2 rounded-lg hover:bg-charcoal/5 transition"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
