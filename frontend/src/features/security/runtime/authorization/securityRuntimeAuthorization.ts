import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluateSecurityAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "security",
    action,
    capability,
  );
}
