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

  // For now, all roles route to the main dashboard
  // This can be updated to per-role dashboards when they are implemented
  // Future implementation:
  // - tenant: "/tenant-dashboard"
  // - landlord: "/landlord-dashboard"
  // - admin: "/admin-dashboard"
  // - security_admin: "/security-dashboard"
  // - super_admin: "/super-admin-dashboard"
  
  // Placeholder for future role-based routing using response.roles
  void response // eslint-disable-line @typescript-eslint/no-unused-vars
  
  return "/"
}
