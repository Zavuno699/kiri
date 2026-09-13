import type {
  OperationalSecurity,
} from "../../../domain/contracts"
import {
  securitySummary,
} from "../presentation/SecuritySummary"

export function createSecuritySurface(
  security?: OperationalSecurity,
) {
  return security
    ? securitySummary(security)
    : undefined
}
