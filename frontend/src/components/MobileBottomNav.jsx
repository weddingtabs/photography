import { NavLink } from 'react-router-dom'
import { Home, Image, Camera, MessageCircleQuestion, Phone } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/portfolio', label: 'Portfolio', icon: Image },
  { to: '/services', label: 'Services', icon: Camera },
  { to: '/get-quote', label: 'Get Quote', icon: MessageCircleQuestion },
  { to: '/contact', label: 'Contact', icon: Phone },
]

export default function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-charcoal/10 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? 'text-gold' : 'text-charcoal/60'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
