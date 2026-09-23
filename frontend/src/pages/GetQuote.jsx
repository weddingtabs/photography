// // import { useEffect, useState } from 'react'
// // import { Helmet } from 'react-helmet-async'
// // import { Cake, Heart, Sparkles, Gem, MapPin, User, Phone, Mail, FileText, Navigation } from 'lucide-react'
// // import { supabase } from '../supabaseClient'

// // const API_URL = import.meta.env.VITE_API_URL
// // const STUDIO_WHATSAPP = '918008198502'
// // const iconMap = { '🎂': Cake, '💍': Gem, '🥻': Sparkles, '❤️': Heart }

// // export default function GetQuote() {
// //   const [eventTypes, setEventTypes] = useState([])
// //   const [selectedEventType, setSelectedEventType] = useState(null)
// //   const [subEvents, setSubEvents] = useState([]) // each with .pricing (array of {id, price, service_catalog:{id,name}})
// //   const [albums, setAlbums] = useState([])
// //   const [deliverables, setDeliverables] = useState([])

// //   const [venue, setVenue] = useState('')
// //   const [coords, setCoords] = useState(null)
// //   const [locating, setLocating] = useState(false)

// //   const [selectedAlbumId, setSelectedAlbumId] = useState(null)
// //   const [selectedDeliverableIds, setSelectedDeliverableIds] = useState([])
// //   // subEventState[subEventId] = { date, serviceCatalogIds: [] } — track by service_catalog id, not pricing-row id
// //   const [subEventState, setSubEventState] = useState({})

// //   const [name, setName] = useState('')
// //   const [phone, setPhone] = useState('')
// //   const [email, setEmail] = useState('')
// //   const [notes, setNotes] = useState('')

// //   const [estimate, setEstimate] = useState(null)
// //   const [submitting, setSubmitting] = useState(false)

// //   useEffect(() => {
// //     async function load() {
// //       const [etRes, albumRes, delRes] = await Promise.all([
// //         supabase.from('event_types').select('*').order('sort_order'),
// //         supabase.from('albums').select('*').order('sort_order'),
// //         supabase.from('deliverables').select('*').order('sort_order'),
// //       ])
// //       if (etRes.error) console.error(etRes.error)
// //       if (etRes.data?.length) {
// //         setEventTypes(etRes.data)
// //         setSelectedEventType(etRes.data[0].id)
// //       }
// //       if (albumRes.data?.length) setAlbums(albumRes.data)
// //       if (delRes.data?.length) setDeliverables(delRes.data)
// //     }
// //     load()
// //   }, [])

// //   useEffect(() => {
// //     if (!selectedEventType) return
// //     async function loadSubEvents() {
// //       // FIX: pull pricing via sub_event_services -> service_catalog, not a non-existent `services` column
// //       const { data, error } = await supabase
// //         .from('sub_events')
// //         .select('*, pricing:sub_event_services(id, price, service_catalog(id, name))')
// //         .eq('event_type_id', selectedEventType)
// //         .order('sort_order')
// //       if (error) console.error(error)
// //       setSubEvents(data || [])
// //       const initState = {}
// //       ;(data || []).forEach((se) => { initState[se.id] = { date: '', serviceCatalogIds: [] } })
// //       setSubEventState(initState)
// //       setEstimate(null)
// //     }
// //     loadSubEvents()
// //   }, [selectedEventType])

// //   function toggleSubService(subEventId, serviceCatalogId) {
// //     setSubEventState((prev) => {
// //       const current = prev[subEventId] || { date: '', serviceCatalogIds: [] }
// //       const ids = current.serviceCatalogIds.includes(serviceCatalogId)
// //         ? current.serviceCatalogIds.filter((x) => x !== serviceCatalogId)
// //         : [...current.serviceCatalogIds, serviceCatalogId]
// //       return { ...prev, [subEventId]: { ...current, serviceCatalogIds: ids } }
// //     })
// //   }

// //   function setSubEventDate(subEventId, date) {
// //     setSubEventState((prev) => ({ ...prev, [subEventId]: { ...(prev[subEventId] || { serviceCatalogIds: [] }), date } }))
// //   }

// //   function toggleDeliverable(id) {
// //     setSelectedDeliverableIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
// //   }

// //   function detectLocation() {
// //     if (!navigator.geolocation) return
// //     setLocating(true)
// //     navigator.geolocation.getCurrentPosition(
// //       async (pos) => {
// //         const { latitude, longitude } = pos.coords
// //         setCoords({ lat: latitude, lng: longitude })
// //         if (!venue) {
// //           try {
// //             const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
// //             const data = await res.json()
// //             if (data.display_name) setVenue(data.display_name)
// //           } catch { /* ignore — venue stays manual */ }
// //         }
// //         setLocating(false)
// //       },
// //       () => setLocating(false)
// //     )
// //   }

// //   function calculateEstimate() {
// //     let total = 0
// //     subEvents.forEach((se) => {
// //       const state = subEventState[se.id]
// //       if (!state) return
// //       const svcTotal = (se.pricing || [])
// //         .filter((p) => state.serviceCatalogIds.includes(p.service_catalog.id))
// //         .reduce((sum, p) => sum + Number(p.price), 0)
// //       total += svcTotal
// //     })
// //     total += albums.find((a) => a.id === selectedAlbumId)?.price || 0
// //     total += deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).reduce((sum, d) => sum + Number(d.price), 0)
// //     setEstimate(total)
// //   }

// //   function buildSummaryText() {
// //     const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
// //     const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || 'None'
// //     const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name).join(', ') || 'None'

// //     const subEventLines = subEvents.map((se) => {
// //       const state = subEventState[se.id]
// //       const services = (se.pricing || [])
// //         .filter((p) => state?.serviceCatalogIds.includes(p.service_catalog.id))
// //         .map((p) => p.service_catalog.name)
// //       if (services.length === 0) return null
// //       return `- ${se.name}${state.date ? ` (${state.date})` : ''}: ${services.join(', ')}`
// //     }).filter(Boolean).join('\n')

// //     const mapLine = coords ? `\n*Map Location:* https://www.google.com/maps?q=${coords.lat},${coords.lng}` : ''

// //     return `Hi! I'd like to enquire about a photography package.

// // *Event Type:* ${eventTypeName}
// // *Venue:* ${venue || '-'}${mapLine}

// // *Selections:*
// // ${subEventLines || 'None'}

// // *Album:* ${albumName}
// // *Deliverables:* ${deliverableNames}
// // *Estimated Total:* ₹${(estimate || 0).toLocaleString('en-IN')}

// // *Name:* ${name}
// // *Phone:* ${phone}
// // *Email:* ${email || '-'}
// // *Notes:* ${notes || '-'}`
// //   }

// //   async function handleSendEnquiry() {
// //     setSubmitting(true)
// //     const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
// //     const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || ''
// //     const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name)

// //     const subEventsPayload = subEvents.map((se) => ({
// //       name: se.name,
// //       date: subEventState[se.id]?.date || null,
// //       services: (se.pricing || [])
// //         .filter((p) => subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id))
// //         .map((p) => ({ name: p.service_catalog.name, price: p.price })),
// //     })).filter((se) => se.services.length > 0)

// //     try {
// //       await fetch(`${API_URL}/booking`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           name, phone, email, shoot_type: eventTypeName, event_date: subEventsPayload[0]?.date || null,
// //           location: venue, latitude: coords?.lat, longitude: coords?.lng,
// //           sub_events_selected: subEventsPayload, album_selected: albumName,
// //           deliverables_selected: deliverableNames, notes, estimate,
// //         }),
// //       })
// //     } catch { /* non-blocking — WhatsApp still opens */ }

// //     window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(buildSummaryText())}`, '_blank')
// //     setSubmitting(false)
// //   }

// //   return (
// //     <div className="pt-32 pb-24 max-w-2xl mx-auto px-4">
// //       <Helmet><title>Get a Quote | Wedding Tabs Studio</title></Helmet>

// //       <div className="text-center mb-8">
// //         <span className="text-gold text-xs font-semibold uppercase tracking-wider">Transparent Pricing</span>
// //         <h1 className="font-heading text-4xl font-semibold text-charcoal mt-2 mb-2">Get Your Quote</h1>
// //         <p className="text-charcoal/60 text-sm">Select the type of event you need coverage for.</p>
// //       </div>

// //       <Section title="Event Type" required>
// //         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //           {eventTypes.map((et) => {
// //             const Icon = iconMap[et.icon] || Sparkles
// //             const active = selectedEventType === et.id
// //             return (
// //               <button key={et.id} onClick={() => setSelectedEventType(et.id)}
// //                 className={`flex flex-col items-center gap-2 border-2 rounded-xl py-4 transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
// //                 <Icon className={`w-6 h-6 ${active ? 'text-gold' : 'text-charcoal/50'}`} />
// //                 <span className="text-sm font-medium text-charcoal">{et.name}</span>
// //               </button>
// //             )
// //           })}
// //         </div>
// //       </Section>

// //       <Section title="Venue" subtitle="Where will the event take place?">
// //         <label className="text-xs text-charcoal/50 mb-1 block">Venue Name / City</label>
// //         <div className="relative mb-3">
// //           <MapPin className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
// //           <input placeholder="e.g., Grand Palace, Mumbai" value={venue} onChange={(e) => setVenue(e.target.value)}
// //             className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
// //         </div>
// //         <button type="button" onClick={detectLocation} disabled={locating}
// //           className="w-full flex items-center justify-center gap-2 border-2 border-gold text-gold font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-gold hover:text-charcoal transition disabled:opacity-50">
// //           <Navigation className="w-4 h-4" /> {locating ? 'Detecting...' : coords ? 'Location Pinned ✓' : 'Pin My Exact Location (for the map)'}
// //         </button>
// //       </Section>

// //       {subEvents.map((se) => (
// //         <Section key={se.id} title={se.name} icon>
// //           {se.requires_date && (
// //             <>
// //               <label className="text-xs text-charcoal/50 mb-1 block">{se.name} Date</label>
// //               <input type="date" value={subEventState[se.id]?.date || ''}
// //                 onChange={(e) => setSubEventDate(se.id, e.target.value)}
// //                 className="w-full border border-charcoal/20 rounded-lg px-3 py-3 mb-4" />
// //             </>
// //           )}
// //           <div className="grid grid-cols-2 gap-3">
// //             {(se.pricing || []).map((p) => {
// //               const active = subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id)
// //               return (
// //                 <button key={p.id} onClick={() => toggleSubService(se.id, p.service_catalog.id)}
// //                   className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
// //                   <span className="text-sm font-medium text-charcoal">{p.service_catalog.name}</span>
// //                   <span className="text-xs text-gold font-semibold">{Number(p.price) === 0 ? 'No Need' : `+₹${Number(p.price).toLocaleString('en-IN')}`}</span>
// //                 </button>
// //               )
// //             })}
// //             {(!se.pricing || se.pricing.length === 0) && <p className="text-charcoal/50 text-sm col-span-2">No services set up yet for {se.name}.</p>}
// //           </div>
// //         </Section>
// //       ))}

// //       <Section title="Physical Album" subtitle="Do you need a printed album?">
// //         <div className="grid grid-cols-2 gap-3">
// //           {albums.map((a) => (
// //             <button key={a.id} onClick={() => setSelectedAlbumId(a.id)}
// //               className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${selectedAlbumId === a.id ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
// //               <span className="text-sm font-medium text-charcoal">{a.name}</span>
// //               <span className="text-xs text-gold font-semibold">{Number(a.price) === 0 ? 'Free' : `₹${Number(a.price).toLocaleString('en-IN')}`}</span>
// //             </button>
// //           ))}
// //         </div>
// //       </Section>

// //       <Section title="Deliverables" subtitle="Select all that apply">
// //         <div className="grid grid-cols-2 gap-3">
// //           {deliverables.map((d) => (
// //             <button key={d.id} onClick={() => toggleDeliverable(d.id)}
// //               className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${selectedDeliverableIds.includes(d.id) ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
// //               <span className="text-sm font-medium text-charcoal">{d.name}</span>
// //               <span className="text-xs text-gold font-semibold">{d.is_free ? 'Free' : `₹${Number(d.price).toLocaleString('en-IN')}`}</span>
// //             </button>
// //           ))}
// //         </div>
// //       </Section>

// //       <Section title="Your Information" subtitle="Help us reach out to you">
// //         <div className="space-y-3">
// //           <div className="relative">
// //             <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
// //             <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
// //               className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
// //           </div>
// //           <div className="relative">
// //             <Phone className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
// //             <input required placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
// //               className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
// //           </div>
// //           <div className="relative">
// //             <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
// //             <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
// //               className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
// //           </div>
// //           <div className="relative">
// //             <FileText className="w-4 h-4 text-charcoal/40 absolute left-3 top-3" />
// //             <textarea placeholder="Any specific requirements or questions..." value={notes} onChange={(e) => setNotes(e.target.value)}
// //               rows={3} className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
// //           </div>
// //         </div>
// //       </Section>

// //       {estimate !== null && (
// //         <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 text-center mb-6">
// //           <div className="text-sm text-charcoal/70">Your Estimated Total</div>
// //           <div className="font-heading text-3xl font-semibold text-gold">₹{estimate.toLocaleString('en-IN')}</div>
// //           <div className="text-xs text-charcoal/50 mt-1">Final price confirmed after studio review</div>
// //         </div>
// //       )}

// //       {estimate === null ? (
// //         <button onClick={calculateEstimate} disabled={!name || !phone}
// //           className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
// //           Calculate Estimate
// //         </button>
// //       ) : (
// //         <button onClick={handleSendEnquiry} disabled={submitting}
// //           className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
// //           {submitting ? 'Sending...' : 'Send Enquiry via WhatsApp'}
// //         </button>
// //       )}
// //       {(!name || !phone) && estimate === null && (
// //         <p className="text-xs text-charcoal/40 text-center mt-2">Fill in your name and phone number above to calculate an estimate.</p>
// //       )}
// //     </div>
// //   )
// // }

// // function Section({ title, subtitle, required, icon, children }) {
// //   return (
// //     <div className="bg-cream border border-charcoal/10 rounded-2xl p-5 mb-5 shadow-sm">
// //       <h3 className="font-heading text-lg font-semibold text-charcoal mb-1 flex items-center gap-2">
// //         {icon && <Heart className="w-4 h-4 text-gold" />} {title} {required && <span className="text-gold">*</span>}
// //       </h3>
// //       {subtitle && <p className="text-xs text-charcoal/50 mb-4">{subtitle}</p>}
// //       <div className={subtitle ? '' : 'mt-4'}>{children}</div>
// //     </div>
// //   )
// // }


// import { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async'
// import { Cake, Heart, Sparkles, Gem, MapPin, User, Phone, Mail, FileText, Navigation } from 'lucide-react'
// import emailjs from '@emailjs/browser'
// import { supabase } from '../supabaseClient'

// const API_URL = import.meta.env.VITE_API_URL
// const STUDIO_WHATSAPP = '918008198502'
// const iconMap = { '🎂': Cake, '💍': Gem, '🥻': Sparkles, '❤️': Heart }

// const EMAILJS_SERVICE_ID = 'service_ycr3pqf'
// const EMAILJS_TEMPLATE_ID = 'template_as0xv5a'
// const EMAILJS_PUBLIC_KEY = 'n00tQy63Un6x1KL2Z'

// emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })

// export default function GetQuote() {
//   const [eventTypes, setEventTypes] = useState([])
//   const [selectedEventType, setSelectedEventType] = useState(null)
//   const [subEvents, setSubEvents] = useState([])
//   const [albums, setAlbums] = useState([])
//   const [deliverables, setDeliverables] = useState([])

//   const [venue, setVenue] = useState('')
//   const [coords, setCoords] = useState(null)
//   const [locating, setLocating] = useState(false)

//   const [selectedAlbumId, setSelectedAlbumId] = useState(null)
//   const [selectedDeliverableIds, setSelectedDeliverableIds] = useState([])
//   const [subEventState, setSubEventState] = useState({})

//   const [name, setName] = useState('')
//   const [countryCode, setCountryCode] = useState('+91')
//   const [phone, setPhone] = useState('')
//   const [phoneTouched, setPhoneTouched] = useState(false)
//   const [email, setEmail] = useState('')
//   const [notes, setNotes] = useState('')

//   const [estimate, setEstimate] = useState(null)
//   const [submitting, setSubmitting] = useState(false)

//   const fullPhone = `${countryCode}${phone}`
//   const isPhoneValid = phone.length === 10

//   useEffect(() => {
//     async function load() {
//       const [etRes, albumRes, delRes] = await Promise.all([
//         supabase.from('event_types').select('*').order('sort_order'),
//         supabase.from('albums').select('*').order('sort_order'),
//         supabase.from('deliverables').select('*').order('sort_order'),
//       ])
//       if (etRes.error) console.error(etRes.error)
//       if (etRes.data?.length) {
//         setEventTypes(etRes.data)
//         setSelectedEventType(etRes.data[0].id)
//       }
//       if (albumRes.data?.length) setAlbums(albumRes.data)
//       if (delRes.data?.length) setDeliverables(delRes.data)
//     }
//     load()
//   }, [])

//   useEffect(() => {
//     if (!selectedEventType) return
//     async function loadSubEvents() {
//       const { data, error } = await supabase
//         .from('sub_events')
//         .select('*, pricing:sub_event_services(id, price, service_catalog(id, name))')
//         .eq('event_type_id', selectedEventType)
//         .order('sort_order')
//       if (error) console.error(error)
//       setSubEvents(data || [])
//       const initState = {}
//       ;(data || []).forEach((se) => { initState[se.id] = { date: '', serviceCatalogIds: [] } })
//       setSubEventState(initState)
//       setEstimate(null)
//     }
//     loadSubEvents()
//   }, [selectedEventType])

//   function toggleSubService(subEventId, serviceCatalogId) {
//     setSubEventState((prev) => {
//       const current = prev[subEventId] || { date: '', serviceCatalogIds: [] }
//       const ids = current.serviceCatalogIds.includes(serviceCatalogId)
//         ? current.serviceCatalogIds.filter((x) => x !== serviceCatalogId)
//         : [...current.serviceCatalogIds, serviceCatalogId]
//       return { ...prev, [subEventId]: { ...current, serviceCatalogIds: ids } }
//     })
//   }

//   function setSubEventDate(subEventId, date) {
//     setSubEventState((prev) => ({ ...prev, [subEventId]: { ...(prev[subEventId] || { serviceCatalogIds: [] }), date } }))
//   }

//   function toggleDeliverable(id) {
//     setSelectedDeliverableIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
//   }

//   function detectLocation() {
//     if (!navigator.geolocation) return
//     setLocating(true)
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords
//         setCoords({ lat: latitude, lng: longitude })
//         if (!venue) {
//           try {
//             const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
//             const data = await res.json()
//             if (data.display_name) setVenue(data.display_name)
//           } catch { /* ignore — venue stays manual */ }
//         }
//         setLocating(false)
//       },
//       () => setLocating(false)
//     )
//   }

//   function buildSummaryTextWithTotal(total) {
//     const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
//     const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || 'None'
//     const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name).join(', ') || 'None'

//     const subEventLines = subEvents.map((se) => {
//       const state = subEventState[se.id]
//       const services = (se.pricing || [])
//         .filter((p) => state?.serviceCatalogIds.includes(p.service_catalog.id))
//         .map((p) => p.service_catalog.name)
//       if (services.length === 0) return null
//       return `- ${se.name}${state.date ? ` (${state.date})` : ''}: ${services.join(', ')}`
//     }).filter(Boolean).join('\n')

//     const mapLine = coords ? `\n*Map Location:* https://www.google.com/maps?q=${coords.lat},${coords.lng}` : ''

//     return `Hi! I'd like to enquire about a photography package.

// *Event Type:* ${eventTypeName}
// *Venue:* ${venue || '-'}${mapLine}

// *Selections:*
// ${subEventLines || 'None'}

// *Album:* ${albumName}
// *Deliverables:* ${deliverableNames}
// *Estimated Total:* ₹${total.toLocaleString('en-IN')}

// *Name:* ${name}
// *Phone:* ${fullPhone}
// *Email:* ${email || '-'}
// *Notes:* ${notes || '-'}`
//   }

//   function buildSummaryText() {
//     return buildSummaryTextWithTotal(estimate || 0)
//   }

//   async function calculateEstimate() {
//     let total = 0
//     subEvents.forEach((se) => {
//       const state = subEventState[se.id]
//       if (!state) return
//       const svcTotal = (se.pricing || [])
//         .filter((p) => state.serviceCatalogIds.includes(p.service_catalog.id))
//         .reduce((sum, p) => sum + Number(p.price), 0)
//       total += svcTotal
//     })
//     total += albums.find((a) => a.id === selectedAlbumId)?.price || 0
//     total += deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).reduce((sum, d) => sum + Number(d.price), 0)
//     setEstimate(total)

//     const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
//     const emailParams = {
//       name,
//       email: email || '-',
//       phone: fullPhone,
//       title: `New Quote Enquiry — ${eventTypeName}`,
//       message: buildSummaryTextWithTotal(total),
//       time: new Date().toLocaleString(),
//     }

//     console.log('[EmailJS] Sending with params:', emailParams)
//     try {
//       const result = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         emailParams,
//         { publicKey: EMAILJS_PUBLIC_KEY }
//       )
//       console.log('[EmailJS] Success! Response:', result.status, result.text)
//     } catch (error) {
//       console.error('[EmailJS] Send failed:', error)
//     }
//   }

//   async function handleSendEnquiry() {
//     setSubmitting(true)
//     const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
//     const albumName = albums.find((a) => a.id === selectedAlbumId)?.name || ''
//     const deliverableNames = deliverables.filter((d) => selectedDeliverableIds.includes(d.id)).map((d) => d.name)

//     const subEventsPayload = subEvents.map((se) => ({
//       name: se.name,
//       date: subEventState[se.id]?.date || null,
//       services: (se.pricing || [])
//         .filter((p) => subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id))
//         .map((p) => ({ name: p.service_catalog.name, price: p.price })),
//     })).filter((se) => se.services.length > 0)

//     try {
//       await fetch(`${API_URL}/booking`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name, phone: fullPhone, email, shoot_type: eventTypeName, event_date: subEventsPayload[0]?.date || null,
//           location: venue, latitude: coords?.lat, longitude: coords?.lng,
//           sub_events_selected: subEventsPayload, album_selected: albumName,
//           deliverables_selected: deliverableNames, notes, estimate,
//         }),
//       })
//     } catch { /* non-blocking — WhatsApp still opens */ }

//     window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(buildSummaryText())}`, '_blank')
//     setSubmitting(false)
//   }

//   return (
//     <div className="pt-32 pb-24 max-w-2xl mx-auto px-4">
//       <Helmet><title>Get a Quote | Wedding Tabs Studio</title></Helmet>

//       <div className="text-center mb-8">
//         <span className="text-gold text-xs font-semibold uppercase tracking-wider">Transparent Pricing</span>
//         <h1 className="font-heading text-4xl font-semibold text-charcoal mt-2 mb-2">Get Your Quote</h1>
//         <p className="text-charcoal/60 text-sm">Select the type of event you need coverage for.</p>
//       </div>

//       <Section title="Event Type" required>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//           {eventTypes.map((et) => {
//             const Icon = iconMap[et.icon] || Sparkles
//             const active = selectedEventType === et.id
//             return (
//               <button key={et.id} onClick={() => setSelectedEventType(et.id)}
//                 className={`flex flex-col items-center gap-2 border-2 rounded-xl py-4 transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
//                 <Icon className={`w-6 h-6 ${active ? 'text-gold' : 'text-charcoal/50'}`} />
//                 <span className="text-sm font-medium text-charcoal">{et.name}</span>
//               </button>
//             )
//           })}
//         </div>
//       </Section>

//       <Section title="Venue" subtitle="Where will the event take place?">
//         <label className="text-xs text-charcoal/50 mb-1 block">Venue Name / City</label>
//         <div className="relative mb-3">
//           <MapPin className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
//           <input placeholder="e.g., Grand Palace, Mumbai" value={venue} onChange={(e) => setVenue(e.target.value)}
//             className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
//         </div>
//         <button type="button" onClick={detectLocation} disabled={locating}
//           className="w-full flex items-center justify-center gap-2 border-2 border-gold text-gold font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-gold hover:text-charcoal transition disabled:opacity-50">
//           <Navigation className="w-4 h-4" /> {locating ? 'Detecting...' : coords ? 'Location Pinned ✓' : 'Pin My Exact Location (for the map)'}
//         </button>
//       </Section>

//       {subEvents.map((se) => (
//         <Section key={se.id} title={se.name} icon>
//           {se.requires_date && (
//             <>
//               <label className="text-xs text-charcoal/50 mb-1 block">{se.name} Date</label>
//               <input type="date" value={subEventState[se.id]?.date || ''}
//                 onChange={(e) => setSubEventDate(se.id, e.target.value)}
//                 className="w-full border border-charcoal/20 rounded-lg px-3 py-3 mb-4" />
//             </>
//           )}
//           <div className="grid grid-cols-2 gap-3">
//             {(se.pricing || []).map((p) => {
//               const active = subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id)
//               return (
//                 <button key={p.id} onClick={() => toggleSubService(se.id, p.service_catalog.id)}
//                   className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
//                   <span className="text-sm font-medium text-charcoal">{p.service_catalog.name}</span>
//                   <span className="text-xs text-gold font-semibold">{Number(p.price) === 0 ? 'No Need' : `+₹${Number(p.price).toLocaleString('en-IN')}`}</span>
//                 </button>
//               )
//             })}
//             {(!se.pricing || se.pricing.length === 0) && <p className="text-charcoal/50 text-sm col-span-2">No services set up yet for {se.name}.</p>}
//           </div>
//         </Section>
//       ))}

//       <Section title="Physical Album" subtitle="Do you need a printed album?">
//         <div className="grid grid-cols-2 gap-3">
//           {albums.map((a) => (
//             <button key={a.id} onClick={() => setSelectedAlbumId(a.id)}
//               className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${selectedAlbumId === a.id ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
//               <span className="text-sm font-medium text-charcoal">{a.name}</span>
//               <span className="text-xs text-gold font-semibold">{Number(a.price) === 0 ? 'Free' : `₹${Number(a.price).toLocaleString('en-IN')}`}</span>
//             </button>
//           ))}
//         </div>
//       </Section>

//       <Section title="Deliverables" subtitle="Select all that apply">
//         <div className="grid grid-cols-2 gap-3">
//           {deliverables.map((d) => (
//             <button key={d.id} onClick={() => toggleDeliverable(d.id)}
//               className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${selectedDeliverableIds.includes(d.id) ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
//               <span className="text-sm font-medium text-charcoal">{d.name}</span>
//               <span className="text-xs text-gold font-semibold">{d.is_free ? 'Free' : `₹${Number(d.price).toLocaleString('en-IN')}`}</span>
//             </button>
//           ))}
//         </div>
//       </Section>

//       <Section title="Your Information" subtitle="Help us reach out to you">
//         <div className="space-y-3">
//           <div className="relative">
//             <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
//               className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
//           </div>

//           <div>
//             <div className="flex gap-2">
//               <input
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value.replace(/[^\d+]/g, ''))}
//                 placeholder="+91"
//                 className="w-20 border border-charcoal/20 rounded-lg px-3 py-3 text-center"
//               />
//               <div className="relative flex-1">
//                 <Phone className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   required
//                   type="tel"
//                   inputMode="numeric"
//                   placeholder="Your 10-digit phone number"
//                   value={phone}
//                   maxLength={10}
//                   onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                   onBlur={() => setPhoneTouched(true)}
//                   className={`w-full border rounded-lg pl-9 pr-3 py-3 ${
//                     phoneTouched && !isPhoneValid ? 'border-red-400' : 'border-charcoal/20'
//                   }`}
//                 />
//               </div>
//             </div>
//             {phoneTouched && !isPhoneValid && (
//               <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit phone number.</p>
//             )}
//           </div>

//           <div className="relative">
//             <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input type="email" placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
//           </div>
//           <div className="relative">
//             <FileText className="w-4 h-4 text-charcoal/40 absolute left-3 top-3" />
//             <textarea placeholder="Any specific requirements or questions..." value={notes} onChange={(e) => setNotes(e.target.value)}
//               rows={3} className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
//           </div>
//         </div>
//       </Section>

//       {estimate !== null && (
//         <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 text-center mb-6">
//           <div className="text-sm text-charcoal/70">Your Estimated Total</div>
//           <div className="font-heading text-3xl font-semibold text-gold">₹{estimate.toLocaleString('en-IN')}</div>
//           <div className="text-xs text-charcoal/50 mt-1">Final price confirmed after studio review</div>
//         </div>
//       )}

//       {estimate === null ? (
//         <button
//           onClick={() => {
//             setPhoneTouched(true)
//             if (name && isPhoneValid) calculateEstimate()
//           }}
//           disabled={!name || !isPhoneValid}
//           className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50"
//         >
//           Calculate Estimate
//         </button>
//       ) : (
//         <button onClick={handleSendEnquiry} disabled={submitting}
//           className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
//           {submitting ? 'Sending...' : 'Send Enquiry via WhatsApp'}
//         </button>
//       )}
//       {(!name || !isPhoneValid) && estimate === null && (
//         <p className="text-xs text-charcoal/40 text-center mt-2">
//           Fill in your name and a valid 10-digit phone number above to calculate an estimate.
//         </p>
//       )}
//     </div>
//   )
// }

// function Section({ title, subtitle, required, icon, children }) {
//   return (
//     <div className="bg-cream border border-charcoal/10 rounded-2xl p-5 mb-5 shadow-sm">
//       <h3 className="font-heading text-lg font-semibold text-charcoal mb-1 flex items-center gap-2">
//         {icon && <Heart className="w-4 h-4 text-gold" />} {title} {required && <span className="text-gold">*</span>}
//       </h3>
//       {subtitle && <p className="text-xs text-charcoal/50 mb-4">{subtitle}</p>}
//       <div className={subtitle ? '' : 'mt-4'}>{children}</div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Cake, Heart, Sparkles, Gem, MapPin, User, Phone, Mail, FileText, Navigation } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { supabase } from '../supabaseClient'

const API_URL = import.meta.env.VITE_API_URL
const STUDIO_WHATSAPP = '918008198502'
const iconMap = { '🎂': Cake, '💍': Gem, '🥻': Sparkles, '❤️': Heart }

const EMAILJS_SERVICE_ID = 'service_ycr3pqf'
const EMAILJS_TEMPLATE_ID = 'template_as0xv5a'
const EMAILJS_PUBLIC_KEY = 'n00tQy63Un6x1KL2Z'

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })

export default function GetQuote() {
  const [eventTypes, setEventTypes] = useState([])
  const [selectedEventType, setSelectedEventType] = useState(null)
  const [subEvents, setSubEvents] = useState([])

  const [venue, setVenue] = useState('')
  const [coords, setCoords] = useState(null)
  const [locating, setLocating] = useState(false)

  const [subEventState, setSubEventState] = useState({})

  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  const [estimate, setEstimate] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const fullPhone = `${countryCode}${phone}`
  const isPhoneValid = phone.length === 10

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('event_types').select('*').order('sort_order')
      if (error) console.error(error)
      if (data?.length) {
        setEventTypes(data)
        setSelectedEventType(data[0].id)
      }
    }
    load()
  }, [])

  useEffect(() => {
  if (!selectedEventType) return
  async function loadSubEvents() {
    const { data, error } = await supabase
      .from('sub_events')
      .select('*, pricing:sub_event_services(id, price, service_catalog(id, name))')
      .eq('event_type_id', selectedEventType)
      .order('sort_order')
      .order('sort_order', { foreignTable: 'sub_event_services', ascending: true })
    if (error) console.error(error)
    setSubEvents(data || [])
    const initState = {}
    ;(data || []).forEach((se) => { initState[se.id] = { date: '', serviceCatalogIds: [] } })
    setSubEventState(initState)
    setEstimate(null)
  }
  loadSubEvents()
}, [selectedEventType])

  function toggleSubService(subEventId, serviceCatalogId) {
    setSubEventState((prev) => {
      const current = prev[subEventId] || { date: '', serviceCatalogIds: [] }
      const ids = current.serviceCatalogIds.includes(serviceCatalogId)
        ? current.serviceCatalogIds.filter((x) => x !== serviceCatalogId)
        : [...current.serviceCatalogIds, serviceCatalogId]
      return { ...prev, [subEventId]: { ...current, serviceCatalogIds: ids } }
    })
  }

  function setSubEventDate(subEventId, date) {
    setSubEventState((prev) => ({ ...prev, [subEventId]: { ...(prev[subEventId] || { serviceCatalogIds: [] }), date } }))
  }

  function detectLocation() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lng: longitude })
        if (!venue) {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            const data = await res.json()
            if (data.display_name) setVenue(data.display_name)
          } catch { /* ignore — venue stays manual */ }
        }
        setLocating(false)
      },
      () => setLocating(false)
    )
  }

  function buildSummaryTextWithTotal(total) {
    const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''

    const subEventLines = subEvents.map((se) => {
      const state = subEventState[se.id]
      const services = (se.pricing || [])
        .filter((p) => state?.serviceCatalogIds.includes(p.service_catalog.id))
        .map((p) => p.service_catalog.name)
      if (services.length === 0) return null
      return `- ${se.name}${state.date ? ` (${state.date})` : ''}: ${services.join(', ')}`
    }).filter(Boolean).join('\n')

    const mapLine = coords ? `\n*Map Location:* https://www.google.com/maps?q=${coords.lat},${coords.lng}` : ''

    return `Hi! I'd like to enquire about a photography package.

*Event Type:* ${eventTypeName}
*Venue:* ${venue || '-'}${mapLine}

*Selections:*
${subEventLines || 'None'}

*Estimated Total:* ₹${total.toLocaleString('en-IN')}

*Name:* ${name}
*Phone:* ${fullPhone}
*Email:* ${email || '-'}
*Notes:* ${notes || '-'}`
  }

  function buildSummaryText() {
    return buildSummaryTextWithTotal(estimate || 0)
  }

  async function calculateEstimate() {
    let total = 0
    subEvents.forEach((se) => {
      const state = subEventState[se.id]
      if (!state) return
      const svcTotal = (se.pricing || [])
        .filter((p) => state.serviceCatalogIds.includes(p.service_catalog.id))
        .reduce((sum, p) => sum + Number(p.price), 0)
      total += svcTotal
    })
    setEstimate(total)

    const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''
    const emailParams = {
      name,
      email: email || '-',
      phone: fullPhone,
      title: `New Quote Enquiry — ${eventTypeName}`,
      message: buildSummaryTextWithTotal(total),
      time: new Date().toLocaleString(),
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, { publicKey: EMAILJS_PUBLIC_KEY })
    } catch (error) {
      console.error('[EmailJS] Send failed:', error)
    }
  }

  async function handleSendEnquiry() {
    setSubmitting(true)
    const eventTypeName = eventTypes.find((e) => e.id === selectedEventType)?.name || ''

    const subEventsPayload = subEvents.map((se) => ({
      name: se.name,
      date: subEventState[se.id]?.date || null,
      services: (se.pricing || [])
        .filter((p) => subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id))
        .map((p) => ({ name: p.service_catalog.name, price: p.price })),
    })).filter((se) => se.services.length > 0)

    try {
      await fetch(`${API_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone: fullPhone, email, shoot_type: eventTypeName, event_date: subEventsPayload[0]?.date || null,
          location: venue, latitude: coords?.lat, longitude: coords?.lng,
          sub_events_selected: subEventsPayload, notes, estimate,
        }),
      })
    } catch { /* non-blocking — WhatsApp still opens */ }

    window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(buildSummaryText())}`, '_blank')
    setSubmitting(false)
  }

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4">
      <Helmet>
        <title>Request a Quote | Wedding Tabs Studio, Visakhapatnam</title>
        <meta name="description" content="Request an instant photography quote for your wedding or event in Visakhapatnam. Transparent pricing for every budget." />        <link rel="canonical" href="https://weddingtabs.com/get-quote" />
      </Helmet>
      <div className="text-center mb-8">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">Transparent Pricing</span>
        <h1 className="font-heading text-4xl font-semibold text-charcoal mt-2 mb-2">Get Your Quote</h1>
        <p className="text-charcoal/60 text-sm">Select the type of event you need coverage for.</p>
      </div>

      <Section title="Event Type" required>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {eventTypes.map((et) => {
            const Icon = iconMap[et.icon] || Sparkles
            const active = selectedEventType === et.id
            return (
              <button key={et.id} onClick={() => setSelectedEventType(et.id)}
                className={`flex flex-col items-center gap-2 border-2 rounded-xl py-4 transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
                <Icon className={`w-6 h-6 ${active ? 'text-gold' : 'text-charcoal/50'}`} />
                <span className="text-sm font-medium text-charcoal">{et.name}</span>
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Venue" subtitle="Where will the event take place?">
        <label className="text-xs text-charcoal/50 mb-1 block">Venue Name / City</label>
        <div className="relative mb-3">
          <MapPin className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input placeholder="e.g., MVP, Visakhapatnam" value={venue} onChange={(e) => setVenue(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
        </div>
        <button type="button" onClick={detectLocation} disabled={locating}
          className="w-full flex items-center justify-center gap-2 border-2 border-gold text-gold font-semibold rounded-lg px-4 py-2.5 text-sm hover:bg-gold hover:text-charcoal transition disabled:opacity-50">
          <Navigation className="w-4 h-4" /> {locating ? 'Detecting...' : coords ? 'Location Pinned ✓' : 'Pin My Exact Location (for the map)'}
        </button>
      </Section>

      {subEvents.map((se) => (
        <Section key={se.id} title={se.name} icon>
          {se.requires_date && (
            <>
              <label className="text-xs text-charcoal/50 mb-1 block">{se.name} Date</label>
              <input type="date" value={subEventState[se.id]?.date || ''}
                onChange={(e) => setSubEventDate(se.id, e.target.value)}
                className="w-full border border-charcoal/20 rounded-lg px-3 py-3 mb-4" />
            </>
          )}
          <div className="grid grid-cols-2 gap-3">
            {(se.pricing || []).map((p) => {
              const active = subEventState[se.id]?.serviceCatalogIds.includes(p.service_catalog.id)
              return (
                <button key={p.id} onClick={() => toggleSubService(se.id, p.service_catalog.id)}
                  className={`flex items-center justify-between border-2 rounded-lg px-3 py-3 text-left transition ${active ? 'border-gold bg-gold/10' : 'border-charcoal/10 hover:border-charcoal/20'}`}>
                  <span className="text-sm font-medium text-charcoal">{p.service_catalog.name}</span>
                  <span className="text-xs text-gold font-semibold">{Number(p.price) === 0 ? 'No Need' : `+₹${Number(p.price).toLocaleString('en-IN')}`}</span>
                </button>
              )
            })}
            {(!se.pricing || se.pricing.length === 0) && <p className="text-charcoal/50 text-sm col-span-2">No services set up yet for {se.name}.</p>}
          </div>
        </Section>
      ))}

      <Section title="Your Information" subtitle="Help us reach out to you">
        <div className="space-y-3">
          <div className="relative">
            <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3" />
          </div>

          <div>
            <div className="flex gap-2">
              <input
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value.replace(/[^\d+]/g, ''))}
                placeholder="+91"
                className="w-20 border border-charcoal/20 rounded-lg px-3 py-3 text-center"
              />
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  placeholder="Your 10-digit phone number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onBlur={() => setPhoneTouched(true)}
                  className={`w-full border rounded-lg pl-9 pr-3 py-3 ${
                    phoneTouched && !isPhoneValid ? 'border-red-400' : 'border-charcoal/20'
                  }`}
                />
              </div>
            </div>
            {phoneTouched && !isPhoneValid && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit phone number.</p>
            )}
          </div>

          <div className="relative">
            <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="email" placeholder="your@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
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
        <button
          onClick={() => {
            setPhoneTouched(true)
            if (name && isPhoneValid) calculateEstimate()
          }}
          disabled={!name || !isPhoneValid}
          className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50"
        >
          Calculate Estimate
        </button>
      ) : (
        <button onClick={handleSendEnquiry} disabled={submitting}
          className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-4 hover:opacity-90 transition disabled:opacity-50">
          {submitting ? 'Sending...' : 'Send Enquiry via WhatsApp'}
        </button>
      )}
      {(!name || !isPhoneValid) && estimate === null && (
        <p className="text-xs text-charcoal/40 text-center mt-2">
          Fill in your name and a valid 10-digit phone number above to calculate an estimate.
        </p>
      )}
    </div>
  )
}

function Section({ title, subtitle, required, icon, children }) {
  return (
    <div className="bg-cream border border-charcoal/10 rounded-2xl p-5 mb-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-charcoal mb-1 flex items-center gap-2">
        {icon && <Heart className="w-4 h-4 text-gold" />} {title} {required && <span className="text-gold">*</span>}
      </h3>
      {subtitle && <p className="text-xs text-charcoal/50 mb-4">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-4'}>{children}</div>
    </div>
  )
}