import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluateLocksAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "locks",
    action,
    capability,
  );
}
