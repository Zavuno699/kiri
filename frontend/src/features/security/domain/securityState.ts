import type { OperationalSecurity } from "../../../domain/contracts"

export function securityAccessGranted(
  security: OperationalSecurity,
): boolean {
  return security.accessGranted ?? false
}
