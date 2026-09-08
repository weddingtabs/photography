import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const API_URL = import.meta.env.VITE_API_URL

const statusColor = {
  Pending: 'text-yellow-600 bg-yellow-50',
  Confirmed: 'text-green-600 bg-green-50',
  Cancelled: 'text-red-600 bg-red-50',
  Completed: 'text-blue-600 bg-blue-50',
}

export default function TrackBooking() {
  const [phone, setPhone] = useState('')
  const [bookings, setBookings] = useState(null)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API_URL}/bookings/by-phone/${phone}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setBookings(data)
    } catch {
      setError('Could not find bookings for this number.')
      setBookings(null)
    }
  }

  return (
    <div className="pt-32 pb-20 max-w-xl mx-auto px-4">
      <Helmet><title>Track Your Booking | Wedding Tabs Studio</title></Helmet>

      <h1 className="font-heading text-4xl font-semibold text-charcoal mb-2">Track Your Booking</h1>
      <p className="text-charcoal/70 mb-8">Enter your phone number to check your booking status.</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input required placeholder="Phone Number" className="flex-1 border border-charcoal/20 rounded-lg px-4 py-3"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit" className="bg-gold text-charcoal font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition">
          Search
        </button>
      </form>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {bookings && bookings.map((b) => (
        <div key={b.id} className="border border-charcoal/10 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-heading font-semibold text-charcoal">{b.shoot_type}</span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[b.status] || 'bg-charcoal/5'}`}>
              {b.status}
            </span>
          </div>
          <div className="text-sm text-charcoal/60">Event date: {b.event_date}</div>
        </div>
      ))}
    </div>
  )
}
