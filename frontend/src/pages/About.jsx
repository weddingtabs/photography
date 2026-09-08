import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <Helmet><title>About Us | Wedding Tabs Studio</title></Helmet>
      <h1 className="font-heading text-4xl font-semibold text-charcoal mb-6">
        Where Moments Become <span className="text-gold">Art</span>
      </h1>
      <p className="text-charcoal/70 leading-relaxed mb-6">
        At Wedding Tabs Studio, we believe every moment tells a story worth preserving. With over 8 years of
        experience and 150+ weddings captured, we bring together technical excellence and artistic vision to
        create photographs that speak to your hearts.
      </p>
      <p className="text-charcoal/70 leading-relaxed">
        Our team of passionate photographers and videographers are dedicated to capturing the essence of your
        special moments — the laughter, the tears, the love — all in stunning detail.
      </p>
    </div>
  )
}
