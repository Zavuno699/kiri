import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluateLeasesAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "leases",
    action,
    capability,
  );
}
