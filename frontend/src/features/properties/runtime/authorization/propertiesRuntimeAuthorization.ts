import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluatePropertiesAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "properties",
    action,
    capability,
  );
}
