import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Invalid email or password.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <form onSubmit={handleLogin} className="bg-cream rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="font-heading text-2xl font-semibold text-charcoal mb-2">Admin Login</h1>
        <input required type="email" placeholder="Email" className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition">
          Log In
        </button>
      </form>
    </div>
  )
}
