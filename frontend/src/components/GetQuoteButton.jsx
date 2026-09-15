import { NavLink } from 'react-router-dom'
import { MessageCircleQuestion } from 'lucide-react'

export default function GetQuoteButton() {
  return (
    <>
      <style>{`
        @keyframes quote-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          65% { transform: translateY(-10px); }
          72% { transform: translateY(6px); }
          78% { transform: translateY(-4px); }
          84% { transform: translateY(2px); }
          90% { transform: translateY(0); }
        }
        .quote-btn {
          animation: quote-bounce 4s ease-in-out infinite;
        }
        .quote-btn:hover {
          animation-play-state: paused;
        }
      `}</style>

      <NavLink
        to="/get-quote"
        aria-label="Get a Quote"
        className="quote-btn fixed bottom-24 lg:bottom-24 right-6 z-40 flex items-center gap-2 bg-gold text-charcoal rounded-full pl-4 pr-4 py-3 lg:pl-5 lg:pr-5 shadow-lg hover:scale-105 hover:brightness-95 transition-transform duration-200"
      >
        <MessageCircleQuestion className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-semibold whitespace-nowrap">Get Quote</span>
      </NavLink>
    </>
  )
}