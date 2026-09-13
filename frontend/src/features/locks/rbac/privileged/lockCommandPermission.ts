import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function lockCommandPermission() {
  return runtimeRBACPolicy("locks.command");
}
