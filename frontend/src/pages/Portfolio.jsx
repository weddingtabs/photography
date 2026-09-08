import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [imgRes, svcRes] = await Promise.all([
        supabase.from('gallery_images').select('*, events(name, price)').order('uploaded_at', { ascending: false }),
        supabase.from('services').select('name').order('sort_order'),
      ])
      if (!imgRes.error) setImages(imgRes.data || [])
      if (!svcRes.error) setCategories(['All', ...(svcRes.data || []).map((s) => s.name)])
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter)

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <Helmet><title>Portfolio | Wedding Tabs Studio</title></Helmet>

      <h1 className="font-heading text-4xl font-semibold text-charcoal mb-4">Our Portfolio</h1>
      <p className="text-charcoal/70 mb-8">Explore our finest work across weddings, portraits, events and more.</p>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === c ? 'bg-gold text-charcoal' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="text-charcoal/60">Loading gallery...</p>}
      {!loading && filtered.length === 0 && (
        <p className="text-charcoal/60">No media yet in this category — the admin panel is used to add photos/videos.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className="rounded-2xl overflow-hidden group relative">
            <div className="aspect-[3/4] bg-charcoal/5">
              {img.media_type === 'video' ? (
                <video src={img.url} className="w-full h-full object-cover" controls />
              ) : (
                <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
              )}
            </div>
            {img.events?.name && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3 pointer-events-none">
                <div className="text-cream text-sm font-medium">{img.events.name}</div>
                {img.events.price && (
                  <div className="text-gold text-xs">Starting ₹{Number(img.events.price).toLocaleString('en-IN')}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
