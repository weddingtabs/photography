import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Cake, Heart, Sparkles, Gem, Calendar, MapPin, User, Phone, Mail, FileText } from 'lucide-react'
import { supabase } from '../supabaseClient'

const API_URL = import.meta.env.VITE_API_URL
const STUDIO_WHATSAPP = '917093093440'

const iconMap = { '🎂': Cake, '💍': Gem, '🥻': Sparkles, '❤️': Heart }

export default function GetQuote() {
  const [eventTypes, setEventTypes] = useState([])
  const [services, setServices] = useState([])
  const [albums, setAlbums] = useState([])
  const [deliverables, setDeliverables] = useState([])

  const [selectedEventType, setSelectedEventType] = useState(null)
  const [location, setLocation] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [selectedServiceIds, setSelectedServiceIds] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState(null)
  const [selectedDeliverableIds, setSelectedDeliverableIds] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  const [estimate, setEstimate] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      const [etRes, albumRes, delRes] = await Promise.all([
        supabase.from('event_types').select('*').order('sort_order'),
        supabase.from('albums').select('*').order('sort_order'),
        supabase.from('deliverables').select('*').order('sort_order'),
      ])
      if (etRes.data?.length) {
        setEventTypes(etRes.data)
        setSelectedEventType(etRes.data[0].id)
      }
      if (albumRes.data?.length) setAlbums(albumRes.data)
      if (delRes.data?.length) setDeliverables(delRes.data)
    }
    load()
  }, [])

  useEffect(() => {
    if (!selectedEventType) return
    async function loadServices() {
      const { data } = await supabase.from('services').select('*').eq('event_type_id', selectedEventType).order('sort_order')
      setServices(data || [])
      setSelectedServiceIds([])
      setEstimate(null)
    }
    loadServices()
  }, [selectedEventType])

  function toggleService(id) {
    setSelectedServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  function toggleDeliverable(id) {
    setSelectedDeliverableIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function calculateEstimate() {
    const servicesTotal = services.filter((s) => selectedServiceIds.includes(s.id)).reduce((sum, s) => sum + Number(s.base_price), 0)
    const albumPrice = albums.find((a) => a.id === selectedAlbumId)?.price || 0
    const deliverablesTotal = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).reduce((sum, d) => sum + Number(d.price), 0)
    setEstimate(servicesTotal + albumPrice + deliverablesTotal)
  }

  function buildSummaryText() {
    const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
    const serviceNames = services.filter((s) => selectedServiceIds.includes(s.id)).map((s) => s.name).join(', ') || 'None'
    const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || 'None'
    const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name).join(', ') || 'None'

    return `Hi! I'd like to enquire about a photography package.

*Event Type:* ${eventTypeName}
*Location:* ${location || '-'}
*Event Date:* ${eventDate || '-'}
*Services:* ${serviceNames}
*Album:* ${albumName}
*Deliverables:* ${deliverableNames}
*Estimated Total:* ₹${(estimate || 0).toLocaleString('en-IN')}

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || '-'}
*Notes:* ${notes || '-'}`
  }

  async function handleSendEnquiry() {
    setSubmitting(true)
    const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
    const serviceNames = services.filter((s) => selectedServiceIds.includes(s.id)).map((s) => s.name)
    const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || ''
    const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name)

    // Best-effort save to backend for the admin dashboard — WhatsApp redirect happens regardless
    try {
      await fetch(`${API_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email, shoot_type: eventTypeName, event_date: eventDate || null,
          location, services_selected: serviceNames, album_selected: albumName,
          deliverables_selected: deliverableNames, notes, estimate,
        }),
      })
    } catch {
      // Non-blocking — WhatsApp enquiry still goes through even if the backend save fails
    }

    const message = encodeURIComponent(buildSummaryText())
    window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${message}`, '_blank')
    setSubmitting(false)
  }

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4">
      <Helmet><title>Get a Quote | Wedding Tabs Studio</title></Helmet>

      <div className="text-center mb-8">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">Transparent Pricing</span>
        <h1 className="font-heading text-4xl font-semibold text-charcoal mt-2 mb-2">Get Your Quote</h1>
        <p className="text-charcoal/60 text-sm">Fill out the form below to get an instant price estimate. No hidden charges, just transparent pricing.</p>
      </div>

      {/* Event Type */}
      <Section title="Event Type" required>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {eventTypes.map((et) => {
            const Icon = iconMap[et.icon] || Sparkles
            const active = selectedEventType === et.id
            return (
              <button key={et.id} onClick={() => setSelectedEventType(et.id)}
                className={`flex flex-col items-center gap-2 border-2 rounded-xl py-4 transition ${
                  active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'
                }`}>
                <Icon className={`w-6 h-6 ${active ? 'text-gold' : 'text-charcoal/50'}`} />
                <span className="text-sm font-medium text-charcoal">{et.name}</span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <label className="text-xs text-charcoal/50 mb-1 block">Where will the shoot take place?</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input placeholder="e.g. Mumbai, Gandhinagar" value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
        </div>
        <label className="text-xs text-charcoal/50 mb-1 mt-4 block">Event Date</label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
        </div>
      </Section>

      {/* Services */}
      <Section title={`Select Services for ${eventTypes.find((e) => e.id === selectedEventType)?.name || ''}`}>
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <button key={s.id} onClick={() => toggleService(s.id)}
              className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${
                selectedServiceIds.includes(s.id) ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'
              }`}>
              <span className="text-sm font-medium text-charcoal">{s.name}</span>
              <span className="text-xs text-gold font-semibold">{Number(s.base_price) === 0 ? 'Free' : `₹${Number(s.base_price).toLocaleString('en-IN')}`}</span>
            </button>
          ))}
          {services.length === 0 && <p className="text-charcoal/50 text-sm col-span-2">No services set up for this event type yet.</p>}
        </div>
      </Section>

      {/* Physical Album */}
      <Section title="Physical Album" subtitle="Do you need a printed album?">
        <div className="grid grid-cols-2 gap-3">
          {albums.map((a) => (
            <button key={a.id} onClick={() => setSelectedAlbumId(a.id)}
              className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${
                selectedAlbumId === a.id ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'
              }`}>
              <span className="text-sm font-medium text-charcoal">{a.name}</span>
              <span className="text-xs text-gold font-semibold">{Number(a.price) === 0 ? 'Free' : `₹${Number(a.price).toLocaleString('en-IN')}`}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Deliverables */}
      <Section title="Deliverables" subtitle="Select all that apply">
        <div className="grid grid-cols-2 gap-3">
          {deliverables.map((d) => (
            <button key={d.id} onClick={() => toggleDeliverable(d.id)}
              className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${
                selectedDeliverableIds.includes(d.id) ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'
              }`}>
              <span className="text-sm font-medium text-charcoal">{d.name}</span>
              <span className="text-xs text-gold font-semibold">{d.is_free ? 'Free' : `₹${Number(d.price).toLocaleString('en-IN')}`}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Your Info */}
      <Section title="Your Information" subtitle="Help us reach out to you">
        <div className="space-y-3">
          <div className="relative">
            <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
          </div>
          <div className="relative">
            <Phone className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input required placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
          </div>
          <div className="relative">
            <FileText className="w-4 h-4 text-charcoal/40 absolute left-3 top-3" />
            <textarea placeholder="Any specific requirements or questions..." value={notes} onChange={(e) => setNotes(e.target.value)}
              rows={3} className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
          </div>
        </div>
      </Section>

      {estimate !== null && (
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 text-center mb-6">
          <div className="text-sm text-charcoal/70">Your Estimated Total</div>
          <div className="font-heading text-3xl font-semibold text-gold">₹{estimate.toLocaleString('en-IN')}</div>
          <div className="text-xs text-charcoal/50 mt-1">Final price confirmed after studio review</div>
        </div>
      )}

      {estimate === null ? (
        <button onClick={calculateEstimate} disabled={!name || !phone}
          className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
          Calculate Estimate
        </button>
      ) : (
        <button onClick={handleSendEnquiry} disabled={submitting}
          className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
          {submitting ? 'Sending...' : 'Send Enquiry via WhatsApp'}
        </button>
      )}
      {(!name || !phone) && estimate === null && (
        <p className="text-xs text-charcoal/40 text-center mt-2">Fill in your name and phone number above to calculate an estimate.</p>
      )}
    </div>
  )
}

function Section({ title, subtitle, required, children }) {
  return (
    <div className="bg-cream border border-charcoal/10 rounded-2xl p-5 mb-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-charcoal mb-1">
        {title} {required && <span className="text-gold">*</span>}
      </h3>
      {subtitle && <p className="text-xs text-charcoal/50 mb-4">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-4'}>{children}</div>
    </div>
  )
}
