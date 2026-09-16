import { useState, useEffect } from "react"
import { apiFetch } from "../../api/client"
import { FieldLabel } from "../../components/forms/FieldLabel"

interface Property {
  id: string
  property_name: string
  property_type: string
}

interface Unit {
  id: string
  unit_number: string
  unit_type: string
  status: string
}

interface Tenancy {
  id: string
  tenant_subject_id: string
  unit_id: string
  status: string
  lease_start_date: string
  lease_end_date?: string
  created_at: string
}

interface Invitation {
  id: string
  tenant_subject_id: string
  unit_id: string
  status: string
  invitation_expires_at: string
  created_at: string
}

export function TenantsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [tenancies, setTenancies] = useState<Tenancy[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [selectedProperty, setSelectedProperty] = useState<string>("")
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [tenantEmail, setTenantEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const loadData = async () => {
    try {
      const [propsData, tenanciesData, invitationsData] = await Promise.all([
        apiFetch<Property[]>("/properties", undefined, { useIdentityService: true }),
        apiFetch<Tenancy[]>("/tenancies/landlord", undefined, { useIdentityService: true }),
        apiFetch<Invitation[]>("/tenancies/landlord", undefined, { useIdentityService: true }),
      ])
      setProperties(propsData)
      setTenancies(tenanciesData)
      setInvitations(invitationsData.filter(t => t.status === "INVITED"))
    } catch (err) {
      console.error("Failed to load data:", err)
    }
  }

  const loadUnitsForProperty = async (propertyId: string) => {
    try {
      const data = await apiFetch<Unit[]>(`/units/property/${propertyId}`, undefined, { useIdentityService: true })
      setUnits(data.filter(u => u.status === "AVAILABLE"))
    } catch (err) {
      console.error("Failed to load units:", err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedProperty) {
      loadUnitsForProperty(selectedProperty)
    } else {
      setUnits([])
    }
  }, [selectedProperty])

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await apiFetch("/tenancies/invite-by-email", {
        method: "POST",
        body: JSON.stringify({
          tenant_email: tenantEmail,
          unit_id: selectedUnit,
          lease_start_date: new Date().toISOString().split('T')[0],
        }),
      }, { useIdentityService: true })

      setShowCreateModal(false)
      setTenantEmail("")
      setSelectedProperty("")
      setSelectedUnit("")
      loadData()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create invitation")
      } else {
        setError("Failed to create invitation")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevoke = async (tenancyId: string) => {
    if (!confirm("Are you sure you want to revoke this invitation?")) return

    try {
      await apiFetch(`/tenancies/${tenancyId}/revoke`, {
        method: "POST",
      }, { useIdentityService: true })

      loadData()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to revoke invitation")
      } else {
        setError("Failed to revoke invitation")
      }
    }
  }

  const handleResend = async (tenancyId: string) => {
    try {
      await apiFetch(`/tenancies/${tenancyId}/resend`, {
        method: "POST",
      }, { useIdentityService: true })

      alert("Invitation resent successfully")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to resend invitation")
      } else {
        setError("Failed to resend invitation")
      }
    }
  }

  return (
    <div className="min-h-screen bg-kiri-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-kiri-text">Tenant Management</h1>
          <p className="text-sm text-kiri-text-muted mt-1">Manage your tenants and invitations</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-xl bg-kiri-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)]"
          >
            + Create Invitation
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Active Tenancies */}
          <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
            <h2 className="text-lg font-semibold text-kiri-text mb-4">Active Tenancies</h2>
            {tenancies.length === 0 ? (
              <p className="text-sm text-kiri-text-muted">No active tenancies</p>
            ) : (
              <div className="space-y-3">
                {tenancies.map((tenancy) => (
                  <div key={tenancy.id} className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-kiri-text">Tenant ID: {tenancy.tenant_subject_id.slice(0, 8)}...</p>
                        <p className="text-xs text-kiri-text-muted mt-1">Status: {tenancy.status}</p>
                        <p className="text-xs text-kiri-text-muted">Started: {tenancy.lease_start_date}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Invitations */}
          <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
            <h2 className="text-lg font-semibold text-kiri-text mb-4">Pending Invitations</h2>
            {invitations.length === 0 ? (
              <p className="text-sm text-kiri-text-muted">No pending invitations</p>
            ) : (
              <div className="space-y-3">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-kiri-text">Tenant ID: {invitation.tenant_subject_id.slice(0, 8)}...</p>
                        <p className="text-xs text-kiri-text-muted mt-1">Expires: {new Date(invitation.invitation_expires_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResend(invitation.id)}
                          className="rounded-lg bg-white/8 px-3 py-1 text-xs font-medium text-kiri-text hover:bg-white/12 transition"
                        >
                          Resend
                        </button>
                        <button
                          onClick={() => handleRevoke(invitation.id)}
                          className="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/30 transition"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Invitation Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/8 bg-kiri-925 p-6">
              <h2 className="text-xl font-semibold text-kiri-text mb-4">Create Invitation</h2>
              
              <form onSubmit={handleCreateInvitation} className="space-y-4">
                <FieldLabel label="Tenant Email">
                  <input
                    type="email"
                    required
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text placeholder:text-kiri-text-muted/50 focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    placeholder="tenant@example.com"
                    disabled={isLoading}
                  />
                </FieldLabel>

                <FieldLabel label="Property">
                  <select
                    required
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    disabled={isLoading}
                  >
                    <option value="">Select a property</option>
                    {properties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.property_name} ({property.property_type})
                      </option>
                    ))}
                  </select>
                </FieldLabel>

                <FieldLabel label="Unit">
                  <select
                    required
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-kiri-text focus:border-kiri-blue-500/50 focus:outline-none focus:ring-2 focus:ring-kiri-blue-500/20 transition"
                    disabled={isLoading || !selectedProperty}
                  >
                    <option value="">Select a unit</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.unit_number} ({unit.unit_type})
                      </option>
                    ))}
                  </select>
                </FieldLabel>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    disabled={isLoading}
                    className="flex-1 rounded-xl border border-white/8 px-4 py-3 text-sm font-semibold text-kiri-text hover:bg-white/[0.025] transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 rounded-xl bg-kiri-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)] disabled:opacity-50 disabled:shadow-none"
                  >
                    {isLoading ? "Creating..." : "Create Invitation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
