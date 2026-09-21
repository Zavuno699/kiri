import { useState, useEffect } from "react"
import { getAuthenticationState } from "../../application/authentication/state/authenticationStore"
import { useMounted } from "../../hooks/useMounted"
import { apiFetch } from "../../api/client"

interface Tenancy {
  id: string
  tenant_subject_id: string
  unit_id: string
  status: string
  lease_start_date: string
  lease_end_date?: string
  invitation_accepted_at?: string
  terminated_at?: string
  termination_reason?: string
  created_at: string
  updated_at: string
}

interface Unit {
  id: string
  property_id: string
  unit_number: string
  unit_type: string
  lifecycle: string
}

interface Property {
  id: string
  property_name: string
  property_type: string
  address_line1: string
  city: string
  state: string
}

export function TenantPage() {
  const mounted = useMounted()
  const authState = getAuthenticationState()
  const [tenancy, setTenancy] = useState<Tenancy | null>(null)
  const [unit, setUnit] = useState<Unit | null>(null)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTenantData = async () => {
    if (!authState.authenticated) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const tenancyData = await apiFetch<Tenancy>("/tenancies/tenant", undefined, { useIdentityService: true })
      setTenancy(tenancyData)

      // Load unit details
      const unitData = await apiFetch<Unit>(`/units/unit?unit_id=${tenancyData.unit_id}`, undefined, { useIdentityService: true })
      setUnit(unitData)

      // Load property details (need to get property_id from unit)
      const propertyData = await apiFetch<Property>(`/properties/property?property_id=${unitData.property_id}`, undefined, { useIdentityService: true })
      setProperty(propertyData)
    } catch (err) {
      console.error("Failed to load tenant data:", err)
      if (err instanceof Error) {
        if (err.message.includes("401") || err.message.includes("403")) {
          setError("You are not authorized to view this information")
        } else if (err.message.includes("404")) {
          setError("No active tenancy found. Please contact your landlord.")
        } else {
          setError("Failed to load your tenancy information")
        }
      } else {
        setError("Failed to load your tenancy information")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      loadTenantData()
    }
  }, [mounted, authState.authenticated])

  if (!mounted) {
    return null
  }

  if (!authState.authenticated) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">Please sign in to view your tenant dashboard.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kiri-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-kiri-text">Tenant Dashboard</h1>
          <p className="text-sm text-kiri-text-muted mt-1">Your rental information and property access</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-kiri-text-muted">Loading your tenancy information...</p>
          </div>
        ) : !tenancy ? (
          <div className="text-center py-12">
            <p className="text-kiri-text-muted">No active tenancy found. Please contact your landlord.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tenancy Information */}
            <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
              <h2 className="text-lg font-semibold text-kiri-text mb-4">Your Tenancy</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-kiri-text-muted">Status</p>
                  <p className="text-sm font-medium text-kiri-text capitalize">{tenancy.status}</p>
                </div>
                <div>
                  <p className="text-xs text-kiri-text-muted">Lease Start</p>
                  <p className="text-sm text-kiri-text">{new Date(tenancy.lease_start_date).toLocaleDateString()}</p>
                </div>
                {tenancy.lease_end_date && (
                  <div>
                    <p className="text-xs text-kiri-text-muted">Lease End</p>
                    <p className="text-sm text-kiri-text">{new Date(tenancy.lease_end_date).toLocaleDateString()}</p>
                  </div>
                )}
                {tenancy.invitation_accepted_at && (
                  <div>
                    <p className="text-xs text-kiri-text-muted">Activated On</p>
                    <p className="text-sm text-kiri-text">{new Date(tenancy.invitation_accepted_at).toLocaleDateString()}</p>
                  </div>
                )}
                {tenancy.terminated_at && (
                  <div>
                    <p className="text-xs text-kiri-text-muted">Terminated On</p>
                    <p className="text-sm text-kiri-text">{new Date(tenancy.terminated_at).toLocaleDateString()}</p>
                  </div>
                )}
                {tenancy.termination_reason && (
                  <div>
                    <p className="text-xs text-kiri-text-muted">Termination Reason</p>
                    <p className="text-sm text-kiri-text">{tenancy.termination_reason}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Information */}
            {property && unit && (
              <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
                <h2 className="text-lg font-semibold text-kiri-text mb-4">Your Property</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-kiri-text-muted">Property</p>
                    <p className="text-sm font-medium text-kiri-text">{property.property_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kiri-text-muted">Type</p>
                    <p className="text-sm text-kiri-text capitalize">{property.property_type || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kiri-text-muted">Address</p>
                    <p className="text-sm text-kiri-text">{property.address_line1}, {property.city}, {property.state}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kiri-text-muted">Unit</p>
                    <p className="text-sm font-medium text-kiri-text">{unit.unit_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kiri-text-muted">Unit Type</p>
                    <p className="text-sm text-kiri-text capitalize">{unit.unit_type || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-kiri-text-muted">Unit Status</p>
                    <p className="text-sm text-kiri-text capitalize">{unit.lifecycle}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Information */}
            <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
              <h2 className="text-lg font-semibold text-kiri-text mb-4">Your Profile</h2>
              <div className="space-y-2">
                <p><strong className="text-kiri-text-soft">Email:</strong> {authState.principal}</p>
                <p><strong className="text-kiri-text-soft">Subject ID:</strong> {authState.principalId?.slice(0, 8)}...</p>
                <p><strong className="text-kiri-text-soft">Roles:</strong> {authState.roles?.join(", ")}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
              <h2 className="text-lg font-semibold text-kiri-text mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-white/8 px-4 py-3 text-sm font-medium text-kiri-text hover:bg-white/12 transition">
                  View Lock Access
                </button>
                <button className="w-full rounded-lg bg-white/8 px-4 py-3 text-sm font-medium text-kiri-text hover:bg-white/12 transition">
                  View Payment Responsibilities
                </button>
                <button className="w-full rounded-lg bg-white/8 px-4 py-3 text-sm font-medium text-kiri-text hover:bg-white/12 transition">
                  Contact Landlord
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
