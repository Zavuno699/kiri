import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluatePaymentsRBAC() {
  return runtimeRBACPolicy("payments.read");
}
