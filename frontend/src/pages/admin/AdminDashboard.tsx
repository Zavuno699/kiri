import { useState, useEffect } from "react"
import { apiFetch } from "../../api/client"
import { useNavigate } from "react-router"

interface DeviceListItem {
  id: string
  device_type: string
  serial_number: string
  model: string
  firmware_version: string
  lifecycle_state: string
  connectivity_state: string
  credential_status: string
  created_at: string
  updated_at: string
}

interface DeviceListResponse {
  devices: DeviceListItem[]
  total: number
}

interface Property {
  id: string
  property_name: string
  property_type: string
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

interface PaymentAccount {
  id: string
  account_type: string
  provider: string
  status: string
}

interface AdminMetrics {
  totalDevices: number
  activeDevices: number
  totalProperties: number
  activeTenancies: number
  paymentAccounts: number
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const [devices, setDevices] = useState<DeviceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showProvisionModal, setShowProvisionModal] = useState(false)
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalDevices: 0,
    activeDevices: 0,
    totalProperties: 0,
    activeTenancies: 0,
    paymentAccounts: 0,
  })
  const [healthStatus, setHealthStatus] = useState<{ identity: string }>({ identity: "unknown" })

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        // Load devices
        const deviceResponse = await apiFetch<DeviceListResponse>("/admin/devices", undefined, {
          useIdentityService: true,
        })
        setDevices(deviceResponse.devices)

        // Load real metrics from existing endpoints
        const [properties, tenancies, paymentAccounts] = await Promise.all([
          apiFetch<Property[]>("/properties", undefined, { useIdentityService: true }).catch(() => []),
          apiFetch<Tenancy[]>("/tenancies/landlord", undefined, { useIdentityService: true }).catch(() => []),
          apiFetch<PaymentAccount[]>("/payments/accounts", undefined, { useIdentityService: true }).catch(() => []),
        ])

        const activeTenancies = tenancies.filter(t => t.status === "ACTIVE").length
        const activeDevices = deviceResponse.devices.filter(d => d.lifecycle_state === "PROVISIONED").length

        setMetrics({
          totalDevices: deviceResponse.total,
          activeDevices,
          totalProperties: properties.length,
          activeTenancies,
          paymentAccounts: paymentAccounts.length,
        })

        // Check identity-service health
        try {
          await apiFetch("/healthz", undefined, { useIdentityService: true })
          setHealthStatus({ identity: "healthy" })
        } catch {
          setHealthStatus({ identity: "degraded" })
        }
      } catch (error) {
        console.error("Failed to load admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDataAsync()
  }, [])

  const handleProvisionSuccess = () => {
    setShowProvisionModal(false)
    const reloadDevices = async () => {
      try {
        const response = await apiFetch<DeviceListResponse>("/admin/devices", undefined, {
          useIdentityService: true,
        })
        setDevices(response.devices)
        setMetrics(prev => ({
          ...prev,
          totalDevices: response.total,
          activeDevices: response.devices.filter(d => d.lifecycle_state === "PROVISIONED").length,
        }))
      } catch (error) {
        console.error("Failed to reload devices:", error)
      }
    }
    reloadDevices()
  }

  return (
    <div className="min-h-screen bg-[#060b12] p-6 kiri-grid">
      {/* Hero / Command Area */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#f4f7fb] mb-2">KiriLock Command Center</h1>
            <p className="text-[#b3bfd0]">Platform operations and secure device management</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              healthStatus.identity === "healthy" 
                ? "bg-[#25c995]/20 text-[#25c995]" 
                : "bg-[#ef6378]/20 text-[#ef6378]"
            }`}>
              Identity Service: {healthStatus.identity}
            </div>
          </div>
        </div>

        {/* Signature Padlock Operations Panel */}
        <div className="kiri-panel rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#f4f7fb] mb-1">Padlock Operations</h2>
              <p className="text-[#73839a] text-sm">Provision and manage IoT padlock devices</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProvisionModal(true)}
                className="px-5 py-2.5 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors font-medium flex items-center gap-2"
              >
                <span className="text-lg">+</span> Provision New Padlock
              </button>
              <button
                onClick={() => navigate("/admin/devices")}
                className="px-5 py-2.5 bg-[#142237] border border-[#233552] text-[#f4f7fb] rounded-lg hover:border-[#14b8a6]/50 transition-colors font-medium"
              >
                View All Devices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview - Real Data Only */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Total Devices"
            value={metrics.totalDevices}
            subtitle="Provisioned padlocks"
            color="emerald"
          />
          <MetricCard
            title="Active Devices"
            value={metrics.activeDevices}
            subtitle="Currently operational"
            color="emerald"
          />
          <MetricCard
            title="Properties"
            value={metrics.totalProperties}
            subtitle="Registered properties"
            color="emerald"
          />
          <MetricCard
            title="Active Tenancies"
            value={metrics.activeTenancies}
            subtitle="Active leases"
            color="emerald"
          />
          <MetricCard
            title="Payment Accounts"
            value={metrics.paymentAccounts}
            subtitle="Configured accounts"
            color="emerald"
          />
        </div>
      </div>

      {/* Platform Health */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Platform Health</h2>
        <div className="kiri-panel rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HealthCheckCard
              service="Identity Service"
              status={healthStatus.identity}
              endpoint="/healthz"
            />
            <HealthCheckCard
              service="Device Service"
              status="unavailable"
              endpoint="Not configured"
            />
            <HealthCheckCard
              service="Billing Service"
              status="unavailable"
              endpoint="Not configured"
            />
          </div>
        </div>
      </div>

      {/* Device Operations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Device Operations</h2>
        <div className="kiri-panel rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-[#73839a]">Loading devices...</div>
          ) : devices.length === 0 ? (
            <div className="p-8 text-center text-[#73839a]">
              <p className="mb-4">No devices provisioned yet</p>
              <button
                onClick={() => setShowProvisionModal(true)}
                className="px-4 py-2 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors text-sm"
              >
                Provision First Device
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0b1420]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Serial
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Connectivity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#73839a] uppercase tracking-wider">
                      Provisioned
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#233552]/30">
                  {devices.slice(0, 5).map((device) => (
                    <tr key={device.id} className="hover:bg-[#142237]/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#f4f7fb]">
                        {device.serial_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b3bfd0]">
                        {device.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b3bfd0]">
                        {device.device_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={device.lifecycle_state} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b3bfd0]">
                        {device.connectivity_state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#73839a]">
                        {new Date(device.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Action Required Queue - Empty State */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Action Required</h2>
        <div className="kiri-panel rounded-xl p-8 text-center">
          <p className="text-[#73839a]">No pending actions requiring attention</p>
        </div>
      </div>

      {/* Recent Activity - Empty State */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Recent Activity</h2>
        <div className="kiri-panel rounded-xl p-8 text-center">
          <p className="text-[#73839a]">No recent platform activity to display</p>
        </div>
      </div>

      {/* Financial Overview - Empty State */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Financial Overview</h2>
        <div className="kiri-panel rounded-xl p-8 text-center">
          <p className="text-[#73839a] mb-2">Payment analytics will appear when the payment provider is configured</p>
          <p className="text-[#73839a] text-sm">Set up payment provider integration to enable financial reporting</p>
        </div>
      </div>

      {/* People Directory - Empty State */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">People Directory</h2>
        <div className="kiri-panel rounded-xl p-8 text-center">
          <p className="text-[#73839a]">Platform-wide landlord and tenant directory not available</p>
        </div>
      </div>

      {/* Security Events - Link to existing route */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Security</h2>
        <div className="kiri-panel kiri-panel-hover rounded-xl p-6 cursor-pointer" onClick={() => navigate("/security")}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#f4f7fb] font-medium mb-1">Security Audit & Controls</h3>
              <p className="text-[#73839a] text-sm">View security events, access logs, and authentication controls</p>
            </div>
            <div className="text-[#14b8a6] text-2xl">→</div>
          </div>
        </div>
      </div>

      {/* Quick Actions / Navigation Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#f4f7fb] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NavCard
            title="Security"
            description="Security audit and controls"
            path="/security"
            icon="🔒"
          />
          <NavCard
            title="RBAC"
            description="Role-based access control"
            path="/rbac"
            icon="👥"
          />
          <NavCard
            title="Operator Control"
            description="Global operator controls"
            path="/operator-control/global"
            icon="⚙️"
          />
          <NavCard
            title="System Health"
            description="Frontend health monitoring"
            path="/health"
            icon="💓"
          />
          <NavCard
            title="Operational Integrity"
            description="System integrity checks"
            path="/integrity"
            icon="✓"
          />
          <NavCard
            title="Runtime Status"
            description="Unified runtime monitoring"
            path="/runtime"
            icon="📊"
          />
        </div>
      </div>

      {/* Provision Modal */}
      {showProvisionModal && (
        <ProvisionDeviceModal
          onClose={() => setShowProvisionModal(false)}
          onSuccess={handleProvisionSuccess}
        />
      )}
    </div>
  )
}

function MetricCard({ title, value, subtitle, color }: { title: string; value: number; subtitle: string; color: "emerald" | "amber" | "red" }) {
  const colorClasses = {
    emerald: "text-[#25c995]",
    amber: "text-[#f2b84b]",
    red: "text-[#ef6378]",
  }

  return (
    <div className="kiri-panel rounded-xl p-5">
      <h3 className="text-sm font-medium text-[#73839a] mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-xs text-[#73839a] mt-1">{subtitle}</p>
    </div>
  )
}

function HealthCheckCard({ service, status, endpoint }: { service: string; status: string; endpoint: string }) {
  const statusColors = {
    healthy: "bg-[#25c995]/20 text-[#25c995]",
    degraded: "bg-[#f2b84b]/20 text-[#f2b84b]",
    unavailable: "bg-[#73839a]/20 text-[#73839a]",
  }

  return (
    <div className="flex items-center justify-between p-4 bg-[#0b1420] rounded-lg">
      <div>
        <h3 className="text-[#f4f7fb] font-medium">{service}</h3>
        <p className="text-xs text-[#73839a] mt-1">{endpoint}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {status}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusColors = {
    PROVISIONED: "bg-[#25c995]/20 text-[#25c995]",
    PENDING: "bg-[#f2b84b]/20 text-[#f2b84b]",
    FAILED: "bg-[#ef6378]/20 text-[#ef6378]",
  }

  const colorClass = statusColors[status as keyof typeof statusColors] || "bg-[#73839a]/20 text-[#73839a]"

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {status}
    </span>
  )
}

function NavCard({ title, description, path, icon }: { title: string; description: string; path: string; icon: string }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(path)}
      className="kiri-panel kiri-panel-hover rounded-xl p-5 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="text-[#f4f7fb] font-medium mb-1">{title}</h3>
          <p className="text-sm text-[#73839a]">{description}</p>
        </div>
      </div>
    </button>
  )
}

function ProvisionDeviceModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deviceMetadata, setDeviceMetadata] = useState({
    device_type: "PADLOCK",
    serial_number: "",
    model: "",
    firmware_version: "",
    gateway_id: "",
    capabilities: {
      remote_lock: true,
      remote_unlock: true,
      tamper_detection: false,
      battery_telemetry: true,
    },
  })
  const [credentials, setCredentials] = useState({
    credential_type: "API_KEY",
    credential_value: "",
  })
  const [result, setResult] = useState<{ success: boolean; message: string; deviceId?: string } | null>(null)

  const handleStep1Next = () => {
    if (!deviceMetadata.serial_number || !deviceMetadata.model || !deviceMetadata.firmware_version) {
      setError("Please fill in all required fields")
      return
    }
    setError(null)
    setStep(2)
  }

  const handleStep2Next = () => {
    if (!credentials.credential_value) {
      setError("Please enter the credential value")
      return
    }
    setError(null)
    setStep(3)
  }

  const handleProvision = async () => {
    setLoading(true)

    try {
      const response = await apiFetch<{ device_id: string; serial_number: string; status: string; provisioned_at: string }>(
        "/admin/devices/provision",
        {
          method: "POST",
          body: JSON.stringify({
            ...deviceMetadata,
            ...credentials,
            gateway_id: deviceMetadata.gateway_id || undefined,
          }),
        },
        { useIdentityService: true }
      )

      setResult({
        success: true,
        message: `Device ${response.serial_number} provisioned successfully`,
        deviceId: response.device_id,
      })
      setStep(4)
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || "Failed to provision device",
      })
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setCredentials({ credential_type: "API_KEY", credential_value: "" })
    onClose()
  }

  const handleSuccess = () => {
    onSuccess()
    handleClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="kiri-panel rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#f4f7fb]">Provision New Padlock</h2>
              <p className="text-[#73839a] text-sm mt-1">Super Admin operation — requires confirmation</p>
            </div>
            <button
              onClick={handleClose}
              className="text-[#73839a] hover:text-[#f4f7fb] text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "bg-[#14b8a6] text-[#f4f7fb]" : "bg-[#233552] text-[#73839a]"
                }`}>
                  {s}
                </div>
                {s < 4 && <div className="w-16 h-1 bg-[#233552] mx-2" />}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-[#ef6378]/10 border border-[#ef6378]/30 rounded-lg text-[#ef6378]">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[#f4f7fb] mb-4">Step 1: Device Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Device Type</label>
                  <select
                    value={deviceMetadata.device_type}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, device_type: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                  >
                    <option value="PADLOCK">Padlock</option>
                    <option value="GATEWAY">Gateway</option>
                    <option value="CONTROLLER">Controller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Serial Number *</label>
                  <input
                    type="text"
                    value={deviceMetadata.serial_number}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, serial_number: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                    placeholder="e.g., SN123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Model *</label>
                  <input
                    type="text"
                    value={deviceMetadata.model}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, model: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                    placeholder="e.g., KiriLock Pro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Firmware Version *</label>
                  <input
                    type="text"
                    value={deviceMetadata.firmware_version}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, firmware_version: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                    placeholder="e.g., 1.0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Gateway ID (optional)</label>
                  <input
                    type="text"
                    value={deviceMetadata.gateway_id}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, gateway_id: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                    placeholder="Optional gateway ID"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleStep1Next}
                  className="px-6 py-2 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-[#f4f7fb] mb-4">Step 2: Provider Credentials</h3>
              <div className="bg-[#f2b84b]/10 border border-[#f2b84b]/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-[#f2b84b]">
                  <strong>Security Notice:</strong> Credentials are encrypted and stored securely. They will never be displayed again after submission.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Credential Type</label>
                  <select
                    value={credentials.credential_type}
                    onChange={(e) => setCredentials({ ...credentials, credential_type: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                  >
                    <option value="API_KEY">API Key</option>
                    <option value="API_SECRET">API Secret</option>
                    <option value="ACCESS_TOKEN">Access Token</option>
                    <option value="CERTIFICATE">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b3bfd0] mb-1">Credential Value *</label>
                  <input
                    type="password"
                    value={credentials.credential_value}
                    onChange={(e) => setCredentials({ ...credentials, credential_value: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b1420] border border-[#233552] rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-[#f4f7fb]"
                    placeholder="Enter the credential value"
                    autoComplete="off"
                  />
                  <p className="text-xs text-[#73839a] mt-1">This value will be encrypted and stored securely</p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-[#233552] text-[#f4f7fb] rounded-lg hover:bg-[#233552]/80 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleStep2Next}
                  disabled={loading}
                  className="px-6 py-2 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors disabled:opacity-50 font-medium"
                >
                  {loading ? "Provisioning..." : "Provision Device"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-[#f4f7fb] mb-4">Step 3: Review & Confirm</h3>
              <div className="bg-[#0b1420] rounded-lg p-4 space-y-2 mb-4">
                <div className="flex justify-between"><span className="text-[#73839a]">Device Type:</span><span className="text-[#f4f7fb]">{deviceMetadata.device_type}</span></div>
                <div className="flex justify-between"><span className="text-[#73839a]">Serial Number:</span><span className="text-[#f4f7fb]">{deviceMetadata.serial_number}</span></div>
                <div className="flex justify-between"><span className="text-[#73839a]">Model:</span><span className="text-[#f4f7fb]">{deviceMetadata.model}</span></div>
                <div className="flex justify-between"><span className="text-[#73839a]">Firmware Version:</span><span className="text-[#f4f7fb]">{deviceMetadata.firmware_version}</span></div>
                <div className="flex justify-between"><span className="text-[#73839a]">Credential Type:</span><span className="text-[#f4f7fb]">{credentials.credential_type}</span></div>
                <div className="flex justify-between"><span className="text-[#73839a]">Credential Value:</span><span className="text-[#f4f7fb]">••••••••••••</span></div>
              </div>
              <div className="bg-[#f2b84b]/10 border border-[#f2b84b]/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-[#f2b84b]">
                  <strong>Confirmation Required:</strong> This is a Super Admin operation that will provision a new device with the credentials above. This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-[#233552] text-[#f4f7fb] rounded-lg hover:bg-[#233552]/80 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleProvision}
                  disabled={loading}
                  className="px-6 py-2 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors disabled:opacity-50 font-medium"
                >
                  {loading ? "Provisioning..." : "Confirm Provisioning"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-[#f4f7fb] mb-4">Provisioning Result</h3>
              {result && (
                <div className={`p-4 rounded-lg mb-4 ${
                  result.success ? "bg-[#25c995]/10 border border-[#25c995]/30" : "bg-[#ef6378]/10 border border-[#ef6378]/30"
                }`}>
                  <p className={result.success ? "text-[#25c995]" : "text-[#ef6378]"}>
                    {result.message}
                  </p>
                  {result.success && result.deviceId && (
                    <p className="text-sm text-[#73839a] mt-2">
                      Device ID: {result.deviceId}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  onClick={result?.success ? handleSuccess : handleClose}
                  className="px-6 py-2 bg-[#14b8a6] text-[#f4f7fb] rounded-lg hover:bg-[#14b8a6]/80 transition-colors font-medium"
                >
                  {result?.success ? "Done" : "Close"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
