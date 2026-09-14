import { evaluateLeasesRBAC } from "../domainPermission";

export function leasesRBACAllowed(): boolean {
  return evaluateLeasesRBAC().allows();
}
