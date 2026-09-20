import type { AuthenticateResponse } from "../commands/authenticate"

/**
 * Resolves the post-login route based on user roles and optional returnTo parameter.
 * 
 * This helper centralizes role-based navigation logic, making it easy to update
 * per-role destinations as new dashboards are added.
 * 
 * @param response - The authentication response containing user roles
 * @param returnTo - Optional returnTo query param for deep linking
 * @returns The route path to navigate to after successful authentication
 */
export function resolvePostLoginRoute(
  response: AuthenticateResponse,
  returnTo?: string
): string {
  // If returnTo is provided, respect it for deep linking
  if (returnTo) {
    return returnTo
  }

  // Role-based routing based on backend-derived roles
  const roles = response.roles || []
  
  // Super Admin gets global admin dashboard
  if (response.is_super_admin || roles.includes("super_admin")) {
    return "/admin"
  }
  
  // Security Admin gets security dashboard (under main protected routes)
  if (roles.includes("security_admin")) {
    return "/security"
  }
  
  // Landlord gets landlord dashboard
  if (roles.includes("landlord")) {
    return "/landlord"
  }
  
  // Tenant gets tenant dashboard
  if (roles.includes("tenant")) {
    return "/tenant"
  }
  
  // Default to main dashboard for other roles or no specific role
  return "/"
}
