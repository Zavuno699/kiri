import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function deviceCommandPermission() {
  return runtimeRBACPolicy("devices.command");
}
