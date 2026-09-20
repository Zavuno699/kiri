import { getAuthenticationState } from "../../application/authentication/state/authenticationStore"
import { useMounted } from "../../hooks/useMounted"

export function LandlordPage() {
  const mounted = useMounted()
  const authState = getAuthenticationState()

  if (!mounted) {
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Landlord Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> {authState.principal}</p>
          <p><strong>Subject ID:</strong> {authState.principalId}</p>
          <p><strong>Roles:</strong> {authState.roles?.join(", ")}</p>
        </div>
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Landlord Actions</h2>
        <p className="text-gray-600">As a Landlord, you can manage your properties, units, and tenants.</p>
        <ul className="mt-4 list-disc list-inside space-y-1">
          <li>Property management</li>
          <li>Unit management</li>
          <li>Tenant invitations and management</li>
          <li>Lock assignment and control</li>
          <li>Payment responsibilities</li>
        </ul>
      </div>
    </div>
  )
}
