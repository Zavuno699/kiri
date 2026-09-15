import { apiFetch } from "../../../api/client"
import {
  setAuthenticationState,
} from "../state/authenticationStore"

export interface AuthenticateRequest {
  email: string
  password: string
}

export interface AuthenticateResponse {
  subject_id: string
  email: string
  roles: string[]
  is_admin: boolean
  is_super_admin: boolean
}

export async function authenticate(
  request: AuthenticateRequest,
): Promise<AuthenticateResponse> {
  const response = await apiFetch<AuthenticateResponse>(
    "/authenticate",
    {
      method: "POST",
      body: JSON.stringify(request),
    },
    { useIdentityService: true },
  )

  // Store auth state from backend response (authoritative)
  setAuthenticationState({
    principalId: response.subject_id,
    principal: response.email,
    sessionId: null, // No session token in current backend contract
    tenantId: null,
    roles: response.roles,
    isAdmin: response.is_admin,
    isSuperAdmin: response.is_super_admin,
    authenticated: true,
    status: "authenticated",
    capabilities: [], // Derived from roles, not client-supplied
  })

  return response
}
