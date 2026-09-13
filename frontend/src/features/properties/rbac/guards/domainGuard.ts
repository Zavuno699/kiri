import { evaluatePropertiesRBAC } from "../domainPermission";

export function propertiesRBACAllowed(): boolean {
  return evaluatePropertiesRBAC().allowed;
}
