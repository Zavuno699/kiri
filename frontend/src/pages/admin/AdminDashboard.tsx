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

interface PlatformMetrics {
  totalLandlords: number
  totalTenants: number
  activeTenancies: number
  unassignedLocks: number
  provisioningFailures: number
  securityAlerts: number
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const [devices, setDevices] = useState<DeviceListItem[]>([])
  const [deviceCount, setDeviceCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showProvisionModal, setShowProvisionModal] = useState(false)
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    totalLandlords: 0,
    totalTenants: 0,
    activeTenancies: 0,
    unassignedLocks: 0,
    provisioningFailures: 0,
    securityAlerts: 0,
  })

  useEffect(() => {
    const loadDevicesAsync = async () => {
      try {
        const response = await apiFetch<DeviceListResponse>("/admin/devices", undefined, {
          useIdentityService: true,
        })
        setDevices(response.devices)
        setDeviceCount(response.total)
      } catch (error) {
        console.error("Failed to load devices:", error)
      } finally {
        setLoading(false)
      }
    }

    const loadMetricsAsync = async () => {
      // TODO: Implement real metrics endpoint
      setMetrics({
        totalLandlords: 0,
        totalTenants: 0,
        activeTenancies: 0,
        unassignedLocks: 0,
        provisioningFailures: 0,
        securityAlerts: 0,
      })
    }

    loadDevicesAsync()
    loadMetricsAsync()
  }, [])

  const handleProvisionSuccess = () => {
    setShowProvisionModal(false)
    // Reload devices
    const reloadDevices = async () => {
      try {
        const response = await apiFetch<DeviceListResponse>("/admin/devices", undefined, {
          useIdentityService: true,
        })
        setDevices(response.devices)
        setDeviceCount(response.total)
      } catch (error) {
        console.error("Failed to load devices:", error)
      }
    }
    reloadDevices()
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Control Center</h1>
        <p className="text-gray-600">Platform operations and secure padlock provisioning</p>
      </div>

      {/* Platform Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Registered Devices"
            value={deviceCount}
            unavailable={false}
          />
          <MetricCard
            title="Total Landlords"
            value={metrics.totalLandlords}
            unavailable={true}
          />
          <MetricCard
            title="Active Tenants"
            value={metrics.totalTenants}
            unavailable={true}
          />
          <MetricCard
            title="Active Tenancies"
            value={metrics.activeTenancies}
            unavailable={true}
          />
          <MetricCard
            title="Unassigned Locks"
            value={metrics.unassignedLocks}
            unavailable={true}
          />
          <MetricCard
            title="Security Alerts"
            value={metrics.securityAlerts}
            unavailable={true}
          />
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Device Management</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowProvisionModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Provision New Padlock
          </button>
          <button
            onClick={() => navigate("/admin/devices")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            View All Devices
          </button>
        </div>
      </div>

      {/* Recent Devices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Provisioned Devices</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading devices...</div>
        ) : devices.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No devices provisioned yet. Click "Provision New Padlock" to get started.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provisioned
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices.slice(0, 5).map((device) => (
                  <tr key={device.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {device.serial_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {device.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {device.device_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {device.lifecycle_state}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(device.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Navigation Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavCard
            title="Security"
            description="Security audit and controls"
            path="/security"
          />
          <NavCard
            title="RBAC"
            description="Role-based access control"
            path="/rbac"
          />
          <NavCard
            title="Operator Control"
            description="Global operator controls"
            path="/operator-control/global"
          />
          <NavCard
            title="System Health"
            description="Frontend health monitoring"
            path="/health"
          />
          <NavCard
            title="Operational Integrity"
            description="System integrity checks"
            path="/integrity"
          />
          <NavCard
            title="Runtime Status"
            description="Unified runtime monitoring"
            path="/runtime"
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

function MetricCard({ title, value, unavailable }: { title: string; value: number; unavailable: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      {unavailable ? (
        <p className="text-gray-400 text-sm">Unavailable — no backend source</p>
      ) : (
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      )}
    </div>
  )
}

function NavCard({ title, description, path }: { title: string; description: string; path: string }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(path)}
      className="bg-white rounded-lg shadow p-6 text-left hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
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
    // Clear sensitive data from memory
    setCredentials({ credential_type: "API_KEY", credential_value: "" })
    onClose()
  }

  const handleSuccess = () => {
    onSuccess()
    handleClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Provision New Padlock</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {s}
                </div>
                {s < 4 && <div className="w-16 h-1 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Device Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                  <select
                    value={deviceMetadata.device_type}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, device_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PADLOCK">Padlock</option>
                    <option value="GATEWAY">Gateway</option>
                    <option value="CONTROLLER">Controller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
                  <input
                    type="text"
                    value={deviceMetadata.serial_number}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, serial_number: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., SN123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={deviceMetadata.model}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., KiriLock Pro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Firmware Version *</label>
                  <input
                    type="text"
                    value={deviceMetadata.firmware_version}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, firmware_version: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1.0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gateway ID (optional)</label>
                  <input
                    type="text"
                    value={deviceMetadata.gateway_id}
                    onChange={(e) => setDeviceMetadata({ ...deviceMetadata, gateway_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional gateway ID"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleStep1Next}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 2: Provider Credentials</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Security Notice:</strong> Credentials are encrypted and stored securely. They will never be displayed again after submission.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credential Type</label>
                  <select
                    value={credentials.credential_type}
                    onChange={(e) => setCredentials({ ...credentials, credential_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="API_KEY">API Key</option>
                    <option value="API_SECRET">API Secret</option>
                    <option value="ACCESS_TOKEN">Access Token</option>
                    <option value="CERTIFICATE">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credential Value *</label>
                  <input
                    type="password"
                    value={credentials.credential_value}
                    onChange={(e) => setCredentials({ ...credentials, credential_value: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the credential value"
                    autoComplete="off"
                  />
                  <p className="text-xs text-gray-500 mt-1">This value will be encrypted and stored securely</p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleStep2Next}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Provisioning..." : "Provision Device"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 3: Review</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div><strong>Device Type:</strong> {deviceMetadata.device_type}</div>
                <div><strong>Serial Number:</strong> {deviceMetadata.serial_number}</div>
                <div><strong>Model:</strong> {deviceMetadata.model}</div>
                <div><strong>Firmware Version:</strong> {deviceMetadata.firmware_version}</div>
                <div><strong>Credential Type:</strong> {credentials.credential_type}</div>
                <div><strong>Credential Value:</strong> ••••••••••••</div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleProvision}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Provisioning..." : "Confirm Provisioning"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Provisioning Result</h3>
              {result && (
                <div className={`p-4 rounded-lg mb-4 ${
                  result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}>
                  <p className={result.success ? "text-green-800" : "text-red-800"}>
                    {result.message}
                  </p>
                  {result.success && result.deviceId && (
                    <p className="text-sm text-gray-600 mt-2">
                      Device ID: {result.deviceId}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  onClick={result?.success ? handleSuccess : handleClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
