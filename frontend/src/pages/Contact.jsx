// import { useState } from 'react'
// import { Helmet } from 'react-helmet-async'
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   MessageCircle,
//   Send,
//   Instagram,
//   Facebook,
//   Youtube,
// } from 'lucide-react'

// const STUDIO_WHATSAPP = '918008198502'

// const INFO_CARDS = [
//   {
//     icon: Phone,
//     title: 'Phone / WhatsApp',
//     lines: ['+91 80081 98502', 'Mon–Sat, 10am–7pm'],
//   },
//   {
//     icon: Mail,
//     title: 'Email',
//     lines: ['Weddingtabsphotography@gmail.com', 'We reply within 24 hours'],
//   },
//   {
//     icon: MapPin,
//     title: 'Studio Address',
//     lines: ['Sector 4, MVP Colony', 'Visakhapatnam, AndhraPradesh 530017'],
//   },
//   {
//     icon: Clock,
//     title: 'Working Hours',
//     lines: ['Mon – Sat: 10am – 7pm', 'Sunday by appointment only'],
//   },
// ]

// const SOCIALS = [
//   {
//     icon: Instagram,
//     label: 'Instagram',
//     url: 'https://instagram.com',
//   },
//   {
//     icon: Facebook,
//     label: 'Facebook',
//     url: 'https://facebook.com',
//   },
//   {
//     icon: Youtube,
//     label: 'YouTube',
//     url: 'https://youtube.com',
//   },
// ]

// export default function Contact() {
//   const [name, setName] = useState('')
//   const [phone, setPhone] = useState('')
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const [sending, setSending] = useState(false)

//   function handleSubmit(e) {
//     e.preventDefault()
//     setSending(true)

//     const text = `Hi! I'd like to get in touch.

// *Name:* ${name}
// *Phone:* ${phone}
// *Email:* ${email || '-'}

// *Message:*
// ${message}`

//     window.open(
//       `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(text)}`,
//       '_blank'
//     )

//     setSending(false)
//   }

//   return (
//     <div>
//       <Helmet>
//         <title>Contact Us | Wedding Tabs Studio</title>
//       </Helmet>

//       <div className="pt-32 pb-16 text-center max-w-2xl mx-auto px-4">
//         <span className="text-gold text-xs font-semibold uppercase tracking-wider">
//           Get In Touch
//         </span>

//         <h1 className="font-heading text-5xl font-semibold text-charcoal mt-3 mb-4">
//           Contact Us
//         </h1>

//         <p className="text-charcoal/60">
//           Have questions or ready to book? We'd love to hear from you. Reach out
//           and let's start planning your dream shoot.
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 pb-24">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
//           {INFO_CARDS.map((card) => {
//             const Icon = card.icon

//             return (
//               <div
//                 key={card.title}
//                 className="bg-white rounded-2xl border border-charcoal/10 p-6"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
//                   <Icon className="w-5 h-5 text-gold" />
//                 </div>

//                 <h3 className="font-heading text-base font-semibold text-charcoal mb-2">
//                   {card.title}
//                 </h3>

//                 {card.lines.map((line, i) => (
//                   <p
//                     key={i}
//                     className={`text-sm ${
//                       i === 0 ? 'text-charcoal/80' : 'text-charcoal/50'
//                     } leading-snug`}
//                   >
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             )
//           })}
//         </div>

//         <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
//           <div>
//             <h2 className="font-heading text-2xl font-semibold text-charcoal mb-1">
//               Send Us a Message
//             </h2>

//             <p className="text-sm text-charcoal/60 mb-6">
//               Fill out the form below and we'll get back to you within 24 hours.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-charcoal mb-1 block">
//                     Your Name *
//                   </label>

//                   <input
//                     required
//                     placeholder="John Doe"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-charcoal mb-1 block">
//                     Phone / WhatsApp *
//                   </label>

//                   <input
//                     required
//                     placeholder="+91 98765 43210"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-charcoal mb-1 block">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="john@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-charcoal mb-1 block">
//                   Your Message *
//                 </label>

//                 <textarea
//                   required
//                   rows={5}
//                   placeholder="Tell us about your photography needs..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="w-full border border-charcoal/20 rounded-lg px-4 py-3 resize-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={sending}
//                 className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition disabled:opacity-50"
//               >
//                 {sending ? 'Sending...' : 'Send Message'}
//                 <Send className="w-4 h-4" />
//               </button>
//             </form>
//           </div>

//           <div className="space-y-5">
//             <div className="bg-gold rounded-2xl p-6">
//               <div className="w-11 h-11 rounded-xl bg-charcoal/10 flex items-center justify-center mb-4">
//                 <MessageCircle className="w-5 h-5 text-charcoal" />
//               </div>

//               <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
//                 Book Your Dates Now
//               </h3>

//               <p className="text-sm text-charcoal/80 mb-5 leading-relaxed">
//                 Get instant responses on WhatsApp. Check availability and book
//                 your preferred dates quickly.
//               </p>

//               <a
//                 href={`https://wa.me/${STUDIO_WHATSAPP}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-white text-charcoal font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-cream transition"
//               >
//                 Chat on WhatsApp
//               </a>
//             </div>

//             <div className="rounded-2xl overflow-hidden border border-charcoal/10 h-56">
//               <iframe
//                 title="Studio location"
//                 className="w-full h-full"
//                 loading="lazy"
//                 src="https://www.google.com/maps?q=Andheri+West+Mumbai&output=embed"
//               />
//             </div>

//             <div className="bg-white rounded-2xl border border-charcoal/10 p-6">
//               <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
//                 Follow Us
//               </h3>

//               <div className="flex flex-wrap gap-3">
//                 {SOCIALS.map((s) => {
//                   const Icon = s.icon

//                   return (
//                     <a
//                       key={s.label}
//                       href={s.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 bg-charcoal/5 hover:bg-charcoal/10 rounded-full px-4 py-2 text-sm font-medium text-charcoal transition"
//                     >
//                       <Icon className="w-4 h-4" />
//                       {s.label}
//                     </a>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Youtube,
} from 'lucide-react'

const STUDIO_WHATSAPP = '918008198502'

const INFO_CARDS = [
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    lines: ['+91 80081 98502', 'We respond anytime'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['Weddingtabsphotography@gmail.com', 'We reply within 24 hours'],
  },
  {
    icon: MapPin,
    title: 'Studio Address',
    lines: ['Sector 4, MVP Colony', 'Visakhapatnam, Andhra Pradesh 530017'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Flexible hours', "We'll respond anytime"],
  },
]

const SOCIALS = [
  {
    icon: Instagram,
    label: 'Instagram',
    url: 'https://www.instagram.com/weddingtabs_photography?stkn=amd3Nm11dXRqZWYz',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    url: 'https://youtube.com/@weddingtabsphotography?si=Pb8v2ZGIB5tJ2aqa',
  },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)

    const text = `Hi! I'd like to get in touch.

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || '-'}

*Message:*
${message}`

    window.open(
      `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(text)}`,
      '_blank'
    )

    setSending(false)
  }

  return (
    <div>
      <Helmet>
        <title>Contact Us | Wedding Tabs Studio</title>
      </Helmet>

      <div className="pt-32 pb-16 text-center max-w-2xl mx-auto px-4">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">
          Get In Touch
        </span>

        <h1 className="font-heading text-5xl font-semibold text-charcoal mt-3 mb-4">
          Contact Us
        </h1>

        <p className="text-charcoal/60">
          Have questions or ready to book? We'd love to hear from you. Reach out
          and let's start planning your dream shoot.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {INFO_CARDS.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-charcoal/10 p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>

                <h3 className="font-heading text-base font-semibold text-charcoal mb-2">
                  {card.title}
                </h3>

                {card.lines.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm ${
                      i === 0 ? 'text-charcoal/80' : 'text-charcoal/50'
                    } leading-snug`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-1">
              Send Us a Message
            </h2>

            <p className="text-sm text-charcoal/60 mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Your Name *
                  </label>

                  <input
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Phone / WhatsApp *
                  </label>

                  <input
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Your Message *
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your photography needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-charcoal/20 rounded-lg px-4 py-3 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="bg-gold rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-charcoal/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-charcoal" />
              </div>

              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Book Your Dates Now
              </h3>

              <p className="text-sm text-charcoal/80 mb-5 leading-relaxed">
                Get instant responses on WhatsApp. Check availability and book
                your preferred dates quickly.
              </p>

              <a
                href={`https://wa.me/${STUDIO_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-charcoal font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-cream transition"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-charcoal/10 p-6">
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
                Follow Us
              </h3>

              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => {
                  const Icon = s.icon

                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-charcoal/5 hover:bg-charcoal/10 rounded-full px-4 py-2 text-sm font-medium text-charcoal transition"
                    >
                      <Icon className="w-4 h-4" />
                      {s.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}