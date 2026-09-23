// // import { Helmet } from 'react-helmet-async'
// // import { Link } from 'react-router-dom'
// // import { Camera, Star, Award, Users, ArrowRight } from 'lucide-react'

// // const stats = [
// //   { icon: Camera, value: '150+', label: 'Weddings Captured' },
// //   { icon: Star, value: '4.9/5', label: 'Client Rating' },
// //   { icon: Award, value: '8+', label: 'Years Experience' },
// //   { icon: Users, value: '500+', label: 'Happy Clients' },
// // ]

// // export default function Home() {
// //   return (
// //     <>
// //       <Helmet>
// //         <title>Wedding Tabs Studio | Premium Photography Services</title>
// //         <meta name="description" content="Premium wedding, pre-wedding, event and portrait photography." />
// //       </Helmet>

// //       <section className="relative min-h-[90vh] flex items-center">
// //         <div className="absolute inset-0 z-0">
// //           <img src="/hero-wedding.jpg" alt="Wedding photography" className="w-full h-full object-cover" />
// //           <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
// //         </div>
// //         <div className="max-w-6xl mx-auto px-4 relative z-10">
// //           <div className="max-w-2xl">
// //             <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
// //               Premium Photography Studio
// //             </span>
// //             <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-tight mb-6">
// //               Capturing Your <span className="text-gold">Wedding Tabs</span>
// //             </h1>
// //             <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
// //               We transform your precious moments into timeless memories with artistry, passion, and an eye for perfection.
// //             </p>
// //             <div className="flex flex-wrap gap-4">
// //               <Link to="/get-quote" className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition">
// //                 Get Your Quote <ArrowRight className="w-5 h-5" />
// //               </Link>
// //               <Link to="/portfolio" className="inline-flex items-center gap-2 border-2 border-cream text-cream font-semibold rounded-xl px-6 py-3 hover:bg-cream hover:text-charcoal transition">
// //                 View Portfolio
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="bg-charcoal py-12">
// //         <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
// //           {stats.map(({ icon: Icon, value, label }) => (
// //             <div key={label} className="text-center">
// //               <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
// //               <div className="font-heading text-3xl font-semibold text-cream mb-1">{value}</div>
// //               <div className="text-cream/60 text-sm">{label}</div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       <section className="py-20 bg-cream text-center">
// //         <div className="max-w-6xl mx-auto px-4">
// //           <h2 className="font-heading text-3xl md:text-4xl font-semibold text-charcoal mb-6">
// //             Ready to Capture Your <span className="text-gold">Wedding Tabs</span>?
// //           </h2>
// //           <p className="text-charcoal/70 max-w-2xl mx-auto mb-8">
// //             Get a personalized quote for your photography needs.
// //           </p>
// //           <Link to="/get-quote" className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition">
// //             Get Your Free Quote <ArrowRight className="w-5 h-5" />
// //           </Link>
// //         </div>
// //       </section>
// //     </>
// //   )
// // }

// import { Link } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { Camera, Star, Award, Users, ArrowRight, Heart } from 'lucide-react'

// import heroWedding from '../assets/hero-wedding.jpg'
// import portfolioPrewedding from '../assets/portfolio-prewedding.jpg'
// import portfolioPortrait from '../assets/portfolio-portrait.jpg'
// import portfolioEvent from '../assets/portfolio-event.jpg'
// import portfolioProduct from '../assets/portfolio-product.jpg'
// import portfolioFood from '../assets/portfolio-food.jpg'

// const STATS = [
//   { icon: Camera, value: '150+', label: 'Weddings Captured' },
//   { icon: Star, value: '4.9/5', label: 'Client Rating' },
//   { icon: Award, value: '8+', label: 'Years Experience' },
//   { icon: Users, value: '500+', label: 'Happy Clients' },
// ]

// const FEATURED_PORTFOLIO = [
//   { image: portfolioPrewedding, category: 'Weddings' },
//   { image: portfolioPortrait, category: 'Portraits' },
//   { image: portfolioEvent, category: 'Events' },
//   { image: portfolioProduct, category: 'Products' },
//   { image: portfolioFood, category: 'Food' },
// ]

// export default function Home() {
//   return (
//     <div>
//       <Helmet><title>Wedding Tabs Studio | Premium Photography</title></Helmet>

//       {/* Hero */}
//       <div className="relative h-[85vh] min-h-[1000px] max-h-[1400px] flex items-end overflow-hidden">
//         <img
//           src={heroWedding}
//           alt="Wedding photography"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />

//         <div className="relative max-w-6xl mx-auto px-4 pb-20 w-full">
//           <span className="text-gold text-xs font-semibold uppercase tracking-wider">Premium Photography Studio</span>
//           <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-cream mt-3 mb-4 leading-tight">
//             Capturing Your <br />
//             <span className="text-gold">Wedding Tabs</span>
//           </h1>
//           <p className="text-cream/80 max-w-md mb-8">
//             We transform your precious moments into timeless memories with artistry, passion, and an eye for perfection.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Link to="/get-quote"
//               className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
//               Get Your Quote <ArrowRight className="w-4 h-4" />
//             </Link>
//             <Link to="/portfolio"
//               className="inline-flex items-center gap-2 border-2 border-cream/80 text-cream font-semibold rounded-lg px-6 py-3 hover:bg-cream hover:text-charcoal transition">
//               View Portfolio
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Stats bar */}
//       <div className="bg-charcoal py-10">
//         <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
//           {STATS.map((s) => {
//             const Icon = s.icon
//             return (
//               <div key={s.label}>
//                 <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
//                 <div className="font-heading text-2xl font-semibold text-cream">{s.value}</div>
//                 <div className="text-xs text-cream/60">{s.label}</div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* About Us */}
//       <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <span className="text-gold text-xs font-semibold uppercase tracking-wider">About Us</span>
//           <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-5 leading-tight">
//             Where Moments Become <span className="text-gold">Art</span>
//           </h2>
//           <p className="text-charcoal/70 mb-4 leading-relaxed">
//             At Wedding Tabs Studio, we believe every moment tells a story worth preserving. With over 8 years of
//             experience and 150+ weddings captured, we bring together technical excellence and artistic vision to
//             create photographs that speak to your heart.
//           </p>
//           <p className="text-charcoal/70 mb-8 leading-relaxed">
//             Our team of passionate photographers and videographers are dedicated to capturing the essence of your
//             special moments — the laughter, the tears, the love — all in stunning detail.
//           </p>
//           <Link to="/about"
//             className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold rounded-lg px-6 py-3 hover:bg-gold hover:text-charcoal transition">
//             Learn More About Us <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>

//         <div className="relative grid grid-cols-2 gap-4">
//           <img src={portfolioPrewedding} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover" />
//           <img src={portfolioPortrait} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover mt-8" />
//           <img src={portfolioEvent} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover -mt-8" />
//           <img src={portfolioFood} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover" />
//           <div className="absolute bottom-0 left-0 bg-gold text-charcoal rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 -mb-6 -ml-4">
//             <Heart className="w-5 h-5" />
//             <div>
//               <div className="font-heading font-semibold leading-none">500+</div>
//               <div className="text-[10px] leading-none mt-1">Happy Couples</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured Portfolio */}
//       <div className="bg-cream/50 py-24">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <span className="text-gold text-xs font-semibold uppercase tracking-wider">Our Work</span>
//             <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">Featured Portfolio</h2>
//             <p className="text-charcoal/60 max-w-lg mx-auto">
//               Explore some of our finest work across weddings, portraits, events, and commercial photography.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
//             {FEATURED_PORTFOLIO.map((item, i) => (
//               <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
//                 <img src={item.image} alt={item.category}
//                   className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
//                 <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
//                   <span className="text-cream text-xs font-medium">{item.category}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <Link to="/portfolio"
//               className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
//               View Full Portfolio <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* CTA banner */}
//       <div className="bg-charcoal py-20 text-center px-4">
//         <h2 className="font-heading text-4xl font-semibold text-cream mb-4">
//           Ready to Capture Your <span className="text-gold">Wedding Tabs</span>?
//         </h2>
//         <p className="text-cream/70 max-w-xl mx-auto mb-8">
//           Get a personalized quote for your photography needs. Our transparent pricing and custom packages ensure
//           you get exactly what you need.
//         </p>
//         <Link to="/get-quote"
//           className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-8 py-4 hover:opacity-90 transition">
//           Get Your Free Quote <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>
//     </div>
//   )
// }


import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Camera, Star, Award, Users, ArrowRight, Heart } from 'lucide-react'

import heroWedding from '../assets/hero-wedding.jpg'
import portfolioPrewedding from '../assets/portfolio-prewedding.jpg'
import portfolioPortrait from '../assets/portfolio-portrait.jpg'
import portfolioEvent from '../assets/portfolio-event.jpg'
import portfolioProduct from '../assets/portfolio-product.jpg'
import portfolioFood from '../assets/portfolio-food.jpg'

const STATS = [
  { icon: Camera, value: '150+', label: 'Weddings Captured' },
  { icon: Star, value: '4.9/5', label: 'Client Rating' },
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: Users, value: '500+', label: 'Happy Clients' },
]

const FEATURED_PORTFOLIO = [
  { image: portfolioPrewedding, category: 'Weddings' },
  { image: portfolioPortrait, category: 'Portraits' },
  { image: portfolioEvent, category: 'Events' },
  { image: portfolioProduct, category: 'Products' },
  { image: portfolioFood, category: 'Food' },
]

export default function Home() {
  return (
    <div>

      <Helmet>
        <title>Wedding Tabs Studio | Professional Wedding Photography in Visakhapatnam</title>
        <meta name="description" content="Professional wedding photography in Visakhapatnam for every budget. 8+ years experience, 500+ happy clients." />        <link rel="canonical" href="https://weddingtabs.com/" />
      </Helmet>
    

      {/* Hero */}
      <div className="relative h-[75vh] min-h-[520px] sm:min-h-[600px] md:min-h-[700px] max-h-[900px] flex items-end overflow-hidden">
        <img
          src={heroWedding}
          alt="Wedding photography"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />

        <div className="relative max-w-6xl mx-auto px-4 pb-16 sm:pb-20 w-full">
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">Premium Photography Studio</span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-3 mb-4 leading-tight">
            Capturing Your <br />
            <span className="text-gold">Wedding Tabs</span>
          </h1>
          <p className="text-cream/80 max-w-md mb-8">
            We transform your precious moments into timeless memories with artistry, passion, and an eye for perfection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/get-quote"
              className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
              Get Your Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio"
              className="inline-flex items-center gap-2 border-2 border-cream/80 text-cream font-semibold rounded-lg px-6 py-3 hover:bg-cream hover:text-charcoal transition">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-charcoal py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
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

      {/* About Us */}
      <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">About Us</span>
          <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-5 leading-tight">
            Where Moments Become <span className="text-gold">Art</span>
          </h2>
          <p className="text-charcoal/70 mb-4 leading-relaxed">
            At Wedding Tabs Studio, we believe every moment tells a story worth preserving. With over 8 years of
            experience and 150+ weddings captured, we bring together technical excellence and artistic vision to
            create photographs that speak to your heart.
          </p>
          <p className="text-charcoal/70 mb-8 leading-relaxed">
            Our team of passionate photographers and videographers are dedicated to capturing the essence of your
            special moments — the laughter, the tears, the love — all in stunning detail.
          </p>
          <Link to="/about"
            className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold rounded-lg px-6 py-3 hover:bg-gold hover:text-charcoal transition">
            Learn More About Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          <img src={portfolioPrewedding} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover" />
          <img src={portfolioPortrait} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover mt-8" />
          <img src={portfolioEvent} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover -mt-8" />
          <img src={portfolioFood} alt="" className="rounded-2xl w-full aspect-[4/5] object-cover" />
          <div className="absolute bottom-0 left-0 bg-gold text-charcoal rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 -mb-6 -ml-4">
            <Heart className="w-5 h-5" />
            <div>
              <div className="font-heading font-semibold leading-none">500+</div>
              <div className="text-[10px] leading-none mt-1">Happy Couples</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Portfolio */}
      <div className="bg-cream/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Our Work</span>
            <h2 className="font-heading text-4xl font-semibold text-charcoal mt-3 mb-3">Featured Portfolio</h2>
            <p className="text-charcoal/60 max-w-lg mx-auto">
              Explore some of our finest work across weddings, portraits, events, and commercial photography.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
            {FEATURED_PORTFOLIO.map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                <img src={item.image} alt={item.category}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                  <span className="text-cream text-xs font-medium">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portfolio"
              className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
              View Full Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-charcoal py-20 text-center px-4">
        <h2 className="font-heading text-4xl font-semibold text-cream mb-4">
          Ready to Capture Your <span className="text-gold">Wedding Tabs</span>?
        </h2>
        <p className="text-cream/70 max-w-xl mx-auto mb-8">
          Get a personalized quote for your photography needs. Our transparent pricing and custom packages ensure
          you get exactly what you need.
        </p>
        <Link to="/get-quote"
          className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-8 py-4 hover:opacity-90 transition">
          Get Your Free Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}