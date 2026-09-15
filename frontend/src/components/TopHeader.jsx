import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function TopHeader() {
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
        </div>
      </nav>
    </header>
  )
}