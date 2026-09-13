import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluateDevicesRBAC() {
  return runtimeRBACPolicy("devices.read");
}
