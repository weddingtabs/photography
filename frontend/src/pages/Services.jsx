import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Camera } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('services').select('*').order('sort_order')
      if (!error) setServices(data || [])
    }
    fetchServices()
  }, [])

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <Helmet><title>Services & Pricing | Wedding Tabs Studio</title></Helmet>

      <h1 className="font-heading text-4xl font-semibold text-charcoal mb-4">Our Services</h1>
      <p className="text-charcoal/70 mb-10">
        Transparent packages for every occasion. Final pricing may vary based on location and requirements —
        get an instant estimate on the Get Quote page.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl border border-charcoal/10 hover:shadow-lg transition">
            <Camera className="w-8 h-8 text-gold mb-4" />
            <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">{s.name}</h3>
            <p className="text-charcoal/70 text-sm mb-4">{s.description}</p>
            <div className="font-heading text-2xl font-semibold text-gold">₹{s.base_price?.toLocaleString('en-IN')}</div>
            <div className="text-xs text-charcoal/50">starting price</div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-charcoal/60">Services will appear here once added from the admin panel.</p>
        )}
      </div>
    </div>
  )
}
