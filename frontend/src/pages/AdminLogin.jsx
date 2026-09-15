// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { supabase } from '../supabaseClient'

// export default function AdminLogin() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   async function handleLogin(e) {
//     e.preventDefault()
//     setError('')
//     const { error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) {
//       setError('Invalid email or password.')
//       return
//     }
//     navigate('/admin/dashboard')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
//       <form onSubmit={handleLogin} className="bg-cream rounded-2xl p-8 w-full max-w-sm space-y-4">
//         <h1 className="font-heading text-2xl font-semibold text-charcoal mb-2">Admin Login</h1>
//         <input required type="email" placeholder="Email" className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
//           value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input required type="password" placeholder="Password" className="w-full border border-charcoal/20 rounded-lg px-4 py-3"
//           value={password} onChange={(e) => setPassword(e.target.value)} />
//         {error && <p className="text-red-600 text-sm">{error}</p>}
//         <button type="submit" className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition">
//           Log In
//         </button>
//       </form>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [mode, setMode] = useState('login') // 'login' | 'forgot' | 'reset'
  const [resetSent, setResetSent] = useState(false)
  const [resetError, setResetError] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const navigate = useNavigate()

  // Detect a password-recovery redirect from Supabase (arrives via #access_token=...&type=recovery)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('reset')
      }
    })

    // Also check immediately in case the event already fired before this component mounted
    const hash = window.location.hash
    if (hash.includes('type=recovery')) {
      setMode('reset')
    }

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Invalid email or password.')
      return
    }
    navigate('/admin/dashboard')
  }

  async function handleForgotPassword(e) {
    e.preventDefault()
    setResetError('')
    setResetLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    })
    setResetLoading(false)
    if (error) {
      setResetError('Could not send reset email. Please check the address and try again.')
      return
    }
    setResetSent(true)
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()
    setUpdateError('')

    if (newPassword.length < 6) {
      setUpdateError('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setUpdateError('Passwords do not match.')
      return
    }

    setUpdateLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setUpdateLoading(false)

    if (error) {
      setUpdateError('Could not update password. The reset link may have expired — request a new one.')
      return
    }

    setUpdateSuccess(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.jpeg" alt="Wedding Tabs Logo" className="w-14 h-14 rounded-full object-cover mx-auto mb-3" />
          <h1 className="font-heading text-2xl font-semibold text-cream">Wedding Tabs Studio</h1>
          <p className="text-cream/50 text-sm mt-1">Admin Portal</p>
        </div>

        <div className="bg-cream rounded-2xl shadow-2xl p-8">
          {mode === 'reset' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-1">Set New Password</h2>
                <p className="text-xs text-charcoal/50 mb-4">
                  Choose a new password for your admin account.
                </p>
              </div>

              {updateSuccess ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-3">
                    <p className="text-green-700 text-sm font-medium">Password updated!</p>
                    <p className="text-green-700/80 text-xs mt-1">You can now log in with your new password.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = ''
                      setMode('login')
                      setUpdateSuccess(false)
                    }}
                    className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition"
                  >
                    Go to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 mb-1 block">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full border border-charcoal/20 rounded-lg pl-9 pr-10 py-3 text-sm focus:border-gold outline-none transition"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal/70"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-charcoal/70 mb-1 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3 text-sm focus:border-gold outline-none transition"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {updateError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      <p className="text-red-600 text-xs">{updateError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition disabled:opacity-50"
                  >
                    {updateLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              )}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-1">Sign In</h2>
                <p className="text-xs text-charcoal/50 mb-4">Enter your credentials to access the dashboard.</p>
              </div>

              <div>
                <label className="text-xs font-medium text-charcoal/70 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3 text-sm focus:border-gold outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-charcoal/70">Password</label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); setResetSent(false); setResetError('') }}
                    className="text-xs text-gold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full border border-charcoal/20 rounded-lg pl-9 pr-10 py-3 text-sm focus:border-gold outline-none transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal/70"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Log In'}
              </button>
            </form>
          )}

          {mode === 'forgot' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-1">Reset Password</h2>
                <p className="text-xs text-charcoal/50 mb-4">
                  Enter your account email and we'll send you a link to reset your password.
                </p>
              </div>

              {resetSent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-3">
                  <p className="text-green-700 text-sm font-medium">Reset link sent!</p>
                  <p className="text-green-700/80 text-xs mt-1">
                    Check <strong>{email}</strong> for instructions to reset your password.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-charcoal/70 mb-1 block">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-charcoal/20 rounded-lg pl-9 pr-3 py-3 text-sm focus:border-gold outline-none transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {resetError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      <p className="text-red-600 text-xs">{resetError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full bg-gold text-charcoal font-semibold rounded-lg px-4 py-3 hover:opacity-90 transition disabled:opacity-50"
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => { setMode('login'); setResetSent(false); setResetError('') }}
                className="w-full text-sm text-charcoal/60 hover:text-charcoal transition"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-cream/40 text-xs mt-6">
          © {new Date().getFullYear()} Wedding Tabs Studio. Admin access only.
        </p>
      </div>
    </div>
  )
}