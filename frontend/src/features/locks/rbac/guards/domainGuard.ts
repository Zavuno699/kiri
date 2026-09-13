import { evaluateLocksRBAC } from "../domainPermission";

export function locksRBACAllowed(): boolean {
  return evaluateLocksRBAC().allowed;
}
