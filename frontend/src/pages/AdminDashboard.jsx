// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { supabase } from '../supabaseClient'

// const API_URL = import.meta.env.VITE_API_URL
// const TABS = ['Bookings', 'Event Types', 'Events', 'Gallery', 'Albums', 'Deliverables', 'Service Catalog']

// export default function AdminDashboard() {
//   const [tab, setTab] = useState('Bookings')
//   const navigate = useNavigate()

//   async function handleLogout() {
//     await supabase.auth.signOut()
//     navigate('/admin/login')
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-24 max-w-5xl mx-auto px-4">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="font-heading text-3xl font-semibold text-charcoal">Admin Dashboard</h1>
//         <button onClick={handleLogout} className="text-sm text-charcoal/60 hover:text-red-600 transition">Log Out</button>
//       </div>

//       <div className="flex gap-2 mb-8 border-b border-charcoal/10 overflow-x-auto">
//         {TABS.map((t) => (
//           <button key={t} onClick={() => setTab(t)}
//             className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition ${
//               tab === t ? 'border-gold text-gold' : 'border-transparent text-charcoal/60'
//             }`}>
//             {t}
//           </button>
//         ))}
//       </div>

//       {tab === 'Bookings' && <BookingsPanel />}
//       {tab === 'Event Types' && <EventTypesPanel />}
//       {tab === 'Events' && <EventsPanel />}
//       {tab === 'Gallery' && <GalleryPanel />}
//       {tab === 'Albums' && <AlbumsPanel />}
//       {tab === 'Deliverables' && <DeliverablesPanel />}
//       {tab === 'Service Catalog' && <ServiceCatalogPanel />}
//     </div>
//   )
// }

// // ---------- Bookings ----------
// function BookingsPanel() {
//   const [bookings, setBookings] = useState([])

//   useEffect(() => { fetchBookings() }, [])

//   async function fetchBookings() {
//     const { data: { session } } = await supabase.auth.getSession()
//     const res = await fetch(`${API_URL}/bookings`, {
//       headers: { Authorization: `Bearer ${session?.access_token}` },
//     })
//     if (res.ok) setBookings(await res.json())
//   }

//   async function updateStatus(id, status) {
//     const { data: { session } } = await supabase.auth.getSession()
//     await fetch(`${API_URL}/booking/${id}/status`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
//       body: JSON.stringify({ status }),
//     })
//     fetchBookings()
//   }

//   return (
//     <div className="space-y-3">
//       {bookings.map((b) => (
//         <div key={b.id} className="border border-charcoal/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <div className="font-medium text-charcoal">{b.name} — {b.shoot_type}</div>
//             <div className="text-sm text-charcoal/60">{b.phone} • {b.event_date} {b.location && `• ${b.location}`}</div>
//             {b.latitude && b.longitude && (
//               <a href={`https://www.google.com/maps?q=${b.latitude},${b.longitude}`} target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 mt-1">
//                 📍 View on Map
//               </a>
//             )}
//           </div>
//           <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}
//             className="border border-charcoal/20 rounded-lg px-3 py-2 text-sm">
//             <option>Pending</option>
//             <option>Confirmed</option>
//             <option>Cancelled</option>
//             <option>Completed</option>
//           </select>
//         </div>
//       ))}
//       {bookings.length === 0 && <p className="text-charcoal/60">No bookings yet.</p>}
//     </div>
//   )
// }

// // ---------- Events (portfolio) ----------
// function EventsPanel() {
//   const [events, setEvents] = useState([])
//   const [name, setName] = useState('')
//   const [date, setDate] = useState('')
//   const [price, setPrice] = useState('')

//   useEffect(() => { fetchEvents() }, [])

//   async function fetchEvents() {
//     const { data, error } = await supabase
//       .from('events')
//       .select('*, gallery_images(id, url, media_type)')
//       .order('date', { ascending: false })
//     if (error) console.error(error)
//     setEvents(data || [])
//   }

//   async function addEvent(e) {
//     e.preventDefault()
//     await supabase.from('events').insert({ name, date, price: price ? Number(price) : null })
//     setName(''); setDate(''); setPrice('')
//     fetchEvents()
//   }

//   async function removeEvent(id) {
//     await supabase.from('events').delete().eq('id', id)
//     fetchEvents()
//   }

//   async function updatePrice(id, newPrice) {
//     await supabase.from('events').update({ price: Number(newPrice) }).eq('id', id)
//     fetchEvents()
//   }

//   return (
//     <div>
//       <form onSubmit={addEvent} className="flex flex-wrap gap-3 mb-6">
//         <input required placeholder="Event name" value={name} onChange={(e) => setName(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[150px]" />
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2" />
//         <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 w-32" />
//         <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Event</button>
//       </form>

//       <div className="space-y-3">
//         {events.map((ev) => (
//           <div key={ev.id} className="border border-charcoal/10 rounded-xl p-4">
//             <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
//               <div>
//                 <span className="font-medium">{ev.name}</span>
//                 {ev.date && <span className="text-charcoal/50 text-sm"> — {ev.date}</span>}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm">₹</span>
//                 <input type="number" defaultValue={ev.price || ''} placeholder="Price"
//                   onBlur={(e) => updatePrice(ev.id, e.target.value)}
//                   className="border border-charcoal/20 rounded-lg px-3 py-1 w-28 text-sm" />
//                 <button onClick={() => removeEvent(ev.id)} className="text-red-600 text-sm">Remove</button>
//               </div>
//             </div>
//             {ev.gallery_images?.length > 0 && (
//               <div className="flex gap-2 flex-wrap">
//                 {ev.gallery_images.map((img) => (
//                   img.media_type === 'video'
//                     ? <span key={img.id} className="w-14 h-14 rounded-lg bg-charcoal/10 flex items-center justify-center text-xs">▶ video</span>
//                     : <img key={img.id} src={img.url} alt="" className="w-14 h-14 rounded-lg object-cover" />
//                 ))}
//               </div>
//             )}
//             {(!ev.gallery_images || ev.gallery_images.length === 0) && (
//               <p className="text-xs text-charcoal/40">No media linked yet — add some in the Gallery tab.</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ---------- Gallery ----------
// function GalleryPanel() {
//   const [images, setImages] = useState([])
//   const [events, setEvents] = useState([])
//   const [catalog, setCatalog] = useState([])
//   const [mode, setMode] = useState('upload')
//   const [file, setFile] = useState(null)
//   const [url, setUrl] = useState('')
//   const [mediaType, setMediaType] = useState('photo')
//   const [category, setCategory] = useState('')
//   const [eventId, setEventId] = useState('')
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => { fetchImages(); fetchEvents(); fetchCatalog() }, [])

//   async function fetchImages() {
//     const { data, error } = await supabase
//       .from('gallery_images')
//       .select('*, events(name)')
//       .order('uploaded_at', { ascending: false })
//     if (error) console.error(error)
//     setImages(data || [])
//   }

//   async function fetchEvents() {
//     const { data } = await supabase.from('events').select('id, name').order('date', { ascending: false })
//     setEvents(data || [])
//   }

//   // FIX: gallery categories come from `service_catalog`, not the non-existent `services` table
//   async function fetchCatalog() {
//     const { data, error } = await supabase.from('service_catalog').select('name').order('sort_order')
//     if (error) console.error(error)
//     setCatalog(data || [])
//     if (data?.length) setCategory(data[0].name)
//   }

//   async function handleAdd(e) {
//     e.preventDefault()
//     setUploading(true)

//     let finalUrl = url
//     if (mode === 'upload') {
//       if (!file) { setUploading(false); return }
//       const path = `${Date.now()}-${file.name}`
//       const { error: uploadError } = await supabase.storage.from('gallery').upload(path, file)
//       if (uploadError) {
//         alert('Upload failed: ' + uploadError.message)
//         setUploading(false)
//         return
//       }
//       const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path)
//       finalUrl = urlData.publicUrl
//     }

//     if (!finalUrl) { setUploading(false); return }

//     await supabase.from('gallery_images').insert({
//       url: finalUrl,
//       category,
//       media_type: mediaType,
//       event_id: eventId || null,
//     })
//     setFile(null)
//     setUrl('')
//     setUploading(false)
//     fetchImages()
//   }

//   async function removeImage(id) {
//     await supabase.from('gallery_images').delete().eq('id', id)
//     fetchImages()
//   }

//   return (
//     <div>
//       <p className="text-xs text-charcoal/50 mb-3">
//         Upload a real photo/video file (stored in your free Supabase Storage bucket), or paste an external link instead.
//         Categories below come from your Service Catalog tab — add a new service there and it appears here automatically.
//       </p>

//       <div className="flex gap-2 mb-4">
//         <button onClick={() => setMode('upload')} className={`text-sm font-medium px-3 py-1.5 rounded-full ${mode === 'upload' ? 'bg-gold text-charcoal' : 'bg-charcoal/5'}`}>Upload File</button>
//         <button onClick={() => setMode('link')} className={`text-sm font-medium px-3 py-1.5 rounded-full ${mode === 'link' ? 'bg-gold text-charcoal' : 'bg-charcoal/5'}`}>Paste Link</button>
//       </div>

//       <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6 items-center">
//         {mode === 'upload' ? (
//           <input required type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])}
//             className="flex-1 min-w-[220px] text-sm" />
//         ) : (
//           <input required type="url" placeholder="https://example.com/photo-or-video.mp4" value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[220px]" />
//         )}
//         <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} className="border border-charcoal/20 rounded-lg px-3 py-2">
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//         </select>
//         <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-charcoal/20 rounded-lg px-3 py-2">
//           {catalog.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
//         </select>
//         <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="border border-charcoal/20 rounded-lg px-3 py-2">
//           <option value="">No event (standalone)</option>
//           {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
//         </select>
//         <button disabled={uploading} className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2 disabled:opacity-50">
//           {uploading ? 'Uploading...' : 'Add'}
//         </button>
//       </form>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <div key={img.id} className="relative rounded-xl overflow-hidden aspect-square group bg-charcoal/5">
//             {img.media_type === 'video' ? (
//               <video src={img.url} className="w-full h-full object-cover" muted />
//             ) : (
//               <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
//             )}
//             <span className="absolute top-2 left-2 bg-charcoal/70 text-cream text-[10px] px-2 py-0.5 rounded-full">
//               {img.media_type === 'video' ? '▶ Video' : 'Photo'} · {img.category}
//             </span>
//             {img.events?.name && (
//               <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 text-cream text-[10px] px-2 py-1 truncate">
//                 {img.events.name}
//               </span>
//             )}
//             <button onClick={() => removeImage(img.id)}
//               className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition">
//               Remove
//             </button>
//           </div>
//         ))}
//         {images.length === 0 && <p className="text-charcoal/60 col-span-full">No media yet — paste a link above.</p>}
//       </div>
//     </div>
//   )
// }

// // ---------- Service Catalog (master service NAMES ONLY — no price here, per business rule) ----------
// function ServiceCatalogPanel() {
//   const [services, setServices] = useState([])
//   const [name, setName] = useState('')

//   useEffect(() => { fetchServices() }, [])

//   async function fetchServices() {
//     const { data, error } = await supabase.from('service_catalog').select('*').order('sort_order')
//     if (error) console.error(error)
//     setServices(data || [])
//   }

//   async function addService(e) {
//     e.preventDefault()
//     if (!name.trim()) return
//     const nextOrder = services.length ? Math.max(...services.map((s) => s.sort_order || 0)) + 1 : 1
//     await supabase.from('service_catalog').insert({ name: name.trim(), sort_order: nextOrder })
//     setName('')
//     fetchServices()
//   }

//   async function renameService(id, newName) {
//     if (!newName.trim()) return
//     await supabase.from('service_catalog').update({ name: newName.trim() }).eq('id', id)
//     fetchServices()
//   }

//   async function removeService(id) {
//     // NOTE: this will cascade-delete any sub_event_services rows using this service (FK is ON DELETE CASCADE)
//     if (!confirm('This will also remove this service\'s pricing from every Event Type it is used in. Continue?')) return
//     await supabase.from('service_catalog').delete().eq('id', id)
//     fetchServices()
//   }

//   return (
//     <div>
//       <p className="text-xs text-charcoal/50 mb-3">
//         This is the master list of service NAMES only (Traditional Photography, Drone, etc). There is intentionally
//         no price here — prices are set per Event Type → Sub-Event in the "Event Types" tab, since the same service
//         can cost differently for Haldi vs Wedding Day.
//       </p>

//       <form onSubmit={addService} className="flex flex-wrap gap-3 mb-6">
//         <input required placeholder="Service name (e.g. Traditional Photography)" value={name} onChange={(e) => setName(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[200px]" />
//         <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Service</button>
//       </form>

//       <div className="space-y-3">
//         {services.map((s) => (
//           <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
//             <input defaultValue={s.name} onBlur={(e) => renameService(s.id, e.target.value)}
//               className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent" />
//             <button onClick={() => removeService(s.id)} className="text-red-600 text-sm">Remove</button>
//           </div>
//         ))}
//         {services.length === 0 && <p className="text-charcoal/60">No services yet — add one above.</p>}
//       </div>
//     </div>
//   )
// }

// // ---------- Event Types -> Sub-Events -> Service Pricing ----------
// // ---------- Event Types -> Sub-Events -> Service Pricing ----------
// function EventTypesPanel() {
//   const [eventTypes, setEventTypes] = useState([])
//   const [name, setName] = useState('')
//   const [icon, setIcon] = useState('📷')
//   const [expandedTypeId, setExpandedTypeId] = useState(null)
//   const [subEventsByType, setSubEventsByType] = useState({})
//   const [newSubEventName, setNewSubEventName] = useState('')
//   const [newSubEventRequiresDate, setNewSubEventRequiresDate] = useState(true)

//   const [expandedSubEventId, setExpandedSubEventId] = useState(null)
//   const [pricingBySubEvent, setPricingBySubEvent] = useState({})
//   const [catalog, setCatalog] = useState([])
//   const [priceDrafts, setPriceDrafts] = useState({}) // { `${subEventId}:${serviceCatalogId}`: '10000' }

//   useEffect(() => {
//     fetchEventTypes()
//     fetchCatalog()
//   }, [])

//   async function fetchEventTypes() {
//     const { data, error } = await supabase.from('event_types').select('*').order('sort_order')
//     if (error) console.error(error)
//     setEventTypes(data || [])
//   }

//   async function fetchCatalog() {
//     const { data, error } = await supabase.from('service_catalog').select('*').order('sort_order')
//     if (error) console.error(error)
//     setCatalog(data || [])
//   }

//   async function addEventType(e) {
//     e.preventDefault()
//     const nextOrder = eventTypes.length ? Math.max(...eventTypes.map((t) => t.sort_order || 0)) + 1 : 1
//     await supabase.from('event_types').insert({ name, icon, sort_order: nextOrder })
//     setName(''); setIcon('📷')
//     fetchEventTypes()
//   }

//   async function removeEventType(id) {
//     if (!confirm('This will also remove all its Sub-Events and their pricing. Continue?')) return
//     await supabase.from('event_types').delete().eq('id', id)
//     fetchEventTypes()
//   }

//   async function fetchSubEvents(eventTypeId) {
//     const { data, error } = await supabase.from('sub_events').select('*').eq('event_type_id', eventTypeId).order('sort_order')
//     if (error) console.error(error)
//     setSubEventsByType((prev) => ({ ...prev, [eventTypeId]: data || [] }))
//   }

//   async function toggleExpandType(id) {
//     if (expandedTypeId === id) { setExpandedTypeId(null); return }
//     setExpandedTypeId(id)
//     setExpandedSubEventId(null)
//     fetchSubEvents(id)
//   }

//   async function addSubEvent(eventTypeId) {
//     if (!newSubEventName.trim()) return
//     const list = subEventsByType[eventTypeId] || []
//     const nextOrder = list.length ? Math.max(...list.map((s) => s.sort_order || 0)) + 1 : 1
//     await supabase.from('sub_events').insert({
//       event_type_id: eventTypeId, name: newSubEventName.trim(), requires_date: newSubEventRequiresDate, sort_order: nextOrder,
//     })
//     setNewSubEventName(''); setNewSubEventRequiresDate(true)
//     fetchSubEvents(eventTypeId)
//   }

//   async function removeSubEvent(eventTypeId, subEventId) {
//     if (!confirm('This will also remove all pricing set for this Sub-Event. Continue?')) return
//     await supabase.from('sub_events').delete().eq('id', subEventId)
//     fetchSubEvents(eventTypeId)
//   }

//   async function fetchPricing(subEventId) {
//     const { data, error } = await supabase
//       .from('sub_event_services')
//       .select('id, price, sort_order, service_catalog(id, name)')
//       .eq('sub_event_id', subEventId)
//       .order('sort_order')
//     if (error) console.error(error)
//     setPricingBySubEvent((prev) => ({ ...prev, [subEventId]: data || [] }))
//   }

//   function toggleExpandSubEvent(id) {
//     if (expandedSubEventId === id) { setExpandedSubEventId(null); return }
//     setExpandedSubEventId(id)
//     fetchPricing(id)
//   }

//   async function savePrice(subEventId, serviceCatalogId, priceValue) {
//     if (priceValue === '' || priceValue === null || isNaN(Number(priceValue)) || Number(priceValue) < 0) return
//     const list = pricingBySubEvent[subEventId] || []
//     const nextOrder = list.length ? Math.max(...list.map((s) => s.sort_order || 0)) + 1 : 1

//     const { error } = await supabase.from('sub_event_services').upsert(
//       {
//         sub_event_id: subEventId,
//         service_catalog_id: serviceCatalogId,
//         price: Number(priceValue),
//         sort_order: nextOrder,
//       },
//       { onConflict: 'sub_event_id,service_catalog_id' }
//     )
//     if (error) { console.error(error); alert('Failed to save price: ' + error.message); return }
//     fetchPricing(subEventId)
//   }

//   async function removePricing(subEventId, subEventServiceId) {
//     await supabase.from('sub_event_services').delete().eq('id', subEventServiceId)
//     fetchPricing(subEventId)
//   }

//   return (
//     <div>
//       <p className="text-xs text-charcoal/50 mb-3">
//         Event Types are the icon cards on Get Quote (Birthday, Wedding, etc). Each type has its own Sub-Events
//         (e.g. Wedding → Haldi, Sangeet, Mehendi). For each Sub-Event, tick which services from the master
//         Service Catalog apply, type a price, then click Save — the same service can cost differently
//         under different sub-events. Manage the master service names in the "Service Catalog" tab.
//       </p>
//       <form onSubmit={addEventType} className="flex flex-wrap gap-3 mb-6">
//         <input placeholder="Emoji icon (e.g. 🎂)" value={icon} onChange={(e) => setIcon(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 w-32" />
//         <input required placeholder="Event type name (e.g. Birthday)" value={name} onChange={(e) => setName(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
//         <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Event Type</button>
//       </form>

//       <div className="space-y-3">
//         {eventTypes.map((et) => (
//           <div key={et.id} className="border border-charcoal/10 rounded-xl p-4">
//             <div className="flex items-center justify-between gap-3">
//               <button onClick={() => toggleExpandType(et.id)} className="flex items-center gap-2 font-medium">
//                 <span>{et.icon}</span> {et.name}
//               </button>
//               <button onClick={() => removeEventType(et.id)} className="text-red-600 text-sm">Remove</button>
//             </div>

//             {expandedTypeId === et.id && (
//               <div className="mt-4 pt-4 border-t border-charcoal/10 pl-3">
//                 <p className="text-xs text-charcoal/50 mb-2">Sub-events under {et.name}:</p>
//                 <div className="flex flex-wrap gap-2 mb-3 items-center">
//                   <input placeholder="Sub-event name (e.g. Haldi)" value={newSubEventName} onChange={(e) => setNewSubEventName(e.target.value)}
//                     className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[140px] text-sm" />
//                   <label className="flex items-center gap-1 text-xs text-charcoal/60">
//                     <input type="checkbox" checked={newSubEventRequiresDate} onChange={(e) => setNewSubEventRequiresDate(e.target.checked)} /> Needs own date
//                   </label>
//                   <button onClick={() => addSubEvent(et.id)} className="bg-gold text-charcoal text-sm font-semibold rounded-lg px-3 py-2">Add</button>
//                 </div>

//                 <div className="space-y-2">
//                   {(subEventsByType[et.id] || []).map((se) => {
//                     const pricedRows = pricingBySubEvent[se.id] || []
//                     const pricedByServiceId = Object.fromEntries(pricedRows.map((r) => [r.service_catalog.id, r]))

//                     return (
//                       <div key={se.id} className="bg-charcoal/5 rounded-lg p-3">
//                         <div className="flex justify-between items-center">
//                           <button onClick={() => toggleExpandSubEvent(se.id)} className="text-sm font-medium">
//                             {se.name} {se.requires_date && <span className="text-xs text-charcoal/40">(has own date)</span>}
//                           </button>
//                           <button onClick={() => removeSubEvent(et.id, se.id)} className="text-red-600 text-xs">Remove</button>
//                         </div>

//                         {expandedSubEventId === se.id && (
//                           <div className="mt-3 pt-3 border-t border-charcoal/10">
//                             <p className="text-xs text-charcoal/50 mb-2">
//                               Tick a service, type its price for <strong>{se.name}</strong>, then click Save:
//                             </p>
//                             <div className="space-y-1">
//                               {catalog.map((svc) => {
//                                 const existing = pricedByServiceId[svc.id]
//                                 const draftKey = `${se.id}:${svc.id}`
//                                 const savedValue = existing ? String(existing.price) : ''
//                                 const draftValue = priceDrafts[draftKey] ?? savedValue
//                                 const isDirty = existing && draftValue !== savedValue

//                                 return (
//                                   <div key={svc.id} className="flex items-center justify-between gap-2 text-xs bg-cream rounded-lg px-3 py-1.5">
//                                     <label className="flex items-center gap-2 flex-1 min-w-0">
//                                       <input
//                                         type="checkbox"
//                                         checked={!!existing}
//                                         onChange={(e) => {
//                                           if (e.target.checked) {
//                                             savePrice(se.id, svc.id, draftValue !== '' ? draftValue : 0)
//                                           } else if (existing) {
//                                             removePricing(se.id, existing.id)
//                                             setPriceDrafts((prev) => {
//                                               const next = { ...prev }
//                                               delete next[draftKey]
//                                               return next
//                                             })
//                                           }
//                                         }}
//                                       />
//                                       <span className="truncate">{svc.name}</span>
//                                     </label>
//                                     <div className="flex items-center gap-1">
//                                       <span>₹</span>
//                                       <input
//                                         type="number"
//                                         min="0"
//                                         disabled={!existing}
//                                         placeholder="Price"
//                                         value={draftValue}
//                                         onChange={(e) => setPriceDrafts((prev) => ({ ...prev, [draftKey]: e.target.value }))}
//                                         className="border border-charcoal/20 rounded px-2 py-1 w-24 disabled:opacity-40"
//                                       />
//                                       <button
//                                         type="button"
//                                         disabled={!existing || !isDirty}
//                                         onClick={async () => {
//                                           await savePrice(se.id, svc.id, draftValue)
//                                           setPriceDrafts((prev) => {
//                                             const next = { ...prev }
//                                             delete next[draftKey]
//                                             return next
//                                           })
//                                         }}
//                                         className={`text-xs font-semibold rounded px-2 py-1 ${
//                                           isDirty ? 'bg-gold text-charcoal' : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
//                                         }`}
//                                       >
//                                         Save
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )
//                               })}
//                               {catalog.length === 0 && (
//                                 <p className="text-xs text-charcoal/40">No services in your catalog yet — add some in the "Service Catalog" tab first.</p>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )
//                   })}
//                   {(subEventsByType[et.id] || []).length === 0 && <p className="text-xs text-charcoal/40">No sub-events yet — add one above.</p>}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         {eventTypes.length === 0 && <p className="text-charcoal/60">No event types yet — add one above.</p>}
//       </div>
//     </div>
//   )
// }

// // ---------- Albums ----------
// function AlbumsPanel() {
//   const [albums, setAlbums] = useState([])
//   const [name, setName] = useState('')
//   const [price, setPrice] = useState('')

//   useEffect(() => { fetchAlbums() }, [])

//   async function fetchAlbums() {
//     const { data } = await supabase.from('albums').select('*').order('sort_order')
//     setAlbums(data || [])
//   }

//   async function addAlbum(e) {
//     e.preventDefault()
//     const nextOrder = albums.length ? Math.max(...albums.map((a) => a.sort_order || 0)) + 1 : 1
//     await supabase.from('albums').insert({ name, price: Number(price) || 0, sort_order: nextOrder })
//     setName(''); setPrice('')
//     fetchAlbums()
//   }

//   async function updateAlbum(id, field, value) {
//     await supabase.from('albums').update({ [field]: value }).eq('id', id)
//     fetchAlbums()
//   }

//   async function removeAlbum(id) {
//     await supabase.from('albums').delete().eq('id', id)
//     fetchAlbums()
//   }

//   return (
//     <div>
//       <p className="text-xs text-charcoal/50 mb-3">These appear as the "Physical Album" options on the Get Quote page. Price 0 shows as "Free".</p>
//       <form onSubmit={addAlbum} className="flex flex-wrap gap-3 mb-6">
//         <input required placeholder="Album name" value={name} onChange={(e) => setName(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
//         <input type="number" placeholder="Price ₹" value={price} onChange={(e) => setPrice(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 w-32" />
//         <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Album</button>
//       </form>
//       <div className="space-y-3">
//         {albums.map((a) => (
//           <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
//             <input defaultValue={a.name} onBlur={(e) => updateAlbum(a.id, 'name', e.target.value)}
//               className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent" />
//             <div className="flex items-center gap-2">
//               <span>₹</span>
//               <input type="number" defaultValue={a.price} onBlur={(e) => updateAlbum(a.id, 'price', Number(e.target.value))}
//                 className="border border-charcoal/20 rounded-lg px-3 py-2 w-32" />
//               <button onClick={() => removeAlbum(a.id)} className="text-red-600 text-sm">Remove</button>
//             </div>
//           </div>
//         ))}
//         {albums.length === 0 && <p className="text-charcoal/60">No albums yet.</p>}
//       </div>
//     </div>
//   )
// }

// // ---------- Deliverables ----------
// function DeliverablesPanel() {
//   const [deliverables, setDeliverables] = useState([])
//   const [name, setName] = useState('')
//   const [price, setPrice] = useState('')
//   const [isFree, setIsFree] = useState(false)

//   useEffect(() => { fetchDeliverables() }, [])

//   async function fetchDeliverables() {
//     const { data } = await supabase.from('deliverables').select('*').order('sort_order')
//     setDeliverables(data || [])
//   }

//   async function addDeliverable(e) {
//     e.preventDefault()
//     const nextOrder = deliverables.length ? Math.max(...deliverables.map((d) => d.sort_order || 0)) + 1 : 1
//     await supabase.from('deliverables').insert({ name, price: isFree ? 0 : Number(price) || 0, is_free: isFree, sort_order: nextOrder })
//     setName(''); setPrice(''); setIsFree(false)
//     fetchDeliverables()
//   }

//   async function updateDeliverable(id, field, value) {
//     await supabase.from('deliverables').update({ [field]: value }).eq('id', id)
//     fetchDeliverables()
//   }

//   async function removeDeliverable(id) {
//     await supabase.from('deliverables').delete().eq('id', id)
//     fetchDeliverables()
//   }

//   return (
//     <div>
//       <p className="text-xs text-charcoal/50 mb-3">These appear as the "Deliverables" checkboxes on the Get Quote page.</p>
//       <form onSubmit={addDeliverable} className="flex flex-wrap gap-3 mb-6 items-center">
//         <input required placeholder="Deliverable name" value={name} onChange={(e) => setName(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
//         <input type="number" placeholder="Price ₹" value={price} disabled={isFree} onChange={(e) => setPrice(e.target.value)}
//           className="border border-charcoal/20 rounded-lg px-4 py-2 w-32 disabled:opacity-40" />
//         <label className="flex items-center gap-2 text-sm">
//           <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} /> Free
//         </label>
//         <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add</button>
//       </form>
//       <div className="space-y-3">
//         {deliverables.map((d) => (
//           <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
//             <input defaultValue={d.name} onBlur={(e) => updateDeliverable(d.id, 'name', e.target.value)}
//               className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent" />
//             <div className="flex items-center gap-2">
//               {d.is_free ? (
//                 <span className="text-xs text-gold font-semibold">Free</span>
//               ) : (
//                 <>
//                   <span>₹</span>
//                   <input type="number" defaultValue={d.price} onBlur={(e) => updateDeliverable(d.id, 'price', Number(e.target.value))}
//                     className="border border-charcoal/20 rounded-lg px-3 py-2 w-32" />
//                 </>
//               )}
//               <button onClick={() => removeDeliverable(d.id)} className="text-red-600 text-sm">Remove</button>
//             </div>
//           </div>
//         ))}
//         {deliverables.length === 0 && <p className="text-charcoal/60">No deliverables yet.</p>}
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const API_URL = import.meta.env.VITE_API_URL
const TABS = ['Bookings', 'Events', 'Gallery', 'Albums', 'Deliverables', 'Service Catalog']

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('Bookings')
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen pt-24 pb-24 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-charcoal">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm text-charcoal/60 hover:text-red-600 transition">Log Out</button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-charcoal/10 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition ${
              tab === t ? 'border-gold text-gold' : 'border-transparent text-charcoal/60'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Bookings' && <BookingsPanel />}
      {tab === 'Events' && <EventTypesPanel />}
      {tab === 'Gallery' && <GalleryPanel />}
      {tab === 'Albums' && <AlbumsPanel />}
      {tab === 'Deliverables' && <DeliverablesPanel />}
      {tab === 'Service Catalog' && <ServiceCatalogPanel />}
    </div>
  )
}

// ---------- Bookings ----------
function BookingsPanel() {
  const [bookings, setBookings] = useState([])

  useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    })
    if (res.ok) setBookings(await res.json())
  }

  async function updateStatus(id, status) {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`${API_URL}/booking/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ status }),
    })
    fetchBookings()
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="border border-charcoal/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-medium text-charcoal">{b.name} — {b.shoot_type}</div>
            <div className="text-sm text-charcoal/60">{b.phone} • {b.event_date} {b.location && `• ${b.location}`}</div>
            {b.latitude && b.longitude && (
              <a href={`https://www.google.com/maps?q=${b.latitude},${b.longitude}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 mt-1">
                📍 View on Map
              </a>
            )}
          </div>
          <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}
            className="border border-charcoal/20 rounded-lg px-3 py-2 text-sm">
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
        </div>
      ))}
      {bookings.length === 0 && <p className="text-charcoal/60">No bookings yet.</p>}
    </div>
  )
}

// ---------- Gallery (photo upload/link, video via YouTube link with title + duration) ----------
function GalleryPanel() {
  const [images, setImages] = useState([])
  const [catalog, setCatalog] = useState([])
  const [mode, setMode] = useState('upload') // 'upload' | 'link' — forced to 'link' when mediaType is 'video'
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [mediaType, setMediaType] = useState('photo')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchImages(); fetchCatalog() }, [])

  async function fetchImages() {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('uploaded_at', { ascending: false })
    if (error) console.error(error)
    setImages(data || [])
  }

  async function fetchCatalog() {
    const { data, error } = await supabase.from('service_catalog').select('name').order('sort_order')
    if (error) console.error(error)
    setCatalog(data || [])
    if (data?.length) setCategory(data[0].name)
  }

  function handleMediaTypeChange(value) {
    setMediaType(value)
    if (value === 'video') setMode('link') // videos are YouTube links only
    setFile(null)
    setUrl('')
    setTitle('')
    setDuration('')
  }

  async function handleAdd(e) {
    e.preventDefault()

    if (mediaType === 'video') {
      const youTubeId = getYouTubeId(url)
      if (!youTubeId) {
        alert('Please paste a valid YouTube link (e.g. https://youtube.com/watch?v=... or https://youtu.be/...)')
        return
      }
      setUploading(true)
      await supabase.from('gallery_images').insert({
        url,
        category,
        media_type: 'video',
        is_youtube: true,
        title: title.trim() || null,
        duration: duration.trim() || null,
      })
      setUrl(''); setTitle(''); setDuration('')
      setUploading(false)
      fetchImages()
      return
    }

    // Photo: upload file or paste a direct link
    setUploading(true)
    let finalUrl = url
    if (mode === 'upload') {
      if (!file) { setUploading(false); return }
      const path = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('gallery').upload(path, file)
      if (uploadError) {
        alert('Upload failed: ' + uploadError.message)
        setUploading(false)
        return
      }
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path)
      finalUrl = urlData.publicUrl
    }
    if (!finalUrl) { setUploading(false); return }

    await supabase.from('gallery_images').insert({
      url: finalUrl,
      category,
      media_type: 'photo',
      is_youtube: false,
      title: title.trim() || null,
    })
    setFile(null)
    setUrl('')
    setTitle('')
    setUploading(false)
    fetchImages()
  }

  async function removeImage(id) {
    await supabase.from('gallery_images').delete().eq('id', id)
    fetchImages()
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">
        Photos: upload a file or paste a direct image link. Videos: paste a YouTube link — it will be embedded
        automatically on the Portfolio page's Video Portfolio section. Categories come from your Service Catalog tab.
      </p>

      <div className="flex gap-2 mb-4">
        <button onClick={() => handleMediaTypeChange('photo')} className={`text-sm font-medium px-3 py-1.5 rounded-full ${mediaType === 'photo' ? 'bg-gold text-charcoal' : 'bg-charcoal/5'}`}>Photo</button>
        <button onClick={() => handleMediaTypeChange('video')} className={`text-sm font-medium px-3 py-1.5 rounded-full ${mediaType === 'video' ? 'bg-gold text-charcoal' : 'bg-charcoal/5'}`}>Video (YouTube)</button>
      </div>

      {mediaType === 'photo' && (
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('upload')} className={`text-xs font-medium px-3 py-1 rounded-full ${mode === 'upload' ? 'bg-charcoal text-cream' : 'bg-charcoal/5'}`}>Upload File</button>
          <button onClick={() => setMode('link')} className={`text-xs font-medium px-3 py-1 rounded-full ${mode === 'link' ? 'bg-charcoal text-cream' : 'bg-charcoal/5'}`}>Paste Link</button>
        </div>
      )}

      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-6 items-center">
        {mediaType === 'video' ? (
          <input required type="url" placeholder="https://youtube.com/watch?v=... or https://youtu.be/..." value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[260px]" />
        ) : mode === 'upload' ? (
          <input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 min-w-[220px] text-sm" />
        ) : (
          <input required type="url" placeholder="https://example.com/photo.jpg" value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[220px]" />
        )}

        {mediaType === 'video' && (
          <>
            <input placeholder="Video title (e.g. Wedding Highlights 2024)" value={title} onChange={(e) => setTitle(e.target.value)}
              className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[200px]" />
            <input placeholder="Duration (e.g. 3:45 mins)" value={duration} onChange={(e) => setDuration(e.target.value)}
              className="border border-charcoal/20 rounded-lg px-3 py-2 w-40" />
          </>
        )}

        {mediaType === 'photo' && (
          <input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)}
            className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[160px]" />
        )}

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-charcoal/20 rounded-lg px-3 py-2">
          {catalog.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        <button disabled={uploading} className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2 disabled:opacity-50">
          {uploading ? 'Saving...' : 'Add'}
        </button>
      </form>

      {mediaType === 'video' && url && getYouTubeId(url) && (
        <div className="mb-6">
          <p className="text-xs text-charcoal/50 mb-1">Preview:</p>
          <img src={`https://img.youtube.com/vi/${getYouTubeId(url)}/hqdefault.jpg`} alt="YouTube preview" className="w-40 rounded-lg" />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative rounded-xl overflow-hidden aspect-square group bg-charcoal/5">
            {img.media_type === 'video' && img.is_youtube ? (
              <img src={`https://img.youtube.com/vi/${getYouTubeId(img.url)}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" />
            ) : img.media_type === 'video' ? (
              <video src={img.url} className="w-full h-full object-cover" muted />
            ) : (
              <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
            )}
            <span className="absolute top-2 left-2 bg-charcoal/70 text-cream text-[10px] px-2 py-0.5 rounded-full">
              {img.media_type === 'video' ? '▶ YouTube' : 'Photo'} · {img.category}
            </span>
            {img.title && (
              <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 text-cream text-[10px] px-2 py-1 truncate">
                {img.title}{img.duration ? ` · ${img.duration}` : ''}
              </span>
            )}
            <button onClick={() => removeImage(img.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition">
              Remove
            </button>
          </div>
        ))}
        {images.length === 0 && <p className="text-charcoal/60 col-span-full">No media yet.</p>}
      </div>
    </div>
  )
}

// ---------- Service Catalog (master service names + portfolio visibility) ----------
function ServiceCatalogPanel() {
  const [services, setServices] = useState([])
  const [name, setName] = useState('')

  useEffect(() => { fetchServices() }, [])

  async function fetchServices() {
    const { data, error } = await supabase.from('service_catalog').select('*').order('sort_order')
    if (error) console.error(error)
    setServices(data || [])
  }

  async function addService(e) {
    e.preventDefault()
    if (!name.trim()) return
    const nextOrder = services.length ? Math.max(...services.map((s) => s.sort_order || 0)) + 1 : 1
    await supabase.from('service_catalog').insert({ name: name.trim(), sort_order: nextOrder, show_in_portfolio: true })
    setName('')
    fetchServices()
  }

  async function renameService(id, newName) {
    if (!newName.trim()) return
    await supabase.from('service_catalog').update({ name: newName.trim() }).eq('id', id)
    fetchServices()
  }

  async function toggleShowInPortfolio(id, value) {
    await supabase.from('service_catalog').update({ show_in_portfolio: value }).eq('id', id)
    fetchServices()
  }

  async function removeService(id) {
    if (!confirm('This will also remove this service\'s pricing from every Event it is used in. Continue?')) return
    await supabase.from('service_catalog').delete().eq('id', id)
    fetchServices()
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">
        Master list of service names. No price here — prices are set per Event → Sub-Event in the "Events" tab.
        Untick "Show in Portfolio" to hide a service from the Portfolio page's filter buttons (it still works
        normally in the quote builder).
      </p>

      <form onSubmit={addService} className="flex flex-wrap gap-3 mb-6">
        <input required placeholder="Service name (e.g. Traditional Photography)" value={name} onChange={(e) => setName(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[200px]" />
        <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Service</button>
      </form>

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
            <input defaultValue={s.name} onBlur={(e) => renameService(s.id, e.target.value)}
              className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent flex-1 min-w-[140px]" />
            <label className="flex items-center gap-2 text-xs text-charcoal/60">
              <input type="checkbox" checked={!!s.show_in_portfolio}
                onChange={(e) => toggleShowInPortfolio(s.id, e.target.checked)} />
              Show in Portfolio
            </label>
            <button onClick={() => removeService(s.id)} className="text-red-600 text-sm">Remove</button>
          </div>
        ))}
        {services.length === 0 && <p className="text-charcoal/60">No services yet — add one above.</p>}
      </div>
    </div>
  )
}

// ---------- Events (formerly "Event Types") -> Sub-Events -> Service Pricing ----------
function EventTypesPanel() {
  const [eventTypes, setEventTypes] = useState([])
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📷')
  const [expandedTypeId, setExpandedTypeId] = useState(null)
  const [editingTypeId, setEditingTypeId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editIcon, setEditIcon] = useState('')

  const [subEventsByType, setSubEventsByType] = useState({})
  const [newSubEventName, setNewSubEventName] = useState('')
  const [newSubEventRequiresDate, setNewSubEventRequiresDate] = useState(true)

  const [expandedSubEventId, setExpandedSubEventId] = useState(null)
  const [pricingBySubEvent, setPricingBySubEvent] = useState({})
  const [catalog, setCatalog] = useState([])
  const [priceDrafts, setPriceDrafts] = useState({})

  useEffect(() => {
    fetchEventTypes()
    fetchCatalog()
  }, [])

  async function fetchEventTypes() {
    const { data, error } = await supabase.from('event_types').select('*').order('sort_order')
    if (error) console.error(error)
    setEventTypes(data || [])
  }

  async function fetchCatalog() {
    const { data, error } = await supabase.from('service_catalog').select('*').order('sort_order')
    if (error) console.error(error)
    setCatalog(data || [])
  }

  async function addEventType(e) {
    e.preventDefault()
    const nextOrder = eventTypes.length ? Math.max(...eventTypes.map((t) => t.sort_order || 0)) + 1 : 1
    await supabase.from('event_types').insert({ name, icon, sort_order: nextOrder })
    setName(''); setIcon('📷')
    fetchEventTypes()
  }

  async function removeEventType(id) {
    if (!confirm('This will also remove all its Sub-Events and their pricing. Continue?')) return
    await supabase.from('event_types').delete().eq('id', id)
    fetchEventTypes()
  }

  function startEdit(et) {
    setEditingTypeId(et.id)
    setEditName(et.name)
    setEditIcon(et.icon)
  }

  async function saveEdit(id) {
    await supabase.from('event_types').update({ name: editName.trim(), icon: editIcon.trim() || '📷' }).eq('id', id)
    setEditingTypeId(null)
    fetchEventTypes()
  }

  async function moveEventType(id, direction) {
    const idx = eventTypes.findIndex((t) => t.id === id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= eventTypes.length) return
    const a = eventTypes[idx]
    const b = eventTypes[swapIdx]
    await Promise.all([
      supabase.from('event_types').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('event_types').update({ sort_order: a.sort_order }).eq('id', b.id),
    ])
    fetchEventTypes()
  }

  async function fetchSubEvents(eventTypeId) {
    const { data, error } = await supabase.from('sub_events').select('*').eq('event_type_id', eventTypeId).order('sort_order')
    if (error) console.error(error)
    setSubEventsByType((prev) => ({ ...prev, [eventTypeId]: data || [] }))
  }

  async function toggleExpandType(id) {
    if (expandedTypeId === id) { setExpandedTypeId(null); return }
    setExpandedTypeId(id)
    setExpandedSubEventId(null)
    fetchSubEvents(id)
  }

  async function addSubEvent(eventTypeId) {
    if (!newSubEventName.trim()) return
    const list = subEventsByType[eventTypeId] || []
    const nextOrder = list.length ? Math.max(...list.map((s) => s.sort_order || 0)) + 1 : 1
    await supabase.from('sub_events').insert({
      event_type_id: eventTypeId, name: newSubEventName.trim(), requires_date: newSubEventRequiresDate, sort_order: nextOrder,
    })
    setNewSubEventName(''); setNewSubEventRequiresDate(true)
    fetchSubEvents(eventTypeId)
  }

  async function removeSubEvent(eventTypeId, subEventId) {
    if (!confirm('This will also remove all pricing set for this Sub-Event. Continue?')) return
    await supabase.from('sub_events').delete().eq('id', subEventId)
    fetchSubEvents(eventTypeId)
  }

  async function fetchPricing(subEventId) {
    const { data, error } = await supabase
      .from('sub_event_services')
      .select('id, price, sort_order, service_catalog(id, name)')
      .eq('sub_event_id', subEventId)
      .order('sort_order')
    if (error) console.error(error)
    setPricingBySubEvent((prev) => ({ ...prev, [subEventId]: data || [] }))
  }

  function toggleExpandSubEvent(id) {
    if (expandedSubEventId === id) { setExpandedSubEventId(null); return }
    setExpandedSubEventId(id)
    fetchPricing(id)
  }

  async function savePrice(subEventId, serviceCatalogId, priceValue) {
    if (priceValue === '' || priceValue === null || isNaN(Number(priceValue)) || Number(priceValue) < 0) return
    const list = pricingBySubEvent[subEventId] || []
    const nextOrder = list.length ? Math.max(...list.map((s) => s.sort_order || 0)) + 1 : 1

    const { error } = await supabase.from('sub_event_services').upsert(
      { sub_event_id: subEventId, service_catalog_id: serviceCatalogId, price: Number(priceValue), sort_order: nextOrder },
      { onConflict: 'sub_event_id,service_catalog_id' }
    )
    if (error) { console.error(error); alert('Failed to save price: ' + error.message); return }
    fetchPricing(subEventId)
  }

  async function removePricing(subEventId, subEventServiceId) {
    await supabase.from('sub_event_services').delete().eq('id', subEventServiceId)
    fetchPricing(subEventId)
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">
        Events are the icon cards on Get Quote (Birthday, Wedding, etc). Each has its own Sub-Events
        (e.g. Wedding → Haldi, Sangeet, Mehendi). For each Sub-Event, tick which services apply, type a price,
        then click Save.
      </p>
      <form onSubmit={addEventType} className="flex flex-wrap gap-3 mb-6">
        <input placeholder="Emoji icon (e.g. 🎂)" value={icon} onChange={(e) => setIcon(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 w-32" />
        <input required placeholder="Event name (e.g. Birthday)" value={name} onChange={(e) => setName(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
        <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Event</button>
      </form>

      <div className="space-y-3">
        {eventTypes.map((et, idx) => (
          <div key={et.id} className="border border-charcoal/10 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3">
              {editingTypeId === et.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input value={editIcon} onChange={(e) => setEditIcon(e.target.value)}
                    className="border border-charcoal/20 rounded-lg px-2 py-1 w-16 text-sm" />
                  <input value={editName} onChange={(e) => setEditName(e.target.value)}
                    className="border border-charcoal/20 rounded-lg px-2 py-1 flex-1 text-sm" />
                  <button onClick={() => saveEdit(et.id)} className="bg-gold text-charcoal text-xs font-semibold rounded-lg px-3 py-1.5">Save</button>
                  <button onClick={() => setEditingTypeId(null)} className="text-charcoal/50 text-xs px-2">Cancel</button>
                </div>
              ) : (
                <button onClick={() => toggleExpandType(et.id)} className="flex items-center gap-2 font-medium">
                  <span>{et.icon}</span> {et.name}
                </button>
              )}

              {editingTypeId !== et.id && (
                <div className="flex items-center gap-1">
                  <button onClick={() => moveEventType(et.id, 'up')} disabled={idx === 0}
                    className="text-charcoal/50 text-sm px-2 disabled:opacity-30" title="Move up">↑</button>
                  <button onClick={() => moveEventType(et.id, 'down')} disabled={idx === eventTypes.length - 1}
                    className="text-charcoal/50 text-sm px-2 disabled:opacity-30" title="Move down">↓</button>
                  <button onClick={() => startEdit(et)} className="text-blue-600 text-sm px-2">Edit</button>
                  <button onClick={() => removeEventType(et.id)} className="text-red-600 text-sm px-2">Remove</button>
                </div>
              )}
            </div>

            {expandedTypeId === et.id && (
              <div className="mt-4 pt-4 border-t border-charcoal/10 pl-3">
                <p className="text-xs text-charcoal/50 mb-2">Sub-events under {et.name}:</p>
                <div className="flex flex-wrap gap-2 mb-3 items-center">
                  <input placeholder="Sub-event name (e.g. Haldi)" value={newSubEventName} onChange={(e) => setNewSubEventName(e.target.value)}
                    className="border border-charcoal/20 rounded-lg px-3 py-2 flex-1 min-w-[140px] text-sm" />
                  <label className="flex items-center gap-1 text-xs text-charcoal/60">
                    <input type="checkbox" checked={newSubEventRequiresDate} onChange={(e) => setNewSubEventRequiresDate(e.target.checked)} /> Needs own date
                  </label>
                  <button onClick={() => addSubEvent(et.id)} className="bg-gold text-charcoal text-sm font-semibold rounded-lg px-3 py-2">Add</button>
                </div>

                <div className="space-y-2">
                  {(subEventsByType[et.id] || []).map((se) => {
                    const pricedRows = pricingBySubEvent[se.id] || []
                    const pricedByServiceId = Object.fromEntries(pricedRows.map((r) => [r.service_catalog.id, r]))

                    return (
                      <div key={se.id} className="bg-charcoal/5 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <button onClick={() => toggleExpandSubEvent(se.id)} className="text-sm font-medium">
                            {se.name} {se.requires_date && <span className="text-xs text-charcoal/40">(has own date)</span>}
                          </button>
                          <button onClick={() => removeSubEvent(et.id, se.id)} className="text-red-600 text-xs">Remove</button>
                        </div>

                        {expandedSubEventId === se.id && (
                          <div className="mt-3 pt-3 border-t border-charcoal/10">
                            <p className="text-xs text-charcoal/50 mb-2">
                              Tick a service, type its price for <strong>{se.name}</strong>, then click Save:
                            </p>
                            <div className="space-y-1">
                              {catalog.map((svc) => {
                                const existing = pricedByServiceId[svc.id]
                                const draftKey = `${se.id}:${svc.id}`
                                const savedValue = existing ? String(existing.price) : ''
                                const draftValue = priceDrafts[draftKey] ?? savedValue
                                const isDirty = existing && draftValue !== savedValue

                                return (
                                  <div key={svc.id} className="flex items-center justify-between gap-2 text-xs bg-cream rounded-lg px-3 py-1.5">
                                    <label className="flex items-center gap-2 flex-1 min-w-0">
                                      <input
                                        type="checkbox"
                                        checked={!!existing}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            savePrice(se.id, svc.id, draftValue !== '' ? draftValue : 0)
                                          } else if (existing) {
                                            removePricing(se.id, existing.id)
                                            setPriceDrafts((prev) => {
                                              const next = { ...prev }
                                              delete next[draftKey]
                                              return next
                                            })
                                          }
                                        }}
                                      />
                                      <span className="truncate">{svc.name}</span>
                                    </label>
                                    <div className="flex items-center gap-1">
                                      <span>₹</span>
                                      <input
                                        type="number"
                                        min="0"
                                        disabled={!existing}
                                        placeholder="Price"
                                        value={draftValue}
                                        onChange={(e) => setPriceDrafts((prev) => ({ ...prev, [draftKey]: e.target.value }))}
                                        className="border border-charcoal/20 rounded px-2 py-1 w-24 disabled:opacity-40"
                                      />
                                      <button
                                        type="button"
                                        disabled={!existing || !isDirty}
                                        onClick={async () => {
                                          await savePrice(se.id, svc.id, draftValue)
                                          setPriceDrafts((prev) => {
                                            const next = { ...prev }
                                            delete next[draftKey]
                                            return next
                                          })
                                        }}
                                        className={`text-xs font-semibold rounded px-2 py-1 ${
                                          isDirty ? 'bg-gold text-charcoal' : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                                        }`}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                )
                              })}
                              {catalog.length === 0 && (
                                <p className="text-xs text-charcoal/40">No services in your catalog yet — add some in the "Service Catalog" tab first.</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {(subEventsByType[et.id] || []).length === 0 && <p className="text-xs text-charcoal/40">No sub-events yet — add one above.</p>}
                </div>
              </div>
            )}
          </div>
        ))}
        {eventTypes.length === 0 && <p className="text-charcoal/60">No events yet — add one above.</p>}
      </div>
    </div>
  )
}

// ---------- Albums ----------
function AlbumsPanel() {
  const [albums, setAlbums] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => { fetchAlbums() }, [])

  async function fetchAlbums() {
    const { data } = await supabase.from('albums').select('*').order('sort_order')
    setAlbums(data || [])
  }

  async function addAlbum(e) {
    e.preventDefault()
    const nextOrder = albums.length ? Math.max(...albums.map((a) => a.sort_order || 0)) + 1 : 1
    await supabase.from('albums').insert({ name, price: Number(price) || 0, sort_order: nextOrder })
    setName(''); setPrice('')
    fetchAlbums()
  }

  async function updateAlbum(id, field, value) {
    await supabase.from('albums').update({ [field]: value }).eq('id', id)
    fetchAlbums()
  }

  async function removeAlbum(id) {
    await supabase.from('albums').delete().eq('id', id)
    fetchAlbums()
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">These appear as the "Physical Album" options on the Get Quote page. Price 0 shows as "Free".</p>
      <form onSubmit={addAlbum} className="flex flex-wrap gap-3 mb-6">
        <input required placeholder="Album name" value={name} onChange={(e) => setName(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
        <input type="number" placeholder="Price ₹" value={price} onChange={(e) => setPrice(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 w-32" />
        <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add Album</button>
      </form>
      <div className="space-y-3">
        {albums.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
            <input defaultValue={a.name} onBlur={(e) => updateAlbum(a.id, 'name', e.target.value)}
              className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent" />
            <div className="flex items-center gap-2">
              <span>₹</span>
              <input type="number" defaultValue={a.price} onBlur={(e) => updateAlbum(a.id, 'price', Number(e.target.value))}
                className="border border-charcoal/20 rounded-lg px-3 py-2 w-32" />
              <button onClick={() => removeAlbum(a.id)} className="text-red-600 text-sm">Remove</button>
            </div>
          </div>
        ))}
        {albums.length === 0 && <p className="text-charcoal/60">No albums yet.</p>}
      </div>
    </div>
  )
}

// ---------- Deliverables ----------
function DeliverablesPanel() {
  const [deliverables, setDeliverables] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [isFree, setIsFree] = useState(false)

  useEffect(() => { fetchDeliverables() }, [])

  async function fetchDeliverables() {
    const { data } = await supabase.from('deliverables').select('*').order('sort_order')
    setDeliverables(data || [])
  }

  async function addDeliverable(e) {
    e.preventDefault()
    const nextOrder = deliverables.length ? Math.max(...deliverables.map((d) => d.sort_order || 0)) + 1 : 1
    await supabase.from('deliverables').insert({ name, price: isFree ? 0 : Number(price) || 0, is_free: isFree, sort_order: nextOrder })
    setName(''); setPrice(''); setIsFree(false)
    fetchDeliverables()
  }

  async function updateDeliverable(id, field, value) {
    await supabase.from('deliverables').update({ [field]: value }).eq('id', id)
    fetchDeliverables()
  }

  async function removeDeliverable(id) {
    await supabase.from('deliverables').delete().eq('id', id)
    fetchDeliverables()
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">These appear as the "Deliverables" checkboxes on the Get Quote page.</p>
      <form onSubmit={addDeliverable} className="flex flex-wrap gap-3 mb-6 items-center">
        <input required placeholder="Deliverable name" value={name} onChange={(e) => setName(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 flex-1 min-w-[160px]" />
        <input type="number" placeholder="Price ₹" value={price} disabled={isFree} onChange={(e) => setPrice(e.target.value)}
          className="border border-charcoal/20 rounded-lg px-4 py-2 w-32 disabled:opacity-40" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} /> Free
        </label>
        <button className="bg-gold text-charcoal font-semibold rounded-lg px-4 py-2">Add</button>
      </form>
      <div className="space-y-3">
        {deliverables.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal/10 rounded-xl px-4 py-3">
            <input defaultValue={d.name} onBlur={(e) => updateDeliverable(d.id, 'name', e.target.value)}
              className="font-medium border-b border-transparent hover:border-charcoal/20 focus:border-gold outline-none bg-transparent" />
            <div className="flex items-center gap-2">
              {d.is_free ? (
                <span className="text-xs text-gold font-semibold">Free</span>
              ) : (
                <>
                  <span>₹</span>
                  <input type="number" defaultValue={d.price} onBlur={(e) => updateDeliverable(d.id, 'price', Number(e.target.value))}
                    className="border border-charcoal/20 rounded-lg px-3 py-2 w-32" />
                </>
              )}
              <button onClick={() => removeDeliverable(d.id)} className="text-red-600 text-sm">Remove</button>
            </div>
          </div>
        ))}
        {deliverables.length === 0 && <p className="text-charcoal/60">No deliverables yet.</p>}
      </div>
    </div>
  )
}