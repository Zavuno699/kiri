import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "../../api/client"
import { getAuthenticationState } from "../../application/authentication/state/authenticationStore"
import { logout } from "../../application/authentication/commands/logout"
import { StatusPill } from "../../components/ui/StatusPill"

interface Property {
  id: string
  property_name: string
  property_type: string
  status: string
}

interface Unit {
  id: string
  unit_number: string
  unit_type: string
  lifecycle: string
  property_id: string
}

interface Assignment {
  id: string
  lock_id: string
  unit_id: string
  status: string
}

interface Tenancy {
  id: string
  tenant_subject_id: string
  unit_id: string
  status: string
  lease_start_date: string
  lease_end_date?: string
  invitation_expires_at?: string
  created_at: string
}

interface PaymentAccount {
  id: string
  account_type: string
  provider: string
  status: string
}

interface DashboardMetrics {
  properties: number
  totalUnits: number
  occupiedUnits: number
  vacantUnits: number
  activeTenants: number
  activeTenancies: number
  assignedLocks: number
  unassignedLocks: number
  pendingInvitations: number
}

interface DashboardData {
  properties: Property[]
  units: Unit[]
  assignments: Assignment[]
  tenancies: Tenancy[]
  paymentAccounts: PaymentAccount[]
  metrics: DashboardMetrics
}

export function LandlordPage() {
  const navigate = useNavigate()
  const authState = getAuthenticationState()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboardData = async () => {
    try {
      // Fetch all data in parallel where possible
      const [properties, tenancies, paymentAccounts] = await Promise.all([
        apiFetch<Property[]>("/properties", undefined, { useIdentityService: true }),
        apiFetch<Tenancy[]>("/tenancies/landlord", undefined, { useIdentityService: true }),
        apiFetch<PaymentAccount[]>("/payments/accounts", undefined, { useIdentityService: true }).catch(() => []),
      ])

      // Fetch units per property (can be parallelized)
      const unitsPromises = properties.map(property =>
        apiFetch<Unit[]>(`/units/property?property_id=${property.id}`, undefined, { useIdentityService: true })
          .catch(() => [])
      )
      const unitsArrays = await Promise.all(unitsPromises)
      const allUnits = unitsArrays.flat()

      // Fetch assignments per unit (can be parallelized)
      const assignmentPromises = allUnits.map(unit =>
        apiFetch<Assignment[]>(`/assignments/unit?unit_id=${unit.id}`, undefined, { useIdentityService: true })
          .catch(() => [])
      )
      const assignmentArrays = await Promise.all(assignmentPromises)
      const allAssignments = assignmentArrays.flat()

      // Compose metrics
      const metrics: DashboardMetrics = {
        properties: properties.length,
        totalUnits: allUnits.length,
        occupiedUnits: allUnits.filter(u => u.lifecycle === "OCCUPIED").length,
        vacantUnits: allUnits.filter(u => u.lifecycle === "AVAILABLE").length,
        activeTenants: tenancies.filter(t => t.status === "ACTIVE").length,
        activeTenancies: tenancies.filter(t => t.status === "ACTIVE").length,
        assignedLocks: allAssignments.filter(a => a.status === "ACTIVE").length,
        unassignedLocks: allUnits.length - allAssignments.filter(a => a.status === "ACTIVE").length,
        pendingInvitations: tenancies.filter(t => t.status === "INVITED").length,
      }

      setData({
        properties,
        units: allUnits,
        assignments: allAssignments,
        tenancies,
        paymentAccounts,
        metrics,
      })
    } catch (err) {
      console.error("Failed to load dashboard data:", err)
      setError("Failed to load dashboard data")
      // Silence unused variable warning
      void err
    }
  }

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    
    const loadData = async () => {
      try {
        await loadDashboardData()
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      cancelled = true
    }
  }, [])

  const handleSignOut = async () => {
    await logout()
    navigate("/signin")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-kiri-blue-500"></div>
          <p className="mt-4 text-sm text-kiri-text-muted">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error loading dashboard</div>
          <p className="text-sm text-kiri-text-muted mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-kiri-blue-600 text-white rounded-lg hover:bg-kiri-blue-500"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { metrics, properties, tenancies } = data

  // Empty state handling
  const hasNoProperties = properties.length === 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kiri-text">Landlord Dashboard</h1>
          <p className="text-sm text-kiri-text-muted mt-1">
            Welcome back, {authState.principal}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill label="Active" tone="success" />
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-white/8 rounded-lg text-sm text-kiri-text-soft hover:bg-white/[0.05]"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Empty State */}
      {hasNoProperties && (
        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-xl font-semibold text-kiri-text mb-2">No properties yet</h2>
          <p className="text-sm text-kiri-text-muted mb-6">
            Get started by adding your first property to begin managing your rental portfolio.
          </p>
          <button
            onClick={() => navigate("/landlord/properties")}
            className="px-6 py-3 bg-kiri-blue-600 text-white rounded-xl hover:bg-kiri-blue-500"
          >
            Add Property
          </button>
        </div>
      )}

      {/* Empty State: Property but no units */}
      {!hasNoProperties && data.units.length === 0 && (
        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8 text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-xl font-semibold text-kiri-text mb-2">No units yet</h2>
          <p className="text-sm text-kiri-text-muted mb-6">
            Add units to your properties to begin renting them out.
          </p>
          <button
            onClick={() => navigate("/landlord/properties")}
            className="px-6 py-3 bg-kiri-blue-600 text-white rounded-xl hover:bg-kiri-blue-500"
          >
            Add Unit
          </button>
        </div>
      )}

      {/* Empty State: Units but no tenants */}
      {!hasNoProperties && data.units.length > 0 && tenancies.length === 0 && (
        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-8 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-kiri-text mb-2">No tenants yet</h2>
          <p className="text-sm text-kiri-text-muted mb-6">
            Invite tenants to your units to begin managing tenancies.
          </p>
          <button
            onClick={() => navigate("/landlord/tenants")}
            className="px-6 py-3 bg-kiri-blue-600 text-white rounded-xl hover:bg-kiri-blue-500"
          >
            Invite Tenant
          </button>
        </div>
      )}

      {/* Overview Metrics */}
      {!hasNoProperties && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Properties"
            value={metrics.properties}
            description="Total properties"
            accent="blue"
          />
          <MetricCard
            label="Total Units"
            value={metrics.totalUnits}
            description="All units across properties"
            accent="green"
          />
          <MetricCard
            label="Occupied"
            value={metrics.occupiedUnits}
            description="Currently occupied units"
            accent="purple"
          />
          <MetricCard
            label="Vacant"
            value={metrics.vacantUnits}
            description="Available for rental"
            accent="amber"
          />
          <MetricCard
            label="Active Tenants"
            value={metrics.activeTenants}
            description="Currently active tenancies"
            accent="blue"
          />
          <MetricCard
            label="Assigned Locks"
            value={metrics.assignedLocks}
            description="Locks assigned to units"
            accent="green"
          />
          <MetricCard
            label="Unassigned Locks"
            value={metrics.unassignedLocks}
            description="Units without lock assignment"
            accent="amber"
          />
          <MetricCard
            label="Pending Invitations"
            value={metrics.pendingInvitations}
            description="Awaiting tenant activation"
            accent="purple"
          />
        </div>
      )}

      {/* Attention Required */}
      {!hasNoProperties && (metrics.vacantUnits > 0 || metrics.unassignedLocks > 0 || metrics.pendingInvitations > 0) && (
        <div className="rounded-2xl border border-kiri-amber-500/20 bg-kiri-amber-500/[0.05] p-6">
          <h2 className="text-lg font-semibold text-kiri-text mb-4">Attention Required</h2>
          <div className="space-y-3">
            {metrics.vacantUnits > 0 && (
              <AttentionItem
                label={`${metrics.vacantUnits} vacant unit${metrics.vacantUnits > 1 ? 's' : ''}`}
                description="Units available for rental"
                action="View Properties"
                onAction={() => navigate("/landlord/properties")}
              />
            )}
            {metrics.unassignedLocks > 0 && (
              <AttentionItem
                label={`${metrics.unassignedLocks} unit${metrics.unassignedLocks > 1 ? 's' : ''} without lock assignment`}
                description="Units need lock assignment for access control"
                action="Manage Locks"
                onAction={() => navigate("/landlord/locks")}
              />
            )}
            {metrics.pendingInvitations > 0 && (
              <AttentionItem
                label={`${metrics.pendingInvitations} pending invitation${metrics.pendingInvitations > 1 ? 's' : ''}`}
                description="Tenants awaiting activation"
                action="View Tenants"
                onAction={() => navigate("/landlord/tenants")}
              />
            )}
          </div>
        </div>
      )}

      {/* Properties Summary */}
      {!hasNoProperties && (
        <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-kiri-text">Properties Overview</h2>
            <button
              onClick={() => navigate("/landlord/properties")}
              className="text-sm text-kiri-blue-400 hover:text-kiri-blue-300"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 rounded-lg border border-white/8 bg-white/[0.02]">
                <div>
                  <p className="font-medium text-kiri-text">{property.property_name}</p>
                  <p className="text-xs text-kiri-text-muted">{property.property_type}</p>
                </div>
                <StatusPill label={property.status} tone={property.status === "ACTIVE" ? "success" : "warning"} />
              </div>
            ))}
            {properties.length > 3 && (
              <button
                onClick={() => navigate("/landlord/properties")}
                className="w-full text-center text-sm text-kiri-text-muted hover:text-kiri-text"
              >
                View {properties.length - 3} more properties
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
        <h2 className="text-lg font-semibold text-kiri-text mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionButton
            label="Add Property"
            description="Register a new property"
            onClick={() => navigate("/landlord/properties")}
          />
          <QuickActionButton
            label="Invite Tenant"
            description="Send tenant invitation"
            onClick={() => navigate("/landlord/tenants")}
          />
          <QuickActionButton
            label="View Tenants"
            description="Manage tenant relationships"
            onClick={() => navigate("/landlord/tenants")}
          />
          <QuickActionButton
            label="Manage Locks"
            description="Control access assignments"
            onClick={() => navigate("/landlord/locks")}
          />
          <QuickActionButton
            label="View Payments"
            description="Payment accounts and activity"
            onClick={() => navigate("/landlord/payments")}
          />
          <QuickActionButton
            label="Manage Properties"
            description="Property and unit management"
            onClick={() => navigate("/landlord/properties")}
          />
        </div>
      </div>

      {/* Recent Activity - Unavailable */}
      <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
        <h2 className="text-lg font-semibold text-kiri-text mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm text-kiri-text-muted">
            Activity feed not yet available — backend landlord activity feed pending
          </p>
        </div>
      </div>

      {/* Payments Summary */}
      <div className="rounded-2xl border border-white/8 bg-kiri-925 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-kiri-text">Payments</h2>
          <button
            onClick={() => navigate("/landlord/payments")}
            className="text-sm text-kiri-blue-400 hover:text-kiri-blue-300"
          >
            View All →
          </button>
        </div>
        {data.paymentAccounts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💳</div>
            <p className="text-sm text-kiri-text-muted">
              No payment accounts configured. Payment activity will appear once accounts are set up.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.paymentAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border border-white/8 bg-white/[0.02]">
                <div>
                  <p className="font-medium text-kiri-text">{account.provider}</p>
                  <p className="text-xs text-kiri-text-muted">{account.account_type}</p>
                </div>
                <StatusPill label={account.status} tone={account.status === "ACTIVE" ? "success" : "warning"} />
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 p-3 rounded-lg border border-kiri-amber-500/20 bg-kiri-amber-500/[0.05]">
          <p className="text-xs text-kiri-text-muted">
            Settlement, commission, and reconciliation features require additional backend endpoints.
          </p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, description, accent }: { label: string; value: number; description: string; accent: string }) {
  const accentColors = {
    blue: "border-kiri-blue-500/25 bg-kiri-blue-500/[0.05]",
    green: "border-kiri-green-500/25 bg-kiri-green-500/[0.05]",
    purple: "border-kiri-purple-500/25 bg-kiri-purple-500/[0.05]",
    amber: "border-kiri-amber-500/25 bg-kiri-amber-500/[0.05]",
  }

  return (
    <div className={`rounded-2xl border p-6 ${accentColors[accent as keyof typeof accentColors]}`}>
      <div className="text-3xl font-bold text-kiri-text">{value}</div>
      <div className="text-sm font-medium text-kiri-text mt-1">{label}</div>
      <div className="text-xs text-kiri-text-muted mt-2">{description}</div>
    </div>
  )
}

function AttentionItem({ label, description, action, onAction }: { label: string; description: string; action: string; onAction: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-white/8 bg-white/[0.02]">
      <div>
        <p className="font-medium text-kiri-text">{label}</p>
        <p className="text-xs text-kiri-text-muted">{description}</p>
      </div>
      <button
        onClick={onAction}
        className="text-sm text-kiri-blue-400 hover:text-kiri-blue-300"
      >
        {action}
      </button>
    </div>
  )
}

function QuickActionButton({ label, description, onClick }: { label: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] transition"
    >
      <div className="font-medium text-kiri-text">{label}</div>
      <div className="text-xs text-kiri-text-muted mt-1">{description}</div>
    </button>
  )
}