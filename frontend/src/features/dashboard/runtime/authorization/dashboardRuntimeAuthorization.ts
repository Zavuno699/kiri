import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluateDashboardAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "dashboard",
    action,
    capability,
  );
}
