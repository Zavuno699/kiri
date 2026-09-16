import { useState } from "react"
import { useNavigate } from "react-router"
import { FieldLabel } from "../../components/forms/FieldLabel"
import { SecondaryButton } from "../../components/ui/operator/SecondaryButton"

interface ForgotPasswordFormData {
  email: string
}

// BACKEND CONTRACT GAP: No password-reset endpoint exists in the backend.
// This frontend component is ready to integrate with a password-reset API.
// Required backend endpoint: POST /forgot-password (public, unauthenticated)
// Expected request: { email: string }
// Expected response: Success message (avoiding account enumeration)

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Integrate with backend password-reset endpoint
      // await apiFetch("/forgot-password", {
      //   method: "POST",
      //   body: JSON.stringify({ email: formData.email }),
      // })
      
      // Placeholder: simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
    } catch (err) {
      console.error("Failed to send reset link:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-green-500/20 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-kiri-text mb-2">
              Check your email
            </h2>
            <p className="text-sm text-kiri-text-muted mb-6">
              If an account exists for {formData.email}, you will receive password reset instructions.
            </p>
            <SecondaryButton
              type="button"
              onClick={() => navigate("/signin")}
              className="w-full"
            >
              Back to Sign In
            </SecondaryButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-kiri-blue-600 text-2xl font-black shadow-[0_0_40px_rgba(47,107,255,0.35)]">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-kiri-text">
            KIRILOCK
          </h1>
          <p className="mt-2 text-sm text-kiri-text-muted">
            Secure Property & Access Management
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-kiri-text">
              Forgot your password?
            </h2>
            <p className="mt-1 text-sm text-kiri-text-muted">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldLabel label="Email address">
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
            </FieldLabel>

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
              {isLoading ? "Sending..." : "SEND RESET INSTRUCTIONS"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-xs font-medium text-kiri-text-muted hover:text-kiri-text-soft transition"
              disabled={isLoading}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
