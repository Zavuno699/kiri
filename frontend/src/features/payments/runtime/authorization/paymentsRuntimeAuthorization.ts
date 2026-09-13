import {
  evaluateDomainAuthorization,
} from "../../../../application/domainRuntime/security/evaluateDomainAuthorization";

export function evaluatePaymentsAuthorization(
  action: string,
  capability: string,
) {
  return evaluateDomainAuthorization(
    "payments",
    action,
    capability,
  );
}
