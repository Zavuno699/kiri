import { useState } from "react"
import { useNavigate } from "react-router"
import { authenticate } from "../../application/authentication/commands/authenticate"
import { ApiClientError } from "../../api/client"

interface SignInFormData {
  email: string
  password: string
}

export function SignInPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await authenticate({
        email: formData.email,
        password: formData.password,
      })

      // Navigate to role-specific landing page based on backend roles
      if (response.is_super_admin) {
        navigate("/") // Super admin gets full command center
      } else if (response.is_admin) {
        navigate("/") // Admin gets command center
      } else if (response.roles.includes("landlord")) {
        navigate("/") // Landlord gets property-focused dashboard
      } else if (response.roles.includes("tenant")) {
        navigate("/") // Tenant gets simplified experience
      } else {
        navigate("/") // Default to dashboard
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 401) {
          setError("Authentication failed. Please check your credentials.")
        } else {
          setError("An error occurred. Please try again.")
        }
      } else {
        setError("Authentication failed. Please check your credentials.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-kiri-blue-600 text-2xl font-black shadow-[0_0_40px_rgba(47,107,255,0.35)]">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-kiri-text">
            KiriLock
          </h1>
          <p className="mt-2 text-sm text-kiri-text-muted">
            Sign in to access your control center
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-kiri-text-soft">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-kiri-text-soft">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 pr-12 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-kiri-text-muted hover:text-kiri-text-soft transition"
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-kiri-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-kiri-text-muted">
          <p>
            Contact your administrator if you need access to KiriLock.
          </p>
        </div>
      </div>
    </div>
  )
}
