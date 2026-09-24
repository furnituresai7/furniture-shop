import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import TextField from '../../components/common/TextField'
import siteConfig from '../../config/siteConfig'

export default function AdminLogin() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Already logged in: skip straight to the dashboard
  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      const redirectTo = location.state?.from?.pathname || '/admin'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand/60 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-sand-dark bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wood text-cream">
            <Lock size={22} aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">{siteConfig.name}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <TextField
            id="admin-email"
            name="email"
            type="email"
            label="Email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="admin-password"
            name="password"
            type="password"
            label="Password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>
    </main>
  )
}