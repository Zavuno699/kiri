import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluateDevicesAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "devices",
    action,
    capability,
  );
}
