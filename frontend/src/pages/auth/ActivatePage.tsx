import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { FieldLabel } from "../../components/forms/FieldLabel"
import { apiFetch } from "../../api/client"

interface ActivateFormData {
  token: string
  password: string
  confirmPassword: string
}

interface InvitationPreview {
  property_name: string
  property_type: string
  unit_number: string
  lease_start_date: string
  lease_end_date: string
  expires_at: string
}

export function ActivatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenParam = searchParams.get("token") || ""
  
  const [formData, setFormData] = useState<ActivateFormData>({
    token: tokenParam,
    password: "",
    confirmPassword: "",
  })
  const [step, setStep] = useState<"verify" | "create-password" | "success">("verify")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invitationDetails, setInvitationDetails] = useState<any>(null)

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const preview = await apiFetch<InvitationPreview>("/tenancies/invitation/preview", {
        method: "POST",
        body: JSON.stringify({ token: formData.token }),
      })
      
      setInvitationDetails(preview)
      setStep("create-password")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Invalid or expired invitation token. Please contact your landlord.")
      } else {
        setError("Invalid or expired invitation token. Please contact your landlord.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await apiFetch("/tenancies/activate", {
        method: "POST",
        body: JSON.stringify({ 
          token: formData.token,
          password: formData.password 
        }),
      })
      
      setStep("success")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to activate account. Please try again or contact support.")
      } else {
        setError("Failed to activate account. Please try again or contact support.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-green-500/20 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-kiri-text mb-2">
              Account Activated
            </h2>
            <p className="text-sm text-kiri-text-muted mb-6">
              Your account has been successfully activated. You can now sign in to access your property.
            </p>
            
            {invitationDetails && (
              <div className="mb-6 rounded-lg border border-white/8 bg-white/[0.02] p-4 text-left">
                <h3 className="text-sm font-semibold text-kiri-text mb-3">Your Property Details</h3>
                <div className="space-y-2 text-xs text-kiri-text-muted">
                  <p><span className="font-medium text-kiri-text-soft">Property:</span> {invitationDetails.property_name}</p>
                  <p><span className="font-medium text-kiri-text-soft">Type:</span> {invitationDetails.property_type}</p>
                  <p><span className="font-medium text-kiri-text-soft">Unit:</span> {invitationDetails.unit_number}</p>
                  <p><span className="font-medium text-kiri-text-soft">Lease Start:</span> {invitationDetails.lease_start_date}</p>
                  {invitationDetails.lease_end_date && (
                    <p><span className="font-medium text-kiri-text-soft">Lease End:</span> {invitationDetails.lease_end_date}</p>
                  )}
                </div>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => navigate("/signin")}
              disabled={isLoading}
              className="w-full rounded-xl bg-kiri-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              GO TO SIGN IN
            </button>
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
          {step === "verify" ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-kiri-text">
                  Activate Your Account
                </h2>
                <p className="mt-1 text-sm text-kiri-text-muted">
                  Enter your invitation token to verify your identity and activate your account.
                </p>
              </div>

              <form onSubmit={handleVerifyToken} className="space-y-6">
                <FieldLabel label="Invitation Token">
                  <input
                    id="token"
                    type="text"
                    required
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    placeholder="Enter your invitation token"
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
                  {isLoading ? "Verifying..." : "VERIFY TOKEN"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-kiri-text">
                  Create Your Password
                </h2>
                <p className="mt-1 text-sm text-kiri-text-muted">
                  Choose a secure password to activate your account.
                </p>
              </div>

              {invitationDetails && (
                <div className="mb-6 rounded-lg border border-white/8 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold text-kiri-text mb-3">Invitation Details</h3>
                  <div className="space-y-2 text-xs text-kiri-text-muted">
                    <p><span className="font-medium text-kiri-text-soft">Property:</span> {invitationDetails.property_name}</p>
                    <p><span className="font-medium text-kiri-text-soft">Type:</span> {invitationDetails.property_type}</p>
                    <p><span className="font-medium text-kiri-text-soft">Unit:</span> {invitationDetails.unit_number}</p>
                    <p><span className="font-medium text-kiri-text-soft">Lease Start:</span> {invitationDetails.lease_start_date}</p>
                    {invitationDetails.lease_end_date && (
                      <p><span className="font-medium text-kiri-text-soft">Lease End:</span> {invitationDetails.lease_end_date}</p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleCreatePassword} className="space-y-6">
                <FieldLabel label="Password">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </FieldLabel>

                <FieldLabel label="Confirm Password">
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    placeholder="••••••••"
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
                  {isLoading ? "Activating..." : "ACTIVATE ACCOUNT"}
                </button>
              </form>
            </>
          )}

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
