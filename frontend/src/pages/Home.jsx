import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Camera, Star, Award, Users, ArrowRight } from 'lucide-react'

const stats = [
  { icon: Camera, value: '150+', label: 'Weddings Captured' },
  { icon: Star, value: '4.9/5', label: 'Client Rating' },
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: Users, value: '500+', label: 'Happy Clients' },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Wedding Tabs Studio | Premium Photography Services</title>
        <meta name="description" content="Premium wedding, pre-wedding, event and portrait photography." />
      </Helmet>

      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="/hero-wedding.jpg" alt="Wedding photography" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              Premium Photography Studio
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-tight mb-6">
              Capturing Your <span className="text-gold">Wedding Tabs</span>
            </h1>
            <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              We transform your precious moments into timeless memories with artistry, passion, and an eye for perfection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/get-quote" className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition">
                Get Your Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 border-2 border-cream text-cream font-semibold rounded-xl px-6 py-3 hover:bg-cream hover:text-charcoal transition">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="font-heading text-3xl font-semibold text-cream mb-1">{value}</div>
              <div className="text-cream/60 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-cream text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-charcoal mb-6">
            Ready to Capture Your <span className="text-gold">Wedding Tabs</span>?
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto mb-8">
            Get a personalized quote for your photography needs.
          </p>
          <Link to="/get-quote" className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
