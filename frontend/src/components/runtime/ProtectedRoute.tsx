import { Navigate } from "react-router"
import { isAuthenticated, getAuthenticationState } from "../../application/authentication/state/authenticationStore"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  requireAdmin?: boolean
  requireSuperAdmin?: boolean
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  requireAdmin = false,
  requireSuperAdmin = false,
}: ProtectedRouteProps) {
  const authState = getAuthenticationState()

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />
  }

  // Check admin requirement
  if (requireAdmin && !authState.isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }

  // Check super admin requirement
  if (requireSuperAdmin && !authState.isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />
  }

  // Check role requirements
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      authState.roles?.includes(role)
    )
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
