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

export function AdminDevicesPage() {
  const navigate = useNavigate()
  const [devices, setDevices] = useState<DeviceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      setLoading(true)
      const response = await apiFetch<DeviceListResponse>("/admin/devices", undefined, {
        useIdentityService: true,
      })
      setDevices(response.devices)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to load devices")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Device Management</h1>
        <p className="text-gray-600">View and manage all provisioned padlock devices</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading devices...</div>
      ) : devices.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No devices provisioned yet</p>
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard to Provision
          </button>
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
                  Firmware
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lifecycle State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Connectivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credential Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provisioned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {device.serial_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.device_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.firmware_version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      device.lifecycle_state === "PROVISIONED" || device.lifecycle_state === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {device.lifecycle_state}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      device.connectivity_state === "ONLINE"
                        ? "bg-green-100 text-green-800"
                        : device.connectivity_state === "OFFLINE"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {device.connectivity_state}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      device.credential_status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {device.credential_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(device.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
