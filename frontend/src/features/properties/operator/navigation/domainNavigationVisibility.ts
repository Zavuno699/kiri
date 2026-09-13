import { runtimeRBACAllows } from "../../../application/rbac/runtime/rbacRuntimeBridge";

export function propertiesNavigationVisible(): boolean {
  return runtimeRBACAllows("properties.write");
}
