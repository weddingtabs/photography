import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'

const API_URL = import.meta.env.VITE_API_URL
const TABS = ['Bookings', 'Events', 'Gallery', 'Service Catalog']

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function primeDragEvent(e) {
  e.dataTransfer.effectAllowed = 'move'
  try { e.dataTransfer.setData('text/plain', 'drag') } catch { /* ignore */ }
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
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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
      {tab === 'Service Catalog' && <ServiceCatalogPanel />}
    </div>
  )
}

// ---------- Bookings ----------
function BookingsPanel() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      if (res.ok) setBookings(await res.json())
    } finally {
      setLoading(false)
    }
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
      {loading && <p className="text-charcoal/60">Loading bookings... (may take up to 30s if the server was asleep)</p>}
      {!loading && bookings.map((b) => (
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
      {!loading && bookings.length === 0 && <p className="text-charcoal/60">No bookings yet.</p>}
    </div>
  )
}

// ---------- Gallery (photo/video, split sections, pointer-based drag-to-reorder) ----------
function GalleryPanel() {
  const [images, setImages] = useState([])
  const [catalog, setCatalog] = useState([])
  const [mode, setMode] = useState('upload')
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
      .order('sort_order', { ascending: true })
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
    if (value === 'video') setMode('link')
    setFile(null)
    setUrl('')
    setTitle('')
    setDuration('')
  }

  async function handleAdd(e) {
    e.preventDefault()
    const nextOrder = images.length ? Math.max(...images.map((i) => i.sort_order || 0)) + 1 : 1

    if (mediaType === 'video') {
      const youTubeId = getYouTubeId(url)
      if (!youTubeId) {
        alert('Please paste a valid YouTube link (e.g. https://youtube.com/watch?v=... or https://youtu.be/...)')
        return
      }
      setUploading(true)
      await supabase.from('gallery_images').insert({
        url, category, media_type: 'video', is_youtube: true,
        title: title.trim() || null, duration: duration.trim() || null,
        sort_order: nextOrder,
      })
      setUrl(''); setTitle(''); setDuration('')
      setUploading(false)
      fetchImages()
      return
    }

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
      url: finalUrl, category, media_type: 'photo', is_youtube: false, title: title.trim() || null,
      sort_order: nextOrder,
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

  const photos = images.filter((img) => img.media_type !== 'video')
  const videos = images.filter((img) => img.media_type === 'video')

  async function handleReorder(type, fromIndex, toIndex) {
    if (fromIndex === toIndex) return
    const list = type === 'photo' ? [...photos] : [...videos]
    const [moved] = list.splice(fromIndex, 1)
    list.splice(toIndex, 0, moved)

    const otherList = type === 'photo' ? videos : photos
    setImages(type === 'photo' ? [...list, ...otherList] : [...otherList, ...list])

    const base = type === 'photo' ? 0 : 100000
    const updates = list.map((img, idx) =>
      supabase.from('gallery_images').update({ sort_order: base + idx + 1 }).eq('id', img.id)
    )
    await Promise.all(updates)
    fetchImages()
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">
        Photos: upload a file or paste a direct image link. Videos: paste a YouTube link — it will be embedded
        automatically on the Portfolio page's Video Portfolio section. Categories come from your Service Catalog tab.
        <strong> Press and drag the ⠿ handle</strong> on any tile to reorder within its section — the same order
        shows on the Portfolio page.
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

      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-8 items-center">
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
        <div className="mb-8">
          <p className="text-xs text-charcoal/50 mb-1">Preview:</p>
          <img src={`https://img.youtube.com/vi/${getYouTubeId(url)}/hqdefault.jpg`} alt="YouTube preview" className="w-40 rounded-lg" />
        </div>
      )}

      <div className="mb-10">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Photos ({photos.length})</h3>
        <PointerReorderGrid items={photos} onReorder={(from, to) => handleReorder('photo', from, to)} onRemove={removeImage} />
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Videos ({videos.length})</h3>
        <PointerReorderGrid items={videos} onReorder={(from, to) => handleReorder('video', from, to)} onRemove={removeImage} />
      </div>
    </div>
  )
}

// Pointer-event based drag-to-reorder grid — works on mouse AND touch,
// unlike native HTML5 drag which is mouse-only and browser-inconsistent.
function PointerReorderGrid({ items, onReorder, onRemove }) {
  const [dragIndex, setDragIndex] = useState(null)
  const [overIndex, setOverIndex] = useState(null)

  function handlePointerDown(e, index) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragIndex(index)
    setOverIndex(index)
  }

  function handlePointerMove(e) {
    if (dragIndex === null) return
    const el = document.elementFromPoint(e.clientX, e.clientY)
    const tile = el?.closest('[data-tile-index]')
    if (tile) {
      const idx = Number(tile.getAttribute('data-tile-index'))
      if (idx !== overIndex) setOverIndex(idx)
    }
  }

  function handlePointerUp() {
    if (dragIndex !== null && overIndex !== null && overIndex !== dragIndex) {
      onReorder(dragIndex, overIndex)
    }
    setDragIndex(null)
    setOverIndex(null)
  }

  function handlePointerCancel() {
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((img, idx) => {
        const isDragging = dragIndex === idx
        const isOver = overIndex === idx && dragIndex !== null && dragIndex !== idx

        return (
          <div
            key={img.id}
            data-tile-index={idx}
            className={`relative rounded-xl overflow-hidden aspect-square group bg-charcoal/5 select-none transition-all ${
              isDragging ? 'opacity-50 scale-95 z-30' : ''
            } ${isOver ? 'ring-2 ring-gold' : ''}`}
          >
            <button
              onPointerDown={(e) => handlePointerDown(e, idx)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              style={{ touchAction: 'none' }}
              className="absolute top-2 left-2 z-20 bg-charcoal/70 text-cream text-xs w-6 h-6 flex items-center justify-center rounded cursor-grab active:cursor-grabbing"
              title="Drag to reorder"
              aria-label="Drag to reorder"
            >
              ⠿
            </button>

            {img.media_type === 'video' && img.is_youtube ? (
              <img src={`https://img.youtube.com/vi/${getYouTubeId(img.url)}/hqdefault.jpg`} alt="" draggable={false} className="w-full h-full object-cover pointer-events-none" />
            ) : img.media_type === 'video' ? (
              <video src={img.url} className="w-full h-full object-cover pointer-events-none" muted draggable={false} />
            ) : (
              <img src={img.url} alt={img.category} draggable={false} className="w-full h-full object-cover pointer-events-none" />
            )}

            <span className="absolute top-2 left-9 max-w-[calc(100%-5.5rem)] bg-charcoal/70 text-cream text-[10px] px-2 py-0.5 rounded-full pointer-events-none truncate">
              {img.category}
            </span>

            <button
              onClick={() => onRemove(img.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-80 hover:opacity-100 transition z-20"
            >
              Remove
            </button>

            {img.title && (
              <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 text-cream text-[10px] px-2 py-1 truncate pointer-events-none">
                {img.title}{img.duration ? ` · ${img.duration}` : ''}
              </span>
            )}
          </div>
        )
      })}
      {items.length === 0 && <p className="text-charcoal/60 col-span-full text-sm">None yet.</p>}
    </div>
  )
}

// ---------- Service Catalog ----------
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

// ---------- Events -> Sub-Events -> Service Pricing (all drag-to-reorder) ----------
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

  const [editingSubEventId, setEditingSubEventId] = useState(null)
  const [editSubEventName, setEditSubEventName] = useState('')

  const [expandedSubEventId, setExpandedSubEventId] = useState(null)
  const [pricingBySubEvent, setPricingBySubEvent] = useState({})
  const [catalog, setCatalog] = useState([])
  const [priceDrafts, setPriceDrafts] = useState({})

  const [dragInfo, setDragInfo] = useState(null)

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

  async function persistOrder(table, orderedItems) {
    const updates = orderedItems.map((item, idx) =>
      supabase.from(table).update({ sort_order: idx + 1 }).eq('id', item.id)
    )
    await Promise.all(updates)
  }

  function handleEventTypeDragStart(e, index) {
    primeDragEvent(e)
    setDragInfo({ list: 'eventTypes', index })
  }
  function handleEventTypeDrop(e, dropIndex) {
    e.preventDefault()
    e.stopPropagation()
    if (!dragInfo || dragInfo.list !== 'eventTypes') return
    const from = dragInfo.index
    if (from === dropIndex) { setDragInfo(null); return }
    const reordered = [...eventTypes]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(dropIndex, 0, moved)
    setEventTypes(reordered)
    setDragInfo(null)
    persistOrder('event_types', reordered)
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

  function startEditSubEvent(se) {
    setEditingSubEventId(se.id)
    setEditSubEventName(se.name)
  }

  async function saveSubEventEdit(eventTypeId, subEventId) {
    await supabase.from('sub_events').update({ name: editSubEventName.trim() }).eq('id', subEventId)
    setEditingSubEventId(null)
    fetchSubEvents(eventTypeId)
  }

  function handleSubEventDragStart(e, eventTypeId, index) {
    e.stopPropagation()
    primeDragEvent(e)
    setDragInfo({ list: 'subEvents', containerId: eventTypeId, index })
  }
  function handleSubEventDrop(e, eventTypeId, dropIndex) {
    e.preventDefault()
    e.stopPropagation()
    if (!dragInfo || dragInfo.list !== 'subEvents' || dragInfo.containerId !== eventTypeId) return
    const from = dragInfo.index
    if (from === dropIndex) { setDragInfo(null); return }
    const list = [...(subEventsByType[eventTypeId] || [])]
    const [moved] = list.splice(from, 1)
    list.splice(dropIndex, 0, moved)
    setSubEventsByType((prev) => ({ ...prev, [eventTypeId]: list }))
    setDragInfo(null)
    persistOrder('sub_events', list)
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
    const existingMax = list.length ? Math.max(...list.map((s) => s.sort_order || 0)) : 0
    const nextOrder = existingMax + 1

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

  function handlePricingDragStart(e, subEventId, index) {
    e.stopPropagation()
    primeDragEvent(e)
    setDragInfo({ list: 'pricing', containerId: subEventId, index })
  }
  function handlePricingDrop(e, subEventId, dropIndex) {
    e.preventDefault()
    e.stopPropagation()
    if (!dragInfo || dragInfo.list !== 'pricing' || dragInfo.containerId !== subEventId) return
    const from = dragInfo.index
    if (from === dropIndex) { setDragInfo(null); return }
    const list = [...(pricingBySubEvent[subEventId] || [])]
    const [moved] = list.splice(from, 1)
    list.splice(dropIndex, 0, moved)
    setPricingBySubEvent((prev) => ({ ...prev, [subEventId]: list }))
    setDragInfo(null)
    persistOrder('sub_event_services', list)
  }

  return (
    <div>
      <p className="text-xs text-charcoal/50 mb-3">
        Events are the icon cards on Get Quote (Birthday, Wedding, etc). Each has its own Sub-Events
        (e.g. Wedding → Haldi, Sangeet, Mehendi). For each Sub-Event, tick which services apply, type a price,
        then click Save. <strong>Drag the ⠿ handle</strong> on any Event, Sub-Event, or priced Service to reorder —
        the same order shows on the Get Quote page.
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
          <div
            key={et.id}
            draggable
            onDragStart={(e) => handleEventTypeDragStart(e, idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleEventTypeDrop(e, idx)}
            className="border border-charcoal/10 rounded-xl p-4 bg-white"
          >
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
                <div className="flex items-center gap-2 flex-1">
                  <span className="cursor-grab text-charcoal/30 select-none" title="Drag to reorder">⠿</span>
                  <button onClick={() => toggleExpandType(et.id)} className="flex items-center gap-2 font-medium">
                    <span>{et.icon}</span> {et.name}
                  </button>
                </div>
              )}

              {editingTypeId !== et.id && (
                <div className="flex items-center gap-1">
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
                  {(subEventsByType[et.id] || []).map((se, seIdx) => {
                    const pricedRows = pricingBySubEvent[se.id] || []
                    const pricedByServiceId = Object.fromEntries(pricedRows.map((r) => [r.service_catalog.id, r]))

                    return (
                      <div
                        key={se.id}
                        draggable={editingSubEventId !== se.id}
                        onDragStart={(e) => handleSubEventDragStart(e, et.id, seIdx)}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                        onDrop={(e) => handleSubEventDrop(e, et.id, seIdx)}
                        className="bg-charcoal/5 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center">
                          {editingSubEventId === se.id ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                value={editSubEventName}
                                onChange={(e) => setEditSubEventName(e.target.value)}
                                className="border border-charcoal/20 rounded-lg px-2 py-1 flex-1 text-sm"
                              />
                              <button onClick={() => saveSubEventEdit(et.id, se.id)} className="bg-gold text-charcoal text-xs font-semibold rounded-lg px-3 py-1.5">Save</button>
                              <button onClick={() => setEditingSubEventId(null)} className="text-charcoal/50 text-xs px-2">Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => toggleExpandSubEvent(se.id)} className="text-sm font-medium flex items-center gap-2">
                              <span className="cursor-grab text-charcoal/30 select-none" title="Drag to reorder">⠿</span>
                              {se.name} {se.requires_date && <span className="text-xs text-charcoal/40">(has own date)</span>}
                            </button>
                          )}

                          {editingSubEventId !== se.id && (
                            <div className="flex items-center gap-1">
                              <button onClick={() => startEditSubEvent(se)} className="text-blue-600 text-xs px-2">Edit</button>
                              <button onClick={() => removeSubEvent(et.id, se.id)} className="text-red-600 text-xs">Remove</button>
                            </div>
                          )}
                        </div>

                        {expandedSubEventId === se.id && (
                          <div className="mt-3 pt-3 border-t border-charcoal/10">
                            <p className="text-xs text-charcoal/50 mb-2">
                              Tick a service, type its price for <strong>{se.name}</strong>, then click Save.
                              Drag priced rows below to set their display order.
                            </p>

                            {pricedRows.length > 0 && (
                              <div className="space-y-1 mb-2">
                                {pricedRows.map((row, pIdx) => (
                                  <div
                                    key={row.id}
                                    draggable
                                    onDragStart={(e) => handlePricingDragStart(e, se.id, pIdx)}
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                                    onDrop={(e) => handlePricingDrop(e, se.id, pIdx)}
                                    className="flex items-center gap-2 text-xs bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5"
                                  >
                                    <span className="cursor-grab text-charcoal/30 select-none" title="Drag to reorder">⠿</span>
                                    <span className="flex-1 font-medium">{row.service_catalog.name}</span>
                                    <span className="text-gold font-semibold">₹{Number(row.price).toLocaleString('en-IN')}</span>
                                  </div>
                                ))}
                              </div>
                            )}

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