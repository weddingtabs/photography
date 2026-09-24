import { Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="hidden lg:block bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Wedding Tabs Logo" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-heading text-xl font-semibold">Wedding Tabs Photography</span>          </div>
          <p className="text-cream/70 text-sm leading-relaxed">
            Capturing your precious moments with artistry and passion.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/weddingtabs_photography" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@weddingtabsphotography" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/track-booking">Track Booking</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li>Wedding Photography</li>
            <li>Pre-Wedding Shoots</li>
            <li>Event Coverage</li>
            <li>Portrait Sessions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm text-cream/70">
            <li className="flex items-start gap-3"><Phone className="w-4 h-4 text-gold mt-0.5" /> +91 80081 98502</li>
            <li className="flex items-start gap-3"><Mail className="w-4 h-4 text-gold mt-0.5" /> Weddingtabsphotography@gmail.com</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-gold mt-0.5" /> MVP, Visakhapatnam, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-cream/50 text-sm">
        © {new Date().getFullYear()} Wedding Tabs Studio. All rights reserved.
      </div>
    </footer>
  )
}