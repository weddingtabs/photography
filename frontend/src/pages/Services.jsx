import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import {
  Heart, Sparkles, PartyPopper, Package, Video, Monitor,
  Home as HomeIcon, User, UtensilsCrossed, Briefcase, Check, ArrowRight,
} from 'lucide-react'

const SERVICES = [
  {
    icon: Heart,
    title: 'Wedding Photography',
    subtitle: 'Real Estate Photography',
    description: 'Stunning architectural and interior photography that helps properties sell faster.',
    price: '12,000',
  },
  {
    icon: Sparkles,
    title: 'Pre-Wedding Shoots',
    subtitle: 'Portrait Sessions',
    description: 'Professional headshots, portfolio building, and personal branding photography.',
    price: '7,000',
  },
  {
    icon: PartyPopper,
    title: 'Event Coverage',
    subtitle: 'Food Photography',
    description: 'Mouth-watering food photography for restaurants, cafes, and food brands.',
    price: '9,000',
  },
  {
    icon: Package,
    title: 'Product Photography',
    subtitle: 'Commercial & Brand',
    description: 'Marketing campaigns, brand storytelling, and advertising photography that elevates your brand.',
    price: '20,000',
  },
  {
    icon: Video,
    title: 'Live Streaming',
    subtitle: null,
    description: 'Professional live streaming services for weddings, events, and special occasions. Stream to your loved ones worldwide.',
    price: '10,000',
  },
  {
    icon: Monitor,
    title: 'LED Screens',
    subtitle: null,
    description: 'High-quality LED screen rentals for weddings and events. Perfect for photo slideshows, live feeds, and event displays.',
    price: '8,000',
  },
]

const PACKAGES = [
  {
    name: 'Essential',
    tagline: 'Perfect for intimate celebrations',
    price: '25,000',
    popular: false,
    features: [
      'Half-day coverage (4 hours)',
      '1 Photographer',
      '50+ edited photos',
      'Basic color correction',
      'Digital delivery',
      '5-7 days delivery',
    ],
  },
  {
    name: 'Premium',
    tagline: 'Our most popular package',
    price: '55,000',
    popular: true,
    features: [
      'Full-day coverage (8 hours)',
      '1 Photographer + 1 Videographer',
      '100+ edited photos',
      'Advanced retouching',
      'Highlight video (3-5 mins)',
      'Basic wedding album',
      'Express delivery option',
    ],
  },
  {
    name: 'Luxury',
    tagline: 'The complete experience',
    price: '1,20,000',
    popular: false,
    features: [
      'Multi-day coverage',
      'Full crew (2-4 people)',
      '200+ edited photos',
      'Premium retouching',
      'Cinematic film + Reels',
      'Premium wedding album',
      'Drone coverage',
      'Same-day preview',
    ],
  },
]

const STEPS = [
  { title: 'Enquire', description: 'Fill out our quote form with your requirements' },
  { title: 'Consult', description: 'We discuss your vision and finalize details' },
  { title: 'Capture', description: 'We capture your moments with expertise' },
  { title: 'Deliver', description: 'Receive your edited photos and videos' },
]

export default function Services() {
  const navigate = useNavigate()

  return (
    <div className="pb-20">
      <Helmet>
        <title>Photography Packages & Pricing | Wedding Tabs Studio, Vizag</title>
        <meta name="description" content="Transparent wedding photography packages in Visakhapatnam for every budget. Compare packages and request a quote." />
        <link rel="canonical" href="https://weddingtabs.com/services" />
      </Helmet>

      {/* Hero */}
      <div className="pt-32 pb-16 text-center max-w-2xl mx-auto px-4">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">What We Offer</span>
        <h1 className="font-heading text-5xl font-semibold text-charcoal mt-3 mb-4">Our Services</h1>
        <p className="text-charcoal/60">
          From weddings to commercial shoots, we offer comprehensive photography and videography
          services tailored to your needs.
        </p>
      </div>

      {/* Service cards */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="p-6 rounded-2xl bg-white border border-charcoal/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-charcoal/50 mb-1">{s.title}</h3>
                {s.subtitle && (
                  <h4 className="font-heading text-xl font-semibold text-charcoal mb-3">{s.subtitle}</h4>
                )}
                <p className="text-sm text-charcoal/60 mb-4 leading-relaxed">{s.description}</p>
                <div className="text-gold font-semibold">Starting at ₹{s.price}</div>
              </div>
            )
          })}
        </div>

        {/* Pricing packages */}
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">Simple Pricing</span>
          <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">Choose Your Package</h2>
          <p className="text-charcoal/60 max-w-lg mx-auto">
            Straightforward packages, or get a custom quote tailored to your exact requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24 items-start">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl bg-white p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${
                pkg.popular ? 'border-gold shadow-xl md:scale-105' : 'border-charcoal/10 hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl font-semibold text-charcoal mb-1">{pkg.name}</h3>
                <p className="text-sm text-charcoal/50 mb-4">{pkg.tagline}</p>
                <div className="font-heading text-4xl font-semibold text-gold">₹{pkg.price}</div>
                <div className="text-xs text-charcoal/40 mt-1">starting price</div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/get-quote')}
                className={`w-full font-semibold rounded-lg px-4 py-3 transition ${
                  pkg.popular
                    ? 'bg-gold text-charcoal hover:opacity-90'
                    : 'border-2 border-gold text-gold hover:bg-gold hover:text-charcoal'
                }`}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl font-semibold text-charcoal mb-3">How It Works</h2>
          <p className="text-charcoal/60">From initial consultation to final delivery, here's what to expect.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold font-heading text-xl font-semibold flex items-center justify-center mx-auto mb-4">
                {i + 1}
              </div>
              <h4 className="font-heading text-lg font-semibold text-charcoal mb-2">{step.title}</h4>
              <p className="text-sm text-charcoal/60">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[60%] w-full h-px bg-gold/20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/70" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="relative max-w-2xl mx-auto text-center px-4 py-24">
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-cream mb-4">Ready to Get Started?</h2>
          <p className="text-cream/80 mb-8">
            Get a detailed quote tailored to your specific requirements. Our transparent pricing ensures no surprises.
          </p>
          <button
            onClick={() => navigate('/get-quote')}
            className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-8 py-4 hover:opacity-90 transition"
          >
            Get Your Custom Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}