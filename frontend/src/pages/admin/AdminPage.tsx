import { getAuthenticationState } from "../../application/authentication/state/authenticationStore"
import { useMounted } from "../../hooks/useMounted"

export function AdminPage() {
  const mounted = useMounted()
  const authState = getAuthenticationState()

  if (!mounted) {
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> {authState.principal}</p>
          <p><strong>Subject ID:</strong> {authState.principalId}</p>
          <p><strong>Roles:</strong> {authState.roles?.join(", ")}</p>
          <p><strong>Is Super Admin:</strong> {authState.isSuperAdmin ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Actions</h2>
        <p className="text-gray-600">As Super Admin, you have access to all system management features.</p>
        <ul className="mt-4 list-disc list-inside space-y-1">
          <li>User and role management</li>
          <li>Security audit and controls</li>
          <li>Operator controls</li>
          <li>System health monitoring</li>
          <li>Full access to all landlord and tenant operations</li>
        </ul>
      </div>
    </div>
  )
}
