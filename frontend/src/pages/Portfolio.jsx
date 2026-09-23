// // import { useEffect, useState } from 'react'
// // import { Helmet } from 'react-helmet-async'
// // import { supabase } from '../supabaseClient'

// // export default function Portfolio() {
// //   const [images, setImages] = useState([])
// //   const [categories, setCategories] = useState(['All'])
// //   const [filter, setFilter] = useState('All')
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     async function fetchData() {
// //       const [imgRes, svcRes] = await Promise.all([
// //         supabase.from('gallery_images').select('*, events(name, price)').order('uploaded_at', { ascending: false }),
// //         supabase.from('service_catalog').select('name').order('sort_order'),
// //       ])
// //       if (!imgRes.error) setImages(imgRes.data || [])
// //       if (!svcRes.error) setCategories(['All', ...(svcRes.data || []).map((s) => s.name)])
// //       setLoading(false)
// //     }
// //     fetchData()
// //   }, [])

// //   const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter)

// //   return (
// //     <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
// //       <Helmet><title>Portfolio | Wedding Tabs Studio</title></Helmet>

// //       <h1 className="font-heading text-4xl font-semibold text-charcoal mb-4">Our Portfolio</h1>
// //       <p className="text-charcoal/70 mb-8">Explore our finest work across weddings, portraits, events and more.</p>

// //       <div className="flex flex-wrap gap-3 mb-10">
// //         {categories.map((c) => (
// //           <button
// //             key={c}
// //             onClick={() => setFilter(c)}
// //             className={`px-4 py-2 rounded-full text-sm font-medium transition ${
// //               filter === c ? 'bg-gold text-charcoal' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
// //             }`}
// //           >
// //             {c}
// //           </button>
// //         ))}
// //       </div>

// //       {loading && <p className="text-charcoal/60">Loading gallery...</p>}
// //       {!loading && filtered.length === 0 && (
// //         <p className="text-charcoal/60">No media yet in this category — the admin panel is used to add photos/videos.</p>
// //       )}

// //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //         {filtered.map((img) => (
// //           <div key={img.id} className="rounded-2xl overflow-hidden group relative">
// //             <div className="aspect-[3/4] bg-charcoal/5">
// //               {img.media_type === 'video' ? (
// //                 <video src={img.url} className="w-full h-full object-cover" controls />
// //               ) : (
// //                 <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
// //               )}
// //             </div>
// //             {img.events?.name && (
// //               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3 pointer-events-none">
// //                 <div className="text-cream text-sm font-medium">{img.events.name}</div>
// //                 {img.events.price && (
// //                   <div className="text-gold text-xs">Starting ₹{Number(img.events.price).toLocaleString('en-IN')}</div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }
// import { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async'
// import { supabase } from '../supabaseClient'

// function getYouTubeId(url) {
//   if (!url) return null
//   const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
//   return match ? match[1] : null
// }

// export default function Portfolio() {
//   const [images, setImages] = useState([])
//   const [categories, setCategories] = useState(['All'])
//   const [filter, setFilter] = useState('All')
//   const [loading, setLoading] = useState(true)
//   const [activeVideo, setActiveVideo] = useState(null) // { youTubeId, title } | null

//   useEffect(() => {
//     async function fetchData() {
//       const [imgRes, svcRes] = await Promise.all([
//         supabase.from('gallery_images').select('*').order('uploaded_at', { ascending: false }),
//         supabase.from('service_catalog').select('name').eq('show_in_portfolio', true).order('sort_order'),
//       ])
//       if (!imgRes.error) setImages(imgRes.data || [])
//       if (!svcRes.error) setCategories(['All', ...(svcRes.data || []).map((s) => s.name)])
//       setLoading(false)
//     }
//     fetchData()
//   }, [])

//   // Close modal on Escape
//   useEffect(() => {
//     function onKey(e) { if (e.key === 'Escape') setActiveVideo(null) }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [])

//   const photos = images.filter((img) => img.media_type !== 'video')
//   const videos = images.filter((img) => img.media_type === 'video')

//   const filteredPhotos = filter === 'All' ? photos : photos.filter((img) => img.category === filter)

//   return (
//     <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
//       <Helmet><title>Portfolio | Wedding Tabs Studio</title></Helmet>

//       <h1 className="font-heading text-4xl font-semibold text-charcoal mb-4">Our Portfolio</h1>
//       <p className="text-charcoal/70 mb-8">Explore our finest work across weddings, portraits, events and more.</p>

//       <div className="flex flex-wrap gap-3 mb-10">
//         {categories.map((c) => (
//           <button
//             key={c}
//             onClick={() => setFilter(c)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//               filter === c ? 'bg-gold text-charcoal' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
//             }`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {loading && <p className="text-charcoal/60">Loading gallery...</p>}
//       {!loading && filteredPhotos.length === 0 && (
//         <p className="text-charcoal/60 mb-10">No photos yet in this category.</p>
//       )}

//       {/* Photo grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredPhotos.map((img) => (
//           <div key={img.id} className="rounded-2xl overflow-hidden group relative bg-white shadow-sm">
//             <div className="aspect-[4/5] bg-charcoal/5 relative">
//           <img src={img.url} alt={img.title || img.category} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
//           <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition flex items-end justify-center pb-4 pointer-events-none">
//             <span className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition">
//               {img.title || img.category}
//             </span>
//           </div>
//          </div>
//         </div>
//         ))}
//       </div>

//       {/* Video Portfolio section — only rendered if there are videos */}
//       {videos.length > 0 && (
//         <div className="mt-20 -mx-4 px-4 py-16 bg-charcoal/[0.03] rounded-3xl">
//           <div className="text-center mb-10">
//             <span className="text-gold text-xs font-semibold uppercase tracking-wider">Cinematic Films</span>
//             <h2 className="font-heading text-3xl font-semibold text-charcoal mt-2 mb-2">Video Portfolio</h2>
//             <p className="text-charcoal/60 text-sm max-w-md mx-auto">
//               Watch our cinematic wedding films and highlight reels that capture the emotion and magic of your special day.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {videos.map((vid) => {
//               const youTubeId = vid.is_youtube ? getYouTubeId(vid.url) : null
//               return (
//                 <button
//                   key={vid.id}
//                   onClick={() => youTubeId && setActiveVideo({ youTubeId, title: vid.title || vid.category })}
//                   className="relative rounded-2xl overflow-hidden aspect-video group text-left"
//                 >
//                   <img
//                     src={youTubeId ? `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg` : vid.url}
//                     alt={vid.title || vid.category}
//                     className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/35 transition" />
//                   <span className="absolute inset-0 flex items-center justify-center">
//                     <span className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-charcoal text-xl shadow-lg transition group-hover:scale-110">▶</span>
//                   </span>
//                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
//                     <div className="text-cream font-heading font-semibold">{vid.title || vid.category}</div>
//                     {vid.duration && <div className="text-cream/70 text-xs mt-0.5">{vid.duration}</div>}
//                   </div>
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Video modal — video plays here, never breaks page layout */}
//       {activeVideo && (
//         <div
//           className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
//           onClick={() => setActiveVideo(null)}
//         >
//           <div className="w-full max-w-3xl aspect-video relative" onClick={(e) => e.stopPropagation()}>
//             <iframe
//               className="w-full h-full rounded-xl"
//               src={`https://www.youtube.com/embed/${activeVideo.youTubeId}?autoplay=1`}
//               title={activeVideo.title}
//               allow="autoplay; encrypted-media; fullscreen"
//               allowFullScreen
//             />
//             <button
//               onClick={() => setActiveVideo(null)}
//               className="absolute -top-10 right-0 text-cream text-2xl leading-none"
//               aria-label="Close video"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const [imgRes, svcRes] = await Promise.all([
        supabase.from('gallery_images').select('*').order('sort_order', { ascending: true }),
        supabase.from('service_catalog').select('name').eq('show_in_portfolio', true).order('sort_order'),
      ])
      if (!imgRes.error) setImages(imgRes.data || [])
      if (!svcRes.error) setCategories(['All', ...(svcRes.data || []).map((s) => s.name)])
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setActiveVideo(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const photos = images.filter((img) => img.media_type !== 'video')
  const videos = images.filter((img) => img.media_type === 'video')

  const filteredPhotos = filter === 'All' ? photos : photos.filter((img) => img.category === filter)

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
    <Helmet>
      <title>Portfolio | Wedding Tabs Studio — Professional Photography in Vizag</title>
      <meta name="description" content="View our portfolio of wedding, pre-wedding, portrait, and event photography from shoots across Visakhapatnam and Andhra Pradesh." />
      <link rel="canonical" href="https://weddingtabs.com/portfolio" />
    </Helmet>
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
      {!loading && filteredPhotos.length === 0 && (
        <p className="text-charcoal/60 mb-10">No photos yet in this category.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhotos.map((img) => (
          <div key={img.id} className="rounded-2xl overflow-hidden group relative bg-white shadow-sm">
            <div className="aspect-[4/5] bg-charcoal/5 relative">
                <img src={img.url} alt={img.title || img.category} loading="lazy" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition flex items-end justify-center pb-4 pointer-events-none">
                <span className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  {img.title || img.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="mt-20 -mx-4 px-4 py-16 bg-charcoal/[0.03] rounded-3xl">
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Cinematic Films</span>
            <h2 className="font-heading text-3xl font-semibold text-charcoal mt-2 mb-2">Video Portfolio</h2>
            <p className="text-charcoal/60 text-sm max-w-md mx-auto">
              Watch our cinematic wedding films and highlight reels that capture the emotion and magic of your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videos.map((vid) => {
              const youTubeId = vid.is_youtube ? getYouTubeId(vid.url) : null
              return (
                <button
                  key={vid.id}
                  onClick={() => youTubeId && setActiveVideo({ youTubeId, title: vid.title || vid.category })}
                  className="relative rounded-2xl overflow-hidden aspect-video group text-left"
                >
                  <img
                    src={youTubeId ? `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg` : vid.url}
                    alt={vid.title || vid.category}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/35 transition" />

                  {vid.duration && (
                    <span className="absolute top-3 right-3 bg-charcoal/80 text-cream text-xs font-medium px-2.5 py-1 rounded-full">
                      {vid.duration}
                    </span>
                  )}

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-charcoal text-xl shadow-lg transition group-hover:scale-110">▶</span>
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                    <div className="text-cream font-heading font-semibold">{vid.title || vid.category}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="w-full max-w-3xl aspect-video relative" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo.youTubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-cream text-2xl leading-none"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}