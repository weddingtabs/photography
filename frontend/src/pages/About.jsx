import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Camera, Star, Users, Award, ArrowRight, Heart, Clock, Shield, Sparkles } from 'lucide-react'

import portraitImage from '../assets/portfolio-portrait.jpg'
import preweddingImage from '../assets/portfolio-prewedding.jpg'
import heroWedding from '../assets/hero-wedding.jpg'

const STATS = [
  { icon: Camera, value: '150+', label: 'Weddings' },
  { icon: Star, value: '4.9/5', label: 'Rating' },
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Award, value: '12+', label: 'Awards' },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We start with understanding your vision, preferences, and the story you want to tell.',
  },
  {
    number: '02',
    title: 'The Shoot',
    description: 'On the day, we create a relaxed atmosphere where genuine emotions naturally unfold.',
  },
  {
    number: '03',
    title: 'Delivery',
    description: 'Each image is carefully curated and edited to perfection before delivery.',
  },
]

const DIFFERENTIATORS = [
  {
    icon: Award,
    title: 'Award-Winning Quality',
    description: 'Our work has been recognized by leading photography associations and featured in premium wedding magazines.',
  },
  {
    icon: Heart,
    title: 'Passionate Storytelling',
    description: "We don't just take photos; we craft visual narratives that capture the essence of your special moments.",
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'We understand the anticipation. Our streamlined workflow ensures you receive your precious memories on time.',
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Your photos are stored securely with multiple backups. Your memories are safe with us, always.',
  },
  {
    icon: Sparkles,
    title: 'Premium Equipment',
    description: 'We use top-of-the-line cameras, lenses, and lighting to ensure every shot is picture-perfect.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our team of photographers and videographers brings years of experience and fresh creative perspectives.',
  },
]

const TEAM = [
  { name: 'Rahul Sharma', role: 'Lead Photographer', image: preweddingImage },
  { name: 'Priya Patel', role: 'Wedding Specialist', image: portraitImage },
  { name: 'Amit Verma', role: 'Cinematographer', image: heroWedding },
]

export default function About() {
  return (
    <div>
      <Helmet><title>About Us | Wedding Tabs Studio</title></Helmet>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-charcoal mt-3 mb-6 leading-tight">
            The Story Behind <br />
            <span className="text-gold">Wedding Tabs</span>
          </h1>
          <p className="text-charcoal/70 leading-relaxed mb-5">
            Founded in 2016, Wedding Tabs Studio began with a simple vision: to transform fleeting moments into
            timeless treasures. What started as a one-person passion project has grown into a full-service
            photography studio trusted by hundreds of families.
          </p>
          <p className="text-charcoal/70 leading-relaxed">
            Our founder, inspired by the power of visual storytelling, assembled a team of like-minded artists who
            share the same dedication to excellence. Today, we're proud to be one of the most sought-after
            photography studios in the region.
          </p>
        </div>

        <div className="relative">
          <img src={portraitImage} alt="Wedding Tabs Studio" className="rounded-2xl w-full aspect-[4/5] object-cover" />
          <div className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-lg px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-charcoal" />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold text-charcoal leading-none">8+</div>
              <div className="text-xs text-charcoal/50 mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-charcoal py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label}>
                <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="font-heading text-2xl font-semibold text-cream">{s.value}</div>
                <div className="text-xs text-cream/60">{s.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* How We Work */}
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">Our Approach</span>
        <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">How We Work</h2>
        <p className="text-charcoal/60 max-w-lg mx-auto mb-14">
          Our photography process is designed to make you feel comfortable and bring out your authentic self.
        </p>

        <div className="grid sm:grid-cols-3 gap-10">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number}>
              <div className="w-14 h-14 rounded-2xl bg-gold text-charcoal font-heading text-lg font-semibold flex items-center justify-center mx-auto mb-5">
                {step.number}
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">{step.title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="bg-cream/50 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">What Sets Us Apart</h2>
            <p className="text-charcoal/60 max-w-lg mx-auto">
              Discover the reasons why hundreds of clients trust us with their most precious moments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.title} className="bg-white rounded-2xl p-6 border border-charcoal/10">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">{d.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{d.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Meet The Artists */}
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">Our Team</span>
        <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">Meet The Artists</h2>
        <p className="text-charcoal/60 max-w-lg mx-auto mb-14">
          The passionate individuals behind every stunning photograph.
        </p>

        <div className="grid sm:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="text-left">
              <img src={member.image} alt={member.name}
                className="rounded-2xl w-full aspect-[4/5] object-cover mb-4" />
              <h3 className="font-heading text-lg font-semibold text-charcoal">{member.name}</h3>
              <p className="text-sm text-gold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-charcoal py-20 text-center px-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-cream mb-4">
          Ready to Create Magic Together?
        </h2>
        <p className="text-cream/70 max-w-md mx-auto mb-8">
          Let's discuss your vision and create something extraordinary.
        </p>
        <Link to="/get-quote"
          className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-8 py-4 hover:opacity-90 transition">
          Get Your Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}