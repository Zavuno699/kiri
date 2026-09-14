import { evaluateDevicesRBAC } from "../domainPermission";

export function devicesRBACAllowed(): boolean {
  return evaluateDevicesRBAC().allows();
}
