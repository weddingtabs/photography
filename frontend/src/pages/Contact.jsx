import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <Helmet><title>Contact Us | Wedding Tabs Studio</title></Helmet>
      <h1 className="font-heading text-4xl font-semibold text-charcoal mb-8">Get In Touch</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <a href="tel:+917093093440" className="flex items-center gap-3 text-charcoal hover:text-gold transition">
            <Phone className="w-5 h-5 text-gold" /> +91 70930 93440
          </a>
          <a href="mailto:hello@dreammoments.studio" className="flex items-center gap-3 text-charcoal hover:text-gold transition">
            <Mail className="w-5 h-5 text-gold" /> hello@dreammoments.studio
          </a>
          <div className="flex items-center gap-3 text-charcoal">
            <MapPin className="w-5 h-5 text-gold" /> Mumbai, Maharashtra, India
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-charcoal/10 h-64">
          <iframe
            title="Studio location"
            className="w-full h-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Andheri+West+Mumbai&output=embed"
          />
        </div>
      </div>
    </div>
  )
}
