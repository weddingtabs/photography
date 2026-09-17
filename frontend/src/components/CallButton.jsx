import { Phone } from 'lucide-react'

const PHONE_NUMBER = '+918008198502'

export default function CallButton() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      aria-label="Call us"
      className="lg:hidden fixed bottom-66 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
    >
      <Phone className="w-6 h-6" />
    </a>
  )
}