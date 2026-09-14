import { evaluatePaymentsRBAC } from "../domainPermission";

export function paymentsRBACAllowed(): boolean {
  return evaluatePaymentsRBAC().allows();
}
