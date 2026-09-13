import { evaluateSecurityRBAC } from "../domainPermission";

export function securityRBACAllowed(): boolean {
  return evaluateSecurityRBAC().allowed;
}
